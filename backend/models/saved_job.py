from datetime import datetime, UTC

from sqlalchemy import DateTime
from sqlalchemy import ForeignKey
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import Text

from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column
from sqlalchemy.orm import relationship

from sqlalchemy.dialects.postgresql import JSONB

from backend.database.base import Base

class SavedJob(Base):
    __tablename__ = "saved_jobs"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        autoincrement=True,
    )

    user_id: Mapped[int] = mapped_column(
        ForeignKey("users.id"),
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

    saved_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda: datetime.now(UTC),
        nullable=False,
    )

    user: Mapped["User"] = relationship(
        back_populates="saved_jobs",
    )
    