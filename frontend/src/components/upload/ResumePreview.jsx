import { FileText, CheckCircle } from "lucide-react";

function ResumePreview({ selectedFile }) {

    if (!selectedFile) return null;

    const fileSize = (selectedFile.size / 1024).toFixed(1);

    return (

        <div
            className="
                mt-8
                rounded-2xl
                border
                border-green-200
                bg-green-50
                p-6
            "
        >

            <div className="flex items-center gap-4">

                <div
                    className="
                        rounded-xl
                        bg-green-100
                        p-3
                    "
                >

                    <FileText
                        className="text-green-600"
                        size={28}
                    />

                </div>

                <div className="flex-1">

                    <h3
                        className="
                            text-lg
                            font-semibold
                            text-slate-900
                        "
                    >

                        {selectedFile.name}

                    </h3>

                    <p className="text-slate-600">

                        {fileSize} KB

                    </p>

                </div>

                <div
                    className="
                        flex
                        items-center
                        gap-2
                        text-green-600
                        font-medium
                    "
                >

                    <CheckCircle size={22} />

                    Ready

                </div>

            </div>

        </div>

    );

}

export default ResumePreview;