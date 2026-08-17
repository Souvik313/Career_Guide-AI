import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  MessageCircle,
  User,
  Bot,
  Clock3,
  Sparkles,
  ArrowRight,
  Trash2,
} from "lucide-react";

import ProfileHeader from "../../components/profile/ProfileHeader.jsx";
import ProfileSectionCard from "../../components/profile/ProfileSectionCard.jsx";
import ProfileLoading from "../../components/profile/ProfileLoading.jsx";
import ProfileEmptyState from "../../components/profile/ProfileEmptyState.jsx";

import { Button } from "../../components/ui/button.jsx";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../../components/ui/alert-dialog.jsx";
import toast from "react-hot-toast";

import useAIChat from "../../hooks/useAIChat.js";
import useResume from "@/hooks/useResume.js";

function ProfileConversationHistory() {
  const {
    conversationId,
    messages,
    conversations,
    loading,
    error,
    fetchConversations,
    fetchChatHistory,
    deleteConversation,
    deleteAllConversations,
  } = useAIChat();

  const { resumes, fetchUserResumes } = useResume();

  const navigate = useNavigate();
  const [deleteDialogOpen , setDeleteDialogOpen] = useState(false);
  const [conversationToDelete , setConversationToDelete] = useState(null);
  const [deleteAllDialogOpen , setDeleteAllDialogOpen] = useState(null);

  /* =====================================================
   Filters
===================================================== */

  const [filters, setFilters] = useState({ resume: "all" });

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]:
        key === "resume" && value !== "all" && value !== "none"
          ? Number(value)
          : value,
    }));
  };

  const resetFilters = () => {
    setFilters({ resume: "all" });
  };

  /* =====================================================
   Resume Name Lookup — depends on `resumes`, so after useResume()
===================================================== */

  const resumeNameMap = useMemo(() => {
    const map = new Map();
    (resumes || []).forEach((r) => {
      map.set(r.id, r.filename || "Untitled Resume");
    });
    return map;
  }, [resumes]);

  /* =====================================================
   Filter Options — depends on `conversations` + `resumeNameMap`
===================================================== */

  const filterOptions = useMemo(() => {
    const seen = new Map();
    let hasUnlinked = false;

    (conversations || []).forEach((c) => {
      if (c.resume_id != null && resumeNameMap.has(c.resume_id)) {
        seen.set(c.resume_id, resumeNameMap.get(c.resume_id));
      } else if (c.resume_id == null) {
        hasUnlinked = true;
      }
    });

    return {
      resume: Array.from(seen.entries()).map(([id, name]) => ({ id, name })),
      hasUnlinked,
    };
  }, [conversations, resumeNameMap]);

  /* =====================================================
   Filtered Conversations — the actual render source
===================================================== */

  const filteredConversations = useMemo(() => {
    return (conversations || []).filter((c) => {
      if (filters.resume === "all") return true;
      if (filters.resume === "none") return c.resume_id == null;
      return c.resume_id === filters.resume;
    });
  }, [conversations, filters]);

  const isFiltering = filters.resume !== "all";

  useEffect(() => {
    const loadResumes = async () => {
      try {
        await fetchUserResumes();
      } catch (err) {
        console.error("Failed to load resumes:", err);
      }
    };

    loadResumes();
  }, [fetchUserResumes]);

  /* =====================================================
   Load Conversation Summaries
===================================================== */

  useEffect(() => {
    const loadConversationSummaries = async () => {
      try {
        await fetchConversations();
      } catch (err) {
        console.error("Failed to load conversations:", err);
      }
    };

    loadConversationSummaries();
  }, [fetchConversations]);

  /* =====================================================
   Load Existing Conversation
===================================================== */

  useEffect(() => {
    if (!conversationId) {
      return;
    }

    const loadConversation = async () => {
      try {
        await fetchChatHistory(conversationId);
      } catch (err) {
        console.error("Failed to load conversation history:", err);
      }
    };

    loadConversation();
  }, [conversationId, fetchChatHistory]);

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
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  /* =====================================================
   Start New Conversation
===================================================== */

  const handleStartNewConversation = () => {
    navigate("/career-coach");
  };

  /* =====================================================
   Open a Conversation from the Summary List
===================================================== */

  const handleOpenConversation = (conversation) => {
    if (!conversation?.conversation_id) {
      return;
    }

    navigate("/career-coach", {
      state: {
        conversationId: conversation.conversation_id,
      },
    });
  };

  /* =====================================================
   Request Conversation Deletion
===================================================== */

  const handleDeleteRequest = (conversation) => {
    setConversationToDelete(conversation);
    setDeleteDialogOpen(true);
  };

  /* =====================================================
   Delete Conversation
===================================================== */

  const handleDeleteConversation = async () => {

    if (!conversationToDelete?.conversation_id) {
      return;
    }

    try {

      await deleteConversation(
        conversationToDelete.conversation_id
      );

      setDeleteDialogOpen(false);

      toast.success(
        "Conversation deleted successfully."
      );

      setConversationToDelete(null);

    } catch (err) {

      console.error(
        "Failed to delete conversation:",
        err
      );

      setDeleteAllDialogOpen(false);

      toast.error(
        err?.response?.data?.detail ||
        "Failed to delete conversation."
      );

    }
  };

    /* =====================================================
    Delete All Conversations
  ===================================================== */

  const handleDeleteAllConversations = async () => {

    try {

      await deleteAllConversations();

      setDeleteAllDialogOpen(false);

      toast.success(
        "All conversations deleted successfully."
      );


    } catch (err) {

      console.error(
        "Failed to delete all conversations:",
        err
      );

      setDeleteAllDialogOpen(false);

      toast.error(
        err?.response?.data?.detail ||
        "Failed to delete all conversations."
      );

    }
  };

  /* =====================================================
   Render Message
===================================================== */

  const renderMessage = (message, index) => {
    const isUser = message.role === "user";

    const timestamp = formatTime(message.created_at || message.timestamp);

    return (
      <div
        key={message.id || `${message.role}-${index}`}
        className={`
                flex
                gap-4
                ${isUser ? "flex-row-reverse" : "flex-row"}
            `}
      >
        {/* =================================================
                Avatar
            ================================================= */}

        <div
          className={`
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    text-white
                    shadow-sm
                    ${
                      isUser
                        ? `
                                bg-gradient-to-br
                                from-orange-400
                                via-amber-400
                                to-yellow-300
                              `
                        : `
                                bg-gradient-to-br
                                from-violet-500
                                via-fuchsia-500
                                to-pink-400
                              `
                    }
                `}
        >
          {isUser ? <User className="h-5 w-5" /> : <Bot className="h-5 w-5" />}
        </div>

        {/* =================================================
                Message
            ================================================= */}

        <div
          className={`
                    max-w-[85%]
                    lg:max-w-[75%]
                    ${isUser ? "items-end" : "items-start"}
                `}
        >
          <div
            className={`
                        rounded-2xl
                        px-5
                        py-4
                        text-sm
                        leading-7
                        ${
                          isUser
                            ? `
                                    rounded-tr-md
                                    bg-gradient-to-br
                                    from-orange-400
                                    to-amber-500
                                    text-white
                                  `
                            : `
                                    rounded-tl-md
                                    border
                                    border-border
                                    bg-muted
                                    text-foreground
                                  `
                        }
                    `}
          >
            <p
              className="
                            whitespace-pre-wrap
                            break-words
                        "
            >
              {message.message ?? message.content}
            </p>
          </div>

          {timestamp && (
            <div
              className={`
                            mt-2
                            flex
                            items-center
                            gap-1.5
                            text-[11px]
                            text-muted-foreground
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
   Render
===================================================== */

  return (
    <div className="space-y-8">
      {/* =================================================
            Header
        ================================================= */}

      <ProfileHeader
        title="Conversation History"
        description="
                Review your conversations with CareerCompass AI
                and revisit your previous career discussions.
            "
        icon={MessageCircle}
      />

      {/* =================================================
            Error
        ================================================= */}

      {error && !loading && (
        <div
          className="
                    rounded-2xl
                    border
                    border-red-200
                    bg-red-50
                    px-5
                    py-4
                    text-sm
                    text-red-600
                "
        >
          {error}
        </div>
      )}

      {/* =================================================
            Loading
        ================================================= */}

      {loading && <ProfileLoading type="chat" count={5} />}

      {!loading && !error && conversations?.length > 0 && (
        <div
          className="
                      flex
                      flex-wrap
                      items-center
                      gap-3
                      rounded-2xl
                      border
                      border-border
                      bg-card
                      p-4
                  "
        >
          <select
            value={filters.resume === "all" ? "all" : String(filters.resume)}
            onChange={(e) => handleFilterChange("resume", e.target.value)}
            className="
                        rounded-xl
                        border
                        border-border
                        bg-background
                        px-3
                        py-2
                        text-sm
                    "
          >
            <option value="all">All Resumes</option>
            {filterOptions.hasUnlinked && (
              <option value="none">No Resume</option>
            )}
            {filterOptions.resume.map(({ id, name }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>

          {isFiltering && (
            <Button
              type="button"
              variant="ghost"
              className="text-xs text-muted-foreground"
              onClick={resetFilters}
            >
              Clear filters
            </Button>
          )}
        </div>
      )}

      {/* =================================================
            Conversation Summaries
        ================================================= */}

      {!loading && !error && conversations?.length > 0 && (
        <ProfileSectionCard
          title="Recent Conversations"
          description="
                        Your latest CareerCompass AI discussions.
                    "
          icon={MessageCircle}
          variant="fuchsia"
          action={
            <Button
                type="button"
                variant="outline"
                className="
                    rounded-xl
                    border-red-500/40
                    text-red-500
                    hover:border-red-500/60
                    hover:bg-red-500/10
                    hover:text-red-400
                "
                onClick={() => setDeleteAllDialogOpen(true)}
            >
                <Trash2 className="mr-2 h-4 w-4" />

                Delete All
            </Button>
          }
        >
           <div className="space-y-3">

            {filteredConversations.map(
                (conversation) => (

                <div
                    key={conversation.conversation_id}
                    className="
                        w-full
                        rounded-2xl
                        border
                        border-border
                        bg-card
                        px-4
                        py-4
                        transition
                        hover:border-fuchsia-400/40
                        hover:bg-fuchsia-500/10
                    "
                >

                    <div className="
                        flex
                        items-start
                        justify-between
                        gap-4
                    ">

                        {/* Clickable conversation */}

                        <button
                            type="button"
                            className="
                                min-w-0
                                flex-1
                                text-left
                            "
                            onClick={() =>
                                handleOpenConversation(
                                    conversation
                                )
                            }
                        >

                            <p className="
                                truncate
                                text-sm
                                font-semibold
                                text-foreground
                            ">
                                {conversation.title}
                            </p>

                            <p className="
                                mt-2
                                line-clamp-2
                                text-xs
                                leading-6
                                text-muted-foreground
                            ">
                                {conversation.last_message}
                            </p>

                        </button>


                        {/* Date + Delete */}

                        <div className="
                            flex
                            shrink-0
                            flex-col
                            items-end
                            gap-2
                        ">

                            <span className="
                                text-[11px]
                                font-medium
                                text-muted-foreground
                            ">
                                {formatTime(
                                    conversation.updated_at
                                )}
                            </span>

                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="
                                    h-8
                                    w-8
                                    rounded-lg
                                    text-muted-foreground
                                    hover:bg-red-500/10
                                    hover:text-red-500
                                "
                                onClick={() =>
                                    handleDeleteRequest(
                                        conversation
                                    )
                                }
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>

                        </div>

                    </div>

                </div>

            ))}

        </div>
        </ProfileSectionCard>
      )}

      {/* =================================================
            No Conversation
        ================================================= */}

      {!loading && !error && conversations?.length === 0 && !conversationId && (
        <ProfileEmptyState
          icon={MessageCircle}
          title="No conversation selected"
          description="
                        Your CareerCompass AI conversations will
                        appear here once a conversation is available.
                        Start chatting with the AI to create one.
                    "
          actionLabel="Open AI Chat"
          onAction={handleStartNewConversation}
          variant="fuchsia"
        />
      )}

      {/* =================================================
            Conversation
        ================================================= */}

      {!loading && !error && conversationId && messages?.length > 0 && (
        <ProfileSectionCard
          title="AI Conversation"
          description="
                        Your conversation with CareerCompass AI.
                    "
          icon={MessageCircle}
          variant="fuchsia"
        >
          {/* Conversation ID */}

          <div
            className="
                            mb-6
                            flex
                            flex-col
                            gap-3
                            rounded-2xl
                            border
                            border-fuchsia-500/20
                            bg-gradient-to-r
                            from-fuchsia-500/10
                            via-pink-500/10
                            to-orange-500/10
                            p-4
                            sm:flex-row
                            sm:items-center
                            sm:justify-between
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
                                    rounded-lg
                                    bg-white
                                    text-fuchsia-500
                                    shadow-sm
                                "
              >
                <Sparkles
                  className="
                                        h-4
                                        w-4
                                    "
                />
              </div>

              <div>
                <p
                  className="
                                        text-xs
                                        font-semibold
                                        text-muted-foreground
                                    "
                >
                  Conversation ID
                </p>

                <p
                  className="
                                        mt-0.5
                                        max-w-[250px]
                                        truncate
                                        font-mono
                                        text-xs
                                        text-foreground
                                    "
                >
                  {conversationId}
                </p>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              className="
                                rounded-xl
                                border-fuchsia-200
                                text-fuchsia-600
                                hover:bg-fuchsia-50
                            "
              onClick={handleStartNewConversation}
            >
              New Conversation
              <ArrowRight
                className="
                                    ml-2
                                    h-4
                                    w-4
                                "
              />
            </Button>
          </div>

          {/* Messages */}

          <div
            className="
                            space-y-6
                        "
          >
            {messages.map(renderMessage)}
          </div>
        </ProfileSectionCard>
      )}

      {/* =================================================
            Empty Conversation
        ================================================= */}

      {!loading && !error && conversationId && messages?.length === 0 && (
        <ProfileEmptyState
          icon={MessageCircle}
          title="This conversation is empty"
          description="
                        No messages were found for this conversation.
                    "
          actionLabel="Start New Conversation"
          onAction={handleStartNewConversation}
          variant="fuchsia"
        />
      )}

      {/* =================================================
            Delete Conversation Confirmation
        ================================================= */}

        <AlertDialog
          open={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
        >

          <AlertDialogContent>

            <AlertDialogHeader>

              <AlertDialogTitle>
                Delete this conversation?
              </AlertDialogTitle>

              <AlertDialogDescription>
                This will permanently delete this conversation
                and all of its messages. This action cannot be
                undone.
              </AlertDialogDescription>

            </AlertDialogHeader>


            <AlertDialogFooter>

              <AlertDialogCancel
                onClick={() => {
                  setConversationToDelete(null);
                }}
              >
                Cancel
              </AlertDialogCancel>

              <AlertDialogAction
                className="
                  bg-red-600
                  text-white
                  hover:bg-red-700
                "
                onClick={handleDeleteConversation}
              >
                Delete Conversation
              </AlertDialogAction>

            </AlertDialogFooter>

          </AlertDialogContent>

        </AlertDialog>

        {/* =================================================
              Delete All Conversations Confirmation
          ================================================= */}

          <AlertDialog
            open={deleteAllDialogOpen}
            onOpenChange={setDeleteAllDialogOpen}
          >

            <AlertDialogContent>

              <AlertDialogHeader>

                <AlertDialogTitle>
                  Delete all conversations?
                </AlertDialogTitle>

                <AlertDialogDescription>
                  This will permanently delete all of your
                  CareerCompass AI conversations and their
                  messages. This action cannot be undone.
                </AlertDialogDescription>

              </AlertDialogHeader>


              <AlertDialogFooter>

                <AlertDialogCancel>
                  Cancel
                </AlertDialogCancel>

                <AlertDialogAction
                  className="
                    bg-red-600
                    text-white
                    hover:bg-red-700
                  "
                  onClick={handleDeleteAllConversations}
                >
                  Delete All Conversations
                </AlertDialogAction>

              </AlertDialogFooter>

            </AlertDialogContent>

          </AlertDialog>
    </div>
  );
}

export default ProfileConversationHistory;
