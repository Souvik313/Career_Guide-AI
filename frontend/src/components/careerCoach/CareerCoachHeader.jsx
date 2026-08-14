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
        rounded-2xl
        border
        border-amber-500/30
        bg-gradient-to-br
        from-amber-500/10
        via-white
        to-emerald-500/10
        px-6
        py-4
        shadow-md
        dark:border-slate-700
        dark:bg-[#111827]
        dark:from-transparent
        dark:via-[#111827]
        dark:to-transparent
        dark:shadow-none
        lg:px-7
        lg:py-5
        backdrop-blur-sm
        dark:backdrop-blur-none
      "
    >
      {/* Decorative Background */}
      <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-amber-400/25 blur-2xl dark:opacity-20" />
      <div className="pointer-events-none absolute -bottom-16 right-20 h-32 w-32 rounded-full bg-emerald-400/25 blur-2xl dark:opacity-15" />

      {/* Content */}
      <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Left Section */}
        <div className="flex items-start gap-3">
          {/* AI Icon */}
          <div
            className="
              flex h-12 w-12 shrink-0 items-center justify-center
              rounded-xl bg-gradient-to-br from-amber-400 via-orange-400 to-emerald-400
              dark:from-amber-500 dark:via-orange-500 dark:to-emerald-500
              text-white shadow-md shadow-amber-300/40 dark:shadow-amber-500/30
              transition-all duration-300 hover:shadow-lg
            "
          >
            <Bot className="h-6 w-6" />
          </div>

          {/* Heading */}
          <div>
            <div className="mb-1 flex items-center gap-2">
              <h1
                className="
                  text-xl sm:text-2xl font-extrabold tracking-tight
                  text-foreground dark:text-white
                "
              >
                Career Coach
              </h1>
              <Sparkles className="h-4 w-4 text-amber-500 dark:text-amber-400 animate-pulse" />
            </div>

            <p
              className="
                max-w-xl text-sm sm:text-base leading-6
                text-muted-foreground dark:text-gray-400
              "
            >
              Smart guidance for your career growth — explore paths, refine your resume, and plan your next move.
            </p>
          </div>
        </div>

        {/* Right Context Indicator */}
        <div
          className="
            flex shrink-0 items-center gap-3 rounded-xl border border-border
            bg-card/80 px-3 py-2 shadow-sm
            dark:border-slate-700 dark:bg-slate-900/90 dark:shadow-none
            backdrop-blur-sm dark:backdrop-blur-none
          "
        >
          <div
            className="
              flex h-8 w-8 items-center justify-center rounded-lg
              bg-emerald-100 text-emerald-600
              dark:bg-emerald-500/15 dark:text-emerald-300
            "
          >
            <BriefcaseBusiness className="h-4 w-4" />
          </div>

          <div>
            <p
              className="
                text-[10px] font-semibold uppercase tracking-wider
                text-muted-foreground dark:text-gray-500
              "
            >
              AI Career Assistant
            </p>
            <div className="mt-0.5 flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
              <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
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
