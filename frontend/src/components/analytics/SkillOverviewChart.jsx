import { BarChart3, Target } from "lucide-react";
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Cell
} from "recharts";

function SkillOverviewChart({ report }) {

    const skillDemandData = Array.isArray(report?.missing_skills)
        ? report.missing_skills.map(([skill, count]) => ({
            skill,
            demand: Number(count)
        }))
        : [];

    const chartColors = [
        "#2563EB",
        "#7C3AED",
        "#14B8A6",
        "#F59E0B",
        "#EF4444",
        "#6366F1",
        "#10B981",
        "#8B5CF6"
    ];

    return (

        <section className="rounded-[2rem] border border-slate-100 bg-white p-6 shadow-[0_18px_60px_rgba(15,23,42,0.08)] md:p-8 xl:p-9">

            {/* Header */}

            <div className="flex items-start gap-4">

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50">

                    <BarChart3
                        size={28}
                        className="text-blue-600"
                    />

                </div>

                <div className="min-w-0 flex-1">

                    <h2 className="text-2xl font-bold tracking-tight text-slate-900">

                        Skill Demand Overview

                    </h2>

                    <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">

                        Missing skills mapped to employer demand from current job listings.

                    </p>

                </div>

                <div className="hidden rounded-2xl bg-slate-50 p-3 text-slate-500 md:block">

                    <Target size={24} />

                </div>

            </div>

            {/* Chart */}

            <div className="mt-8 h-[420px] rounded-3xl border border-slate-100 bg-gradient-to-br from-slate-50 to-white p-2">

                <ResponsiveContainer width="100%" height="100%">

                    <BarChart
                        data={skillDemandData}
                        layout="vertical"
                        margin={{
                            top: 12,
                            right: 18,
                            bottom: 10,
                            left: 12
                        }}
                    >

                        <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="#CBD5E1"
                            horizontal={false}
                        />

                        <XAxis
                            type="number"
                            allowDecimals={false}
                            tick={{ fill: "#475569", fontSize: 11 }}
                            axisLine={{ stroke: "#CBD5E1" }}
                            tickLine={false}
                        />

                        <YAxis
                            type="category"
                            dataKey="skill"
                            width={150}
                            tick={{ fill: "#334155", fontSize: 11 }}
                            axisLine={{ stroke: "#CBD5E1" }}
                            tickLine={false}
                        />

                        <Tooltip
                            cursor={{ fill: "#EFF6FF" }}
                            contentStyle={{
                                borderRadius: "16px",
                                border: "1px solid #BFDBFE",
                                boxShadow: "0 12px 40px rgba(37, 99, 235, 0.12)"
                            }}
                            formatter={(value) => [`${value} companies`, "Job postings"]}
                        />

                        <Bar
                            dataKey="demand"
                            name="Companies asking"
                            radius={[0, 10, 10, 0]}
                            barSize={36}
                        >
                            {
                                skillDemandData.map((entry, index) => (
                                    <Cell
                                        key={`${entry.skill}-${index}`}
                                        fill={chartColors[index % chartColors.length]}
                                    />
                                ))
                            }
                        </Bar>

                    </BarChart>

                </ResponsiveContainer>

            </div>

            <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">

                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">

                    Demand Signal

                </span>

                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">

                    {skillDemandData.length} skills

                </span>

            </div>

        </section>

    );

}

export default SkillOverviewChart;