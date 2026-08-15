import api from './api.js'

export const getUserProfile = async() => {
    const response = await api.get("/users/me")
    return response.data;
}

export const updateUserProfile = async(userData) => {
    const response = await api.patch("/users/me" , userData);
    return response.data;
}

export const changePassword = async(passwordData) => {
    const response = await api.patch("/users/me/password" , passwordData);
    return response.data;
}