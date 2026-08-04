from datetime import datetime

from pydantic import BaseModel
from pydantic import ConfigDict


class CareerEvaluationResponse(BaseModel):

    id: int

    resume_id: int

    candidate_name: str

    match_score: float

    strengths: list[str]

    missing_skills: list[str]

    best_roles: list[dict]

    recommendations: list[str]

    career_summary: str

    career_path_explanation: str

    strength_analysis: str

    skill_gap_analysis: str

    learning_roadmap: list[str]

    motivation: str

    created_at: datetime

    updated_at: datetime

    model_config = ConfigDict(
        from_attributes=True,
    )