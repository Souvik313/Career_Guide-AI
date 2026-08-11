import api from "./api";

/* =====================================================
   Upload Resume
===================================================== */

export const uploadResume = async (file) => {

    const formData = new FormData();

    formData.append("file", file);

    const response = await api.post(

        "/upload-resume",

        formData,

        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }

    );

    return response.data;

};

/* =====================================================
   Get All User Resumes
===================================================== */

export const getUserResumes = async () => {

    const response = await api.get(
        "/resumes"
    );

    return response.data;

};

/* =====================================================
   Get Single Resume
===================================================== */

export const getResumeById = async (resumeId) => {

    const response = await api.get(
        `/resumes/${resumeId}`
    );

    return response.data;

};

/* =====================================================
   Delete Resume
===================================================== */

export const deleteResume = async (resumeId) => {

    const response = await api.delete(
        `/resumes/${resumeId}`
    );

    return response.data;

};

export const getResumeFile = async (resumeId) => {
    const response = await api.get(
        `/resumes/${resumeId}/file`
    );

    return response.data;
};