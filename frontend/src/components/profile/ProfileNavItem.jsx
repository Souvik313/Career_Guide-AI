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
                        from-violet-100
                        via-fuchsia-50
                        to-orange-50
                        text-zinc-900
                        shadow-sm
                        shadow-fuchsia-100/60
                    `
                : `
                        text-zinc-500
                        hover:bg-gradient-to-r
                        hover:from-violet-50/80
                        hover:via-fuchsia-50/60
                        hover:to-orange-50/50
                        hover:text-zinc-900
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
                                    bg-zinc-100
                                    text-zinc-500
                                    group-hover:bg-violet-100
                                    group-hover:text-violet-600
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
                                ? "text-zinc-500"
                                : `
                                        text-zinc-400
                                        group-hover:text-zinc-500
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
