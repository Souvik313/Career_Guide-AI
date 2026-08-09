import {
    MessageCircle,
    Clock3,
} from "lucide-react";


function ConversationListItem({
    conversation,
    isActive = false,
    onSelect,
}) {

    /* =====================================================
       Safety
    ===================================================== */

    if (!conversation) {
        return null;
    }


    /* =====================================================
       Format Conversation Time
    ===================================================== */

    const formatTime = (value) => {

        if (!value) {
            return null;
        }

        const date = new Date(value);

        if (Number.isNaN(date.getTime())) {
            return null;
        }

        return date.toLocaleDateString(
            "en-IN",
            {
                day: "numeric",
                month: "short",
            }
        );

    };


    /* =====================================================
       Conversation Data
    ===================================================== */

    const conversationId =
        conversation.conversation_id;

    const title =
        conversation.title ||
        "Untitled Conversation";

    const lastMessage =
        conversation.last_message ||
        "No messages yet.";

    const updatedAt =
        formatTime(
            conversation.updated_at
        );


    /* =====================================================
       Render
    ===================================================== */

    return (

        <button
            type="button"
            onClick={() =>
                onSelect?.(conversation)
            }
            className={`
                group
                w-full
                rounded-2xl
                border
                px-4
                py-3.5
                text-left
                transition-all
                duration-200
                ${
                    isActive
                        ? `
                            border-amber-200
                            bg-gradient-to-r
                            from-amber-50
                            via-orange-50
                            to-yellow-50
                            shadow-sm
                          `
                        : `
                            border-transparent
                            bg-transparent
                            hover:border-zinc-200
                            hover:bg-white
                            hover:shadow-sm
                          `
                }
            `}
        >

            <div
                className="
                    flex
                    items-start
                    gap-3
                "
            >

                {/* =================================================
                    Conversation Icon
                ================================================= */}

                <div
                    className={`
                        mt-0.5
                        flex
                        h-9
                        w-9
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
                                    from-amber-400
                                    to-orange-500
                                    text-white
                                    shadow-sm
                                  `
                                : `
                                    bg-zinc-100
                                    text-zinc-500
                                    group-hover:bg-amber-100
                                    group-hover:text-amber-600
                                  `
                        }
                    `}
                >

                    <MessageCircle
                        className="
                            h-4
                            w-4
                        "
                    />

                </div>


                {/* =================================================
                    Conversation Content
                ================================================= */}

                <div
                    className="
                        min-w-0
                        flex-1
                    "
                >

                    {/* Title + Date */}

                    <div
                        className="
                            flex
                            items-start
                            justify-between
                            gap-2
                        "
                    >

                        <p
                            className={`
                                min-w-0
                                truncate
                                text-sm
                                font-semibold
                                ${
                                    isActive
                                        ? "text-zinc-900"
                                        : "text-zinc-700"
                                }
                            `}
                        >
                            {title}
                        </p>


                        {updatedAt && (

                            <span
                                className="
                                    flex
                                    shrink-0
                                    items-center
                                    gap-1
                                    pt-0.5
                                    text-[10px]
                                    font-medium
                                    text-zinc-400
                                "
                            >

                                <Clock3
                                    className="
                                        h-3
                                        w-3
                                    "
                                />

                                {updatedAt}

                            </span>

                        )}

                    </div>


                    {/* Last Message */}

                    <p
                        className="
                            mt-1.5
                            line-clamp-2
                            text-xs
                            leading-5
                            text-zinc-500
                        "
                    >
                        {lastMessage}
                    </p>

                </div>

            </div>

        </button>

    );

}


export default ConversationListItem;
