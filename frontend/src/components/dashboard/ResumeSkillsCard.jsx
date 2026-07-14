import { Code2 } from "lucide-react";

const getSkillColor = (skill) => {

    const value = skill.toLowerCase();

    if (value.includes("react"))
        return "bg-sky-100 text-sky-700";

    if (value.includes("javascript"))
        return "bg-yellow-100 text-yellow-700";

    if (value.includes("python"))
        return "bg-blue-100 text-blue-700";

    if (value.includes("node"))
        return "bg-green-100 text-green-700";

    if (value.includes("express"))
        return "bg-gray-200 text-gray-800";

    if (value.includes("mongodb"))
        return "bg-emerald-100 text-emerald-700";

    if (value.includes("git"))
        return "bg-orange-100 text-orange-700";

    if (value.includes("html"))
        return "bg-red-100 text-red-700";

    if (value.includes("css"))
        return "bg-cyan-100 text-cyan-700";

    return "bg-slate-100 text-slate-700";

};

function ResumeSkillsCard({ skills }) {

    return (

        <section id="resume-skills" className="mt-8 rounded-3xl bg-white p-8 shadow-md">

            <div className="flex items-center justify-between">

            <div className="flex items-center gap-3">

                    <Code2
                        size={30}
                        className="text-green-500"
                    />

                    <div>

                        <h2 className="text-2xl font-bold text-slate-900">

                            Resume Skills

                        </h2>

                        <p className="mt-1 text-slate-600">

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

                            {skill}

                        </span>

                    ))
                }

            </div>

        </section>

    );

}

export default ResumeSkillsCard;