import {
    Send,
    Sparkles,
} from "lucide-react";

import { Textarea } from "../ui/textarea.jsx";


function ChatInput({
    value = "",
    onChange,
    onSend,
    loading = false,
    disabled = false,
}) {


    /* =====================================================
       Handle Input Change
    ===================================================== */

    const handleChange = (event) => {

        onChange?.(
            event.target.value
        );

    };


    /* =====================================================
       Handle Send
    ===================================================== */

    const handleSend = () => {

        const trimmedMessage =
            value.trim();

        if (
            !trimmedMessage ||
            loading ||
            disabled
        ) {
            return;
        }


        onSend?.(
            trimmedMessage
        );

    };


    /* =====================================================
       Handle Keyboard
    ===================================================== */

    const handleKeyDown = (event) => {

        /*
         * Enter sends the message.
         *
         * Shift + Enter creates a new line.
         */

        if (
            event.key === "Enter" &&
            !event.shiftKey
        ) {

            event.preventDefault();

            handleSend();

        }

    };


    /* =====================================================
       Render
    ===================================================== */

    return (

        <div
            className="
                w-full
            "
        >

            {/* =================================================
                Input Container
            ================================================= */}

            <div
                className="
                    rounded-2xl
                    border
                    border-zinc-200
                    bg-zinc-50
                    p-2
                    shadow-sm
                    transition-all
                    duration-200
                    focus-within:border-amber-300
                    focus-within:bg-white
                    focus-within:shadow-md
                "
            >

                {/* =================================================
                    Textarea
                ================================================= */}

                <Textarea
                    value={value}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    disabled={
                        loading ||
                        disabled
                    }
                    placeholder="
                        Ask Career Coach anything about
                        your career...
                    "
                    className="
                        min-h-[90px]
                        resize-none
                        border-0
                        bg-transparent
                        px-3
                        py-3
                        text-sm
                        leading-6
                        text-zinc-800
                        shadow-none
                        outline-none
                        placeholder:text-zinc-400
                        focus-visible:ring-0
                    "
                />


                {/* =================================================
                    Input Footer
                ================================================= */}

                <div
                    className="
                        flex
                        items-center
                        justify-between
                        gap-3
                        border-t
                        border-zinc-200
                        px-2
                        pt-2
                    "
                >

                    {/* Helper Text */}

                    <div
                        className="
                            flex
                            min-w-0
                            items-center
                            gap-1.5
                        "
                    >

                        <Sparkles
                            className="
                                h-3.5
                                w-3.5
                                shrink-0
                                text-amber-500
                            "
                        />

                        <span
                            className="
                                truncate
                                text-[10px]
                                font-medium
                                text-zinc-400
                                sm:text-[11px]
                            "
                        >
                            Career Coach can help with
                            resumes, skills, jobs and interviews
                        </span>

                    </div>


                    {/* Send Button */}

                    <button
                        type="button"
                        onClick={handleSend}
                        disabled={
                            !value.trim() ||
                            loading ||
                            disabled
                        }
                        className="
                            flex
                            h-10
                            w-10
                            shrink-0
                            items-center
                            justify-center
                            rounded-xl
                            bg-gradient-to-br
                            from-amber-400
                            via-orange-400
                            to-orange-500
                            text-white
                            shadow-sm
                            transition-all
                            duration-200
                            hover:shadow-md
                            hover:brightness-105
                            active:scale-95
                            disabled:cursor-not-allowed
                            disabled:opacity-40
                            disabled:hover:shadow-sm
                        "
                        aria-label="Send message"
                    >

                        <Send
                            className="
                                h-4
                                w-4
                            "
                        />

                    </button>

                </div>

            </div>


            {/* =================================================
                Keyboard Hint
            ================================================= */}

            <div
                className="
                    mt-2
                    flex
                    justify-end
                    px-1
                "
            >

                <p
                    className="
                        text-[10px]
                        text-zinc-400
                    "
                >
                    Enter to send · Shift + Enter for new line
                </p>

            </div>

        </div>

    );

}


export default ChatInput;
