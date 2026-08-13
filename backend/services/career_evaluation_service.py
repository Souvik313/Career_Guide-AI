from sqlalchemy import select
from sqlalchemy.orm import Session

from backend.models.career_evaluation import CareerEvaluation
from backend.models.resume import Resume

class CareerEvaluationService:
    """
    Handles persistence of AI-generated career evaluations.
    """

    def __init__(self, db: Session):
        self.db = db

    def create_or_update_evaluation(
        self,
        resume_id: int,
        candidate_name: str,
        resume_skills: list[str],
        top_missing_skills: list[str],
        career_report: dict,
        ai_report: dict,
    ) -> CareerEvaluation:
        """
        Creates a new CareerEvaluation for a resume
        or updates the existing one.
        """

        try:

            evaluation = self.db.scalar(
                select(CareerEvaluation).where(
                    CareerEvaluation.resume_id == resume_id
                )
            )

            if evaluation is None:

                evaluation = CareerEvaluation(
                    resume_id=resume_id,

                    candidate_name=candidate_name,

                    resume_skills = resume_skills,

                    top_missing_skills = top_missing_skills,

                    match_score=career_report["match_score"],

                    strengths=career_report["strengths"],

                    missing_skills=career_report["missing_skills"],

                    best_roles=career_report["best_roles"],

                    recommendations=career_report["recommendations"],

                    career_summary=ai_report["career_summary"],

                    career_path_explanation=ai_report[
                        "career_path_explanation"
                    ],

                    strength_analysis=ai_report[
                        "strength_analysis"
                    ],

                    skill_gap_analysis=ai_report[
                        "skill_gap_analysis"
                    ],

                    learning_roadmap=ai_report[
                        "learning_roadmap"
                    ],

                    motivation=ai_report[
                        "motivation"
                    ],
                )

                self.db.add(evaluation)

            else:

                evaluation.candidate_name = candidate_name

                evaluation.resume_skills = resume_skills

                evaluation.top_missing_skills = top_missing_skills

                evaluation.match_score = career_report["match_score"]

                evaluation.strengths = career_report["strengths"]

                evaluation.missing_skills = career_report[
                    "missing_skills"
                ]

                evaluation.best_roles = career_report[
                    "best_roles"
                ]

                evaluation.recommendations = career_report[
                    "recommendations"
                ]

                evaluation.career_summary = ai_report[
                    "career_summary"
                ]

                evaluation.career_path_explanation = ai_report[
                    "career_path_explanation"
                ]

                evaluation.strength_analysis = ai_report[
                    "strength_analysis"
                ]

                evaluation.skill_gap_analysis = ai_report[
                    "skill_gap_analysis"
                ]

                evaluation.learning_roadmap = ai_report[
                    "learning_roadmap"
                ]

                evaluation.motivation = ai_report[
                    "motivation"
                ]

            self.db.commit()

            self.db.refresh(evaluation)

            return evaluation

        except Exception:

            self.db.rollback()

            raise

    def get_career_evaluation(
        self,
        resume_id: int,
        user_id: int,
    ):
        """
        Return the career evaluation for a resume
        only if the resume belongs to the user.
        """

        resume = self.db.scalar(
            select(Resume).where(
                Resume.id == resume_id,
                Resume.user_id == user_id,
            )
        )

        if resume is None:
            return None

        return self.db.scalar(
            select(CareerEvaluation).where(
                CareerEvaluation.resume_id == resume_id,
            )
        )

    def get_career_result_dict(
        self,
        resume_id: int,
        user_id: int,
    ):
        """
        Reconstruct the career evaluation portion
        of the CareerPipeline response from Neon.
        """

        evaluation = self.get_career_evaluation(
            resume_id=resume_id,
            user_id=user_id,
        )

        if evaluation is None:
            return None

        career_report = {
            "match_score": evaluation.match_score,
            "strengths": evaluation.strengths,
            "missing_skills": evaluation.missing_skills,
            "best_roles": evaluation.best_roles,
            "recommendations": evaluation.recommendations,
        }

        ai_report = {
            "career_summary": evaluation.career_summary,
            "career_path_explanation": evaluation.career_path_explanation,
            "strength_analysis": evaluation.strength_analysis,
            "skill_gap_analysis": evaluation.skill_gap_analysis,
            "learning_roadmap": evaluation.learning_roadmap,
            "motivation": evaluation.motivation,
        }

        return {
            "candidate_name": evaluation.candidate_name,
            "resume_skills": evaluation.resume_skills,
            "missing_skills": evaluation.top_missing_skills,
            "career_report": career_report,
            "ai_report": ai_report,
        }

    def delete_career_evaluation(
        self,
        resume_id: int,
        user_id: int,
    ):
        """
        Delete the career evaluation belonging
        to a user's resume.
        """

        resume = self.db.scalar(
            select(Resume).where(
                Resume.id == resume_id,
                Resume.user_id == user_id,
            )
        )

        if resume is None:
            return False

        evaluation = self.db.scalar(
            select(CareerEvaluation).where(
                CareerEvaluation.resume_id == resume_id,
            )
        )

        if evaluation is None:
            return False

        self.db.delete(evaluation)
        self.db.commit()

        return True