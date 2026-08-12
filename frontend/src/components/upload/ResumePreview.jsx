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
                border-emerald-500/30
                bg-emerald-500/10
                p-6
            "
        >

            <div className="flex items-center gap-4">

                <div
                    className="
                        rounded-xl
                        bg-emerald-500/15
                        p-3
                    "
                >

                    <FileText
                        className="text-emerald-600 dark:text-emerald-300"
                        size={28}
                    />

                </div>

                <div className="flex-1">

                    <h3
                        className="
                            text-lg
                            font-semibold
                            text-foreground
                        "
                    >

                        {selectedFile.name}

                    </h3>

                    <p className="text-muted-foreground">

                        {fileSize} KB

                    </p>

                </div>

                <div
                    className="
                        flex
                        items-center
                        gap-2
                        text-emerald-700
                        font-medium
                        dark:text-emerald-300
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