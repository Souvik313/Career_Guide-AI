import { useEffect } from "react";
import {
FileText,
Trash2,
Eye,
CalendarDays,
Sparkles,
} from "lucide-react";

import ProfileHeader from "../../components/profile/ProfileHeader.jsx";
import ProfileSectionCard from "../../components/profile/ProfileSectionCard.jsx";
import ProfileLoading from "../../components/profile/ProfileLoading.jsx";
import ProfileEmptyState from "../../components/profile/ProfileEmptyState.jsx";

import { Button } from "../../components/ui/button.jsx";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "../../components/ui/dialog.jsx";

import useResume from "../../hooks/useResume.js";
import {getResumeFile} from "../../services/resumeService.js";

function ProfileResumes() {

const {
    resumes,
    fetchUserResumes,
    loading,
    error,
    removeResume,
} = useResume();

const [selectedResume, setSelectedResume] = useState(null);

const [resumePreviewUrl, setResumePreviewUrl] = useState(null);

const [previewLoading, setPreviewLoading] = useState(false);

const [previewError, setPreviewError] = useState(null);

useEffect(() => {

        const loadResumes = async () => {

            try {

                await fetchUserResumes();

            } catch (err) {

                console.error(
                    "Failed to load resumes:",
                    err
                );

            }

        };

        loadResumes();

    }, []);


/* =====================================================
   Helpers
===================================================== */

const formatDate = (dateValue) => {

    if (!dateValue) {
        return "Date unavailable";
    }

    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) {
        return "Date unavailable";
    }

    return date.toLocaleDateString(
        "en-IN",
        {
            day: "numeric",
            month: "short",
            year: "numeric",
        }
    );

};


/* =====================================================
   Delete Resume
===================================================== */

const handleDelete = async (resumeId) => {

    const confirmed = window.confirm(
        "Are you sure you want to delete this resume?"
    );

    if (!confirmed) {
        return;
    }

    try {

        await removeResume(resumeId);

    } catch (err) {

        console.error(
            "Failed to delete resume:",
            err
        );

    }

};

// View Resume Preview

const handleViewResume = async (resume) => {
    try {
        setPreviewLoading(true);
        setPreviewError(null);

        const blob = await getResumeFile(resume.id);

        const url = URL.createObjectURL(blob);

        setSelectedResume(resume);
        setResumePreviewUrl(url);

    } catch (err) {
        console.error("Failed to load resume:", err);

        setPreviewError(
            err?.response?.data?.detail ||
            "Failed to load resume."
        );

    } finally {
        setPreviewLoading(false);
    }
};


/* =====================================================
   Render
===================================================== */

return (

    <div className="space-y-8">

        {/* =================================================
            Page Header
        ================================================= */}

        <ProfileHeader
            title="Your Resumes"
            description="
                View and manage the resumes you've uploaded
                to CareerCompass AI.
            "
            icon={FileText}
        />


        {/* =================================================
            Error
        ================================================= */}

        {error && !loading && (

            <div
                className="
                    rounded-2xl
                    border
                    border-red-200
                    bg-red-50
                    px-5
                    py-4
                    text-sm
                    text-red-600
                "
            >
                {error}
            </div>

        )}


        {/* =================================================
            Loading
        ================================================= */}

        {loading && (

            <ProfileLoading
                type="cards"
                count={3}
            />

        )}


        {/* =================================================
            Empty State
        ================================================= */}

        {!loading && !error && resumes?.length === 0 && (

            <ProfileEmptyState
                icon={FileText}
                title="No resumes yet"
                description="
                    Upload your first resume to start building
                    your personalized CareerCompass AI profile.
                "
                actionLabel="Upload Resume"
                onAction={() => {
                    window.location.href = "/dashboard";
                }}
                variant="violet"
            />

        )}


        {/* =================================================
            Resume List
        ================================================= */}

        {!loading &&
            !error &&
            resumes?.length > 0 && (

                <ProfileSectionCard
                    title="Uploaded Resumes"
                    description="
                        Resumes currently stored in your
                        CareerCompass AI account.
                    "
                    icon={FileText}
                    variant="violet"
                >

                    <div className="space-y-4">

                        {resumes.map((resume) => (

                            <div
                                key={resume.id}
                                className="
                                    group
                                    rounded-2xl
                                    border
                                    border-zinc-200
                                    bg-white
                                    p-5
                                    transition-all
                                    duration-200
                                    hover:-translate-y-0.5
                                    hover:border-violet-200
                                    hover:shadow-md
                                    hover:shadow-violet-100/50
                                "
                            >

                                <div
                                    className="
                                        flex
                                        flex-col
                                        gap-5
                                        lg:flex-row
                                        lg:items-center
                                        lg:justify-between
                                    "
                                >

                                    {/* Resume information */}

                                    <div
                                        className="
                                            flex
                                            min-w-0
                                            items-start
                                            gap-4
                                        "
                                    >

                                        {/* Icon */}

                                        <div
                                            className="
                                                flex
                                                h-12
                                                w-12
                                                shrink-0
                                                items-center
                                                justify-center
                                                rounded-xl
                                                bg-gradient-to-br
                                                from-violet-500
                                                via-fuchsia-500
                                                to-orange-400
                                                text-white
                                                shadow-sm
                                            "
                                        >

                                            <FileText
                                                className="
                                                    h-5
                                                    w-5
                                                "
                                            />

                                        </div>


                                        {/* Details */}

                                        <div
                                            className="
                                                min-w-0
                                            "
                                        >

                                            <h3
                                                className="
                                                    truncate
                                                    text-base
                                                    font-bold
                                                    text-zinc-900
                                                "
                                            >
                                                {resume.filename ||
                                                    "Untitled Resume"}
                                            </h3>


                                            <div
                                                className="
                                                    mt-2
                                                    flex
                                                    flex-wrap
                                                    items-center
                                                    gap-x-4
                                                    gap-y-2
                                                    text-xs
                                                    text-zinc-400
                                                "
                                            >

                                                <span
                                                    className="
                                                        inline-flex
                                                        items-center
                                                        gap-1.5
                                                    "
                                                >

                                                    <CalendarDays
                                                        className="
                                                            h-3.5
                                                            w-3.5
                                                        "
                                                    />

                                                    {formatDate(
                                                        resume.created_at
                                                    )}

                                                </span>


                                                {resume.id && (

                                                    <span>
                                                        Resume #{resume.id}
                                                    </span>

                                                )}

                                            </div>

                                        </div>

                                    </div>


                                    {/* Actions */}

                                    <div
                                        className="
                                            flex
                                            items-center
                                            gap-2
                                        "
                                    >

                                        <Button
                                            type="button"
                                            variant="outline"
                                            className="
                                                rounded-xl
                                                border-zinc-200
                                                text-zinc-600
                                                hover:border-violet-200
                                                hover:bg-violet-50
                                                hover:text-violet-600
                                            "
                                            onClick={() => handleViewResume(resume)}
                                        >
                                            <Eye
                                                className="
                                                    mr-2
                                                    h-4
                                                    w-4
                                                "
                                            />

                                            View
                                        </Button>

                                        <Button
                                            type="button"
                                            variant="outline"
                                            className="
                                                rounded-xl
                                                border-red-100
                                                text-red-500
                                                hover:border-red-200
                                                hover:bg-red-50
                                                hover:text-red-600
                                            "
                                            onClick={() =>
                                                handleDelete(
                                                    resume.id
                                                )
                                            }
                                        >

                                            <Trash2
                                                className="
                                                    h-4
                                                    w-4
                                                "
                                            />

                                        </Button>

                                    </div>

                                </div>


                                {/* Optional analysis status */}

                                {resume.status && (

                                    <div
                                        className="
                                            mt-4
                                            flex
                                            items-center
                                            gap-2
                                            border-t
                                            border-zinc-100
                                            pt-4
                                            text-xs
                                            text-zinc-500
                                        "
                                    >

                                        <Sparkles
                                            className="
                                                h-3.5
                                                w-3.5
                                                text-fuchsia-500
                                            "
                                        />

                                        Analysis status:

                                        <span
                                            className="
                                                font-semibold
                                                text-zinc-700
                                            "
                                        >
                                            {resume.status}
                                        </span>

                                    </div>

                                )}

                            </div>

                        ))}

                    </div>

                </ProfileSectionCard>

            )}

            <Dialog
            open={!!selectedResume}
            onOpenChange={(open) => {
                if (!open) {
                    handleClosePreview();
                }
            }}
        >

            <DialogContent
                className="
                    flex
                    h-[90vh]
                    max-w-5xl
                    flex-col
                    overflow-hidden
                    p-0
                "
            >

                <DialogHeader
                    className="
                        shrink-0
                        border-b
                        border-zinc-200
                        px-6
                        py-4
                    "
                >

                    <DialogTitle>
                        {selectedResume?.filename ||
                            "Resume Preview"}
                    </DialogTitle>

                </DialogHeader>


                {/* PDF Viewer */}

                <div
                    className="
                        min-h-0
                        flex-1
                        bg-zinc-100
                    "
                >

                    {previewLoading && (
                        <div
                            className="
                                flex
                                h-full
                                items-center
                                justify-center
                                text-sm
                                text-zinc-500
                            "
                        >
                            Loading resume...
                        </div>
                    )}


                    {previewError && !previewLoading && (
                        <div
                            className="
                                flex
                                h-full
                                items-center
                                justify-center
                                px-6
                                text-center
                                text-sm
                                text-red-500
                            "
                        >
                            {previewError}
                        </div>
                    )}


                    {resumePreviewUrl &&
                        !previewLoading &&
                        !previewError && (

                        <iframe
                            src={resumePreviewUrl}
                            title="Resume Preview"
                            className="
                                h-full
                                w-full
                                border-0
                            "
                        />

                    )}

                </div>

            </DialogContent>

        </Dialog>

    </div>

);

}

export default ProfileResumes;
