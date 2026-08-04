from datetime import datetime

from pydantic import BaseModel
from pydantic import ConfigDict

class SavedJobCreate(BaseModel):
    job_title: str
    company_name: str
    exp_years: str | None
    primary_keyword: str | None
    english_level: str | None
    skills: list[str]

class SavedJobResponse(BaseModel):
    model_config = ConfigDict(
        from_attributes=True,
    )

    id: int
    user_id: int
    job_title: str
    company_name: str
    exp_years: str | None
    primary_keyword: str | None
    english_level: str | None
    skills: list[str]
    saved_at: datetime