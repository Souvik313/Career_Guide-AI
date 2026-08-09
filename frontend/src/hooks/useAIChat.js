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
    console.log("useAIChat: handleSendMessage called", {
      providedResumeId,
      message,
      conversationId,
      resumeId,
    });

    try {
      setLoading(true);
      setError(null);

      /*
       * =====================================================
       * Determine Resume Context
       * =====================================================
       *
       * Existing conversation:
       *   resumeId = authoritative resume context
       *
       * New conversation:
       *   providedResumeId = resume selected by the user
       */

      const activeResumeId = conversationId
        ? resumeId
        : providedResumeId;

      /*
       * =====================================================
       * Optimistically Add User Message
       * =====================================================
       */

      setMessages((currentMessages) => [
        ...currentMessages,
        {
          role: "user",
          content: message,
        },
      ]);

      /*
       * =====================================================
       * Send Message To Backend
       * =====================================================
       *
       * For a NEW conversation:
       *
       * conversation_id === null
       *
       * The backend must create the conversation ID.
       *
       * For an EXISTING conversation:
       *
       * conversation_id === existing conversation ID
       */

      const payload = {
        resume_id: activeResumeId ?? null,
        conversation_id: conversationId ?? null,
        message: message.trim(),
      };

      console.log(
        "useAIChat: about to call API",
        payload
      );

      const data = await sendMessage(payload);

      console.log(
        "useAIChat: API response",
        data
      );

      /*
       * =====================================================
       * Synchronize Conversation ID
       * =====================================================
       *
       * This is the critical part for a NEW conversation.
       *
       * Backend creates the conversation and returns
       * the generated conversation_id.
       */

      if (!data?.conversation_id) {
        throw new Error(
          "Backend did not return a conversation_id."
        );
      }

      setConversationId(data.conversation_id);

      /*
       * =====================================================
       * Synchronize Resume Context
       * =====================================================
       */

      if (activeResumeId) {
        setResumeId(activeResumeId);
      } else {
        setResumeId(null);
      }

      /*
       * =====================================================
       * Add Assistant Response
       * =====================================================
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

      console.error(
        "useAIChat: failed to send message",
        err
      );

      const errorMessage =
        err?.response?.data?.detail ||
        err?.message ||
        "Failed to send message.";

      setError(errorMessage);

      throw err;

    } finally {
      setLoading(false);
    }
  },
  [
    conversationId,
    resumeId,
  ],
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
