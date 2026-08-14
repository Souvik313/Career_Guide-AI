import {
    Sparkles,
    Bot,
    BriefcaseBusiness,
} from "lucide-react";

function CareerCoachHeader() {

    return (

        <header
            className="
                relative
                overflow-hidden
                rounded-3xl
                border
                border-amber-500/30
                bg-gradient-to-br
                from-amber-500/15
                via-white
                to-emerald-500/15
                px-6
                py-6
                shadow-lg
                dark:border-slate-700
                dark:bg-[#111827]
                dark:from-transparent
                dark:via-[#111827]
                dark:to-transparent
                dark:shadow-none
                lg:px-8
                lg:py-7
                backdrop-blur-sm
                dark:backdrop-blur-none
            "
        >

            {/* =================================================
                Decorative Background
            ================================================= */}

            <div
                className="
                    pointer-events-none
                    absolute
                    -right-16
                    -top-16
                    h-40
                    w-40
                    rounded-full
                    bg-amber-400/30
                    blur-3xl
                    dark:opacity-20
                "
            />

            <div
                className="
                    pointer-events-none
                    absolute
                    -bottom-20
                    right-24
                    h-40
                    w-40
                    rounded-full
                    bg-emerald-400/30
                    blur-3xl
                    dark:opacity-15
                "
            />


            {/* =================================================
                Content
            ================================================= */}

            <div
                className="
                    relative
                    flex
                    flex-col
                    gap-5
                    sm:flex-row
                    sm:items-center
                    sm:justify-between
                "
            >

                {/* =================================================
                    Left Section
                ================================================= */}

                <div
                    className="
                        flex
                        items-start
                        gap-4
                    "
                >

                    {/* AI Icon */}

                    <div
                        className="
                            flex
                            h-14
                            w-14
                            shrink-0
                            items-center
                            justify-center
                            rounded-2xl
                            bg-gradient-to-br
                            from-amber-400
                            via-orange-400
                            to-emerald-400
                            dark:from-amber-500
                            dark:via-orange-500
                            dark:to-emerald-500
                            text-white
                            shadow-lg
                            shadow-amber-300/50
                            dark:shadow-amber-500/40
                            transition-all
                            duration-300
                            hover:shadow-xl
                            dark:hover:shadow-amber-500/60
                        "
                    >

                        <Bot
                            className="
                                h-7
                                w-7
                            "
                        />

                    </div>


                    {/* Heading */}

                    <div>

                        <div
                            className="
                                mb-1.5
                                flex
                                items-center
                                gap-2
                            "
                        >

                            <h1
                                className="
                                    text-2xl
                                    font-bold
                                    tracking-tight
                                    text-foreground
                                    dark:text-white
                                    sm:text-3xl
                                "
                            >
                                Career Coach
                            </h1>

                            <Sparkles
                                className="
                                    h-5
                                    w-5
                                    text-amber-500
                                    dark:text-amber-400
                                    animate-pulse
                                "
                            />

                        </div>


                        <p
                            className="
                                max-w-2xl
                                text-sm
                                leading-6
                                text-muted-foreground
                                dark:text-gray-400
                                sm:text-base
                            "
                        >
                            Your personal AI career advisor.
                            Ask questions, explore career paths,
                            improve your resume, and plan your
                            next professional move.
                        </p>

                    </div>

                </div>


                {/* =================================================
                    Right Context Indicator
                ================================================= */}

                <div
                    className="
                        flex
                        shrink-0
                        items-center
                        gap-3
                        rounded-2xl
                        border
                        border-border
                        bg-card/80
                        px-4
                        py-3
                        shadow-sm
                        dark:border-slate-700
                        dark:bg-slate-900/90
                        dark:shadow-none
                        backdrop-blur-sm
                        dark:backdrop-blur-none
                    "
                >

                    <div
                        className="
                            flex
                            h-9
                            w-9
                            items-center
                            justify-center
                            rounded-xl
                            bg-emerald-100
                            text-emerald-600
                            dark:bg-emerald-500/15
                            dark:text-emerald-300
                        "
                    >

                        <BriefcaseBusiness
                            className="
                                h-4
                                w-4
                            "
                        />

                    </div>


                    <div>

                        <p
                            className="
                                text-[11px]
                                font-semibold
                                uppercase
                                tracking-wider
                                text-muted-foreground
                                dark:text-gray-500
                            "
                        >
                            AI Career Assistant
                        </p>

                        <div
                            className="
                                mt-0.5
                                flex
                                items-center
                                gap-1.5
                            "
                        >

                            <span
                                className="
                                    h-2
                                    w-2
                                    rounded-full
                                    bg-emerald-500
                                    dark:bg-emerald-400
                                    animate-pulse
                                "
                            />

                            <span
                                className="
                                    text-xs
                                    font-medium
                                    text-emerald-600
                                    dark:text-emerald-400
                                "
                            >
                                Ready to help
                            </span>

                        </div>

                    </div>

                </div>

            </div>

        </header>

    );

}


export default CareerCoachHeader;
