from datetime import datetime

from pydantic import BaseModel
from pydantic import ConfigDict


class ChatRequest(BaseModel):
    """
    Incoming user message.
    """

    resume_id: int | None = None
    conversation_id: str
    message: str

class ChatResponse(BaseModel):
    """
    Response returned after the AI answers.
    """

    conversation_id: str

    response: str


class ChatMessageResponse(BaseModel):
    """
    One chat message stored in the database.
    """

    id: int

    resume_id: int | None

    conversation_id: str

    role: str

    message: str

    created_at: datetime

    model_config = ConfigDict(
        from_attributes=True,
    )


class ChatHistoryResponse(BaseModel):
    """
    Complete conversation history.
    """

    conversation_id: str

    messages: list[ChatMessageResponse]


class ConversationSummaryResponse(BaseModel):
    """
    Lightweight summary for a user conversation.
    """

    conversation_id: str

    title: str

    last_message: str

    updated_at: datetime