from sqlalchemy.orm import Session
from sqlalchemy import select
from backend.models.recommendation import Recommendation
from backend.models.resume import Resume


class RecommendationService:
    """
    Replace all recommendations belonging to a resume
    with the latest recommendations generated
    by the AI pipeline.
    """

    def __init__(self, db: Session):
        self.db = db

    def create_recommendations(
        self,
        resume_id: int,
        recommendations: list[dict[str, object]],
    ):

        try:
            self.db.query(Recommendation).filter(
                Recommendation.resume_id == resume_id
            ).delete()

            objects = []

            for recommendation in recommendations:

                recommendation_obj = Recommendation(

                    resume_id=resume_id,

                    job_title=recommendation["job_title"],

                    company_name=recommendation["company_name"],

                    exp_years=recommendation.get("exp_years"),

                    primary_keyword=recommendation.get("primary_keyword"),

                    english_level=recommendation.get("english_level"),

                    skills=recommendation.get("skills", []),

                    similarity_score=recommendation["similarity_score"],

                    rank=recommendation["rank"],

                    role_category=recommendation["role_category"],

                    match_reason=recommendation["match_reason"],

                    missing_skills_summary=recommendation.get(
                        "missing_skills_summary"
                    ),

                    next_step=recommendation.get("next_step")
                )

                objects.append(recommendation_obj)

            self.db.add_all(objects)

            self.db.commit()

            for obj in objects:
                self.db.refresh(obj)

            return objects

        except Exception as e:
            self.db.rollback()
            raise e

    def get_recommendations(
        self,
        resume_id: int,
        user_id: int,
    ):
        """
        Return all recommendations for a resume
        only if the resume belongs to the user.
        """

        resume = self.db.scalar(
            select(Resume).where(
                Resume.id == resume_id,
                Resume.user_id == user_id,
            )
        )

        if resume is None:
            return []

        statement = (
            select(Recommendation)
            .where(
                Recommendation.resume_id == resume_id,
            )
            .order_by(Recommendation.rank)
        )

        return list(self.db.scalars(statement).all())

    def get_recommendation_dicts(
        self,
        resume_id: int,
        user_id: int,
    ) -> list[dict]:
        """
        Return persisted recommendations in the same
        dictionary structure expected by the frontend.
        """

        recommendations = self.get_recommendations(
            resume_id=resume_id,
            user_id=user_id,
        )

        return [
            {
                "job_title": recommendation.job_title,
                "company_name": recommendation.company_name,
                "similarity_score": recommendation.similarity_score,
                "rank": recommendation.rank,
                "role_category": recommendation.role_category,
                "exp_years": recommendation.exp_years,
                "primary_keyword": recommendation.primary_keyword,
                "english_level": recommendation.english_level,
                "skills": recommendation.skills,
                "match_reason": recommendation.match_reason,
                "missing_skills_summary": (
                    recommendation.missing_skills_summary
                ),
                "next_step": recommendation.next_step,
            }
            for recommendation in recommendations
        ]

    def delete_recommendations(
        self,
        resume_id: int,
        user_id: int,
    ):
        """
        Delete all recommendations belonging to a resume.
        """

        resume = self.db.scalar(
            select(Resume).where(
                Resume.id == resume_id,
                Resume.user_id == user_id,
            )
        )

        if resume is None:
            return False

        self.db.query(Recommendation).filter(
            Recommendation.resume_id == resume_id
        ).delete()

        self.db.commit()

        return True