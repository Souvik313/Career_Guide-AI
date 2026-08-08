import { Sparkles } from "lucide-react";

function ProfileSectionCard({
  title,
  description,
  icon: Icon = Sparkles,
  children,
  action,
  variant = "default",
  className = "",
}) {
  const variants = {
    default: `
        border-zinc-200
        bg-white
        shadow-sm
        shadow-zinc-200/40
    `,

    violet: `
        border-violet-200
        bg-gradient-to-br
        from-violet-50
        via-white
        to-fuchsia-50/50
        shadow-sm
        shadow-violet-200/40
    `,

    orange: `
        border-orange-200
        bg-gradient-to-br
        from-orange-50
        via-white
        to-amber-50
        shadow-sm
        shadow-orange-200/40
    `,

    teal: `
        border-teal-200
        bg-gradient-to-br
        from-teal-50
        via-white
        to-emerald-50
        shadow-sm
        shadow-teal-200/40
    `,

    colorful: `
        border-violet-200
        bg-gradient-to-br
        from-violet-50
        via-fuchsia-50/40
        to-orange-50
        shadow-md
        shadow-fuchsia-200/30
    `,
  };

  return (
    <section
      className={`
            relative
            overflow-hidden
            rounded-3xl
            border
            transition-all
            duration-300
            hover:shadow-md
            ${variants[variant] || variants.default}
            ${className}
        `}
    >
      {/* Decorative gradient glow */}

      <div
        className="
                pointer-events-none
                absolute
                -right-16
                -top-16
                h-32
                w-32
                rounded-full
                bg-gradient-to-br
                from-violet-200/30
                via-fuchsia-200/20
                to-orange-200/20
                blur-2xl
            "
      />

      {/* Header */}

      <div
        className="
                relative
                flex
                flex-col
                gap-4
                border-b
                border-zinc-100
                px-6
                py-5
                sm:flex-row
                sm:items-center
                sm:justify-between
            "
      >
        {/* Title / Icon */}

        <div
          className="
                    flex
                    min-w-0
                    items-center
                    gap-3
                "
        >
          <div
            className="
                        flex
                        h-10
                        w-10
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        bg-gradient-to-br
                        from-violet-500
                        via-fuchsia-500
                        to-orange-400
                        text-white
                        shadow-sm
                        shadow-fuchsia-200/60
                    "
          >
            <Icon className="h-5 w-5" />
          </div>

          <div className="min-w-0">
            <h2
              className="
                            truncate
                            text-base
                            font-bold
                            text-zinc-900
                            sm:text-lg
                        "
            >
              {title}
            </h2>

            {description && (
              <p
                className="
                                mt-0.5
                                max-w-xl
                                text-xs
                                leading-5
                                text-zinc-500
                                sm:text-sm
                            "
              >
                {description}
              </p>
            )}
          </div>
        </div>

        {/* Optional Action */}

        {action && (
          <div
            className="
                        shrink-0
                    "
          >
            {action}
          </div>
        )}
      </div>

      {/* Content */}

      <div
        className="
                relative
                px-6
                py-6
            "
      >
        {children}
      </div>
    </section>
  );
}

export default ProfileSectionCard;
