import { Lightbulb } from "lucide-react";

function AnalyticsInsight({ report }) {

    return (

        <section className="rounded-3xl bg-white p-8 shadow-md">

            {/* Header */}

            <div className="flex items-center gap-3">

                <div className="rounded-2xl bg-yellow-100 p-3">

                    <Lightbulb
                        size={28}
                        className="text-yellow-600"
                    />

                </div>

                <div>

                    <h2 className="text-2xl font-bold text-slate-900">

                        AI Insight

                    </h2>

                    <p className="mt-1 text-slate-600">

                        A quick interpretation of your analytics by CareerCompass AI.

                    </p>

                </div>

            </div>

            {/* Insight */}

            <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-6">

                <p className="leading-8 text-slate-700">

                    {report.ai_report.career_summary}

                </p>

            </div>

            {/* Key Takeaways */}

            <div className="mt-8 grid gap-5 md:grid-cols-2">

                <div className="rounded-2xl border border-green-200 bg-green-50 p-5">

                    <h3 className="font-semibold text-green-700">

                        Biggest Strength

                    </h3>

                    <p className="mt-2 text-slate-700">

                        {report.career_report.strengths[0]}

                    </p>

                </div>

                <div className="rounded-2xl border border-orange-200 bg-orange-50 p-5">

                    <h3 className="font-semibold text-orange-700">

                        Priority Skill

                    </h3>

                    <p className="mt-2 text-slate-700">

                        {report.career_report.missing_skills[0]}

                    </p>

                </div>

            </div>

        </section>

    );

}

export default AnalyticsInsight;