import api from "./api";

/* =====================================================
   Get Career Evaluation
===================================================== */

export const getCareerEvaluation = async (resumeId) => {

    const response = await api.get(
        `/career-evaluation/${resumeId}`
    );

    return response.data;

};

/* =====================================================
   Delete Career Evaluation
===================================================== */

export const deleteCareerEvaluation = async (resumeId) => {

    const response = await api.delete(
        `/career-evaluation/${resumeId}`
    );

    return response.data;

};