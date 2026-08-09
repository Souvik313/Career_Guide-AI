from datetime import datetime

from sqlalchemy import delete
from sqlalchemy import func
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

    def get_user_conversation_summaries(
        self,
        user_id: int,
    ) -> list[dict[str, str | datetime]]:
        """
        Return a lightweight summary for each conversation owned by the user.
        """

        statement = (
            select(
                ChatMessage.conversation_id.label("conversation_id"),
                func.max(ChatMessage.created_at).label("updated_at"),
            )
            .where(
                ChatMessage.user_id == user_id,
            )
            .group_by(
                ChatMessage.conversation_id,
            )
            .order_by(
                func.max(ChatMessage.created_at).desc(),
            )
        )

        rows = self.db.execute(statement).all()

        summaries = []

        for row in rows:
            conversation_id = row.conversation_id
            history = self.get_conversation_history(
                user_id=user_id,
                conversation_id=conversation_id,
            )

            if not history:
                continue

            latest_message = history[-1]

            first_user_message = None

            for message in history:

                if message.role == "user":
                    first_user_message = message.message
                    break

            title = self._generate_conversation_title(
                conversation_id=conversation_id,
                first_user_message=first_user_message,
            )

            summaries.append(
                {
                    "conversation_id": conversation_id,
                    "resume_id": latest_message.resume_id,
                    "title": title,
                    "last_message": latest_message.message,
                    "updated_at": latest_message.created_at,
                }
            )

        return summaries

    @staticmethod
    def _generate_conversation_title(
        *,
        conversation_id: str,
        first_user_message: str | None,
    ) -> str:
        """
        Create a readable title when the persistent table has no dedicated title column.
        """

        if first_user_message:
            words = " ".join(first_user_message.strip().split())

            if len(words) > 64:
                words = words[:61].rstrip() + "..."

            return words

        return f"Conversation {conversation_id}"

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