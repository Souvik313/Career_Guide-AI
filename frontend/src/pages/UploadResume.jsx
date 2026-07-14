import { useState  } from "react";
import { useNavigate } from "react-router-dom";
import UploadBox from '../components/upload/UploadBox';
import ResumePreview from "../components/upload/ResumePreview";
import UploadButton from "../components/upload/UploadButton";

function UploadResume() {

    const [selectedFile, setSelectedFile] = useState(null);
    const navigate = useNavigate();

    const handleAnalyze = () => {

        if (!selectedFile) return;

        navigate("/loading", {
            state: {
                file: selectedFile
            }
        });
    };

    return (

        <section className="min-h-screen bg-slate-50 py-20">

            <div className="mx-auto max-w-3xl px-6">

                <div className="text-center">

                    <h1 className="text-5xl font-bold text-slate-900">

                        Upload Your Resume

                    </h1>

                    <p className="mt-5 text-lg text-slate-600">

                        Upload your PDF resume and let CareerCompass AI
                        analyze your profile, match jobs, identify skill gaps,
                        and generate a personalized career report.

                    </p>

                </div>

                <div className="mt-12 rounded-3xl bg-white p-10 shadow-lg">

                    <UploadBox
                        setSelectedFile={setSelectedFile}
                    />

                    <ResumePreview
                        selectedFile={selectedFile}
                    />

                    <UploadButton
                        selectedFile={selectedFile}
                        onUpload={handleAnalyze}
                    />

                </div>

            </div>

        </section>

    );

}

export default UploadResume;