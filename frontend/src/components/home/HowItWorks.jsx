import { Upload, BrainCircuit, BarChart3, GraduationCap } from "lucide-react";

const steps = [
    {
        icon: Upload,
        label: "Step 01",
        title: "Upload Resume",
        description:
            "Upload your PDF resume securely. Our parser extracts your skills, education, projects, and experience.",
    },
    {
        icon: BrainCircuit,
        label: "Step 02",
        title: "AI Analysis",
        description:
            "Semantic embeddings, FAISS search, and skill-gap analysis identify your strongest career matches.",
    },
    {
        icon: BarChart3,
        label: "Step 03",
        title: "Career Insights",
        description:
            "Receive detailed match scores, recommended career paths, strengths, and missing skills.",
    },
    {
        icon: GraduationCap,
        label: "Step 04",
        title: "Learning Roadmap",
        description:
            "Our AI Career Advisor generates personalized recommendations and a roadmap for career growth.",
    },
];

function HowItWorks() {
    return (
        <section
            id="how-it-works"
            className="relative overflow-hidden bg-[#111318] py-28"
        >
            {/* faint grid texture, monochrome */}
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.06]"
                style={{
                    backgroundImage:
                        "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
                    backgroundSize: "48px 48px",
                }}
            />

            <div className="relative mx-auto max-w-6xl px-6">
                <div className="max-w-xl">
                    <span className="text-sm font-semibold uppercase tracking-widest text-slate-500">
                        Process
                    </span>
                    <h2 className="mt-4 font-[Fraunces] text-4xl font-medium leading-tight text-white md:text-5xl">
                        How it works
                    </h2>
                    <p className="mt-5 text-lg leading-7 text-slate-400">
                        Four steps between a resume on your desktop and a
                        career path you can actually act on.
                    </p>
                </div>

                <div className="relative mt-20">
                    {/* connecting rail */}
                    <div className="absolute left-8 right-8 top-8 hidden h-px border-t border-dotted border-slate-700 md:block" />

                    <div className="grid gap-14 md:grid-cols-4 md:gap-8">
                        {steps.map((step, index) => {
                            const Icon = step.icon;
                            return (
                                <div key={index} className="relative">
                                    <div
                                        className="
                                            relative z-10 flex h-16 w-16
                                            items-center justify-center
                                            rounded-full border border-slate-700
                                            bg-gradient-to-b from-[#23262E] to-[#1A1C22]
                                            shadow-[0_0_0_6px_#111318]
                                        "
                                    >
                                        <Icon
                                            className="text-slate-200"
                                            size={26}
                                        />
                                    </div>

                                    <span className="mt-6 block text-xs font-semibold uppercase tracking-widest text-slate-500">
                                        {step.label}
                                    </span>

                                    <h3 className="mt-2 text-xl font-semibold text-white">
                                        {step.title}
                                    </h3>

                                    <p className="mt-3 max-w-xs leading-7 text-slate-400">
                                        {step.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default HowItWorks;