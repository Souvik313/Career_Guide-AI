import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip
} from "recharts";

import { Briefcase } from "lucide-react";

function RecommendedJobsChart({ report }) {

    const data = report.recommended_jobs
        .slice(0, 5)
        .map((job) => ({

            job: job.Position,

            score: Number((job["Similarity Score"] * 120).toFixed(1))

        }));

    return (

        <section className="rounded-3xl bg-white p-8 shadow-md">

            {/* Header */}

            <div className="flex items-center gap-3">

                <Briefcase
                    size={28}
                    className="text-blue-600"
                />

                <div>

                    <h2 className="text-2xl font-bold text-slate-900">

                        Top Recommended Jobs

                    </h2>

                    <p className="mt-1 text-slate-600">

                        The five most suitable job roles based on your resume.

                    </p>

                </div>

            </div>

            {/* Chart */}

            <div className="mt-8 h-[420px]">

                <ResponsiveContainer
                    width="100%"
                    height="100%"
                >

                    <BarChart
                        data={data}
                        layout="vertical"
                        margin={{
                            top: 10,
                            right: 40,
                            left: 30,
                            bottom: 10
                        }}
                    >

                        <CartesianGrid strokeDasharray="3 3" />

                        <XAxis
                            type="number"
                            domain={[0, 100]}
                            unit="%"
                        />

                        <YAxis
                            type="category"
                            dataKey="job"
                            width={220}
                            tickFormatter={(value) =>
                                value.length > 22
                                    ? value.substring(0, 22) + "..."
                                    : value
                            }
                        />

                        <Tooltip
                            formatter={(value) => `${value}%`}
                        />

                        <Bar
                            dataKey="score"
                            radius={[0, 8, 8, 0]}
                            label={{
                                position: "right",
                                formatter: (value) => `${value}%`
                            }}
                        />

                    </BarChart>

                </ResponsiveContainer>

            </div>

        </section>

    );

}

export default RecommendedJobsChart;