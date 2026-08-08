import { useState } from "react";

import {
    getCareerEvaluation,
    deleteCareerEvaluation,
} from "../services/careerEvaluationService.js";


const useCareerEvaluation = () => {

    const [evaluation, setEvaluation] = useState(null);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState(null);


    /* =====================================================
       Get Career Evaluation
    ===================================================== */

    const fetchCareerEvaluation = async (resumeId) => {

        try {

            setLoading(true);
            setError(null);

            const data = await getCareerEvaluation(resumeId);

            setEvaluation(data);

            return data;

        } catch (err) {

            const message =
                err?.response?.data?.detail ||
                "Failed to fetch career evaluation.";

            setError(message);

            throw err;

        } finally {

            setLoading(false);

        }

    };


    /* =====================================================
       Delete Career Evaluation
    ===================================================== */

    const removeCareerEvaluation = async (resumeId) => {

        try {

            setLoading(true);
            setError(null);

            const data = await deleteCareerEvaluation(resumeId);

            /*
             * The career evaluation has been deleted,
             * so clear the current evaluation from state.
             */

            setEvaluation(null);

            return data;

        } catch (err) {

            const message =
                err?.response?.data?.detail ||
                "Failed to delete career evaluation.";

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

        evaluation,

        loading,

        error,

        fetchCareerEvaluation,

        removeCareerEvaluation,

        clearError,

    };

};


export default useCareerEvaluation;

