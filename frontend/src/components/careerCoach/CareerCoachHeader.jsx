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
                border-amber-200/60
                bg-gradient-to-br
                from-amber-500/10
                via-card
                to-emerald-500/10
                px-6
                py-6
                shadow-sm
                lg:px-8
                lg:py-7
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
                    bg-amber-300/20
                    blur-3xl
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
                    bg-emerald-300/20
                    blur-3xl
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
                            text-white
                            shadow-lg
                            shadow-amber-200/50
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
                                "
                            />

                        </div>


                        <p
                            className="
                                max-w-2xl
                                text-sm
                                leading-6
                                text-muted-foreground
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
                        backdrop-blur-sm
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
                                "
                            />

                            <span
                                className="
                                    text-xs
                                    font-medium
                                    text-emerald-600
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
