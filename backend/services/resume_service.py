from sqlalchemy.orm import Session
from sqlalchemy import select
from backend.models.resume import Resume


class ResumeService:

    def __init__(self, db: Session):
        self.db = db

    def create_resume(
        self,
        user_id: int,
        candidate_name: str,
        filename: str,
        content_hash: str,
        cloudinary_public_id: str,
        cloudinary_url: str,
        parsed_text: str,
        embedding: list[float] | None = None,
    ):
        """
        Create and persist a newly uploaded resume.
        """

        resume = Resume(
            user_id=user_id,
            candidate_name=candidate_name,
            filename=filename,
            content_hash=content_hash,
            cloudinary_public_id=cloudinary_public_id,
            cloudinary_url=cloudinary_url,
            parsed_text=parsed_text,
            embedding=embedding,
        )

        self.db.add(resume)
        self.db.commit()
        self.db.refresh(resume)

        return resume

    def get_user_resumes(
        self,
        user_id: int,
    ):
        """
        Return all resumes uploaded by a user.
        """

        statement = (
            select(Resume)
            .where(Resume.user_id == user_id)
            .order_by(Resume.uploaded_at.desc())
        )

        return list(
            self.db.scalars(statement).all()
        )

    def get_resume_by_id(
        self,
        resume_id: int,
        user_id: int,
    ):
        """
        Return a single resume if it belongs
        to the current user.
        """

        statement = select(Resume).where(
            Resume.id == resume_id,
            Resume.user_id == user_id,
        )

        return self.db.scalar(statement)

    def get_resume_by_hash(
        self,
        user_id: int,
        content_hash: str,
    ):
        """
        Return a resume if the exact same file has
        already been uploaded by the user.
        """

        statement = select(Resume).where(
            Resume.user_id == user_id,
            Resume.content_hash == content_hash,
        )

        return self.db.scalar(statement)

    def delete_resume(
        self,
        resume_id: int,
        user_id: int,
    ):
        """
        Delete a user's resume.
        """

        resume = self.get_resume_by_id(
            resume_id=resume_id,
            user_id=user_id,
        )

        if resume is None:
            return False

        self.db.delete(resume)
        self.db.commit()

        return True