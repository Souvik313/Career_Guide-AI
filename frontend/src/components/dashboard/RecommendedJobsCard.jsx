import {useState} from 'react';
import { Building2, MapPin, Star , ChevronLeft, ChevronRight, Bookmark} from "lucide-react";
import {useSavedJobs} from '../../hooks/useSavedJobs.js';
import toast from 'react-hot-toast';

function RecommendedJobsCard({ jobs }) {

    const {
        savedJobs,
        loading: savedJobsLoading,
        error: savedJobsError,
        saveJob,
    } = useSavedJobs();

    const [currentPage, setCurrentPage] = useState(0);

    const jobsPerPage = 5;

    const totalPages = Math.ceil(jobs.length / jobsPerPage);

    const visibleJobs = jobs.slice(
    currentPage * jobsPerPage,
    currentPage * jobsPerPage + jobsPerPage
    );

    const isJobSaved = (job) => {
        return savedJobs.some(
            (savedJob) =>
                savedJob.job_title === job.job_title &&
                savedJob.company_name === job.company_name
        );
    };

    const handleSaveJob = async (job) => {

        if (isJobSaved(job)) {
            return;
        }

        try {

            await saveJob({
                job_title: job.job_title,

                company_name:
                    job.company_name ?? "",

                exp_years:
                    job.exp_years ?? null,

                primary_keyword:
                    job.primary_keyword ?? null,

                english_level:
                    job.english_level ?? null,

                skills:
                    Array.isArray(job.skills)
                        ? job.skills
                        : [],
            });

            toast.success(
                "You have successfully saved the job!"
            )

        } catch (err) {

            console.error(
                "Failed to save job:",
                err
            );

            toast.error(
                err?.response?.data?.detail ||
                "Failed to save job."
            )

        }
    };

    return (

        <section
            id="recommended-jobs"
            className="mt-8 rounded-3xl bg-white p-8 shadow-md"
        >

            {/* Header */}

            <div className="flex items-center justify-between">

                <div className="flex items-center gap-3">

                    <Building2
                        size={30}
                        className="text-blue-600"
                    />

                    <div>

                        <h2 className="text-2xl font-bold text-slate-900">

                            Recommended Jobs

                        </h2>

                        <p className="mt-1 text-slate-600">

                            AI-selected opportunities matching your profile.

                        </p>

                    </div>

                </div>

                <p className="text-sm font-semibold text-blue-600">

                    {jobs.length} Jobs

                </p>

            </div>

            {/* Jobs */}

            <div className="mt-8 space-y-5">

                {visibleJobs.map((job) => (

                    <div
                        key={job.id}
                        className="
                            rounded-2xl
                            border
                            border-slate-200
                            p-6
                            transition
                            hover:border-blue-300
                            hover:shadow-md
                        "
                    >

                        {/* Job Header */}

                        <div className="flex items-start justify-between gap-4">

                            {/* Job information */}

                            <div className="min-w-0">

                                <h3 className="text-xl font-semibold text-slate-900">
                                    {job.job_title}
                                </h3>

                                <p className="mt-1 text-slate-600">
                                    {job.company_name}
                                </p>

                            </div>


                            {/* Save + Match */}

                            <div className="flex shrink-0 items-center gap-2">

                                <button
                                    type="button"
                                    onClick={() => handleSaveJob(job)}
                                    disabled={
                                        savedJobsLoading ||
                                        isJobSaved(job)
                                    }
                                    aria-label={
                                        isJobSaved(job)
                                            ? "Job saved"
                                            : "Save job"
                                    }
                                    className={`
                                        flex
                                        h-10
                                        w-10
                                        items-center
                                        justify-center
                                        rounded-xl
                                        border
                                        transition-all
                                        ${
                                            isJobSaved(job)
                                                ? "border-blue-200 bg-blue-50 text-blue-600"
                                                : "border-slate-200 bg-white text-slate-400 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600"
                                        }
                                    `}
                                >
                                    <Bookmark
                                        size={19}
                                        className={
                                            isJobSaved(job)
                                                ? "fill-blue-600"
                                                : ""
                                        }
                                    />
                                </button>


                                <div
                                    className="
                                        flex
                                        items-center
                                        gap-2
                                        rounded-full
                                        bg-yellow-100
                                        px-4
                                        py-2
                                    "
                                >
                                    <Star
                                        size={18}
                                        className="fill-yellow-500 text-yellow-500"
                                    />

                                    <span className="font-semibold">
                                        {Math.round(
                                            job.similarity_score * 120
                                        )}%
                                    </span>
                                </div>

                            </div>

                        </div>


                        {/* Location */}

                        <div className="mt-5 flex items-center gap-2 text-slate-500">

                            <MapPin size={18} />

                            <span>
                                {job.Location || "Remote"}
                            </span>

                        </div>

                    </div>

                ))}

            </div>


        {/* Pagination */}

        <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-6">

            <button
                type="button"
                onClick={() =>
                    setCurrentPage((page) => Math.max(page - 1, 0))
                }
                disabled={currentPage === 0}
                className="
                    flex
                    items-center
                    gap-2
                    rounded-xl
                    border
                    border-slate-200
                    px-4
                    py-2
                    text-sm
                    font-medium
                    text-slate-600
                    transition
                    hover:border-blue-300
                    hover:bg-blue-50
                    hover:text-blue-600
                    disabled:cursor-not-allowed
                    disabled:opacity-40
                "
            >
                <ChevronLeft size={18} />

                Previous
            </button>


            <span className="text-sm font-medium text-slate-500">
                {currentPage + 1} / {totalPages}
            </span>


            <button
                type="button"
                onClick={() =>
                    setCurrentPage((page) =>
                        Math.min(page + 1, totalPages - 1)
                    )
                }
                disabled={currentPage === totalPages - 1}
                className="
                    flex
                    items-center
                    gap-2
                    rounded-xl
                    border
                    border-slate-200
                    px-4
                    py-2
                    text-sm
                    font-medium
                    text-slate-600
                    transition
                    hover:border-blue-300
                    hover:bg-blue-50
                    hover:text-blue-600
                    disabled:cursor-not-allowed
                    disabled:opacity-40
                "
            >
                Next

                <ChevronRight size={18} />
            </button>

        </div>

            <p className="mt-4 text-center text-xs text-slate-400">
                Showing {currentPage * jobsPerPage + 1}–
                {Math.min((currentPage + 1) * jobsPerPage, jobs.length)}
                {" "}of {jobs.length} recommended jobs
            </p>

        </section>

    );

}

export default RecommendedJobsCard;