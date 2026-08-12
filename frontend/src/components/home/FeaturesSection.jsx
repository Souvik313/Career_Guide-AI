import { FileText, Search, BrainCircuit, GraduationCap } from "lucide-react";

const features = [
    {
        icon: FileText,
        step: "01",
        title: "Resume Analysis",
        description:
            "Extracts your skills, education, experience, and projects using AI-powered resume parsing.",
    },
    {
        icon: Search,
        step: "02",
        title: "Semantic Job Matching",
        description:
            "Matches your profile with relevant jobs using Sentence Transformers and FAISS vector search.",
    },
    {
        icon: BrainCircuit,
        step: "03",
        title: "Skill Gap Analysis",
        description:
            "Identifies missing technical skills and highlights areas to improve for your target career.",
    },
    {
        icon: GraduationCap,
        step: "04",
        title: "AI Career Advisor",
        description:
            "Generates personalized career guidance, learning roadmaps, and recommendations using Groq LLM.",
    },
];

function FeaturesSection() {
    return (
        <section id="features" className="bg-white py-28">
            <div className="mx-auto max-w-5xl px-6">
                <div className="max-w-xl">
                    <span className="text-sm font-semibold uppercase tracking-widest text-[#2452FF]">
                        The Pipeline
                    </span>
                    <h2 className="mt-4 font-[Fraunces] text-4xl font-medium leading-tight text-[#10182B] md:text-5xl">
                        One upload,
                        <br />
                        four AI passes.
                    </h2>
                    <p className="mt-5 text-lg leading-7 text-slate-500">
                        Your resume moves through the same pipeline every
                        time — parsed, matched, measured against the role,
                        and turned into a plan.
                    </p>
                </div>

                <div className="relative mt-20">
                    {/* connecting spine */}
                    <div className="absolute bottom-8 left-[27px] top-8 hidden w-px border-l-2 border-dotted border-[#F5A623]/60 md:block" />

                    <div className="space-y-14">
                        {features.map((feature, index) => {
                            const Icon = feature.icon;
                            return (
                                <div
                                    key={index}
                                    className="relative grid gap-6 md:grid-cols-[56px_auto_1fr] md:items-start"
                                >
                                    {/* node dot on the spine */}
                                    <div className="z-10 hidden h-14 w-14 items-center justify-center rounded-full border-2 border-white bg-[#F4F6FB] shadow-sm md:flex">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white ring-1 ring-slate-200">
                                            <Icon
                                                className="text-[#2452FF]"
                                                size={18}
                                            />
                                        </div>
                                    </div>

                                    {/* ghost numeral */}
                                    <span className="font-[Fraunces] text-6xl font-medium leading-none text-slate-100 md:text-7xl">
                                        {feature.step}
                                    </span>

                                    <div className="flex items-center gap-3 md:hidden">
                                        <Icon
                                            className="text-[#2452FF]"
                                            size={22}
                                        />
                                    </div>

                                    <div>
                                        <h3 className="text-xl font-semibold text-[#10182B]">
                                            {feature.title}
                                        </h3>
                                        <p className="mt-2 max-w-md leading-7 text-slate-500">
                                            {feature.description}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default FeaturesSection;