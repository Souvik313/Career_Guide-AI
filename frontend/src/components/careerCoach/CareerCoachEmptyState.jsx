import {
  Bot,
  BriefcaseBusiness,
  ChevronDown,
  Sparkles,
  FileText,
  ArrowRight,
} from "lucide-react";

function CareerCoachEmptyState({
  resumes = [],
  selectedResumeId = null,
  onResumeChange,
  onStartConversation,
  loading = false,
}) {
  /* =====================================================
       Selected Resume
    ===================================================== */

  const selectedResume =
    resumes.find((resume) => String(resume.id) === String(selectedResumeId)) ||
    null;

  /* =====================================================
       Start Conversation
    ===================================================== */

  const handleStartConversation = () => {
    if (loading) {
      return;
    }

    onStartConversation?.(selectedResumeId);
  };

  /* =====================================================
       Suggested Prompts
    ===================================================== */

  const suggestions = [
    {
      label: "Improve my resume",
      icon: FileText,
    },

    {
      label: "What skills should I learn?",
      icon: Sparkles,
    },

    {
      label: "Prepare me for interviews",
      icon: BriefcaseBusiness,
    },
  ];

  /* =====================================================
       Render
    ===================================================== */

  return (
    <div
      className="
                flex
                min-h-full
                items-center
                justify-center
                px-5
                py-10
                sm:px-8
                lg:px-12
                bg-gradient-to-b
                from-background
                via-background
                dark:via-emerald-950/5
                to-background
            "
    >
      <div
        className="
                    w-full
                    max-w-2xl
                "
      >
        {/* =================================================
                    Hero
                ================================================= */}

        <div
          className="
                        text-center
                    "
        >
          {/* AI Icon */}

          <div
            className="
                            mx-auto
                            flex
                            h-20
                            w-20
                            items-center
                            justify-center
                            rounded-3xl
                            bg-gradient-to-br
                            from-amber-100
                            via-orange-100
                            to-emerald-100
                            dark:from-amber-500/20
                            dark:via-orange-500/20
                            dark:to-emerald-500/20
                            shadow-sm
                            dark:shadow-lg
                            dark:shadow-emerald-500/10
                        "
          >
            <div
              className="
                                flex
                                h-14
                                w-14
                                items-center
                                justify-center
                                rounded-2xl
                                bg-gradient-to-br
                                from-emerald-400
                                via-teal-500
                                to-cyan-500
                                dark:from-emerald-500
                                dark:via-teal-500
                                dark:to-cyan-500
                                text-white
                                shadow-md
                                dark:shadow-lg
                                dark:shadow-emerald-500/30
                                transition-all
                                duration-300
                                animate-pulse
                            "
            >
              <Bot
                className="
                                    h-7
                                    w-7
                                "
              />
            </div>
          </div>

          {/* Heading */}

          <h2
            className="
                            mt-6
                            text-2xl
                            font-bold
                            tracking-tight
                            text-foreground
                            dark:text-white
                            sm:text-3xl
                        "
          >
            Your Career Coach is ready
          </h2>

          {/* Description */}

          <p
            className="
                            mx-auto
                            mt-3
                            max-w-xl
                            text-sm
                            leading-7
                            text-muted-foreground
                            dark:text-gray-400
                            sm:text-base
                        "
          >
            Get personalized guidance on your resume, skills, job search,
            interviews, career direction, and more.
          </p>
        </div>

        {/* =================================================
                    Resume Context Card
                ================================================= */}

        <div
          className="
                        mt-8
                        rounded-3xl
                        border
                        border-amber-200/60
                        dark:border-amber-500/20
                        bg-gradient-to-br
                        from-amber-500/10
                        via-card
                        to-emerald-500/10
                        dark:from-amber-600/10
                        dark:via-card
                        dark:to-emerald-600/10
                        p-5
                        shadow-sm
                        dark:shadow-lg
                        dark:shadow-black/30
                        sm:p-6
                        backdrop-blur-sm
                        dark:backdrop-blur-md
                    "
        >
          <div
            className="
                            flex
                            items-start
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
                                bg-white
                                dark:bg-amber-500/20
                                text-amber-500
                                dark:text-amber-400
                                shadow-sm
                            "
            >
              <BriefcaseBusiness
                className="
                                    h-5
                                    w-5
                                "
              />
            </div>

            <div
              className="
                                min-w-0
                            "
            >
              <h3
                className="
                                    text-sm
                                    font-bold
                                    text-foreground
                                    dark:text-white
                                "
              >
                Choose your resume context
              </h3>

              <p
                className="
                                    mt-1
                                    text-xs
                                    leading-5
                                    text-muted-foreground
                                    dark:text-gray-400
                                "
              >
                Select a resume so Career Coach can give you advice based on
                your actual experience and skills.
              </p>
            </div>
          </div>

          {/* =================================================
                        Resume Selector
                    ================================================= */}

          <div
            className="
                            relative
                            mt-5
                        "
          >
            <select
              value={selectedResumeId ?? ""}
              onChange={(event) => onResumeChange?.(event.target.value || null)}
              disabled={loading}
              className="
                                h-12
                                w-full
                                appearance-none
                                rounded-xl
                                border
                                border-border
                                dark:border-amber-500/30
                                bg-card
                                dark:bg-amber-950/20
                                px-4
                                pr-11
                                text-sm
                                font-medium
                                text-foreground
                                dark:text-white
                                dark:placeholder-gray-500
                                outline-none
                                transition
                                duration-200
                                focus:border-amber-300
                                dark:focus:border-amber-500/50
                                focus:ring-2
                                focus:ring-amber-100
                                dark:focus:ring-amber-500/20
                                disabled:cursor-not-allowed
                                disabled:opacity-60
                            "
            >
              <option value="">General career guidance</option>

              {resumes.map((resume) => (
                <option key={resume.id} value={resume.id}>
                  {resume.title || resume.filename || `Resume #${resume.id}`}
                </option>
              ))}
            </select>

            <ChevronDown
              className="
                                pointer-events-none
                                absolute
                                right-4
                                top-1/2
                                h-4
                                w-4
                                -translate-y-1/2
                                text-muted-foreground
                                dark:text-gray-500
                            "
            />
          </div>

          {/* Selected Resume Indicator */}

          {selectedResume && (
            <div
              className="
                                mt-3
                                flex
                                items-center
                                gap-2
                                rounded-xl
                                border
                                border-emerald-500/20
                                dark:border-emerald-500/30
                                bg-card/80
                                dark:bg-emerald-950/20
                                px-3
                                py-2.5
                                backdrop-blur-sm
                            "
            >
              <FileText
                className="
                                    h-4
                                    w-4
                                    shrink-0
                                    text-emerald-500
                                    dark:text-emerald-400
                                "
              />

              <p
                className="
                                    min-w-0
                                    truncate
                                    text-xs
                                    font-medium
                                    text-muted-foreground
                                    dark:text-gray-400
                                "
              >
                Using{" "}
                <span
                  className="
                                        font-semibold
                                        text-foreground
                                    "
                >
                  {selectedResume.title ||
                    selectedResume.filename ||
                    `Resume #${selectedResume.id}`}
                </span>{" "}
                as conversation context.
              </p>
            </div>
          )}

          {/* =================================================
                        Start Button
                    ================================================= */}

          <button
            type="button"
            onClick={handleStartConversation}
            disabled={loading}
            className="
                            mt-5
                            flex
                            h-12
                            w-full
                            items-center
                            justify-center
                            gap-2
                            rounded-xl
                            bg-gradient-to-r
                            from-amber-400
                            via-orange-400
                            to-emerald-500
                            dark:from-amber-500
                            dark:via-orange-500
                            dark:to-emerald-500
                            px-5
                            text-sm
                            font-bold
                            text-white
                            dark:text-white
                            shadow-sm
                            shadow-amber-300/40
                            dark:shadow-lg
                            dark:shadow-amber-500/30
                            transition-all
                            duration-200
                            hover:shadow-md
                            dark:hover:shadow-amber-500/50
                            hover:brightness-105
                            dark:hover:brightness-110
                            active:scale-[0.99]
                            disabled:cursor-not-allowed
                            disabled:opacity-50
                        "
          >
            <Sparkles
              className="
                                h-4
                                w-4
                            "
            />

            {loading ? "Starting Career Coach..." : "Start Conversation"}

            {!loading && (
              <ArrowRight
                className="
                                    h-4
                                    w-4
                                "
              />
            )}
          </button>
        </div>

        {/* =================================================
                    Suggested Topics
                ================================================= */}

        <div
          className="
                        mt-8
                    "
        >
          <div
            className="
                            mb-3
                            flex
                            items-center
                            justify-center
                            gap-2
                        "
          >
            <Sparkles
              className="
                                h-3.5
                                w-3.5
                                text-amber-500
                                dark:text-amber-400
                            "
            />

            <p
              className="
                                text-xs
                                font-semibold
                                text-muted-foreground
                                dark:text-gray-500
                            "
            >
              Popular things to ask Career Coach
            </p>
          </div>

          <div
            className="
                            flex
                            flex-wrap
                            justify-center
                            gap-2
                        "
          >
            {suggestions.map((suggestion) => {
              const Icon = suggestion.icon;

              return (
                <button
                  key={suggestion.label}
                  type="button"
                  disabled={loading}
                  onClick={() => {
                    console.log(
                      "CareerCoachEmptyState: suggestion clicked",
                      {
                          resumeId: selectedResumeId,
                          message: suggestion.label,
                      }
                  );
                    onStartConversation?.(selectedResumeId, suggestion.label)
                  }}
                  className="
                                            flex
                                            items-center
                                            gap-2
                                            rounded-full
                                            border
                                            border-border
                                            dark:border-amber-500/20
                                            bg-card
                                            dark:bg-amber-950/20
                                            px-3.5
                                            py-2
                                            text-xs
                                            font-medium
                                            text-foreground/80
                                            dark:text-gray-300
                                            shadow-sm
                                            dark:shadow-lg
                                            dark:shadow-black/20
                                            transition
                                            duration-200
                                            hover:border-amber-300
                                            dark:hover:border-amber-500/40
                                            hover:bg-amber-500/10
                                            dark:hover:bg-amber-500/20
                                            hover:text-amber-600
                                            dark:hover:text-amber-400
                                            disabled:cursor-not-allowed
                                            disabled:opacity-50
                                        "
                >
                  <Icon
                    className="
                                                h-3.5
                                                w-3.5
                                            "
                  />

                  {suggestion.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* =================================================
                    Context Explanation
                ================================================= */}

        <p
          className="
                        mx-auto
                        mt-6
                        max-w-lg
                        text-center
                        text-[10px]
                        leading-5
                        text-muted-foreground
                    "
        >
          Your selected resume is used as context for personalized career
          guidance. You can start a general conversation without selecting a
          resume as well.
        </p>
      </div>
    </div>
  );
}

export default CareerCoachEmptyState;
