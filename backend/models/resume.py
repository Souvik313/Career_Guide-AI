from datetime import datetime, UTC

from sqlalchemy import DateTime
from sqlalchemy import ForeignKey
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import Text
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column
from sqlalchemy.orm import relationship

from backend.database.base import Base

class Resume(Base):
    __tablename__ = "resumes"

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
    file_path: Mapped[str] = mapped_column(
        String(500),
        nullable=False,
    )
    parsed_text: Mapped[str] = mapped_column(
        Text,
        nullable=False
    )
    embedding_path: Mapped[str | None] = mapped_column(
        String(500),
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