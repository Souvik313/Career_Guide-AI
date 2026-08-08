import { useState } from "react";

import {
    sendMessage,
    getChatHistory,
} from "../services/aiChatService.js";


const useAIChat = () => {

    const [conversationId, setConversationId] = useState(null);

    const [messages, setMessages] = useState([]);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState(null);


    /* =====================================================
       Send Message
    ===================================================== */

    const handleSendMessage = async ({
        resumeId,
        message,
    }) => {

        try {

            setLoading(true);
            setError(null);

            /*
             * Add the user's message immediately to the UI.
             */

            setMessages((currentMessages) => [
                ...currentMessages,

                {
                    role: "user",
                    content: message,
                },
            ]);


            const data = await sendMessage({

                resume_id: resumeId,

                conversation_id: conversationId,

                message,

            });


            /*
             * The backend returns the conversation ID.
             *
             * This becomes especially important for the
             * first message when conversationId is null.
             */

            if (data.conversation_id) {

                setConversationId(
                    data.conversation_id
                );

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
                err?.response?.data?.detail ||
                "Failed to send message.";

            setError(message);

            /*
             * Re-throw so the component can optionally
             * perform its own handling.
             */

            throw err;

        } finally {

            setLoading(false);

        }

    };


    /* =====================================================
       Get Conversation History
    ===================================================== */

    const fetchChatHistory = async (conversationId) => {

        try {

            setLoading(true);
            setError(null);

            const data = await getChatHistory(
                conversationId
            );


            /*
             * Make sure the hook is synchronized with
             * the conversation being loaded.
             */

            setConversationId(
                data.conversation_id
            );


            setMessages(
                data.messages || []
            );


            return data;

        } catch (err) {

            const message =
                err?.response?.data?.detail ||
                "Failed to fetch chat history.";

            setError(message);

            throw err;

        } finally {

            setLoading(false);

        }

    };


    /* =====================================================
       Start New Conversation
    ===================================================== */

    const startNewConversation = () => {

        setConversationId(null);

        setMessages([]);

        setError(null);

    };


    /* =====================================================
       Clear Error
    ===================================================== */

    const clearError = () => {

        setError(null);

    };


    return {

        conversationId,

        messages,

        loading,

        error,

        sendMessage: handleSendMessage,

        fetchChatHistory,

        startNewConversation,

        clearError,

    };

};


export default useAIChat;