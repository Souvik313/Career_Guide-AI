from datetime import datetime

from pydantic import BaseModel
from pydantic import ConfigDict


class RecommendationResponse(BaseModel):

    model_config = ConfigDict(
        from_attributes=True,
    )

    id: int

    resume_id: int

    job_title: str

    company_name: str

    similarity_score: float

    rank: int

    role_category: str

    exp_years: str | None

    primary_keyword: str | None

    english_level: str | None

    skills: list[str]

    match_reason: str

    missing_skills_summary: str | None

    next_step: str | None

    created_at: datetime