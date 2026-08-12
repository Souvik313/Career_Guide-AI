import { Code2 } from "lucide-react";

const getSkillColor = (skill) => {

    const value = skill.toLowerCase();

    if (value.includes("react"))
        return "bg-sky-500/10 text-sky-500";

    if (value.includes("javascript"))
        return "bg-yellow-500/10 text-yellow-500";

    if (value.includes("python"))
        return "bg-blue-500/10 text-blue-500";

    if (value.includes("node"))
        return "bg-green-500/10 text-green-500";

    if (value.includes("express"))
        return "bg-zinc-500/10 text-zinc-300";

    if (value.includes("mongodb"))
        return "bg-emerald-500/10 text-emerald-500";

    if (value.includes("git"))
        return "bg-orange-500/10 text-orange-500";

    if (value.includes("html"))
        return "bg-red-500/10 text-red-500";

    if (value.includes("css"))
        return "bg-cyan-500/10 text-cyan-500";

    return "bg-muted text-foreground";

};

function ResumeSkillsCard({ skills }) {

    return (

        <section id="resume-skills" className="mt-8 rounded-3xl border border-border bg-card p-8 shadow-md">

            <div className="flex items-center justify-between">

            <div className="flex items-center gap-3">

                    <Code2
                        size={30}
                        className="text-green-500"
                    />

                    <div>

                        <h2 className="text-2xl font-bold text-foreground">

                            Resume Skills

                        </h2>

                        <p className="mt-1 text-muted-foreground">

                            Skills found in your resume by our AI agent

                        </p>

                    </div>

                </div>

            
                <p className="text-sm font-semibold text-green-500">
                    {skills.length} Skills
                </p>

                </div>

            <div className="mt-8 flex flex-wrap gap-4">

                {
                    skills.map((skill, index) => (

                        <span
                            key={index}
                            className={`rounded-full px-5 py-2 text-sm font-medium ${getSkillColor(skill)}`}
                        >

                            {skill.replace(/\b\w/g, char => char.toUpperCase())}

                        </span>

                    ))
                }

            </div>

        </section>

    );

}

export default ResumeSkillsCard;