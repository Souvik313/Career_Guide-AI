import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

function HeroSection() {
    return (
        <section
            id="home"
            className="relative overflow-hidden bg-[#F4F6FB] px-6 py-24 md:py-32"
        >
            {/* faint dotted texture, not a gradient blob */}
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.4]"
                style={{
                    backgroundImage:
                        "radial-gradient(#c7cede 1px, transparent 1px)",
                    backgroundSize: "22px 22px",
                }}
            />

            <div className="relative mx-auto grid max-w-6xl items-center gap-16 md:grid-cols-2">
                {/* Left: copy */}
                <div className="text-left">
                    <span className="inline-flex items-center gap-2 rounded-full border border-[#2452FF]/20 bg-white px-4 py-1.5 text-sm font-medium text-[#2452FF] shadow-sm">
                        <Sparkles size={14} />
                        Career Intelligence, Not Guesswork
                    </span>

                    <h1 className="mt-8 font-[Fraunces] text-5xl font-medium leading-[1.05] text-[#10182B] md:text-6xl">
                        Your resume,
                        <br />
                        turned into a{" "}
                        <span className="italic text-[#2452FF]">roadmap.</span>
                    </h1>

                    <p className="mt-6 max-w-md text-lg leading-7 text-slate-500">
                        Upload it once. Our AI reads your skills, matches you
                        against real roles, flags what's missing, and lays
                        out exactly what to learn next.
                    </p>

                    <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                        <Link
                            to="/upload"
                            className="flex items-center justify-center gap-2 rounded-xl bg-[#2452FF] px-8 py-4 font-semibold text-white shadow-lg shadow-[#2452FF]/20 transition hover:bg-[#1c3fd6]"
                        >
                            Get Started
                            <ArrowRight size={20} />
                        </Link>

                        <button className="rounded-xl border border-slate-300 bg-white px-8 py-4 font-semibold text-slate-700 transition hover:border-slate-400">
                            Learn More
                        </button>
                    </div>
                </div>

                {/* Right: signature visual — resume being scanned into a roadmap */}
                <div className="relative mx-auto hidden w-full max-w-sm md:block">
                    <div className="absolute inset-0 -rotate-3 rounded-2xl bg-[#2452FF]/5" />
                    <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-xl">
                        {/* fake resume lines */}
                        <div className="space-y-3">
                            <div className="h-3 w-2/3 rounded bg-slate-200" />
                            <div className="h-2 w-1/2 rounded bg-slate-100" />
                            <div className="mt-5 h-2 w-full rounded bg-slate-100" />
                            <div className="h-2 w-11/12 rounded bg-slate-100" />
                            <div className="h-2 w-4/5 rounded bg-slate-100" />
                            <div className="mt-5 h-2 w-full rounded bg-slate-100" />
                            <div className="h-2 w-3/4 rounded bg-slate-100" />
                        </div>

                        {/* scanning line */}
                        <div className="scan-line pointer-events-none absolute inset-x-0 h-10 bg-gradient-to-b from-transparent via-[#2452FF]/15 to-transparent" />

                        {/* skill tags peeling off */}
                        <div className="mt-6 flex flex-wrap gap-2">
                            {["React", "SQL", "Leadership"].map((tag, i) => (
                                <span
                                    key={tag}
                                    className="tag-pop rounded-full bg-[#F5A623]/10 px-3 py-1 text-xs font-medium text-[#a86a0f]"
                                    style={{ animationDelay: `${0.4 + i * 0.15}s` }}
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>

                        {/* dotted path to matched role */}
                        <div className="relative mt-6 h-8">
                            <div className="absolute inset-x-2 top-1/2 border-t-2 border-dotted border-[#F5A623]/50" />
                        </div>

                        <div className="tag-pop flex items-center justify-between rounded-xl bg-[#10182B] px-4 py-3" style={{ animationDelay: "1s" }}>
                            <span className="text-xs font-medium text-slate-300">
                                Matched Role
                            </span>
                            <span className="text-sm font-semibold text-white">
                                Frontend Engineer
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes scanMove {
                    0% { top: -10%; }
                    100% { top: 100%; }
                }
                .scan-line {
                    animation: scanMove 3.5s ease-in-out infinite;
                }
                @keyframes tagPop {
                    0% { opacity: 0; transform: translateY(6px); }
                    100% { opacity: 1; transform: translateY(0); }
                }
                .tag-pop {
                    opacity: 0;
                    animation: tagPop 0.5s ease-out forwards;
                }
                @media (prefers-reduced-motion: reduce) {
                    .scan-line, .tag-pop {
                        animation: none;
                        opacity: 1;
                    }
                }
            `}</style>
        </section>
    );
}

export default HeroSection;