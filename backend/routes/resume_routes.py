import os
from pathlib import Path
import shutil
import traceback
from fastapi import APIRouter
from fastapi import UploadFile
from fastapi import File
from fastapi.responses import FileResponse
from fastapi import HTTPException

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

router = APIRouter(
    tags=["Resume"],
)

BASE_DIR = Path(__file__).resolve().parent.parent

UPLOAD_FOLDER = BASE_DIR / "uploads"
UPLOAD_FOLDER.mkdir(parents=True, exist_ok=True)

@router.post("/upload-resume")
async def upload_resume(
        file: UploadFile = File(...),
        current_user: User = Depends(get_current_user),
        db: Session = Depends(get_db),
    ):

    try:
        if file.content_type != "application/pdf":
            raise HTTPException(
                status_code=400,
                detail="Only pdf resumes are supported"
            )
        
        file_path = UPLOAD_FOLDER / file.filename

        with open(file_path , "wb") as buffer:
            shutil.copyfileobj(
                file.file,
                buffer
            )

        parser = ResumeParser()
        resume_text = parser.extract_text(str(file_path))

        candidate_name = parser.extract_candidate_name(
            resume_text
        )

        cleaner = ResumeCleaner()
        clean_resume = cleaner.clean(resume_text)

        resume_service = ResumeService(db)

        resume = resume_service.create_resume(
            user_id=current_user.id,
            candidate_name=candidate_name,
            filename=file.filename,
            file_path=str(file_path),
            parsed_text=resume_text,
        )

        pipeline = CareerPipeline()
        result = pipeline.run_pipeline(
            clean_resume=clean_resume,
            candidate_name=candidate_name,
        )
        recommendation_service = RecommendationService(db)

        recommendation_service.create_recommendations(
            resume_id=resume.id,
            recommendations=result["recommended_jobs"],
        )

        evaluation_service = CareerEvaluationService(db)

        evaluation_service.create_or_update_evaluation(
            resume_id=resume.id,
            candidate_name=candidate_name,
            career_report=result["career_report"],
            ai_report=result["ai_report"],
        )
        return result
    except Exception as e:
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
    Delete a resume owned by the current user.
    """

    resume_service = ResumeService(db)

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

@router.get("/{resume_id}/file")
def get_resume_file(
    resume_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """
    Return the PDF file for a resume owned by the current user.
    """

    resume = (
        db.query(Resume)
        .filter(
            Resume.id == resume_id,
            Resume.user_id == current_user.id,
        )
        .first()
    )

    if not resume:
        raise HTTPException(
            status_code=404,
            detail="Resume not found.",
        )

    file_path = resume.file_path
    filename = resume.filename

    if not file_path:
        raise HTTPException(
            status_code=404,
            detail="Resume file path is missing.",
        )

    if not os.path.isfile(file_path):
        raise HTTPException(
            status_code=404,
            detail="Resume file does not exist on the server.",
        )

    return FileResponse(
        path=file_path,
        media_type="application/pdf",
        filename=filename,
        headers={
            "Content-Disposition": "inline",
        },
    )
