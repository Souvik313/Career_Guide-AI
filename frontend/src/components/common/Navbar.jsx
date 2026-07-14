import { Link } from "react-router-dom";
import { Compass } from "lucide-react";

function Navbar() {

    return (

        <header
            className="
                sticky
                top-0
                z-50
                border-b
                border-slate-200
                bg-white/80
                backdrop-blur-md
            "
        >

            <div
                className="
                    mx-auto
                    flex
                    h-20
                    max-w-7xl
                    items-center
                    justify-between
                    px-6
                "
            >

                {/* Logo */}

                <Link
                    to="/"
                    className="flex items-center gap-3"
                >

                    <div
                        className="
                            rounded-xl
                            bg-blue-600
                            p-2
                            text-white
                        "
                    >

                        <Compass size={24} />

                    </div>

                    <span
                        className="
                            text-xl
                            font-bold
                            text-slate-900
                        "
                    >

                        CareerCompass AI

                    </span>

                </Link>

                {/* Navigation */}

                <nav
                    className="
                        hidden
                        items-center
                        gap-8
                        md:flex
                    "
                >

                    <a
                        href="#home"
                        className="font-medium text-slate-600 transition hover:text-blue-600"
                    >
                        Home
                    </a>

                    <a
                        href="#features"
                        className="font-medium text-slate-600 transition hover:text-blue-600"
                    >
                        Features
                    </a>

                    <a
                        href="#how-it-works"
                        className="font-medium text-slate-600 transition hover:text-blue-600"
                    >
                        How It Works
                    </a>

                    <a
                        href="#tech-stack"
                        className="font-medium text-slate-600 transition hover:text-blue-600"
                    >
                        Tech Stack
                    </a>

                </nav>

                {/* CTA */}

                <Link
                    to="/upload"
                    className="
                        rounded-xl
                        bg-blue-600
                        px-6
                        py-3
                        font-semibold
                        text-white
                        transition-all
                        duration-300
                        hover:bg-blue-700
                        hover:shadow-lg
                    "
                >

                    Upload Resume

                </Link>

            </div>

        </header>

    );

}

export default Navbar;