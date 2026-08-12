import { NavLink } from "react-router-dom";

function ProfileNavItem({ label, description, path, icon: Icon }) {
  return (
    <NavLink
      to={path}
      className={({ isActive }) => `
            group
            relative
            flex
            items-center
            gap-3
            rounded-2xl
            px-4
            py-3
            transition-all
            duration-200
            ease-out

            ${
              isActive
                ? `
                        bg-gradient-to-r
                        from-violet-500/10
                        via-fuchsia-500/5
                        to-orange-500/10
                        text-foreground
                        shadow-sm
                        shadow-violet-500/10
                    `
                : `
                        text-muted-foreground
                        hover:bg-muted
                        hover:text-foreground
                    `
            }
        `}
    >
      {({ isActive }) => (
        <>
          {/* Active indicator */}

          <span
            className={`
                        absolute
                        left-0
                        top-1/2
                        h-8
                        w-1
                        -translate-y-1/2
                        rounded-r-full
                        bg-gradient-to-b
                        from-violet-500
                        via-fuchsia-500
                        to-orange-400
                        transition-all
                        duration-200

                        ${
                          isActive
                            ? "scale-y-100 opacity-100"
                            : "scale-y-0 opacity-0"
                        }
                    `}
          />

          {/* Icon */}

          <div
            className={`
                        flex
                        h-10
                        w-10
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        transition-all
                        duration-200

                        ${
                          isActive
                            ? `
                                    bg-gradient-to-br
                                    from-violet-500
                                    via-fuchsia-500
                                    to-orange-400
                                    text-white
                                    shadow-md
                                    shadow-fuchsia-200/70
                                    scale-105
                                `
                            : `
                                    bg-muted
                                    text-muted-foreground
                                    group-hover:bg-accent
                                    group-hover:text-primary
                                    group-hover:scale-105
                                `
                        }
                    `}
          >
            <Icon
              className="
                            h-5
                            w-5
                            transition-transform
                            duration-200
                            group-hover:scale-105
                        "
            />
          </div>

          {/* Text */}

          <div
            className="
                        min-w-0
                        flex-1
                    "
          >
            <p
              className="
                            truncate
                            text-sm
                            font-semibold
                        "
            >
              {label}
            </p>

            <p
              className={`
                            mt-0.5
                            truncate
                            text-xs
                            transition-colors
                            duration-200

                            ${
                              isActive
                                ? "text-muted-foreground"
                                : `
                                        text-muted-foreground/80
                                        group-hover:text-foreground
                                    `
                            }
                        `}
            >
              {description}
            </p>
          </div>
        </>
      )}
    </NavLink>
  );
}

export default ProfileNavItem;
