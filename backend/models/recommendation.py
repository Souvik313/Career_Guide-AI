from datetime import UTC, datetime

from sqlalchemy import DateTime
from sqlalchemy import Float
from sqlalchemy import ForeignKey
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import Text

from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column
from sqlalchemy.orm import relationship

from sqlalchemy.dialects.postgresql import JSONB

from backend.database.base import Base

class Recommendation(Base):
    __tablename__ = "recommendations"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        autoincrement=True,
    )

    resume_id: Mapped[int] = mapped_column(
        ForeignKey("resumes.id"),
        nullable=False,
    )

    job_title: Mapped[str] = mapped_column(
        String(255),
        nullable=False,
    )

    company_name: Mapped[str] = mapped_column(
        String(255),
        nullable=False,
    )

    similarity_score: Mapped[float] = mapped_column(
        Float,
        nullable=False,
    )

    rank: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
    )

    role_category: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
    )

    exp_years: Mapped[str | None] = mapped_column(
        String(100),
        nullable=True,
    )

    primary_keyword: Mapped[str | None] = mapped_column(
        String(255),
        nullable=True,
    )

    english_level: Mapped[str | None] = mapped_column(
        String(100),
        nullable=True,
    )

    skills: Mapped[list[str]] = mapped_column(
        JSONB,
        nullable=False,
    )

    match_reason: Mapped[str] = mapped_column(
        Text,
        nullable=False,
    )

    missing_skills_summary: Mapped[str | None] = mapped_column(
        Text,
        nullable=True,
    )

    next_step: Mapped[str | None] = mapped_column(
        Text,
        nullable=True,
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda: datetime.now(UTC),
        nullable=False,
    )

    resume: Mapped["Resume"] = relationship(
        back_populates="recommendations",
    )