from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from backend.database.session import get_db
from backend.core.authorization import get_current_user

from backend.models.user import User

from backend.schemas.chat_message import (
    ChatHistoryResponse,
    ChatRequest,
    ChatResponse,
    ConversationSummaryResponse,
)

from backend.services.ai_chat_service import AIChatService
from backend.services.chat_message_service import ChatMessageService

router = APIRouter(
    prefix="/chat",
    tags=["Chat"],
)

@router.post(
    "",
    response_model=ChatResponse,
)
def chat(
    request: ChatRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """
    Send a message to CareerCompass AI.
    """

    chat_service = AIChatService(db)

    try:

        response = chat_service.process_chat(
            user_id=current_user.id,
            resume_id=request.resume_id,
            conversation_id=request.conversation_id,
            user_message=request.message,
        )

        return ChatResponse(
            conversation_id=request.conversation_id,
            response=response,
        )

    except ValueError as exc:

        raise HTTPException(
            status_code=404,
            detail=str(exc),
        )

    except Exception as exc:

        raise HTTPException(
            status_code=500,
            detail=str(exc),
        )

@router.get(
    "/conversations",
    response_model=list[ConversationSummaryResponse],
)
def get_user_conversations(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """
    Return a lightweight summary for every conversation owned by the user.
    """

    chat_service = ChatMessageService(db)

    return chat_service.get_user_conversation_summaries(
        user_id=current_user.id,
    )


@router.get(
    "/{conversation_id}",
    response_model=ChatHistoryResponse,
)
def get_chat_history(
    conversation_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """
    Return the complete conversation history.
    """

    chat_service = ChatMessageService(db)

    messages = chat_service.get_conversation_history(
        user_id=current_user.id,
        conversation_id=conversation_id,
    )

    return ChatHistoryResponse(
        conversation_id=conversation_id,
        messages=messages,
    )