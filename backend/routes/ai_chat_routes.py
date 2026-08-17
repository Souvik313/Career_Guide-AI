from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException
from fastapi import status
from typing import Annotated
from datetime import datetime

from sqlalchemy.orm import Session

from backend.database.session import get_db
from backend.core.authorization import get_current_user

from backend.models.user import User

from backend.schemas.chat_message import (
    ChatHistoryResponse,
    ChatRequest,
    ChatResponse,
    ConversationSummaryResponse,
    DeletedConversation,
    DeletedAllConversationsOfUser,
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

        conversation_id, response = chat_service.process_chat(
            user_id=current_user.id,
            resume_id=request.resume_id,
            conversation_id=request.conversation_id,
            user_message=request.message,
        )

        return ChatResponse(
            conversation_id=conversation_id,
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

    resume_id = next(
        (
            message.resume_id
            for message in messages
            if message.resume_id is not None
        ),
        None,
    )

    return ChatHistoryResponse(
        conversation_id=conversation_id,
        resume_id=resume_id,
        messages=messages,
    )

# =====================================================
# Delete One Conversation of a user
# =====================================================
@router.delete(
    "/conversations/{conversation_id}",
    response_model=DeletedConversation,
)
def delete_conversation(
    conversation_id: str,
    current_user: Annotated[User, Depends(get_current_user)],
    db: Annotated[Session, Depends(get_db)], 
):
    chat_service = ChatMessageService(db)

    try:
        chat_service.delete_conversation(
            user_id=current_user.id,
            conversation_id=conversation_id,
        )

    except ValueError as exc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(exc),
        ) from exc

    return DeletedConversation(
        success=True,
        conversation_id=conversation_id,
        deleted_at=datetime.now(),
    )


# =====================================================
# Delete All Conversations of a user
# =====================================================
@router.delete(
    "/conversations",
    status_code=status.HTTP_204_NO_CONTENT,
    response_model=DeletedAllConversationsOfUser
)
def delete_all_user_conversations(
    current_user: Annotated[
        User,
        Depends(get_current_user),
    ],
    db: Annotated[
        Session,
        Depends(get_db),
    ],
):
    """
    Delete all conversations belonging to
    the currently authenticated user.
    """

    chat_service = ChatMessageService(db)

    chat_service.delete_all_user_conversations(
        user_id=current_user.id,
    )

    return DeletedAllConversationsOfUser(
        user_id=current_user.id,
        success=True,
    )