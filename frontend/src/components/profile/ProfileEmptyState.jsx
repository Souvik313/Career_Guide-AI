import { Sparkles } from "lucide-react";

import { Button } from "../ui/button";

function ProfileEmptyState({
icon: Icon = Sparkles,
title = "Nothing here yet",
description = "Once you start using CareerCompass AI, your information will appear here.",
actionLabel,
onAction,
variant = "violet",
}) {

const variants = {

    violet: {
        container: `
            border-violet-200
            bg-gradient-to-br
            from-violet-50
            via-white
            to-fuchsia-50
        `,
        icon: `
            from-violet-500
            via-fuchsia-500
            to-orange-400
        `,
        button: `
            bg-zinc-900
            hover:bg-zinc-800
        `,
    },

    orange: {
        container: `
            border-orange-200
            bg-gradient-to-br
            from-orange-50
            via-white
            to-amber-50
        `,
        icon: `
            from-orange-400
            via-amber-400
            to-yellow-300
        `,
        button: `
            bg-orange-500
            hover:bg-orange-600
        `,
    },

    teal: {
        container: `
            border-teal-200
            bg-gradient-to-br
            from-teal-50
            via-white
            to-emerald-50
        `,
        icon: `
            from-teal-400
            via-emerald-400
            to-green-300
        `,
        button: `
            bg-teal-600
            hover:bg-teal-700
        `,
    },

    colorful: {
        container: `
            border-fuchsia-200
            bg-gradient-to-br
            from-violet-50
            via-fuchsia-50
            to-orange-50
        `,
        icon: `
            from-violet-500
            via-fuchsia-500
            to-orange-400
        `,
        button: `
            bg-gradient-to-r
            from-violet-600
            via-fuchsia-600
            to-orange-500
            hover:opacity-90
        `,
    },

};


const currentVariant =
    variants[variant] || variants.violet;


return (

    <div
        className={`
            relative
            overflow-hidden
            rounded-3xl
            border
            px-6
            py-14
            text-center
            shadow-sm
            ${currentVariant.container}
        `}
    >

        {/* Decorative background shapes */}

        <div
            className="
                pointer-events-none
                absolute
                -left-16
                -top-16
                h-40
                w-40
                rounded-full
                bg-violet-200/30
                blur-3xl
            "
        />


        <div
            className="
                pointer-events-none
                absolute
                -bottom-20
                -right-16
                h-44
                w-44
                rounded-full
                bg-orange-200/30
                blur-3xl
            "
        />


        {/* Icon */}

        <div
            className="
                relative
                mx-auto
                mb-6
                flex
                h-16
                w-16
                items-center
                justify-center
                rounded-2xl
                bg-white
                shadow-md
                ring-1
                ring-zinc-100
            "
        >

            <div
                className={`
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-xl
                    bg-gradient-to-br
                    text-white
                    shadow-sm
                    ${currentVariant.icon}
                `}
            >

                <Icon
                    className="h-5 w-5"
                />

            </div>

        </div>


        {/* Title */}

        <h3
            className="
                relative
                text-xl
                font-bold
                tracking-tight
                text-zinc-900
            "
        >
            {title}
        </h3>


        {/* Description */}

        <p
            className="
                relative
                mx-auto
                mt-2
                max-w-md
                text-sm
                leading-6
                text-zinc-500
            "
        >
            {description}
        </p>


        {/* Optional Action */}

        {actionLabel && onAction && (

            <Button
                type="button"
                onClick={onAction}
                className={`
                    relative
                    mt-6
                    rounded-xl
                    px-6
                    font-semibold
                    text-white
                    shadow-md
                    transition-all
                    duration-200
                    hover:-translate-y-0.5
                    hover:shadow-lg
                    ${currentVariant.button}
                `}
            >

                {actionLabel}

            </Button>

        )}

    </div>

);

}

export default ProfileEmptyState;
