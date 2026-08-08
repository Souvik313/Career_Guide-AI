import { useState } from "react";

import {
    getRecommendations,
    deleteRecommendations,
} from "../services/recommendationService.js";


const useRecommendations = () => {

    const [recommendations, setRecommendations] = useState([]);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState(null);


    /* =====================================================
       Get Recommendations
    ===================================================== */

    const fetchRecommendations = async (resumeId) => {

        try {

            setLoading(true);
            setError(null);

            const data = await getRecommendations(resumeId);

            setRecommendations(data);

            return data;

        } catch (err) {

            const message =
                err?.response?.data?.detail ||
                "Failed to fetch job recommendations.";

            setError(message);

            throw err;

        } finally {

            setLoading(false);

        }

    };


    /* =====================================================
       Delete Recommendations
    ===================================================== */

    const removeRecommendations = async (resumeId) => {

        try {

            setLoading(true);
            setError(null);

            const data = await deleteRecommendations(resumeId);

            /*
             * The recommendations belonging to this
             * resume no longer exist.
             */

            setRecommendations([]);

            return data;

        } catch (err) {

            const message =
                err?.response?.data?.detail ||
                "Failed to delete recommendations.";

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

        recommendations,

        loading,

        error,

        fetchRecommendations,

        removeRecommendations,

        clearError,

    };

};


export default useRecommendations;