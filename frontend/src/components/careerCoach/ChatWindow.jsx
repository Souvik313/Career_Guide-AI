import {
  Bot,
  User,
  Sparkles,
  Clock3,
  Plus,
  BriefcaseBusiness,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { Separator } from "../ui/separator.jsx";

function ChatWindow({
  conversation = null,
  messages = [],
  loading = false,
  error = null,
  resumeName = null,
  onNewConversation,
  children,
}) {
  /* =====================================================
       Format Message Time
    ===================================================== */

  const formatTime = (value) => {
    if (!value) {
      return null;
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return null;
    }

    return date.toLocaleString("en-IN", {
      day: "numeric",
      month: "short",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  /* =====================================================
       Resolve Conversation Title
    ===================================================== */

  const conversationTitle = conversation?.title || "Career Coach";

  /* =====================================================
       Render Message
    ===================================================== */

  const renderMessage = (message, index) => {
    const isUser = message.role === "user";

    const content = message.content ?? message.message ?? "";

    const timestamp = formatTime(message.created_at || message.timestamp);

    return (
      <div
        key={message.id || `${message.role}-${index}`}
        className={`
                    flex
                    gap-3
                    sm:gap-4
                    ${isUser ? "flex-row-reverse" : "flex-row"}
                `}
      >
        {/* =================================================
                    Avatar
                ================================================= */}

        <div
          className={`
                        flex
                        h-9
                        w-9
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        text-white
                        shadow-sm
                        sm:h-10
                        sm:w-10
                        ${
                          isUser
                            ? `
                                    bg-amber-500
                                    dark:bg-amber-500
                                  `
                            : `
                                    bg-emerald-500
                                    dark:bg-emerald-500
                                  `
                        }
                    `}
        >
          {isUser ? (
            <User
              className="
                                h-4
                                w-4
                                sm:h-5
                                sm:w-5
                            "
            />
          ) : (
            <Bot
              className="
                                h-4
                                w-4
                                sm:h-5
                                sm:w-5
                            "
            />
          )}
        </div>

        {/* =================================================
                    Message Content
                ================================================= */}

        <div
          className={`
                        flex
                        max-w-[85%]
                        flex-col
                        lg:max-w-[75%]
                        ${isUser ? "items-end" : "items-start"}
                    `}
        >
          {/* Message Bubble */}

          <div
            className={`
                            rounded-2xl
                            px-4
                            py-3.5
                            text-sm
                            leading-7
                            sm:px-5
                            sm:py-4
                            ${
                              isUser
                                ? `
                                        rounded-tr-md
                                        bg-amber-500
                                        text-white
                                        shadow-sm
                                        dark:bg-amber-500
                                      `
                                : `
                                        rounded-tl-md
                                        border
                                        border-border
                                        bg-card
                                        text-foreground
                                        shadow-sm
                                        dark:border-slate-700
                                        dark:bg-slate-800
                                        dark:text-slate-100
                                      `
                            }
                        `}
          >
            <div className="prose prose-sm max-w-none">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {content}
              </ReactMarkdown>
            </div>
          </div>

          {/* Timestamp */}

          {timestamp && (
            <div
              className={`
                                mt-2
                                flex
                                items-center
                                gap-1.5
                                text-[10px]
                                text-muted-foreground
                                sm:text-[11px]
                                ${isUser ? "justify-end" : "justify-start"}
                            `}
            >
              <Clock3
                className="
                                    h-3
                                    w-3
                                "
              />

              {timestamp}
            </div>
          )}
        </div>
      </div>
    );
  };

  /* =====================================================
       AI Thinking Indicator
    ===================================================== */

  const renderThinkingIndicator = () => {
    if (!loading) {
      return null;
    }

    return (
      <div
        className="
                    flex
                    items-start
                    gap-3
                    sm:gap-4
                "
      >
        {/* AI Avatar */}

        <div
          className="
                        flex
                        h-9
                        w-9
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        bg-gradient-to-br
                        from-emerald-400
                        via-teal-500
                        to-cyan-500
                        text-white
                        shadow-sm
                        sm:h-10
                        sm:w-10
                    "
        >
          <Bot
            className="
                            h-4
                            w-4
                            sm:h-5
                            sm:w-5
                        "
          />
        </div>

        {/* Thinking Bubble */}

        <div
          className="
                        rounded-2xl
                        rounded-tl-md
                        border
                        border-border
                        bg-card
                        px-5
                        py-4
                        shadow-sm
                    "
        >
          <div
            className="
                            flex
                            items-center
                            gap-1.5
                        "
          >
            <span
              className="
                                h-2
                                w-2
                                animate-bounce
                                rounded-full
                                bg-emerald-400
                            "
            />

            <span
              className="
                                h-2
                                w-2
                                animate-bounce
                                rounded-full
                                bg-teal-400
                                [animation-delay:120ms]
                            "
            />

            <span
              className="
                                h-2
                                w-2
                                animate-bounce
                                rounded-full
                                bg-cyan-400
                                [animation-delay:240ms]
                            "
            />
          </div>
        </div>
      </div>
    );
  };

  /* =====================================================
       Empty Conversation
    ===================================================== */

  const renderEmptyConversation = () => {
    return (
      <div
        className="
                    flex
                    min-h-full
                    items-center
                    justify-center
                    px-6
                    py-12
                "
      >
        <div
          className="
                        max-w-md
                        text-center
                    "
        >
          <div
            className="
                            mx-auto
                            flex
                            h-16
                            w-16
                            items-center
                            justify-center
                            rounded-2xl
                            bg-gradient-to-br
                            from-amber-100
                            via-orange-100
                            to-emerald-100
                            text-amber-600
                            dark:bg-slate-800
                            dark:text-amber-300
                        "
          >
            <Sparkles
              className="
                                h-7
                                w-7
                            "
            />
          </div>

          <h2
            className="
                            mt-5
                            text-xl
                            font-bold
                            text-foreground
                        "
          >
            Start your career conversation
          </h2>

          <p
            className="
                            mt-2
                            text-sm
                            leading-6
                            text-muted-foreground
                        "
          >
            Ask Career Coach about your resume, career direction, skills, job
            opportunities, interviews, or anything related to your professional
            journey.
          </p>
        </div>
      </div>
    );
  };

  /* =====================================================
       Render
    ===================================================== */

  return (
    <section
      className="
                flex
                min-h-0
                flex-1
                flex-col
                overflow-hidden
                bg-background
                dark:bg-[#0f172a]
            "
    >
      {/* =================================================
                Chat Header
            ================================================= */}

      <div
        className="
                    flex
                    shrink-0
                    items-center
                    justify-between
                    gap-4
                    bg-card
                    px-5
                    py-4
                    sm:px-6
                    dark:border-b
                    dark:border-slate-700
                    dark:bg-[#111827]
                "
      >
        {/* Left */}

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
                            bg-emerald-100
                            text-emerald-600
                            dark:bg-emerald-500/15
                            dark:text-emerald-300
                        "
          >
            <Bot
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
            <h2
              className="
                                truncate
                                text-sm
                                font-bold
                                text-foreground
                                sm:text-base
                            "
            >
              {conversationTitle}
            </h2>

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
                                    h-1.5
                                    w-1.5
                                    rounded-full
                                    bg-emerald-500
                                "
              />

              <span
                className="
                                    text-[11px]
                                    font-medium
                                    text-emerald-600
                                    dark:text-emerald-300
                                "
              >
                Career Coach is ready
              </span>
            </div>
          </div>
        </div>

        {/* Right */}

        <button
          type="button"
          onClick={() => onNewConversation?.()}
          className="
                        flex
                        shrink-0
                        items-center
                        gap-2
                        rounded-xl
                        border
                        border-amber-200
                        bg-amber-50
                        px-3
                        py-2
                        text-xs
                        font-semibold
                        text-amber-700
                        transition
                        hover:bg-amber-100
                        active:scale-[0.98]
                        sm:px-4
                        dark:border-slate-700
                        dark:bg-slate-800
                        dark:text-slate-100
                        dark:hover:bg-slate-700
                    "
        >
          <Plus
            className="
                            h-3.5
                            w-3.5
                        "
          />

          <span className="hidden sm:inline">New Chat</span>
        </button>
      </div>

      <Separator />

      {/* =================================================
                Resume Context
            ================================================= */}

      {conversation?.resume_id && (
        <div
          className="
                        shrink-0
                        border-b
                        border-border
                        bg-card
                        px-5
                        py-3
                        sm:px-6
                        dark:border-slate-700
                        dark:bg-slate-900/90
                    "
        >
          <div
            className="
                            flex
                            items-center
                            gap-2.5
                        "
          >
            <div
              className="
                                flex
                                h-7
                                w-7
                                items-center
                                justify-center
                                rounded-lg
                                bg-amber-100
                                text-amber-600
                                dark:bg-amber-500/15
                                dark:text-amber-300
                            "
            >
              <BriefcaseBusiness
                className="
                                    h-3.5
                                    w-3.5
                                "
              />
            </div>

            <div
              className="
                                min-w-0
                            "
            >
              <p
                className="
                                    text-[10px]
                                    font-semibold
                                    uppercase
                                    tracking-wider
                                    text-muted-foreground
                                "
              >
                Resume Context
              </p>

              <p
                className="
                    truncate
                    text-xs
                    font-medium
                    text-foreground
                "
                >
                {resumeName}
                </p>
            </div>
          </div>
        </div>
      )}

      {/* =================================================
                Error
            ================================================= */}

      {error && (
        <div
          className="
                        mx-5
                        mt-4
                        shrink-0
                        rounded-xl
                        border
                        border-red-200
                        bg-red-50
                        px-4
                        py-3
                        text-xs
                        text-red-600
                        sm:mx-6
                    "
        >
          {error}
        </div>
      )}

      {/* =================================================
                Messages Area
            ================================================= */}

      <div
        className="
                    min-h-0
                    flex-1
                    overflow-y-auto
                    px-5
                    py-6
                    sm:px-6
                    lg:px-8
                    scrollbar-thin
                "
      >
        {messages.length === 0 && !loading ? (
          renderEmptyConversation()
        ) : (
          <div
            className="
                            mx-auto
                            w-full
                            max-w-4xl
                            space-y-6
                        "
          >
            {messages.map(renderMessage)}

            {renderThinkingIndicator()}
          </div>
        )}
      </div>

      {/* =================================================
                Composer Boundary
            ================================================= */}

      <Separator />

      {/* =================================================
                Chat Input Slot
            ================================================= */}

      <div
        className="
                    shrink-0
                    bg-card
                    px-5
                    py-4
                    sm:px-6
                    lg:px-8
                "
      >
        <div
          className="
                        mx-auto
                        w-full
                        max-w-4xl
                    "
        >
          {children}
        </div>
      </div>
    </section>
  );
}

export default ChatWindow;
