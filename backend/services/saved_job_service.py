from sqlalchemy import select
from sqlalchemy.orm import Session

from backend.models.saved_job import SavedJob

class SavedJobService:

    def __init__(self, db: Session):
        self.db = db

    def save_job(
        self,
        user_id: int,
        job_title: str,
        company_name: str,
        exp_years: str | None,
        primary_keyword: str | None,
        english_level: str | None,
        skills: list[str],
    ):

        existing = self.db.scalar(
        select(SavedJob).where(
            SavedJob.user_id == user_id,
            SavedJob.job_title == job_title,
            SavedJob.company_name == company_name,
            SavedJob.exp_years == exp_years,
            SavedJob.primary_keyword == primary_keyword,
            SavedJob.english_level == english_level,
            SavedJob.skills == skills,
        )
    )

        if existing:
            return existing

        saved_job = SavedJob(
            user_id=user_id,
            job_title=job_title,
            company_name=company_name,
            exp_years=exp_years,
            primary_keyword=primary_keyword,
            english_level=english_level,
            skills=skills,
        )

        self.db.add(saved_job)
        self.db.commit()
        self.db.refresh(saved_job)

        return saved_job

    def get_saved_jobs(
        self,
        user_id: int,
    ):

        statement = (
            select(SavedJob)
            .where(
                SavedJob.user_id == user_id
            )
            .order_by(
                SavedJob.saved_at.desc()
            )
        )

        return self.db.scalars(statement).all()

    def delete_saved_job(
        self,
        saved_job_id: int,
        user_id: int,
    ):

        saved_job = self.db.scalar(
        select(SavedJob).where(
            SavedJob.id == saved_job_id,
            SavedJob.user_id == user_id,
        )
    )

        if saved_job is None:
            return False

        self.db.delete(saved_job)
        self.db.commit()

        return True