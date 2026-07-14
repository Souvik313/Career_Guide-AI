import { Loader2, CheckCircle2, Circle } from "lucide-react";
import { useEffect , useState } from "react";
import { useLocation  , useNavigate } from "react-router-dom";
import { uploadResume } from "../api/resumeApi";

const loadingSteps = [
    {
        text: "Resume uploaded",
        progress: 10
    },
    {
        text: "Extracting resume text",
        progress: 30
    },
    {
        text: "Matching relevant jobs",
        progress: 55
    },
    {
        text: "Skill gap analysis",
        progress: 80
    },
    {
        text: "Generating AI career report",
        progress: 95
    }
];

function LoadingPage() {

    const [progress, setProgress] = useState(0);
    const [currentStep, setCurrentStep] = useState(0);

    const location = useLocation()
    const file = location.state.file;
    const navigate = useNavigate();

    useEffect(() => {

        const analyzeResume = async () => {

            try {
                const result = await uploadResume(file);
                setProgress(100);
                setCurrentStep(loadingSteps.length);
                setTimeout(() => {

                    navigate("/dashboard", {
                        state: result
                    });
                }, 700);
            }
            catch(error){
                console.error(error);
            }
        };

        analyzeResume();
    }, [file]);

    useEffect(() => {

        if (currentStep >= loadingSteps.length)
            return;

        const timer = setTimeout(() => {

            setCurrentStep((prev) => prev + 1);

            setProgress(
                loadingSteps[currentStep].progress
            );

        }, 1500);

        return () => clearTimeout(timer);

    }, [currentStep]);

    return (

        <section className="min-h-screen bg-slate-50 flex items-center justify-center px-6">

            <div className="w-full max-w-2xl rounded-3xl bg-white p-10 shadow-xl">

                {/* Heading */}

                <div className="text-center">

                    <Loader2
                        className="mx-auto h-16 w-16 animate-spin text-blue-600"
                    />

                    <h1 className="mt-6 text-4xl font-bold text-slate-900">

                        Analyzing Your Resume

                    </h1>

                    <p className="mt-3 text-slate-600">

                        Our AI is processing your resume and preparing your
                        personalized career report.

                    </p>

                </div>

                {/* Progress Bar */}

                <div className="mt-10">

                    <div className="h-3 overflow-hidden rounded-full bg-slate-200">

                        <div
                            className="h-full rounded-full bg-blue-600 transition-all duration-300"
                            style={{
                                width: `${progress}%`
                            }}
                        />

                    </div>

                    <p className="mt-3 text-center font-medium text-slate-700">

                       {progress}% Complete

                    </p>

                </div>

                {/* Processing Steps */}

                <div className="mt-10 space-y-5">

                    {
                        loadingSteps.map((step, index) => (

                            <div
                                key={index}
                                className="flex items-center gap-3"
                            >

                                {
                                    index < currentStep ?

                                        <CheckCircle2 className="text-green-600"/>

                                    :

                                    index === currentStep ?

                                        <Loader2 className="animate-spin text-blue-600"/>

                                    :

                                        <Circle className="text-slate-400"/>

                                }

                                <span>

                                    {step.text}

                                </span>

                            </div>

                        ))
                    }

                </div>

                {/* Footer */}

                <div className="mt-10 text-center">

                    <p className="text-sm text-slate-500">

                        Please don't close this window.
                        This usually takes 10–20 seconds.

                    </p>

                </div>

            </div>

        </section>

    );

}

export default LoadingPage;