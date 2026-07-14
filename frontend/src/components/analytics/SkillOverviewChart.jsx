import { BarChart3 } from "lucide-react";
import { ResponsiveContainer , BarChart , Bar, XAxis , YAxis , CartesianGrid , Tooltip } from "recharts";

function SkillOverviewChart({ report }) {

    const data = [

        {
            category: "Resume Skills",
            value: report.resume_skills.length
        },

        {
            category: "Missing Skills",
            value: report.missing_skills.length
        }

    ];

    return (

        <section className="rounded-3xl bg-white p-8 shadow-md">

            {/* Header */}

            <div className="flex items-center gap-3">

                <BarChart3
                    size={28}
                    className="text-blue-600"
                />

                <div>

                    <h2 className="text-2xl font-bold text-slate-900">

                        Skill Overview

                    </h2>

                    <p className="mt-1 text-slate-600">

                        Compare your detected skills with the skills recommended by the AI.

                    </p>

                </div>

            </div>

            {/* Chart */}

            <div className="mt-8 h-80">

                <ResponsiveContainer width="100%" height="100%">

                    <BarChart
                        data={data}
                        layout="vertical"
                    >

                        <CartesianGrid strokeDasharray="3 3" />

                        <XAxis
                            type="number"
                        />

                        <YAxis
                            type="category"
                            dataKey="category"
                        />

                        <Tooltip />

                        <Bar
                            dataKey="value"
                            radius={[0, 8, 8, 0]}
                        />

                    </BarChart>

                </ResponsiveContainer>

            </div>

        </section>

    );

}

export default SkillOverviewChart;