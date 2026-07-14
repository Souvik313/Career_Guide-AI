import { Upload , BrainCircuit , BarChart3 , GraduationCap } from "lucide-react";

const steps = [
    {
        icon: Upload,
        title: "Upload Resume",
        description:
            "Upload your PDF resume securely. Our parser extracts your skills, education, projects, and experience.",
    },
    {
        icon: BrainCircuit,
        title: "AI Analysis",
        description:
            "Semantic embeddings, FAISS search, and skill-gap analysis identify your strongest career matches.",
    },
    {
        icon: BarChart3,
        title: "Career Insights",
        description:
            "Receive detailed match scores, recommended career paths, strengths, and missing skills.",
    },
    {
        icon: GraduationCap,
        title: "Learning Roadmap",
        description:
            "Our AI Career Advisor generates personalized recommendations and a roadmap for career growth.",
    },
];

function HowItWorks() {

    return (
        <section id="how-it-works" className="bg-slate-50 py-24">

            <div className="mx-auto max-w-7xl px-6">

                <div className="text-center">

                    <h2 className="text-4xl font-bold text-slate-900">
                        How It Works
                    </h2>

                    <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-600">
                        Four simple steps to discover your ideal career path.
                    </p>

                </div>

                <div className="mt-20 grid gap-10 md:grid-cols-4">

                    {steps.map((step, index) => {

                        const Icon = step.icon;

                        return (

                            <div
                                key={index}
                                className="relative text-center"
                            >

                                <div
                                    className="
                                        mx-auto
                                        flex
                                        h-16
                                        w-16
                                        items-center
                                        justify-center
                                        rounded-full
                                        bg-blue-600
                                        text-white
                                    "
                                >

                                    <Icon size={30} />

                                </div>

                                <div
                                    className="
                                        absolute
                                        -top-3
                                        left-1/2
                                        flex
                                        h-8
                                        w-8
                                        -translate-x-1/2
                                        items-center
                                        justify-center
                                        rounded-full
                                        bg-slate-900
                                        text-sm
                                        font-bold
                                        text-white
                                    "
                                >
                                    {index + 1}
                                </div>

                                <h3 className="mt-8 text-2xl font-semibold text-slate-900">

                                    {step.title}

                                </h3>

                                <p className="mt-4 leading-7 text-slate-600">

                                    {step.description}

                                </p>

                            </div>

                        );

                    })}

                </div>

            </div>

        </section>
    );
}

export default HowItWorks;