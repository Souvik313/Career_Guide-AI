import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

function HeroSection() {
    return(

        <section id = "home" className="flex min-h-[90vh] items-center justify-center bg-slate-50 px-6">

            <div className="mx-auto max-w-4xl text-center">
                <span className="rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
                    AI-Powered Career Guidance
                </span>
                <h1 className="mt-8
                        text-5xl
                        font-extrabold
                        leading-tight
                        text-slate-900
                        md:text-6xl">
                            Discover Your Perfect Career
                            <br />
                            <span className="text-blue-600">With Artificial Intelligence</span>
                </h1>

                <p
                    className="
                        mx-auto
                        mt-8
                        max-w-2xl
                        text-lg
                        leading-8
                        text-slate-600
                    "
                >
                    Upload your resume and let our AI analyze your skills,
                    match you with the best career opportunities,
                    identify missing skills,
                    and generate a personalized career roadmap.
                </p>

                <div
                    className="
                        mt-10
                        flex
                        flex-col
                        items-center
                        justify-center
                        gap-4
                        sm:flex-row
                    "
                >

                    <Link
                        to="/upload"
                        className="
                            flex
                            items-center
                            gap-2
                            rounded-xl
                            bg-blue-600
                            px-8
                            py-4
                            font-semibold
                            text-white
                            transition
                            hover:bg-blue-700
                        "
                    >

                        Upload Resume

                        <ArrowRight size={20} />

                    </Link>

                    <button
                        className="
                            rounded-xl
                            border
                            border-slate-300
                            px-8
                            py-4
                            font-semibold
                            text-slate-700
                            transition
                            hover:bg-slate-100
                        "
                    >
                        Learn More
                    </button>

                    </div>
                    
            </div>

        </section>

    )
}

export default HeroSection;