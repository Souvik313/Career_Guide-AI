import { Building2, MapPin, Star } from "lucide-react";

function RecommendedJobsCard({ jobs }) {

    const topJobs = jobs.slice(0, 5);

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

                {

                    topJobs.map((job, index) => (

                        <div
                            key={index}
                            className="rounded-2xl border border-slate-200 p-6 transition hover:border-blue-300 hover:shadow-md"
                        >

                            <div className="flex items-start justify-between">

                                <div>

                                    <h3 className="text-xl font-semibold">

                                        {job.Position}

                                    </h3>

                                    <p className="mt-1 text-slate-600">

                                        {job["Company Name"]}

                                    </p>

                                </div>

                                <div className="flex items-center gap-2 rounded-full bg-yellow-100 px-4 py-2">

                                    <Star
                                        size={18}
                                        className="text-yellow-500 fill-yellow-500"
                                    />

                                    <span className="font-semibold">

                                        {Math.round(job["Similarity Score"] * 120)}%

                                    </span>

                                </div>

                            </div>

                            <div className="mt-5 flex items-center gap-2 text-slate-500">

                                <MapPin size={18} />

                                <span>

                                    {job["Location"] || "Remote"}

                                </span>

                            </div>

                        </div>

                    ))

                }

            </div>

        </section>

    );

}

export default RecommendedJobsCard;