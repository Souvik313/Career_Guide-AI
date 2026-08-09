import { useState, useCallback } from "react";

import {
  sendMessage,
  getUserConversations,
  getChatHistory,
} from "../services/aiChatService.js";

const useAIChat = () => {
  /* =====================================================
       Conversation State
    ===================================================== */

  const [conversationId, setConversationId] = useState(null);

  const [resumeId, setResumeId] = useState(null);

  const [messages, setMessages] = useState([]);

  const [conversations, setConversations] = useState([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(null);

  /* =====================================================
       Send Message
    ===================================================== */

  const handleSendMessage = useCallback(
    async ({ resumeId: providedResumeId, message }) => {
      try {
        setLoading(true);
        setError(null);

        const activeResumeId = resumeId ?? providedResumeId;

        setMessages((currentMessages) => [
          ...currentMessages,

          {
            role: "user",
            content: message,
          },
        ]);

        /*
         * Send message to backend.
         */

        const data = await sendMessage({
          resume_id: activeResumeId,

          conversation_id: conversationId,

          message,
        });

        /*
         * Synchronize conversation ID.
         *
         * This is especially important when starting
         * a completely new conversation.
         */

        if (data.conversation_id) {
          setConversationId(data.conversation_id);
        }

        /*
         * Keep the resume ID synchronized.
         *
         * If this was a new conversation and a resume
         * was provided, remember it for subsequent
         * messages.
         */

        if (activeResumeId) {
          setResumeId(activeResumeId);
        }

        /*
         * Add AI response to the conversation.
         */

        setMessages((currentMessages) => [
          ...currentMessages,

          {
            role: "assistant",
            content: data.response,
          },
        ]);

        return data;
      } catch (err) {
        const message =
          err?.response?.data?.detail || "Failed to send message.";

        setError(message);

        /*
         * Re-throw so the component can optionally
         * handle the error.
         */

        throw err;
      } finally {
        setLoading(false);
      }
    },
    [conversationId, resumeId],
  );

  /* =====================================================
       Get Conversation Summaries
    ===================================================== */

  const fetchConversations = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getUserConversations();

      setConversations(data || []);

      return data;
    } catch (err) {
      const message =
        err?.response?.data?.detail || "Failed to fetch conversations.";

      setError(message);

      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /* =====================================================
       Get Conversation History
    ===================================================== */

  const fetchChatHistory = useCallback(async (selectedConversationId) => {
    try {
      setLoading(true);
      setError(null);

      const data = await getChatHistory(selectedConversationId);

      /*
       * Synchronize conversation ID.
       */

      setConversationId(data.conversation_id);

      /*
       * Synchronize the resume associated
       * with this conversation.
       */

      setResumeId(data.resume_id ?? null);

      /*
       * Load previous messages.
       */

      setMessages(data.messages || []);

      return data;
    } catch (err) {
      const message =
        err?.response?.data?.detail || "Failed to fetch chat history.";

      setError(message);

      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /* =====================================================
       Start New Conversation
    ===================================================== */

  const startNewConversation = useCallback(() => {
    setConversationId(null);

    setResumeId(null);

    setMessages([]);

    setError(null);
  }, []);

  /* =====================================================
       Clear Error
    ===================================================== */

  const clearError = () => {
    setError(null);
  };

  /* =====================================================
       Return Hook API
    ===================================================== */

  return {
    conversationId,

    resumeId,

    messages,

    conversations,

    loading,

    error,

    sendMessage: handleSendMessage,

    fetchConversations,

    fetchChatHistory,

    startNewConversation,

    clearError,
  };
};

export default useAIChat;
