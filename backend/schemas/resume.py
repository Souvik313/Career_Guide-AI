from datetime import datetime

from pydantic import BaseModel
from pydantic import ConfigDict


class ResumeSummaryResponse(BaseModel):

    model_config = ConfigDict(
        from_attributes=True
    )

    id: int
    candidate_name: str
    filename: str
    uploaded_at: datetime

class ResumeDetailResponse(BaseModel):

    model_config = ConfigDict(
        from_attributes=True
    )

    id: int
    candidate_name: str
    filename: str
    parsed_text: str
    uploaded_at: datetime