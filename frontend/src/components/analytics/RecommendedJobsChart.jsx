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

    const isDark = typeof document !== "undefined" && document.documentElement.classList.contains("dark");

    const data = report.recommended_jobs
        .slice(0, 5)
        .map((job) => ({

            job: job.job_title,

            score: Number((job["similarity_score"] * 120).toFixed(1))

        }));

    const barColors = ["#60a5fa", "#a78bfa", "#34d399", "#fbbf24", "#f472b6"];

    return (

        <section className="rounded-3xl border border-border bg-card p-8 shadow-md">

            {/* Header */}

            <div className="flex items-center gap-3">

                <Briefcase
                    size={28}
                    className="text-blue-600"
                />

                <div>

                    <h2 className="text-2xl font-bold text-foreground">

                        Top Recommended Jobs

                    </h2>

                    <p className="mt-1 text-muted-foreground">

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

                        <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#475569" : "#cbd5e1"} />

                        <XAxis
                            type="number"
                            domain={[0, 100]}
                            unit="%"
                            tick={{ fill: isDark ? "#e2e8f0" : "#475569", fontSize: 11 }}
                            axisLine={{ stroke: isDark ? "#475569" : "#cbd5e1" }}
                            tickLine={false}
                        />

                        <YAxis
                            type="category"
                            dataKey="job"
                            width={220}
                            tick={{ fill: isDark ? "#f8fafc" : "#334155", fontSize: 11 }}
                            axisLine={{ stroke: isDark ? "#475569" : "#cbd5e1" }}
                            tickLine={false}
                            tickFormatter={(value) =>
                                value.length > 22
                                    ? value.substring(0, 22) + "..."
                                    : value
                            }
                        />

                        <Tooltip
                            formatter={(value) => `${value}%`}
                            contentStyle={{
                                borderRadius: "16px",
                                border: `1px solid ${isDark ? "rgba(148,163,184,0.35)" : "#dbeafe"}`,
                                backgroundColor: isDark ? "#0f172a" : "#ffffff",
                                color: isDark ? "#f8fafc" : "#0f172a",
                                boxShadow: isDark ? "0 12px 40px rgba(15, 23, 42, 0.5)" : "0 12px 40px rgba(37, 99, 235, 0.12)"
                            }}
                        />

                        <Bar
                            dataKey="score"
                            radius={[0, 8, 8, 0]}
                            label={{
                                position: "right",
                                formatter: (value) => `${value}%`,
                                fill: isDark ? "#f8fafc" : "#0f172a",
                                fontSize: 11
                            }}
                        >
                            {data.map((entry, index) => (
                                <Cell key={`${entry.job}-${index}`} fill={barColors[index % barColors.length]} />
                            ))}
                        </Bar>

                    </BarChart>

                </ResponsiveContainer>

            </div>

        </section>

    );

}

export default RecommendedJobsChart;