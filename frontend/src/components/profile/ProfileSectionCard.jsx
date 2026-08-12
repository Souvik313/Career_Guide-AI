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
        border-border
        bg-card
        shadow-sm
        shadow-black/5
    `,

    violet: `
        border-violet-500/20
        bg-gradient-to-br
        from-violet-500/10
        via-card
        to-fuchsia-500/5
        shadow-sm
        shadow-violet-500/10
    `,

    orange: `
        border-orange-500/20
        bg-gradient-to-br
        from-orange-500/8
        via-card
        to-amber-500/5
        shadow-sm
        shadow-orange-500/10
    `,

    teal: `
        border-teal-500/20
        bg-gradient-to-br
        from-teal-500/8
        via-card
        to-emerald-500/5
        shadow-sm
        shadow-teal-500/10
    `,

    colorful: `
        border-violet-500/20
        bg-gradient-to-br
        from-violet-500/10
        via-fuchsia-500/5
        to-orange-500/8
        shadow-md
        shadow-violet-500/10
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
                border-border
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
                            text-foreground
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
                                text-muted-foreground
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
