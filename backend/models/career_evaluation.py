from datetime import UTC, datetime

from sqlalchemy import DateTime
from sqlalchemy import Float
from sqlalchemy import ForeignKey
from sqlalchemy import Integer
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy import String
from sqlalchemy import Text
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column
from sqlalchemy.orm import relationship

from backend.database.base import Base

class CareerEvaluation(Base):
    __tablename__ = "career_evaluations"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        autoincrement=True,
    )

    resume_id: Mapped[int] = mapped_column(
        ForeignKey("resumes.id"),
        nullable=False,
        unique=True,
    )

    candidate_name: Mapped[str] = mapped_column(
        String(255),
        nullable=False,
    )

    match_score: Mapped[float] = mapped_column(
        Float,
        nullable=False,
    )

    strengths: Mapped[list[dict] | list[str]] = mapped_column(
        JSONB,
        nullable=False,
    )

    missing_skills: Mapped[list[dict] | list[str]] = mapped_column(
        JSONB,
        nullable=False,
    )

    best_roles: Mapped[list[dict] | list[str]] = mapped_column(
        JSONB,
        nullable=False,
    )

    recommendations: Mapped[list[dict] | list[str]] = mapped_column(
        JSONB,
        nullable=False,
    )

    career_summary: Mapped[str] = mapped_column(
        Text,
        nullable=False,
    )

    career_path_explanation: Mapped[str] = mapped_column(
        Text,
        nullable=False,
    )

    strength_analysis: Mapped[str] = mapped_column(
        Text,
        nullable=False,
    )

    skill_gap_analysis: Mapped[str] = mapped_column(
        Text,
        nullable=False,
    )

    learning_roadmap: Mapped[list[dict] | list[str]] = mapped_column(
        JSONB,
        nullable=False,
    )

    motivation: Mapped[str] = mapped_column(
        Text,
        nullable=False,
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda: datetime.now(UTC),
        nullable=False,
    )

    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda: datetime.now(UTC),
        onupdate=lambda: datetime.now(UTC),
        nullable=False,
    )

    resume: Mapped["Resume"] = relationship(
        back_populates="career_evaluation",
    )