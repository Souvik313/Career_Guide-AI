import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
    Loader2,
    CheckCircle2,
    Circle,
} from "lucide-react";

import { uploadResume } from "../services/resumeService.js";
import toast from "react-hot-toast";


const loadingSteps = [
    {
        text: "Resume uploaded",
        progress: 10,
    },
    {
        text: "Extracting resume text",
        progress: 30,
    },
    {
        text: "Matching relevant jobs",
        progress: 55,
    },
    {
        text: "Skill gap analysis",
        progress: 80,
    },
    {
        text: "Generating AI career report",
        progress: 95,
    },
];


function LoadingPage() {

    const [progress, setProgress] = useState(0);

    const [currentStep, setCurrentStep] = useState(0);

    const [error, setError] = useState(null);

    const [isDuplicate, setIsDuplicate] = useState(false);

    const location = useLocation();

    const file = location.state?.file;

    const navigate = useNavigate();


    /* =====================================================
       Upload + Analyze Resume
    ===================================================== */

    useEffect(() => {

        if (!file) {
            return;
        }


        const analyzeResume = async () => {

            try {

                const result = await uploadResume(file);


                /* =================================================
                   Duplicate Resume
                ================================================= */

                if (result.is_duplicate) {

                    setIsDuplicate(true);

                    setProgress(100);

                    setCurrentStep(loadingSteps.length);

                    toast.success(
                        "This resume was already analyzed. Showing your existing results."
                    );

                }


                /* =================================================
                   New Resume
                ================================================= */

                else {

                    setProgress(100);

                    setCurrentStep(loadingSteps.length);

                    toast.success(
                        "Resume analyzed successfully!"
                    );

                }

                setTimeout(() => {

                    navigate("/dashboard", {
                        state: result,
                    });

                }, 700);

            }

            catch (error) {

                console.error(
                    "Resume analysis failed:",
                    error
                );

                setError(error);

            }

        };


        analyzeResume();

    }, [file, navigate]);


    /* =====================================================
       Simulated Progress
    ===================================================== */

    useEffect(() => {

        if (
            error ||
            !file ||
            isDuplicate ||
            currentStep >= loadingSteps.length
        ) {
            return;
        }


        const timer = setTimeout(() => {

            setCurrentStep((prev) => prev + 1);

            setProgress(
                loadingSteps[currentStep].progress
            );

        }, 1500);


        return () => clearTimeout(timer);

    }, [
        currentStep,
        error,
        file,
        isDuplicate,
    ]);


    return (

        <section className="min-h-screen bg-background flex items-center justify-center px-6">

            <div className="w-full max-w-2xl rounded-3xl border border-border bg-card p-10 shadow-xl">


                {/* Heading */}

                <div className="text-center">

                    <Loader2
                        className="mx-auto h-16 w-16 animate-spin text-primary"
                    />

                    <h1 className="mt-6 text-4xl font-bold text-foreground">

                        {isDuplicate
                            ? "Resume Already Analyzed"
                            : "Analyzing Your Resume"
                        }

                    </h1>


                    <p className="mt-3 text-muted-foreground">

                        {isDuplicate
                            ? "We found an existing analysis for this resume. Loading your saved results."
                            : "Our AI is processing your resume and preparing your personalized career report."
                        }

                    </p>

                </div>


                {/* Progress Bar */}

                <div className="mt-10">

                    <div className="h-3 overflow-hidden rounded-full bg-muted">

                        <div
                            className="h-full rounded-full bg-primary transition-all duration-300"
                            style={{
                                width: `${progress}%`,
                            }}
                        />

                    </div>


                    <p className="mt-3 text-center font-medium text-foreground">

                        {progress}% Complete

                    </p>

                </div>


                {/* Processing Steps */}

                <div className="mt-10 space-y-5">

                    {loadingSteps.map((step, index) => (

                        <div
                            key={index}
                            className="flex items-center gap-3"
                        >

                            {index < currentStep ? (

                                <CheckCircle2
                                    className="text-green-600"
                                />

                            ) : index === currentStep ? (

                                <Loader2
                                    className="animate-spin text-primary"
                                />

                            ) : (

                                <Circle
                                    className="text-muted-foreground"
                                />

                            )}


                            <span>

                                {isDuplicate
                                    ? index === 0
                                        ? "Existing resume found"
                                        : index === 1
                                            ? "Loading existing analysis"
                                            : index === 2
                                                ? "Loading saved job recommendations"
                                                : index === 3
                                                    ? "Loading existing skill analysis"
                                                    : "Loading career report"
                                    : step.text
                                }

                            </span>

                        </div>

                    ))}

                </div>


                {/* Error */}

                {(error || !file) && (

                    <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">

                        We couldn't finish the resume analysis.
                        Please try again after a short wait.

                    </div>

                )}


                {/* Footer */}

                <div className="mt-10 text-center">

                    <p className="text-sm text-muted-foreground">

                        Please don't close this window.
                        This usually takes 10–20 seconds.

                    </p>

                </div>

            </div>

        </section>

    );

}


export default LoadingPage;