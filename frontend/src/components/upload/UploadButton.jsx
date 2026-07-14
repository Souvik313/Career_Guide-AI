import { ArrowUpCircle } from "lucide-react";

function UploadButton({ selectedFile, onUpload }) {

    return (

        <div className="mt-8">

            <button
                onClick={onUpload}
                disabled={!selectedFile}
                className={`
                    w-full
                    rounded-xl
                    py-4
                    text-lg
                    font-semibold
                    transition-all
                    duration-300

                    ${
                        selectedFile
                            ? "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg"
                            : "cursor-not-allowed bg-slate-300 text-slate-500"
                    }
                `}
            >

                <div className="flex items-center justify-center gap-3">

                    <ArrowUpCircle size={24} />

                    Analyze Resume

                </div>

            </button>

        </div>

    );

}

export default UploadButton;