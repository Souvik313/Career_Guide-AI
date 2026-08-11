import traceback
from fastapi import APIRouter
from fastapi import UploadFile
from fastapi import File
from fastapi import HTTPException
from fastapi.responses import RedirectResponse

from fastapi import Depends
from sqlalchemy.orm import Session

from backend.database.session import get_db

from backend.services.career_evaluation_service import CareerEvaluationService
from backend.services.resume_service import ResumeService
from backend.services.recommendation_service import RecommendationService

from backend.schemas.resume import ResumeDetailResponse, ResumeSummaryResponse

from backend.core.authorization import get_current_user
from backend.models.user import User
from backend.models.resume import Resume

from src.resume_parser.resume_parser import ResumeParser
from src.resume_parser.resume_cleaner import ResumeCleaner

from backend.services.career_pipeline import CareerPipeline
from backend.services.cloudinary_service import CloudinaryService

router = APIRouter(
    tags=["Resume"],
)

@router.post("/upload-resume")
async def upload_resume(
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """
    Upload a resume to Cloudinary, extract its text,
    run the career pipeline, and persist the results.
    """

    cloudinary_data = None
    resume = None

    try:
        # =================================================
        # STEP 1 — Validate file
        # =================================================

        if file.content_type != "application/pdf":
            raise HTTPException(
                status_code=400,
                detail="Only PDF resumes are supported.",
            )

        if not file.filename:
            raise HTTPException(
                status_code=400,
                detail="Resume filename is missing.",
            )

        # =================================================
        # STEP 2 — Read uploaded file into memory
        # =================================================

        file_bytes = await file.read()

        if not file_bytes:
            raise HTTPException(
                status_code=400,
                detail="Uploaded resume is empty.",
            )

        # =================================================
        # STEP 3 — Upload PDF to Cloudinary
        # =================================================

        cloudinary_data = CloudinaryService.upload_resume(
            file_bytes=file_bytes,
            filename=file.filename,
            user_id=current_user.id,
        )

        # =================================================
        # STEP 4 — Parse PDF directly from bytes
        # =================================================

        parser = ResumeParser()

        resume_text = parser.extract_text_from_bytes(
            file_bytes=file_bytes,
            filename=file.filename,
        )

        # =================================================
        # STEP 5 — Extract candidate name
        # =================================================

        candidate_name = parser.extract_candidate_name(
            resume_text
        )

        # =================================================
        # STEP 6 — Clean resume
        # =================================================

        cleaner = ResumeCleaner()

        clean_resume = cleaner.clean(
            resume_text
        )

        # =================================================
        # STEP 7 — Save resume metadata to Neon
        # =================================================

        resume_service = ResumeService(db)

        resume = resume_service.create_resume(
            user_id=current_user.id,
            candidate_name=candidate_name,
            filename=file.filename,
            cloudinary_public_id=cloudinary_data["public_id"],
            cloudinary_url=cloudinary_data["secure_url"],
            parsed_text=resume_text,
        )

        # =================================================
        # STEP 8 — Run Career Pipeline
        # =================================================

        pipeline = CareerPipeline()

        result = pipeline.run_pipeline(
            clean_resume=clean_resume,
            candidate_name=candidate_name,
        )

        # =================================================
        # STEP 9 — Save recommendations
        # =================================================

        recommendation_service = RecommendationService(db)

        recommendation_service.create_recommendations(
            resume_id=resume.id,
            recommendations=result["recommended_jobs"],
        )

        # =================================================
        # STEP 10 — Save career evaluation
        # =================================================

        evaluation_service = CareerEvaluationService(db)

        evaluation_service.create_or_update_evaluation(
            resume_id=resume.id,
            candidate_name=candidate_name,
            career_report=result["career_report"],
            ai_report=result["ai_report"],
        )

        # =================================================
        # STEP 11 — Return result
        # =================================================

        return result

    except HTTPException:
        raise

    except Exception as e:
        traceback.print_exc()

        # =================================================
        # IMPORTANT:
        # If Cloudinary succeeded but something later failed,
        # clean up the uploaded asset.
        # =================================================

        if cloudinary_data:
            try:
                CloudinaryService.delete_resume(
                    cloudinary_data["public_id"]
                )
            except Exception:
                traceback.print_exc()

        raise HTTPException(
            status_code=500,
            detail=str(e),
        )

@router.get("/resumes" , response_model=list[ResumeSummaryResponse])
def get_resumes(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """
    Return all resumes uploaded by the current user.
    """

    resume_service = ResumeService(db)

    resumes = resume_service.get_user_resumes(
        user_id=current_user.id,
    )

    return resumes

@router.get("/resumes/{resume_id}" , response_model=ResumeDetailResponse)
def get_resume(
    resume_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """
    Return one resume belonging to the current user.
    """

    resume_service = ResumeService(db)

    resume = resume_service.get_resume_by_id(
        resume_id=resume_id,
        user_id=current_user.id,
    )

    if resume is None:
        raise HTTPException(
            status_code=404,
            detail="Resume not found.",
        )

    return resume

@router.delete("/resumes/{resume_id}")
def delete_resume(
    resume_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """
    Delete a resume from Cloudinary and Neon.
    """

    resume_service = ResumeService(db)

    resume = resume_service.get_resume_by_id(
        resume_id=resume_id,
        user_id=current_user.id,
    )

    if resume is None:
        raise HTTPException(
            status_code=404,
            detail="Resume not found.",
        )

    try:
        # =================================================
        # STEP 1 — Delete Cloudinary asset
        # =================================================

        if resume.cloudinary_public_id:
            CloudinaryService.delete_resume(
                public_id=resume.cloudinary_public_id,
            )

        # =================================================
        # STEP 2 — Delete Neon record
        # =================================================

        deleted = resume_service.delete_resume(
            resume_id=resume_id,
            user_id=current_user.id,
        )

        if not deleted:
            raise HTTPException(
                status_code=404,
                detail="Resume not found.",
            )

        return {
            "message": "Resume deleted successfully."
        }

    except HTTPException:
        raise

    except Exception as e:
        traceback.print_exc()

        raise HTTPException(
            status_code=500,
            detail=f"Failed to delete resume: {str(e)}",
        )

@router.get("/{resume_id}/file")
def get_resume_file(
    resume_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """
    Return the Cloudinary URL for a resume PDF
    owned by the current user.
    """

    resume_service = ResumeService(db)

    resume = resume_service.get_resume_by_id(
        resume_id=resume_id,
        user_id=current_user.id,
    )

    if resume is None:
        raise HTTPException(
            status_code=404,
            detail="Resume not found.",
        )

    if not resume.cloudinary_url:
        raise HTTPException(
            status_code=404,
            detail="Resume Cloudinary URL is missing.",
        )

    return {
        "url": resume.cloudinary_url,
        "filename": resume.filename,
    }
