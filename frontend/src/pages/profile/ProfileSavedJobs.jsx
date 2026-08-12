import { useEffect } from "react";

import {
Bookmark,
Building2,
BriefcaseBusiness,
Trash2,
CalendarDays,
Code2,
Languages,
Sparkles,
} from "lucide-react";

import ProfileHeader from "../../components/profile/ProfileHeader.jsx";
import ProfileSectionCard from "../../components/profile/ProfileSectionCard.jsx";
import ProfileLoading from "../../components/profile/ProfileLoading.jsx";
import ProfileEmptyState from "../../components/profile/ProfileEmptyState.jsx";

import { Button } from "../../components/ui/button.jsx";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import toast from "react-hot-toast";

import useSavedJobs from "../../hooks/useSavedJobs.js";

function ProfileSavedJobs() {

const {
    savedJobs,
    loading,
    error,
    fetchSavedJobs,
    removeSavedJob,
} = useSavedJobs();


/* =====================================================
   Fetch Saved Jobs
===================================================== */

useEffect(() => {

    const loadSavedJobs = async () => {

        try {

            await fetchSavedJobs();

        } catch (err) {

            console.error(
                "Failed to load saved jobs:",
                err
            );

        }

    };

    loadSavedJobs();

}, []);


/* =====================================================
   Helpers
===================================================== */

const formatDate = (dateValue) => {

    if (!dateValue) {
        return null;
    }

    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) {
        return null;
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
   Delete Saved Job
===================================================== */

const handleDelete = async (savedJobId) => {
    try {
        await removeSavedJob(savedJobId);

        toast.success("Saved job removed successfully.");
    } catch (err) {
        console.error(
            "Failed to delete saved job:",
            err
        );

        toast.error(
            err?.response?.data?.detail ||
            "Failed to remove saved job."
        );
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
            title="Saved Jobs"
            description="
                Keep track of interesting opportunities
                you've saved while exploring your career options.
            "
            icon={Bookmark}
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

        {!loading &&
            !error &&
            savedJobs?.length === 0 && (

                <ProfileEmptyState
                    icon={Bookmark}
                    title="No saved jobs yet"
                    description="
                        Save interesting opportunities from your
                        job recommendations and they'll appear here.
                    "
                    actionLabel="Explore Recommendations"
                    onAction={() => {
                        window.location.href =
                            "/dashboard";
                    }}
                    variant="orange"
                />

            )}


        {/* =================================================
            Saved Jobs
        ================================================= */}

        {!loading &&
            !error &&
            savedJobs?.length > 0 && (

                <ProfileSectionCard
                    title="Your Saved Opportunities"
                    description={`
                        ${savedJobs.length}
                        ${
                            savedJobs.length === 1
                                ? " opportunity"
                                : " opportunities"
                        }
                        saved to your career collection.
                    `}
                    icon={Bookmark}
                    variant="orange"
                >

                    <div className="space-y-4">

                        {savedJobs.map((job) => (

                            <div
                                key={job.id}
                                className="
                                    group
                                    rounded-2xl
                                    border
                                    border-border
                                    bg-card
                                    p-5
                                    transition-all
                                    duration-200
                                    hover:-translate-y-0.5
                                    hover:border-orange-500/30
                                    hover:shadow-md
                                    hover:shadow-orange-500/10
                                "
                            >

                                {/* =================================================
                                    Main Job Information
                                ================================================= */}

                                <div
                                    className="
                                        flex
                                        flex-col
                                        gap-5
                                        lg:flex-row
                                        lg:items-start
                                        lg:justify-between
                                    "
                                >

                                    {/* Job Details */}

                                    <div
                                        className="
                                            min-w-0
                                            flex-1
                                        "
                                    >

                                        {/* Title */}

                                        <div
                                            className="
                                                flex
                                                items-start
                                                gap-3
                                            "
                                        >

                                            <div
                                                className="
                                                    flex
                                                    h-11
                                                    w-11
                                                    shrink-0
                                                    items-center
                                                    justify-center
                                                    rounded-xl
                                                    bg-gradient-to-br
                                                    from-orange-400
                                                    via-amber-400
                                                    to-yellow-300
                                                    text-white
                                                    shadow-sm
                                                "
                                            >

                                                <BriefcaseBusiness
                                                    className="
                                                        h-5
                                                        w-5
                                                    "
                                                />

                                            </div>


                                            <div className="min-w-0">

                                                <h3
                                                    className="
                                                        text-lg
                                                        font-bold
                                                        tracking-tight
                                                        text-foreground
                                                    "
                                                >
                                                    {job.job_title ||
                                                        "Untitled Position"}
                                                </h3>


                                                {job.company_name && (

                                                    <div
                                                        className="
                                                            mt-1.5
                                                            flex
                                                            items-center
                                                            gap-1.5
                                                            text-sm
                                                            font-medium
                                                            text-muted-foreground
                                                        "
                                                    >

                                                        <Building2
                                                            className="
                                                                h-4
                                                                w-4
                                                            "
                                                        />

                                                        {job.company_name}

                                                    </div>

                                                )}

                                            </div>

                                        </div>


                                        {/* =================================================
                                            Job Metadata
                                        ================================================= */}

                                        <div
                                            className="
                                                mt-5
                                                flex
                                                flex-wrap
                                                gap-2
                                            "
                                        >

                                            {job.exp_years !== null &&
                                                job.exp_years !== undefined && (

                                                    <span
                                                        className="
                                                            inline-flex
                                                            items-center
                                                            gap-1.5
                                                            rounded-full
                                                            bg-violet-50
                                                            px-3
                                                            py-1.5
                                                            text-xs
                                                            font-semibold
                                                            text-violet-600
                                                        "
                                                    >

                                                        <BriefcaseBusiness
                                                            className="
                                                                h-3.5
                                                                w-3.5
                                                            "
                                                        />

                                                        {job.exp_years}
                                                        {" "}
                                                        {Number(job.exp_years) === 1
                                                            ? "year"
                                                            : "years"}

                                                    </span>

                                                )}


                                            {job.primary_keyword && (

                                                <span
                                                    className="
                                                        inline-flex
                                                        items-center
                                                        gap-1.5
                                                        rounded-full
                                                        bg-fuchsia-50
                                                        px-3
                                                        py-1.5
                                                        text-xs
                                                        font-semibold
                                                        text-fuchsia-600
                                                    "
                                                >

                                                    <Code2
                                                        className="
                                                            h-3.5
                                                            w-3.5
                                                        "
                                                    />

                                                    {job.primary_keyword}

                                                </span>

                                            )}


                                            {job.english_level && (

                                                <span
                                                    className="
                                                        inline-flex
                                                        items-center
                                                        gap-1.5
                                                        rounded-full
                                                        bg-teal-50
                                                        px-3
                                                        py-1.5
                                                        text-xs
                                                        font-semibold
                                                        text-teal-600
                                                    "
                                                >

                                                    <Languages
                                                        className="
                                                            h-3.5
                                                            w-3.5
                                                        "
                                                    />

                                                    {job.english_level}

                                                </span>

                                            )}

                                        </div>


                                        {/* =================================================
                                            Skills
                                        ================================================= */}

                                        {Array.isArray(job.skills) &&
                                            job.skills.length > 0 && (

                                                <div className="mt-5">

                                                    <div
                                                        className="
                                                            mb-2
                                                            flex
                                                            items-center
                                                            gap-2
                                                            text-xs
                                                            font-semibold
                                                            uppercase
                                                            tracking-wide
                                                            text-muted-foreground
                                                        "
                                                    >

                                                        <Sparkles
                                                            className="
                                                                h-3.5
                                                                w-3.5
                                                            "
                                                        />

                                                        Skills

                                                    </div>


                                                    <div
                                                        className="
                                                            flex
                                                            flex-wrap
                                                            gap-2
                                                        "
                                                    >

                                                        {job.skills.map(
                                                            (skill, index) => (

                                                                <span
                                                                    key={`${skill}-${index}`}
                                                                    className="
                                                                        rounded-lg
                                                                        bg-muted
                                                                        px-2.5
                                                                        py-1
                                                                        text-xs
                                                                        font-medium
                                                                        text-foreground/80
                                                                    "
                                                                >
                                                                    {skill}
                                                                </span>

                                                            )
                                                        )}

                                                    </div>

                                                </div>

                                            )}

                                    </div>


                                    {/* =================================================
                                        Delete Action
                                    ================================================= */}

                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button
                                                type="button"
                                                variant="outline"
                                                className="
                                                    rounded-xl
                                                    border
                                                    border-red-100
                                                    px-3
                                                    py-2
                                                    text-red-500
                                                    transition
                                                    hover:border-red-200
                                                    hover:bg-red-50
                                                    hover:text-red-600
                                                "
                                                aria-label="Remove saved job"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </AlertDialogTrigger>

                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>
                                                    Remove saved job?
                                                </AlertDialogTitle>

                                                <AlertDialogDescription>
                                                    Are you sure you want to remove this job
                                                    from your saved jobs? This action cannot
                                                    be undone.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>

                                            <AlertDialogFooter>
                                                <AlertDialogCancel>
                                                    Cancel
                                                </AlertDialogCancel>

                                                <AlertDialogAction
                                                    onClick={() => handleDelete(job.id)}
                                                    className="
                                                        bg-red-600
                                                        text-white
                                                        hover:bg-red-700
                                                    "
                                                >
                                                    Remove
                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </div>


                                {/* =================================================
                                    Saved Date
                                ================================================= */}

                                {formatDate(
                                    job.created_at ||
                                    job.saved_at
                                ) && (

                                    <div
                                        className="
                                            mt-5
                                            flex
                                            items-center
                                            gap-2
                                            border-t
                                            border-border
                                            pt-4
                                            text-xs
                                            text-muted-foreground
                                        "
                                    >

                                        <CalendarDays
                                            className="
                                                h-3.5
                                                w-3.5
                                            "
                                        />

                                        Saved on{" "}

                                        <span
                                            className="
                                                font-medium
                                                text-foreground/80
                                            "
                                        >
                                            {formatDate(
                                                job.created_at ||
                                                job.saved_at
                                            )}
                                        </span>

                                    </div>

                                )}

                            </div>

                        ))}

                    </div>

                </ProfileSectionCard>

            )}

    </div>

);

}

export default ProfileSavedJobs;
