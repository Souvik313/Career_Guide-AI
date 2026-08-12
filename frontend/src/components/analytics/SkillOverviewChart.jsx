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

    const isDark = typeof document !== "undefined" && document.documentElement.classList.contains("dark");

    const skillDemandData = Array.isArray(report?.missing_skills)
        ? report.missing_skills.map(([skill, count]) => ({
            skill,
            demand: Number(count)
        }))
        : [];

    const chartColors = [
        "#60a5fa",
        "#a78bfa",
        "#34d399",
        "#fbbf24",
        "#f472b6",
        "#22d3ee",
        "#fb7185",
        "#2dd4bf"
    ];

    return (

        <section className="rounded-[2rem] border border-border bg-card p-6 shadow-[0_18px_60px_rgba(15,23,42,0.08)] md:p-8 xl:p-9">

            {/* Header */}

            <div className="flex items-start gap-4">

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10">

                    <BarChart3
                        size={28}
                        className="text-blue-500 dark:text-blue-300"
                    />

                </div>

                <div className="min-w-0 flex-1">

                    <h2 className="text-2xl font-bold tracking-tight text-foreground">

                        Skill Demand Overview

                    </h2>

                    <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">

                        Missing skills mapped to employer demand from current job listings.

                    </p>

                </div>

                <div className="hidden rounded-2xl bg-muted p-3 text-muted-foreground md:block">

                    <Target size={24} />

                </div>

            </div>

            {/* Chart */}

            <div className="mt-8 h-[420px] rounded-3xl border border-border bg-gradient-to-br from-muted/70 to-background p-2">

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
                            stroke={isDark ? "#475569" : "#cbd5e1"}
                            horizontal={false}
                        />

                        <XAxis
                            type="number"
                            allowDecimals={false}
                            tick={{ fill: isDark ? "#e2e8f0" : "#475569", fontSize: 11 }}
                            axisLine={{ stroke: isDark ? "#475569" : "#cbd5e1" }}
                            tickLine={false}
                        />

                        <YAxis
                            type="category"
                            dataKey="skill"
                            width={150}
                            tick={{ fill: isDark ? "#f8fafc" : "#334155", fontSize: 11 }}
                            axisLine={{ stroke: isDark ? "#475569" : "#cbd5e1" }}
                            tickLine={false}
                        />

                        <Tooltip
                            cursor={{ fill: isDark ? "rgba(148, 163, 184, 0.12)" : "rgba(96, 165, 250, 0.08)" }}
                            contentStyle={{
                                borderRadius: "16px",
                                border: `1px solid ${isDark ? "rgba(148,163,184,0.35)" : "#bfdbfe"}`,
                                backgroundColor: isDark ? "#0f172a" : "#ffffff",
                                color: isDark ? "#f8fafc" : "#0f172a",
                                boxShadow: isDark ? "0 12px 40px rgba(15, 23, 42, 0.5)" : "0 12px 40px rgba(37, 99, 235, 0.12)"
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

            <div className="mt-5 flex items-center justify-between border-t border-border pt-4">

                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">

                    Demand Signal

                </span>

                <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-700 dark:text-emerald-300">

                    {skillDemandData.length} skills

                </span>

            </div>

        </section>

    );

}

export default SkillOverviewChart;