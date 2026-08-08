import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
Compass,
User,
ChevronDown,
BriefcaseBusiness,
LogOut,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext.jsx";

function Navbar() {

    const {
        user,
        isAuthenticated,
        logout,
    } = useAuth();

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {

        const handleClickOutside = (event) => {

            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setIsDropdownOpen(false);
            }

        };

        document.addEventListener(
            "mousedown",
            handleClickOutside
        );

        return () => {

            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );

        };

    }, []);

    const handleLogout = () => {

        setIsDropdownOpen(false);

        logout();

    };

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

                    <Link
                        to="/"
                        className="
                            font-medium
                            text-slate-600
                            transition
                            hover:text-blue-600
                        "
                    >
                        Home
                    </Link>

                    <a
                        href="/#features"
                        className="
                            font-medium
                            text-slate-600
                            transition
                            hover:text-blue-600
                        "
                    >
                        Features
                    </a>

                    <a
                        href="/#how-it-works"
                        className="
                            font-medium
                            text-slate-600
                            transition
                            hover:text-blue-600
                        "
                    >
                        How It Works
                    </a>

                    <Link
                        to="/contact"
                        className="
                            font-medium
                            text-slate-600
                            transition
                            hover:text-blue-600
                        "
                    >
                        Contact
                    </Link>

                </nav>


                {/* Authentication */}

                {!isAuthenticated ? (

                    /* Logged Out */

                    <Link
                        to="/login"
                        className="
                            rounded-2xl
                            bg-slate-900
                            px-6
                            py-3
                            font-semibold
                            text-white
                            transition-all
                            duration-300
                            hover:bg-slate-800
                            hover:shadow-xl
                            active:scale-95
                        "
                    >
                        Get Started
                    </Link>

                ) : (

                    /* Logged In */

                    <div
                        ref={dropdownRef}
                        className="relative"
                    >

                        {/* User Button */}

                        <button
                            type="button"
                            onClick={() =>
                                setIsDropdownOpen(
                                    (previous) => !previous
                                )
                            }
                            aria-label="Open account menu"
                            aria-expanded={isDropdownOpen}
                            className="
                                flex
                                items-center
                                gap-2
                                rounded-xl
                                border
                                border-slate-200
                                bg-white
                                px-3
                                py-2
                                text-slate-700
                                shadow-sm
                                transition
                                hover:border-slate-300
                                hover:bg-slate-50
                            "
                        >

                            <div
                                className="
                                    flex
                                    h-9
                                    w-9
                                    items-center
                                    justify-center
                                    rounded-full
                                    bg-slate-900
                                    text-white
                                "
                            >
                                <User size={20} />
                            </div>

                            <ChevronDown
                                size={18}
                                className={`
                                    transition-transform
                                    duration-200
                                    ${
                                        isDropdownOpen
                                            ? "rotate-180"
                                            : ""
                                    }
                                `}
                            />

                        </button>


                        {/* Dropdown */}

                        {isDropdownOpen && (

                            <div
                                className="
                                    absolute
                                    right-0
                                    mt-3
                                    w-64
                                    overflow-hidden
                                    rounded-2xl
                                    border
                                    border-slate-200
                                    bg-white
                                    shadow-xl
                                "
                            >

                                {/* User information */}

                                <div
                                    className="
                                        border-b
                                        border-slate-100
                                        px-5
                                        py-4
                                    "
                                >

                                    <p
                                        className="
                                            font-semibold
                                            text-slate-900
                                        "
                                    >
                                        {user?.full_name ||
                                            user?.name ||
                                            "CareerCompass User"}
                                    </p>

                                    <p
                                        className="
                                            mt-1
                                            truncate
                                            text-sm
                                            text-slate-500
                                        "
                                    >
                                        {user?.email || ""}
                                    </p>

                                </div>


                                {/* View Profile */}

                                <Link
                                    to="/profile"
                                    onClick={() =>
                                        setIsDropdownOpen(false)
                                    }
                                    className="
                                        flex
                                        items-center
                                        gap-3
                                        px-5
                                        py-3
                                        text-sm
                                        font-medium
                                        text-slate-700
                                        transition
                                        hover:bg-slate-50
                                        hover:text-blue-600
                                    "
                                >

                                    <User size={18} />

                                    <span>
                                        View Profile
                                    </span>

                                </Link>


                                {/* Job Updates */}

                                <Link
                                    to="/job-updates"
                                    onClick={() =>
                                        setIsDropdownOpen(false)
                                    }
                                    className="
                                        flex
                                        items-center
                                        gap-3
                                        px-5
                                        py-3
                                        text-sm
                                        font-medium
                                        text-slate-700
                                        transition
                                        hover:bg-slate-50
                                        hover:text-blue-600
                                    "
                                >

                                    <BriefcaseBusiness
                                        size={18}
                                    />

                                    <span>
                                        Job Updates
                                    </span>

                                </Link>


                                {/* Sign Out */}

                                <button
                                    type="button"
                                    onClick={handleLogout}
                                    className="
                                        flex
                                        w-full
                                        items-center
                                        gap-3
                                        border-t
                                        border-slate-100
                                        px-5
                                        py-3
                                        text-left
                                        text-sm
                                        font-medium
                                        text-red-600
                                        transition
                                        hover:bg-red-50
                                    "
                                >

                                    <LogOut size={18} />

                                    <span>
                                        Sign Out
                                    </span>

                                </button>

                            </div>

                        )}

                    </div>

                )}

            </div>

        </header>

    );

}

export default Navbar;
