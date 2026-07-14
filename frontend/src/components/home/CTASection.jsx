import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

function CTASection() {
    return (
        <section id="cta" className="bg-blue-600 py-24">

            <div className="mx-auto max-w-4xl px-6 text-center">

                <h2 className="text-4xl font-bold text-white md:text-5xl">

                    Ready to Discover Your Ideal Career?

                </h2>

                <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-blue-100">

                    Upload your resume and let CareerCompass AI analyze your
                    profile, identify your strengths, highlight missing skills,
                    and generate a personalized career roadmap in seconds.

                </p>

                <Link
                    to="/upload"
                    className="
                        mt-10
                        inline-flex
                        items-center
                        gap-3
                        rounded-xl
                        bg-white
                        px-8
                        py-4
                        text-lg
                        font-semibold
                        text-blue-600
                        transition-all
                        duration-300
                        hover:scale-105
                        hover:shadow-xl
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