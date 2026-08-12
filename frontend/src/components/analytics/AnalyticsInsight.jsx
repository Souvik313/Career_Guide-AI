import { Lightbulb } from "lucide-react";

function AnalyticsInsight({ report }) {

    return (

        <section className="rounded-3xl border border-border bg-card p-8 shadow-md">

            {/* Header */}

            <div className="flex items-center gap-3">

                <div className="rounded-2xl bg-yellow-100 p-3">

                    <Lightbulb
                        size={28}
                        className="text-yellow-600"
                    />

                </div>

                <div>

                    <h2 className="text-2xl font-bold text-foreground">

                        AI Insight

                    </h2>

                    <p className="mt-1 text-muted-foreground">

                        A quick interpretation of your analytics by CareerCompass AI.

                    </p>

                </div>

            </div>

            {/* Insight */}

            <div className="mt-8 rounded-2xl border border-border bg-muted/80 p-6">

                <p className="leading-8 text-foreground/90">

                    {report.ai_report.career_summary}

                </p>

            </div>

            {/* Key Takeaways */}

            <div className="mt-8 grid gap-5 md:grid-cols-2">

                <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-5 dark:border-emerald-400/40 dark:bg-emerald-500/15">

                    <h3 className="font-semibold text-emerald-700 dark:text-emerald-300">

                        Biggest Strength

                    </h3>

                    <p className="mt-2 text-foreground/90 dark:text-foreground">

                        {report.career_report.strengths[0]}

                    </p>

                </div>

                <div className="rounded-2xl border border-orange-500/30 bg-orange-500/10 p-5 dark:border-orange-400/40 dark:bg-orange-500/15">

                    <h3 className="font-semibold text-orange-700 dark:text-orange-300">

                        Priority Skill

                    </h3>

                    <p className="mt-2 text-foreground/90 dark:text-foreground">

                        {report.career_report.missing_skills[0].replace(/\b\w/g, char => char.toUpperCase())}

                    </p>

                </div>

            </div>

        </section>

    );

}

export default AnalyticsInsight;