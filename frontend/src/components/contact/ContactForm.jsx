import { useState } from "react";
import { Send , Loader2 , CheckCircle2 } from "lucide-react";
import emailjs from "@emailjs/browser";

function ContactForm() {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });
    const [buttonState, setButtonState] = useState("idle");

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setButtonState("sending");

        try {

            await emailjs.send(

                import.meta.env.VITE_EMAILJS_SERVICE_ID,

                import.meta.env.VITE_EMAILJS_TEMPLATE_ID,

                {

                    from_name: formData.name,

                    from_email: formData.email,

                    subject: formData.subject,

                    message: formData.message

                },

                import.meta.env.VITE_EMAILJS_PUBLIC_KEY

            );

            setButtonState("submitted");

            await new Promise(resolve =>
                setTimeout(resolve, 1200)
            );

            setFormData({

                name: "",

                email: "",

                subject: "",

                message: ""

            });

            setButtonState("idle");

        }

        catch (error) {

            console.error("EmailJS Error:", error);

            setButtonState("idle");

            alert("Failed to send message. Please try again.");

        }

    };

    return (

        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg">

            <h2 className="text-2xl font-bold text-slate-800">

                Send a Message

            </h2>

            <p className="mt-2 text-slate-500">

                Have an opportunity, collaboration idea,
                or just want to say hello?
                Fill out the form below.

            </p>

            <form
                onSubmit={handleSubmit}
                className="mt-8 space-y-6"
            >

                {/* Name */}

                <div>

                    <label className="mb-2 block font-medium text-slate-700">

                        Full Name

                    </label>

                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="John Doe"
                        className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                    />

                </div>

                {/* Email */}

                <div>

                    <label className="mb-2 block font-medium text-slate-700">

                        Email Address

                    </label>

                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="john@example.com"
                        className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                    />

                </div>

                {/* Subject */}

                <div>

                    <label className="mb-2 block font-medium text-slate-700">

                        Subject

                    </label>

                    <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        placeholder="Internship Opportunity"
                        className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                    />

                </div>

                {/* Message */}

                <div>

                    <label className="mb-2 block font-medium text-slate-700">

                        Message

                    </label>

                    <textarea
                        rows={6}
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        placeholder="Write your message here..."
                        className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                    />

                </div>

                {/* Submit */}

                <button
                    type="submit"
                    disabled={buttonState === "sending"}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-4 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-400"
                >

                    {buttonState === "idle" && (
                        <>
                            <Send size={18} />
                            Send Message
                        </>
                    )}

                    {buttonState === "sending" && (
                        <>
                            <Loader2
                                size={18}
                                className="animate-spin"
                            />
                            Sending Message...
                        </>
                    )}

                    {buttonState === "submitted" && (
                        <>
                            <CheckCircle2 size={18} />
                            Submitted
                        </>
                    )}

                </button>

            </form>

        </div>

    );

}

export default ContactForm;