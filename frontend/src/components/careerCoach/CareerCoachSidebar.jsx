import {
    MessageCircle,
    Plus,
    Sparkles,
    History,
} from "lucide-react";
import { Separator } from "../ui/separator.jsx";
import ConversationListItem from "./ConversationListItem.jsx";

function CareerCoachSidebar({
    conversations = [],
    activeConversationId = null,
    loading = false,
    onSelectConversation,
    onNewConversation,
}) {


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
       Render Loading State
    ===================================================== */

    const renderLoading = () => {

        return (

            <div className="space-y-3">

                {Array.from(
                    { length: 5 }
                ).map((_, index) => (

                    <div
                        key={index}
                        className="
                            animate-pulse
                            rounded-2xl
                            border
                            border-border
                            dark:border-emerald-500/10
                            bg-card
                            dark:bg-emerald-950/20
                            p-4
                        "
                    >

                        <div
                            className="
                                h-4
                                w-3/4
                                rounded
                                bg-zinc-200
                                dark:bg-zinc-700
                            "
                        />

                        <div
                            className="
                                mt-3
                                h-3
                                w-full
                                rounded
                                bg-zinc-100
                                dark:bg-zinc-800
                            "
                        />

                        <div
                            className="
                                mt-2
                                h-3
                                w-2/3
                                rounded
                                bg-zinc-100
                                dark:bg-zinc-800
                            "
                        />

                    </div>

                ))}

            </div>

        );

    };


    /* =====================================================
       Render Empty State
    ===================================================== */

    const renderEmptyState = () => {

        return (

            <div
                className="
                    flex
                    flex-col
                    items-center
                    justify-center
                    rounded-2xl
                    border
                    border-dashed
                    border-border
                    dark:border-amber-500/20
                    bg-card/80
                    dark:bg-amber-950/20
                    px-5
                    py-10
                    text-center
                    transition-all
                    duration-300
                "
            >

                <div
                    className="
                        flex
                        h-11
                        w-11
                        items-center
                        justify-center
                        rounded-xl
                        bg-amber-100
                        dark:bg-amber-500/20
                        text-amber-600
                        dark:text-amber-400
                    "
                >

                    <MessageCircle
                        className="
                            h-5
                            w-5
                        "
                    />

                </div>


                <p
                    className="
                        mt-4
                        text-sm
                        font-semibold
                        text-foreground
                        dark:text-white
                    "
                >
                    No conversations yet
                </p>


                <p
                    className="
                        mt-1.5
                        max-w-[210px]
                        text-xs
                        leading-5
                        text-muted-foreground
                        dark:text-gray-400
                    "
                >
                    Start a conversation with your
                    Career Coach to see it appear here.
                </p>

            </div>

        );

    };


    /* =====================================================
       Render
    ===================================================== */

    return (

        <aside
            className="
                flex
                h-full
                w-80
                shrink-0
                flex-col
                border-r
                border-border
                bg-background
                dark:border-slate-700
                dark:bg-[#0f172a]
            "
        >

            {/* =================================================
                Sidebar Header
            ================================================= */}

            <div
                className="
                    border-b
                    border-border
                    bg-white
                    px-5
                    py-5
                    dark:border-slate-700
                    dark:bg-[#111827]
                "
            >

                <div
                    className="
                        flex
                        items-center
                        justify-between
                        gap-3
                    "
                >

                    <div
                        className="
                            flex
                            items-center
                            gap-3
                        "
                    >

                        <div
                            className="
                                flex
                                h-9
                                w-9
                                items-center
                                justify-center
                                rounded-xl
                                bg-emerald-100
                                dark:bg-emerald-500/20
                                text-emerald-600
                                dark:text-emerald-400
                            "
                        >

                            <History
                                className="
                                    h-4
                                    w-4
                                "
                            />

                        </div>


                        <div>

                            <p
                                className="
                                    text-sm
                                    font-bold
                                    text-foreground
                                    dark:text-white
                                "
                            >
                                Conversations
                            </p>

                            <p
                                className="
                                    text-[11px]
                                    text-muted-foreground
                                    dark:text-gray-400
                                "
                            >
                                Your career discussions
                            </p>

                        </div>

                    </div>

                </div>


                {/* =================================================
                    New Conversation
                ================================================= */}

                <button
                    type="button"
                    onClick={() =>
                        onNewConversation?.()
                    }
                    className="
                        mt-5
                        flex
                        w-full
                        items-center
                        justify-center
                        gap-2
                        rounded-xl
                        bg-gradient-to-r
                        from-emerald-500
                        to-teal-500
                        px-4
                        py-3
                        text-sm
                        font-semibold
                        text-white
                        shadow-sm
                        shadow-emerald-200
                        transition-all
                        duration-200
                        hover:from-emerald-600
                        hover:to-teal-600
                        hover:shadow-md
                        active:scale-[0.98]
                        dark:bg-emerald-500
                        dark:from-emerald-500
                        dark:to-emerald-500
                        dark:shadow-none
                        dark:hover:bg-emerald-400
                    "
                >

                    <Plus
                        className="
                            h-4
                            w-4
                        "
                    />

                    New Conversation

                </button>

            </div>

            <Separator />

            {/* =================================================
                Conversation List
            ================================================= */}

            <div
                className="
                    min-h-0
                    flex-1
                    overflow-y-auto
                    px-3
                    py-4
                    scrollbar-thin
                    dark:scrollbar-track-emerald-950/20
                    dark:scrollbar-thumb-emerald-500/40
                    hover:dark:scrollbar-thumb-emerald-500/60
                "
            >

                <div
                    className="
                        mb-3
                        flex
                        items-center
                        gap-2
                        px-2
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

                    <span
                        className="
                            text-[11px]
                            font-semibold
                            uppercase
                            tracking-wider
                            text-muted-foreground
                            dark:text-gray-500
                        "
                    >
                        Recent
                    </span>

                </div>


                {loading ? (

                    renderLoading()

                ) : conversations.length > 0 ? (

                    <div
                        className="
                            space-y-1.5
                        "
                    >

                        {conversations.map((conversation) => (

                            <ConversationListItem
                                key={conversation.conversation_id}
                                conversation={conversation}
                                isActive={
                                    conversation.conversation_id ===
                                    activeConversationId
                                }
                                onSelect={onSelectConversation}
                            />

                        ))}

                    </div>

                ) : (

                    renderEmptyState()

                )}

            </div>

            <Separator />

            {/* =================================================
                Sidebar Footer
            ================================================= */}

            <div
                className="
                    px-5
                    py-4
                "
            >

                <div
                    className="
                        flex
                        items-center
                        gap-2
                        text-[11px]
                        text-muted-foreground
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

                    CareerCompass AI

                </div>

            </div>

        </aside>

    );

}


export default CareerCoachSidebar;
