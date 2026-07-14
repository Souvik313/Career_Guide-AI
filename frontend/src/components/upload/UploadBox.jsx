import { Upload } from "lucide-react";

function UploadBox({setSelectedFile}) {

    const handleFileChange = (event) => {

        const file = event.target.files[0];

        if (!file) return;

        if (file.type !== "application/pdf") {

            alert("Please upload a PDF resume.");

            return;
        }

        setSelectedFile(file);

    };

    return (

        <div
            className="
                rounded-2xl
                border-2
                border-dashed
                border-blue-300
                bg-blue-50
                p-12
                text-center
            "
        >

            <div className="flex justify-center">

                <div
                    className="
                        rounded-full
                        bg-blue-100
                        p-4
                    "
                >

                    <Upload
                        size={36}
                        className="text-blue-600"
                    />

                </div>

            </div>

            <h2
                className="
                    mt-6
                    text-2xl
                    font-bold
                    text-slate-900
                "
            >

                Upload Resume

            </h2>

            <p
                className="
                    mt-3
                    text-slate-600
                "
            >

                Select your resume in PDF format.

            </p>

            <label
                className="
                    mt-8
                    inline-block
                    cursor-pointer
                    rounded-xl
                    bg-blue-600
                    px-8
                    py-4
                    font-semibold
                    text-white
                    transition
                    hover:bg-blue-700
                "
            >

                Choose PDF

                <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="hidden"
                />

            </label>

        </div>

    );

}

export default UploadBox;