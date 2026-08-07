import api from "./api";

/* =====================================================
   Get Job Recommendations
===================================================== */

export const getRecommendations = async (resumeId) => {

    const response = await api.get(
        `/recommendations/${resumeId}`
    );

    return response.data;

};

/* =====================================================
   Delete Job Recommendations
===================================================== */

export const deleteRecommendations = async (resumeId) => {

    const response = await api.delete(
        `/recommendations/${resumeId}`
    );

    return response.data;

};