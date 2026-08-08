import { useState } from "react";

import {
    uploadResume,
    getUserResumes,
    getResumeById,
    deleteResume,
} from "../services/resumeService.js";


const useResume = () => {

    const [resumes, setResumes] = useState([]);

    const [resume, setResume] = useState(null);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState(null);


    /* =====================================================
       Upload Resume
    ===================================================== */

    const handleUploadResume = async (file) => {

        try {

            setLoading(true);
            setError(null);

            const data = await uploadResume(file);

            /*
             * If the backend returns the newly created
             * resume, keep it as the current resume.
             */

            setResume(data);

            return data;

        } catch (err) {

            const message =
                err?.response?.data?.detail ||
                "Failed to upload resume.";

            setError(message);

            throw err;

        } finally {

            setLoading(false);

        }

    };


    /* =====================================================
       Get All User Resumes
    ===================================================== */

    const fetchUserResumes = async () => {

        try {

            setLoading(true);
            setError(null);

            const data = await getUserResumes();

            setResumes(data);

            return data;

        } catch (err) {

            const message =
                err?.response?.data?.detail ||
                "Failed to fetch resumes.";

            setError(message);

            throw err;

        } finally {

            setLoading(false);

        }

    };


    /* =====================================================
       Get Resume By ID
    ===================================================== */

    const fetchResumeById = async (resumeId) => {

        try {

            setLoading(true);
            setError(null);

            const data = await getResumeById(resumeId);

            setResume(data);

            return data;

        } catch (err) {

            const message =
                err?.response?.data?.detail ||
                "Failed to fetch resume.";

            setError(message);

            throw err;

        } finally {

            setLoading(false);

        }

    };


    /* =====================================================
       Delete Resume
    ===================================================== */

    const removeResume = async (resumeId) => {

        try {

            setLoading(true);
            setError(null);

            const data = await deleteResume(resumeId);

            /*
             * Remove the deleted resume from local state.
             */

            setResumes((currentResumes) =>
                currentResumes.filter(
                    (item) => item.id !== resumeId
                )
            );

            /*
             * If the deleted resume is currently selected,
             * clear it.
             */

            setResume((currentResume) =>
                currentResume?.id === resumeId
                    ? null
                    : currentResume
            );

            return data;

        } catch (err) {

            const message =
                err?.response?.data?.detail ||
                "Failed to delete resume.";

            setError(message);

            throw err;

        } finally {

            setLoading(false);

        }

    };


    /* =====================================================
       Clear Error
    ===================================================== */

    const clearError = () => {

        setError(null);

    };


    return {

        resumes,

        resume,

        loading,

        error,

        uploadResume: handleUploadResume,

        fetchUserResumes,

        fetchResumeById,

        removeResume,

        clearError,

    };

};


export default useResume;