import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
    Compass,
    User,
    ChevronDown,
    BriefcaseBusiness,
    LogOut,
    Moon,
    Sun,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext.jsx";
import { useTheme } from "../../context/ThemeContext.jsx";

function Navbar() {

    const {
        user,
        isAuthenticated,
        logout,
    } = useAuth();
    const { theme, toggleTheme } = useTheme();

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
                border-border
                bg-background/80
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
                            text-foreground
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
                            text-muted-foreground
                            transition
                            hover:text-primary
                        "
                    >
                        Home
                    </Link>

                    <a
                        href="/#features"
                        className="
                            font-medium
                            text-muted-foreground
                            transition
                            hover:text-primary
                        "
                    >
                        Features
                    </a>

                    <a
                        href="/#how-it-works"
                        className="
                            font-medium
                            text-muted-foreground
                            transition
                            hover:text-primary
                        "
                    >
                        How It Works
                    </a>

                    <Link
                        to="/contact"
                        className="
                            font-medium
                            text-muted-foreground
                            transition
                            hover:text-primary
                        "
                    >
                        Contact
                    </Link>

                </nav>


                {/* Authentication */}

                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={toggleTheme}
                        aria-label="Toggle dark mode"
                        className="
                            inline-flex
                            h-10
                            w-10
                            items-center
                            justify-center
                            rounded-full
                            border
                            border-border
                            bg-card
                            text-foreground
                            transition
                            hover:bg-accent
                        "
                    >
                        {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                    </button>

                    {!isAuthenticated ? (

                        /* Logged Out */

                        <Link
                            to="/login"
                            className="
                                rounded-2xl
                                bg-foreground
                                px-6
                                py-3
                                font-semibold
                                text-background
                                transition-all
                                duration-300
                                hover:opacity-90
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
                                    border-border
                                    bg-card
                                    px-3
                                    py-2
                                    text-foreground
                                    shadow-sm
                                    transition
                                    hover:border-border/80
                                    hover:bg-accent
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
                                        bg-foreground
                                        text-background
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
                                    border-border
                                    bg-popover
                                    shadow-xl
                                "
                            >

                                {/* User information */}

                                <div
                                    className="
                                        border-b
                                        border-border
                                        px-5
                                        py-4
                                    "
                                >

                                    <p
                                        className="
                                            font-semibold
                                            text-foreground
                                        "
                                    >
                                        {user?.full_name ||
                                            user?.name ||
                                            "CareerCompass User"}
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
                                        text-foreground
                                        transition
                                        hover:bg-muted
                                        hover:text-primary
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
                                        text-foreground
                                        transition
                                        hover:bg-muted
                                        hover:text-primary
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
                                        border-border
                                        px-5
                                        py-3
                                        text-left
                                        text-sm
                                        font-medium
                                        text-destructive
                                        transition
                                        hover:bg-destructive/10
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

            </div>

        </header>

    );

}

export default Navbar;
