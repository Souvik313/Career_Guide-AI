from datetime import datetime, UTC

from sqlalchemy import DateTime
from sqlalchemy import ForeignKey
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import Text
from sqlalchemy import UniqueConstraint
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column
from sqlalchemy.orm import relationship
from pgvector.sqlalchemy import Vector


from backend.database.base import Base

class Resume(Base):
    __tablename__ = "resumes"

    __table_args__ = (
        UniqueConstraint(
            "user_id",
            "content_hash",
            name="uq_resume_user_content_hash",
        ),
    )

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        autoincrement=True,
    )
    user_id: Mapped[int] = mapped_column(
        ForeignKey("users.id"),
        nullable=False,
    )
    candidate_name: Mapped[str] = mapped_column(
        String(255),
        nullable=False,
    )
    filename: Mapped[str] = mapped_column(
        String(255),
        nullable=False,
    )
    content_hash: Mapped[str] = mapped_column(
        String(64),
        nullable=True,
    )
    cloudinary_public_id: Mapped[str] = mapped_column(
        String(500),
        nullable=False,
    )
    cloudinary_url: Mapped[str] = mapped_column(
        String(1000),
        nullable=True,
    )
    parsed_text: Mapped[str] = mapped_column(
        Text,
        nullable=False
    )
    embedding: Mapped[list[float] | None] = mapped_column(
        Vector(384),
        nullable=True,
    )
    uploaded_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda: datetime.now(UTC),
        nullable=False,
    )
    user: Mapped["User"] = relationship(
        back_populates="resumes",
    )
    recommendations: Mapped[list["Recommendation"]] = relationship(
        back_populates="resume",
        cascade="all, delete-orphan",
    )
    chat_messages: Mapped[list["ChatMessage"]] = relationship(
        back_populates="resume",
        cascade="all, delete-orphan",
    )
    career_evaluation: Mapped["CareerEvaluation | None"] = relationship(
        back_populates="resume",
        cascade="all, delete-orphan",
    )