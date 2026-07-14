import { CheckCircle2 } from "lucide-react";

function DashboardHeader({report}) {

    return (

        <section id="dashboard-header" className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl shadow-lg p-8 text-white">

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

                <div>

                    <p className="text-blue-100 text-lg">

                        👋 Welcome {report.candidate_name.split(" ")[0]}!

                    </p>

                    <h1 className="mt-2 text-4xl font-bold">

                        Your AI Career Report is Ready

                    </h1>

                    <p className="mt-4 max-w-2xl text-blue-100 leading-7">

                        We've analyzed your resume, identified your strengths,
                        found potential skill gaps, and generated personalized
                        career recommendations to help guide your next steps.

                    </p>

                </div>

                <div className="bg-white/15 backdrop-blur-md rounded-2xl px-6 py-4 flex items-center gap-3">

                    <CheckCircle2
                        size={28}
                        className="text-green-300"
                    />

                    <div>

                        <p className="text-sm text-blue-100">

                            Status

                        </p>

                        <p className="font-semibold">

                            Analysis Completed

                        </p>

                    </div>

                </div>

            </div>

        </section>

    );

}

export default DashboardHeader;