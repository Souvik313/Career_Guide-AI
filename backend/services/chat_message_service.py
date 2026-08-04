from sqlalchemy import delete
from sqlalchemy import select
from sqlalchemy.orm import Session

from backend.models.chat_message import ChatMessage


class ChatMessageService:
    """
    Handles all database operations related to chat messages.
    """

    def __init__(self, db: Session):
        self.db = db

    def create_message(
        self,
        user_id: int,
        resume_id: int | None,
        conversation_id: str,
        role: str,
        message: str,
    ) -> ChatMessage:
        """
        Create and persist one chat message.
        """

        try:
            chat_message = ChatMessage(
                user_id=user_id,
                resume_id=resume_id,
                conversation_id=conversation_id,
                role=role,
                message=message,
            )

            self.db.add(chat_message)

            self.db.commit()

            self.db.refresh(chat_message)

            return chat_message

        except Exception:
            self.db.rollback()
            raise

    def get_conversation_history(
        self,
        user_id: int,
        conversation_id: str,
    ) -> list[ChatMessage]:
        """
        Return the complete conversation history ordered by time.
        """

        statement = (
            select(ChatMessage)
            .where(
                ChatMessage.user_id == user_id,
                ChatMessage.conversation_id == conversation_id,
            )
            .order_by(
                ChatMessage.created_at.asc(),
            )
        )

        return list(
            self.db.scalars(statement).all()
        )

    def delete_conversation(
        self,
        user_id: int,
        conversation_id: str,
    ) -> None:
        """
        Delete one conversation.
        """

        try:
            statement = (
                delete(ChatMessage)
                .where(
                    ChatMessage.user_id == user_id,
                    ChatMessage.conversation_id == conversation_id,
                )
            )

            self.db.execute(statement)

            self.db.commit()

        except Exception:
            self.db.rollback()
            raise

    def delete_all_user_conversations(
        self,
        user_id: int,
    ) -> None:
        """
        Delete all conversations belonging to a user.
        """

        try:
            statement = (
                delete(ChatMessage)
                .where(
                    ChatMessage.user_id == user_id,
                )
            )

            self.db.execute(statement)

            self.db.commit()

        except Exception:
            self.db.rollback()
            raise