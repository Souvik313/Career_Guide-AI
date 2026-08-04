from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from backend.database.session import get_db

from backend.core.authorization import get_current_user

from backend.models.user import User

from backend.schemas.recommendation import RecommendationResponse

from backend.services.recommendation_service import RecommendationService


router = APIRouter(
    tags=["Recommendation"]
)

@router.get(
    "/recommendations/{resume_id}",
    response_model=list[RecommendationResponse],
)
def get_recommendations(
    resume_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """
    Return all recommendations for one resume.
    """

    recommendation_service = RecommendationService(db)

    recommendations = (
        recommendation_service.get_recommendations(
            resume_id=resume_id,
            user_id=current_user.id,
        )
    )

    return recommendations

@router.delete(
    "/recommendations/{resume_id}",
)
def delete_recommendations(
    resume_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """
    Delete all recommendations for one resume.
    """

    recommendation_service = RecommendationService(db)

    deleted = (
        recommendation_service.delete_recommendations(
            resume_id=resume_id,
            user_id=current_user.id,
        )
    )

    if not deleted:
        raise HTTPException(
            status_code=404,
            detail="Recommendations not found.",
        )

    return {
        "message": "Recommendations deleted successfully."
    }