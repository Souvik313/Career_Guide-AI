import { BriefcaseBusiness , Laptop , Database , BrainCircuit , BarChart3 , Smartphone , Cloud , Code2} from "lucide-react";

const getCareerIcon = (role) => {

    const roleName = role.toLowerCase();

    if (roleName.includes("full stack"))
        return <Laptop className="text-blue-600" size={26} />;

    if (roleName.includes("frontend"))
        return <Code2 className="text-blue-600" size={26} />;

    if (roleName.includes("backend"))
        return <Database className="text-blue-600" size={26} />;

    if (roleName.includes("machine learning"))
        return <BrainCircuit className="text-blue-600" size={26} />;

    if (roleName.includes("data"))
        return <BarChart3 className="text-blue-600" size={26} />;

    if (roleName.includes("mobile"))
        return <Smartphone className="text-blue-600" size={26} />;

    if (roleName.includes("devops"))
        return <Cloud className="text-blue-600" size={26} />;

    return <BriefcaseBusiness className="text-blue-600" size={26} />;

};

function CareerPathsCard({ roles, explanation }) {

    return (

        <section id="career-paths" className="mt-8 rounded-3xl bg-white p-8 shadow-md">

            {/* Heading */}

            <div className="flex items-center gap-3">

                <BriefcaseBusiness
                    size={30}
                    className="text-blue-600"
                />

                <h2 className="text-2xl font-bold text-slate-900">

                    Recommended Career Paths

                </h2>

            </div>

            {/* Career Roles */}

            <div className="mt-8 grid gap-4 md:grid-cols-3">

                {
                    roles.map((role, index) => (

                        <div
                            key={index}
                            className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition-all hover:border-blue-400 hover:bg-blue-50"
                        >

                            <div className="flex items-center gap-4">

                                {getCareerIcon(role.role)}

                                <p className="text-lg font-semibold text-slate-800">

                                    {role.role}

                                </p>

                            </div>

                        </div>

                    ))
                }

            </div>

            {/* Divider */}

            <div className="my-8 border-t"/>

            {/* AI Explanation */}

            <h3 className="text-xl font-semibold text-slate-900">

                Why these careers?

            </h3>

            <div className="mt-5 rounded-2xl bg-blue-50 border border-blue-100 p-6">
                <p className="leading-8 text-slate-700 whitespace-pre-line">
                    {explanation}
                </p>
            </div>

        </section>

    );

}

export default CareerPathsCard;