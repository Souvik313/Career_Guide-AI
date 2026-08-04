from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from backend.database.session import get_db

from backend.core.authorization import get_current_user

from backend.models.user import User

from backend.schemas.saved_job import (
    SavedJobCreate,
    SavedJobResponse,
)

from backend.services.saved_job_service import SavedJobService

router = APIRouter(
    tags=["Saved Jobs"]
)

@router.post(
    "/saved-jobs",
    response_model=SavedJobResponse,
)
def save_job(
    request: SavedJobCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):

    saved_job_service = SavedJobService(db)

    saved_job = saved_job_service.save_job(
        user_id=current_user.id,
        job_title=request.job_title,
        company_name=request.company_name,
        exp_years=request.exp_years,
        primary_keyword=request.primary_keyword,
        english_level=request.english_level,
        skills=request.skills,
    )

    return saved_job

@router.get(
    "/saved-jobs",
    response_model=list[SavedJobResponse],
)
def get_saved_jobs(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):

    saved_job_service = SavedJobService(db)

    saved_jobs = saved_job_service.get_saved_jobs(
        user_id=current_user.id,
    )

    return saved_jobs

@router.delete(
    "/saved-jobs/{saved_job_id}",
)
def delete_saved_job(
    saved_job_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):

    saved_job_service = SavedJobService(db)

    deleted = saved_job_service.delete_saved_job(
        saved_job_id=saved_job_id,
        user_id=current_user.id,
    )

    if not deleted:
        raise HTTPException(
            status_code=404,
            detail="Saved job not found.",
        )

    return {
        "message": "Saved job deleted successfully."
    }