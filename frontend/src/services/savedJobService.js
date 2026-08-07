import api from "./api";

/* =====================================================
   Save Job
===================================================== */

export const saveJob = async (jobData) => {

    const response = await api.post(
        "/saved-jobs",
        jobData
    );

    return response.data;

};

/* =====================================================
   Get All Saved Jobs
===================================================== */

export const getSavedJobs = async () => {

    const response = await api.get(
        "/saved-jobs"
    );

    return response.data;

};

/* =====================================================
   Delete Saved Job
===================================================== */

export const deleteSavedJob = async (savedJobId) => {

    const response = await api.delete(
        `/saved-jobs/${savedJobId}`
    );

    return response.data;

};