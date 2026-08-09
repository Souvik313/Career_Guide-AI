import { useCallback, useEffect, useState } from "react";

import { Bot } from "lucide-react";

import CareerCoachHeader from "../components/careerCoach/CareerCoachHeader.jsx";
import CareerCoachSidebar from "../components/careerCoach/CareerCoachSidebar.jsx";
import ChatWindow from "../components/careerCoach/ChatWindow.jsx";
import ChatInput from "../components/careerCoach/ChatInput.jsx";
import CareerCoachEmptyState from "../components/careerCoach/CareerCoachEmptyState.jsx";

import useAIChat from "../hooks/useAIChat.js";
import useResume from "../hooks/useResume.js";

function CareerCoach() {
    /* =====================================================
       AI Chat State
    ===================================================== */

    const {
        conversationId,
        resumeId,
        messages,
        conversations,
        loading: chatLoading,
        error: chatError,

        sendMessage,
        fetchConversations,
        fetchChatHistory,
        startNewConversation,
    } = useAIChat();


    /* =====================================================
       Resume State
    ===================================================== */

    const {
        resumes,
        loading: resumeLoading,
        error: resumeError,
        fetchUserResumes,
    } = useResume();


    /* =====================================================
       Local UI State
    ===================================================== */

    /*
     * Resume selected while preparing a NEW conversation.
     *
     * This is intentionally separate from resumeId from
     * useAIChat, which represents the resume context of
     * the ACTIVE conversation.
     */

    const [
        selectedResumeId,
        setSelectedResumeId,
    ] = useState(null);


    /*
     * Lightweight conversation information used
     * by the ChatWindow UI.
     */

    const [
        activeConversation,
        setActiveConversation,
    ] = useState(null);


    /*
     * Current composer value.
     */

    const [
        message,
        setMessage,
    ] = useState("");


    /* =====================================================
       Derived State
    ===================================================== */

    const loading =
        chatLoading ||
        resumeLoading;

    const error =
        chatError ||
        resumeError;


    /* =====================================================
       Load Initial Career Coach Data
    ===================================================== */

    useEffect(() => {

        const loadCareerCoachData = async () => {

            try {

                await Promise.all([
                    fetchConversations(),
                    fetchUserResumes(),
                ]);

            } catch (err) {

                console.error(
                    "Failed to load Career Coach:",
                    err
                );

            }

        };


        loadCareerCoachData();

    }, [
        fetchConversations,
        fetchUserResumes,
    ]);


    /* =====================================================
       Synchronize Active Conversation
    ===================================================== */

    useEffect(() => {

        if (!conversationId) {

            setActiveConversation(null);

            return;

        }


        const selectedConversation =
            conversations.find(
                (conversation) =>
                    conversation.conversation_id ===
                    conversationId
            );


        if (selectedConversation) {

            setActiveConversation(
                selectedConversation
            );

        }

    }, [
        conversationId,
        conversations,
    ]);


    /* =====================================================
       Open Existing Conversation
    ===================================================== */

    const handleSelectConversation =
        useCallback(
            async (conversation) => {

                if (!conversation) {
                    return;
                }


                try {

                    /*
                     * Update the UI immediately.
                     */

                    setActiveConversation(
                        conversation
                    );


                    /*
                     * Do NOT use selectedResumeId as the
                     * source of truth here.
                     *
                     * fetchChatHistory() will retrieve the
                     * authoritative resume_id associated
                     * with this conversation.
                     */

                    await fetchChatHistory(
                        conversation.conversation_id
                    );


                } catch (err) {

                    console.error(
                        "Failed to open conversation:",
                        err
                    );

                }

            },
            [
                fetchChatHistory,
            ]
        );


    /* =====================================================
       Start New Conversation
    ===================================================== */

    const handleNewConversation =
        useCallback(
            () => {

                /*
                 * If the currently active conversation
                 * has resume context, preserve that resume
                 * as the default for the new conversation.
                 */

                setSelectedResumeId(
                    resumeId ?? selectedResumeId ?? null
                );


                /*
                 * Clear active AI conversation state.
                 */

                startNewConversation();


                /*
                 * Clear UI-specific conversation state.
                 */

                setActiveConversation(null);

                setMessage("");

            },
            [
                resumeId,
                selectedResumeId,
                startNewConversation,
            ]
        );


    /* =====================================================
       Start Conversation from Empty State
    ===================================================== */

    const handleStartConversation =
        useCallback(
            async (
                newResumeId,
                initialMessage = ""
            ) => {

                try {

                    /*
                     * This resume belongs to the NEW
                     * conversation being created.
                     */

                    const activeResumeId =
                        newResumeId ?? null;


                    setSelectedResumeId(
                        activeResumeId
                    );


                    /*
                     * Ensure we are not accidentally
                     * continuing an old conversation.
                     */

                    startNewConversation();


                    setActiveConversation(
                        null
                    );


                    /*
                     * If there is no initial message,
                     * simply prepare the chat.
                     */

                    if (
                        !initialMessage?.trim()
                    ) {

                        return;

                    }


                    /*
                     * Create the new conversation.
                     *
                     * useAIChat will send:
                     *
                     * resume_id
                     * conversation_id = null
                     * message
                     */

                    await sendMessage({

                        resumeId:
                            activeResumeId,

                        message:
                            initialMessage.trim(),

                    });


                    setMessage("");


                    /*
                     * Refresh sidebar summaries.
                     */

                    await fetchConversations();


                } catch (err) {

                    console.error(
                        "Failed to start conversation:",
                        err
                    );

                }

            },
            [
                sendMessage,
                fetchConversations,
                startNewConversation,
            ]
        );


    /* =====================================================
       Send Message
    ===================================================== */

    const handleSendMessage =
        useCallback(
            async (messageToSend) => {

                const trimmedMessage =
                    messageToSend?.trim();


                if (
                    !trimmedMessage ||
                    chatLoading
                ) {

                    return;

                }


                try {

                    /*
                     * EXISTING CONVERSATION
                     *
                     * useAIChat.resumeId is the
                     * authoritative resume context.
                     *
                     *
                     * NEW CONVERSATION
                     *
                     * selectedResumeId is the resume
                     * selected by the user.
                     */

                    const activeResumeId =
                        conversationId
                            ? resumeId
                            : selectedResumeId;


                    await sendMessage({

                        resumeId:
                            activeResumeId ?? null,

                        message:
                            trimmedMessage,

                    });


                    /*
                     * Clear composer.
                     */

                    setMessage("");


                    /*
                     * Refresh conversation summaries
                     * for the sidebar.
                     */

                    await fetchConversations();


                } catch (err) {

                    console.error(
                        "Failed to send message:",
                        err
                    );

                }

            },
            [
                conversationId,
                resumeId,
                selectedResumeId,
                chatLoading,
                sendMessage,
                fetchConversations,
            ]
        );


    /* =====================================================
       Handle Resume Change
    ===================================================== */

    const handleResumeChange =
        useCallback(
            (newResumeId) => {

                /*
                 * This handler is only relevant when
                 * preparing a NEW conversation.
                 */

                setSelectedResumeId(
                    newResumeId ?? null
                );

            },
            []
        );


    /* =====================================================
       Render
    ===================================================== */

    return (

        <div
            className="
                min-h-screen
                bg-[#fafaf9]
            "
        >

            {/* =================================================
                Career Coach Header
            ================================================= */}

            <CareerCoachHeader />


            {/* =================================================
                Career Coach Workspace
            ================================================= */}

            <div
                className="
                    flex
                    h-[calc(100vh-5rem)]
                    min-h-[600px]
                    w-full
                    overflow-hidden
                    border-t
                    border-zinc-200
                    bg-[#fafaf9]
                "
            >

                {/* =================================================
                    Sidebar
                ================================================= */}

                <CareerCoachSidebar
                    conversations={conversations}
                    activeConversationId={
                        conversationId
                    }
                    onSelectConversation={
                        handleSelectConversation
                    }
                    onNewConversation={
                        handleNewConversation
                    }
                    loading={chatLoading}
                />


                {/* =================================================
                    Main Chat Area
                ================================================= */}

                <main
                    className="
                        flex
                        min-w-0
                        flex-1
                        flex-col
                    "
                >

                    {/* =================================================
                        No Active Conversation
                    ================================================= */}

                    {!conversationId ? (

                        <div
                            className="
                                flex
                                min-h-0
                                flex-1
                                flex-col
                            "
                        >

                            {loading ? (

                                <div
                                    className="
                                        flex
                                        flex-1
                                        items-center
                                        justify-center
                                    "
                                >

                                    <div
                                        className="
                                            text-center
                                        "
                                    >

                                        <div
                                            className="
                                                mx-auto
                                                flex
                                                h-14
                                                w-14
                                                animate-pulse
                                                items-center
                                                justify-center
                                                rounded-2xl
                                                bg-gradient-to-br
                                                from-amber-100
                                                to-emerald-100
                                            "
                                        >

                                            <Bot
                                                className="
                                                    h-6
                                                    w-6
                                                    text-emerald-500
                                                "
                                            />

                                        </div>


                                        <p
                                            className="
                                                mt-4
                                                text-sm
                                                font-medium
                                                text-zinc-500
                                            "
                                        >
                                            Preparing your Career Coach...
                                        </p>

                                    </div>

                                </div>

                            ) : (

                                <CareerCoachEmptyState
                                    resumes={resumes}
                                    selectedResumeId={
                                        selectedResumeId
                                    }
                                    onResumeChange={
                                        handleResumeChange
                                    }
                                    onStartConversation={
                                        handleStartConversation
                                    }
                                    loading={chatLoading}
                                />

                            )}

                        </div>

                    ) : (

                        /* =================================================
                           Active Conversation
                        ================================================= */

                        <ChatWindow
                            conversation={
                                activeConversation
                            }
                            messages={
                                messages
                            }
                            loading={
                                chatLoading
                            }
                            error={
                                error
                            }
                            onNewConversation={
                                handleNewConversation
                            }
                        >

                            <ChatInput
                                value={message}
                                onChange={setMessage}
                                onSend={handleSendMessage}
                                loading={chatLoading}
                                disabled={!conversationId}
                            />

                        </ChatWindow>

                    )}

                </main>

            </div>

        </div>

    );

}

export default CareerCoach;