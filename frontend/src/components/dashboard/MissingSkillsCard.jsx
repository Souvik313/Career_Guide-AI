import { TriangleAlert } from "lucide-react";

const getMissingSkillColor = () => {
    return "bg-red-100 text-red-700";
};

function MissingSkillsCard({ skills }) {

    return (

        <section
            id="missing-skills"
            className="mt-8 rounded-3xl bg-white p-8 shadow-md"
        >

            {/* Header */}

            <div className="flex items-center justify-between">

                <div className="flex items-center gap-3">

                    <TriangleAlert
                        size={30}
                        className="text-red-500"
                    />

                    <div>

                        <h2 className="text-2xl font-bold text-slate-900">

                            Missing Skills

                        </h2>

                        <p className="mt-1 text-slate-600">

                            Skills frequently required for your recommended careers.

                        </p>

                    </div>

                </div>

                <p className="text-sm font-semibold text-red-600">

                    {skills.length} Skills

                </p>

            </div>

            {/* Skills */}

            <div className="mt-8 flex flex-wrap gap-4">

                {

                    skills.map((skill, index) => (

                        <span

                            key={index}

                            className={`rounded-full px-5 py-2 text-sm font-medium ${getMissingSkillColor()}`}

                        >

                            {skill[0]}

                        </span>

                    ))

                }

            </div>

        </section>

    );

}

export default MissingSkillsCard;