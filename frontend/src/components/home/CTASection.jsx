import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

function CTASection() {
    return (
        <section id="cta" className="relative overflow-hidden bg-[#10182B] py-28">
            {/* faint dotted path, echoing the roadmap motif from the hero */}
            <div
                className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-30"
                style={{
                    backgroundImage:
                        "linear-gradient(to right, transparent, #F5A623, transparent)",
                }}
            />
            <div
                className="pointer-events-none absolute -bottom-24 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full opacity-[0.15] blur-3xl"
                style={{ background: "#F5A623" }}
            />

            <div className="relative mx-auto max-w-3xl px-6 text-center">
                <span className="text-sm font-semibold uppercase tracking-widest text-[#F5A623]">
                    Your Move
                </span>

                <h2 className="mt-4 font-[Fraunces] text-4xl font-medium leading-tight text-white md:text-5xl">
                    Ready to see your roadmap?
                </h2>

                <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-slate-400">
                    Upload your resume and let CareerCompass AI find your
                    strengths, flag what's missing, and lay out exactly
                    what to learn next — in seconds.
                </p>

                <Link
                    to="/upload"
                    className="
                        mt-10
                        inline-flex
                        items-center
                        gap-3
                        rounded-xl
                        bg-[#F5A623]
                        px-8
                        py-4
                        text-lg
                        font-semibold
                        text-[#10182B]
                        transition-all
                        duration-300
                        hover:bg-[#e6981a]
                        hover:shadow-[0_0_30px_-5px_rgba(245,166,35,0.5)]
                    "
                >
                    Upload Resume
                    <ArrowRight size={22} />
                </Link>
            </div>
        </section>
    );
}

export default CTASection;