import api from "./api";

/* =====================================================
   Send Message to AI
===================================================== */

export const sendMessage = async (chatData) => {

    const response = await api.post(
        "/chat",
        chatData
    );

    return response.data;

};

/* =====================================================
   Get Conversation History
===================================================== */

export const getChatHistory = async (conversationId) => {

    const response = await api.get(
        `/chat/${conversationId}`
    );

    return response.data;

};