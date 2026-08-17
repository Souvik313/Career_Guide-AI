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
   Get All Conversations for the Current User
===================================================== */

export const getUserConversations = async () => {

    const response = await api.get(
        "/chat/conversations"
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

export const deleteConversation = async(conversationId) => {

    const response = await api.delete(
        `/chat/conversations/${conversationId}`
    );
    return response.data;
}

export const deleteAllConversations = async () => {
    await api.delete(
        "/chat/conversations"
    );
};