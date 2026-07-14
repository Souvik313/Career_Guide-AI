import { FileText , Search , BrainCircuit , GraduationCap } from "lucide-react";

const features = [
    {
        icon: FileText,
        title: "Resume Analysis",
        description:
            "Extracts your skills, education, experience, and projects using AI-powered resume parsing.",
    },
    {
        icon: Search,
        title: "Semantic Job Matching",
        description:
            "Matches your profile with relevant jobs using Sentence Transformers and FAISS vector search.",
    },
    {
        icon: BrainCircuit,
        title: "Skill Gap Analysis",
        description:
            "Identifies missing technical skills and highlights areas to improve for your target career.",
    },
    {
        icon: GraduationCap,
        title: "AI Career Advisor",
        description:
            "Generates personalized career guidance, learning roadmaps, and recommendations using Groq LLM.",
    },
];

function FeaturesSection() {

    return (
        <section id="features" className="bg-white py-24">

            <div className="mx-auto max-w-7xl px-6">

                <div className="text-center">

                    <h2 className="text-4xl font-bold text-slate-900">

                        Powerful AI Features

                    </h2>

                    <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-600">

                        Everything you need to analyze your resume,
                        discover career opportunities,
                        and receive personalized AI-powered guidance.

                    </p>

                </div>

                <div className="mt-16 grid gap-8 md:grid-cols-2">

                    {features.map((feature, index) => {

                        const Icon = feature.icon;

                        return (

                            <div
                                key={index}
                                className="
                                    rounded-2xl
                                    border
                                    border-slate-200
                                    bg-white
                                    p-8
                                    shadow-sm
                                    transition-all
                                    duration-300
                                    hover:-translate-y-2
                                    hover:shadow-xl
                                "
                            >

                                <div
                                    className="
                                        flex
                                        h-14
                                        w-14
                                        items-center
                                        justify-center
                                        rounded-xl
                                        bg-blue-100
                                    "
                                >

                                    <Icon
                                        className="text-blue-600"
                                        size={28}
                                    />

                                </div>

                                <h3
                                    className="
                                        mt-6
                                        text-2xl
                                        font-semibold
                                        text-slate-900
                                    "
                                >

                                    {feature.title}

                                </h3>

                                <p
                                    className="
                                        mt-4
                                        leading-7
                                        text-slate-600
                                    "
                                >

                                    {feature.description}

                                </p>

                            </div>

                        );

                    })}

                </div>

            </div>

        </section>
    );
}

export default FeaturesSection;
