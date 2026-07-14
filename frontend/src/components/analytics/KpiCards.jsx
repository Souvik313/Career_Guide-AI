import { Award , CircleAlert , BadgeCheck } from "lucide-react";

function KpiCards({ report }) {

    const kpis = [

        {
            title: "Resume Skills",
            value: report.resume_skills.length,
            icon: Award,
            color: "text-blue-600",
            bg: "bg-blue-100"
        },

        {
            title: "Missing Skills",
            value: report.missing_skills.length,
            icon: CircleAlert,
            color: "text-red-600",
            bg: "bg-red-100"
        },

        {
            title: "Match Score",
            value: `${report.career_report.match_score}%`,
            icon: BadgeCheck,
            color: "text-green-600",
            bg: "bg-green-100"
        }

    ];

    return (

        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

            {

                kpis.map((kpi, index) => {

                    const Icon = kpi.icon;

                    return (

                        <div
                            key={index}
                            className="rounded-3xl bg-white p-7 shadow-md transition hover:-translate-y-1 hover:shadow-lg"
                        >

                            <div className="flex items-center justify-between">

                                <div>

                                    <p className="text-sm font-medium text-slate-500">

                                        {kpi.title}

                                    </p>

                                    <h2 className="mt-3 text-4xl font-bold text-slate-900">

                                        {kpi.value}

                                    </h2>
                                    <p className="mt-2 text-sm text-slate-500">

                                        Skills Identified

                                    </p>

                                </div>

                                <div
                                    className={`rounded-2xl p-4 ${kpi.bg}`}
                                >

                                    <Icon
                                        size={30}
                                        className={kpi.color}
                                    />

                                </div>

                            </div>

                        </div>

                    );

                })

            }

        </section>

    );

}

export default KpiCards;