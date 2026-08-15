import api from './api.js'

const getUserProfile = async() => {
    const response = await api.get("/users/me")
    return response.data;
}

const updateUserProfile = async(userData) => {
    const response = await api.patch("/users/me" , userData);
    return response.data;
}

const changePassword = async(passwordData) => {
    const response = await api.patch("/users/me/password" , passwordData);
    return response.data;
}

export default {
    getUserProfile,
    updateUserProfile,
    changePassword,
}