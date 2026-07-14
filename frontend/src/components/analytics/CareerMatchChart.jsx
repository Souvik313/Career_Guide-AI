import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip
} from "recharts";

import { BriefcaseBusiness } from "lucide-react";

function CareerMatchChart({ report }) {

    const data = report.career_report.best_roles

    return (

        <section className="rounded-3xl bg-white p-8 shadow-md">

            {/* Header */}

            <div className="flex items-center gap-3">

                <BriefcaseBusiness
                    size={28}
                    className="text-blue-600"
                />

                <div>

                    <h2 className="text-2xl font-bold text-slate-900">

                        Career Match Analysis

                    </h2>

                    <p className="mt-1 text-slate-600">

                        Top career paths recommended by our AI based on your resume.

                    </p>

                </div>

            </div>

            {/* Chart */}

            <div className="mt-8 h-80">

                <ResponsiveContainer
                    width="100%"
                    height="100%"
                >

                    <BarChart
                        data={data}
                        layout="vertical"
                    >

                        <CartesianGrid strokeDasharray="3 3" />

                        <XAxis
                            type="number"
                            domain={[0,100]}
                            unit="%"
                        />

                        <YAxis
                            type="category"
                            dataKey="role"
                            width={140}
                        />

                        <Tooltip
                            formatter={(value) => `${value}%`}
                        />

                        <Bar
                            dataKey="score"
                            radius={[0,8,8,0]}
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

export default CareerMatchChart;