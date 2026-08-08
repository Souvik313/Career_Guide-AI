import { useState } from "react";

import {
    saveJob,
    getSavedJobs,
    deleteSavedJob,
} from "../services/savedJobService.js";


const useSavedJobs = () => {

    const [savedJobs, setSavedJobs] = useState([]);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState(null);


    /* =====================================================
       Get All Saved Jobs
    ===================================================== */

    const fetchSavedJobs = async () => {

        try {

            setLoading(true);
            setError(null);

            const data = await getSavedJobs();

            setSavedJobs(data);

            return data;

        } catch (err) {

            const message =
                err?.response?.data?.detail ||
                "Failed to fetch saved jobs.";

            setError(message);

            throw err;

        } finally {

            setLoading(false);

        }

    };


    /* =====================================================
       Save Job
    ===================================================== */

    const handleSaveJob = async (jobData) => {

        try {

            setLoading(true);
            setError(null);

            const data = await saveJob(jobData);

            /*
             * Add the newly saved job to local state.
             */

            setSavedJobs((currentJobs) => [
                ...currentJobs,
                data,
            ]);

            return data;

        } catch (err) {

            const message =
                err?.response?.data?.detail ||
                "Failed to save job.";

            setError(message);

            throw err;

        } finally {

            setLoading(false);

        }

    };


    /* =====================================================
       Delete Saved Job
    ===================================================== */

    const removeSavedJob = async (savedJobId) => {

        try {

            setLoading(true);
            setError(null);

            const data = await deleteSavedJob(savedJobId);

            /*
             * Remove the deleted job from local state.
             */

            setSavedJobs((currentJobs) =>
                currentJobs.filter(
                    (job) => job.id !== savedJobId
                )
            );

            return data;

        } catch (err) {

            const message =
                err?.response?.data?.detail ||
                "Failed to delete saved job.";

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

        savedJobs,

        loading,

        error,

        fetchSavedJobs,

        saveJob: handleSaveJob,

        removeSavedJob,

        clearError,

    };

};


export default useSavedJobs;
