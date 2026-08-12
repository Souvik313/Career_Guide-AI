import { NavLink } from "react-router-dom";

import {
  UserRound,
  FileText,
  Bookmark,
  MessageSquare,
  Settings,
  LogOut,
  Sparkles,
} from "lucide-react";

import { Separator } from "../ui/separator";
import { Button } from "../ui/button";

import { useAuth } from "../../context/AuthContext.jsx";

const navigationItems = [
  {
    label: "Personal Info",
    description: "Your account details",
    path: "/profile/personal-info",
    icon: UserRound,
  },
  {
    label: "Resumes",
    description: "Manage your resumes",
    path: "/profile/resumes",
    icon: FileText,
  },
  {
    label: "Saved Jobs",
    description: "Your saved opportunities",
    path: "/profile/saved-jobs",
    icon: Bookmark,
  },
  {
    label: "Conversations",
    description: "Your AI conversations",
    path: "/profile/conversations",
    icon: MessageSquare,
  },
  {
    label: "Settings",
    description: "Manage your preferences",
    path: "/profile/settings",
    icon: Settings,
  },
];

function ProfileSidebar() {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <aside
      className="
            sticky
            top-20
            hidden
            h-[calc(100vh-5rem)]
            w-80
            shrink-0
            flex-col
            border-r
            border-border
            bg-card
            px-5
            py-7
            lg:flex
            overflow-y-auto
            scrollbar-thin
        "
    >
      {/* Profile Identity */}

      <div className="mb-8">
        <div
          className="
                    mb-5
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-2xl
                    bg-gradient-to-br
                    from-violet-500
                    via-fuchsia-500
                    to-orange-400
                    text-white
                    shadow-lg
                    shadow-fuchsia-200
                "
        >
          <Sparkles className="h-7 w-7" />
        </div>

        <h2
          className="
                    text-xl
                    font-bold
                    tracking-tight
                    text-foreground
                "
        >
          Your Profile
        </h2>

        <p
          className="
                    mt-1
                    text-sm
                    leading-6
                    text-muted-foreground
                "
        >
          Manage your CareerCompass AI workspace and account.
        </p>
      </div>

      <Separator className="mb-6 bg-border" />

      {/* Navigation */}

      <nav
        className="
                flex
                flex-1
                flex-col
                gap-2
            "
      >
        {navigationItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
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

                            ${
                              isActive
                                ? `
                                        bg-gradient-to-r
                                        from-violet-500/10
                                        via-fuchsia-500/5
                                        to-orange-500/10
                                        text-foreground
                                        shadow-sm
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

                  {isActive && (
                    <span
                      className="
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
                                        "
                    />
                  )}

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
                                                    to-fuchsia-500
                                                    text-white
                                                    shadow-md
                                                    shadow-fuchsia-200
                                                `
                                            : `
                                                    bg-muted
                                                    text-muted-foreground
                                                    group-hover:bg-accent
                                                    group-hover:text-primary
                                                `
                                        }
                                    `}
                  >
                    <Icon className="h-5 w-5" />
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
                      {item.label}
                    </p>

                    <p
                      className={`
                                            mt-0.5
                                            truncate
                                            text-xs
                                            ${
                                              isActive
                                                ? "text-muted-foreground"
                                                : "text-muted-foreground/80"
                                            }
                                        `}
                    >
                      {item.description}
                    </p>
                  </div>
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Logout */}

      <div className="mt-auto pt-6">
        <Separator className="mb-5 bg-border" />

        <Button
          type="button"
          variant="ghost"
          onClick={handleLogout}
          className="
                    group
                    h-12
                    w-full
                    justify-start
                    rounded-2xl
                    px-4
                    text-muted-foreground
                    hover:bg-muted
                    hover:text-destructive
                "
        >
          <div
            className="
                        mr-3
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-xl
                        bg-destructive/10
                        text-destructive
                        transition-colors
                        group-hover:bg-destructive/15
                    "
          >
            <LogOut className="h-4 w-4" />
          </div>

          <div className="text-left">
            <p
              className="
                            text-sm
                            font-semibold
                        "
            >
              Log Out
            </p>

            <p
              className="
                            text-xs
                            text-muted-foreground
                            group-hover:text-destructive
                        "
            >
              Sign out of your account
            </p>
          </div>
        </Button>
      </div>
    </aside>
  );
}

export default ProfileSidebar;
