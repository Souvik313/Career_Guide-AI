from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from backend.database.session import get_db

from backend.core.authorization import get_current_user

from backend.models.user import User

from backend.schemas.career_evaluation import CareerEvaluationResponse

from backend.services.career_evaluation_service import CareerEvaluationService


router = APIRouter(
    tags=["Career Evaluation"]
)

@router.get(
    "/career-evaluation/{resume_id}",
    response_model=CareerEvaluationResponse,
)
def get_career_evaluation(
    resume_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """
    Return the career evaluation for one resume.
    """

    service = CareerEvaluationService(db)

    evaluation = service.get_career_evaluation(
        resume_id=resume_id,
        user_id=current_user.id,
    )

    if evaluation is None:
        raise HTTPException(
            status_code=404,
            detail="Career evaluation not found.",
        )

    return evaluation

@router.delete(
    "/career-evaluation/{resume_id}",
)
def delete_career_evaluation(
    resume_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """
    Delete the career evaluation belonging to a resume.
    """

    service = CareerEvaluationService(db)

    deleted = service.delete_career_evaluation(
        resume_id=resume_id,
        user_id=current_user.id,
    )

    if not deleted:
        raise HTTPException(
            status_code=404,
            detail="Career evaluation not found.",
        )

    return {
        "message": "Career evaluation deleted successfully."
    }