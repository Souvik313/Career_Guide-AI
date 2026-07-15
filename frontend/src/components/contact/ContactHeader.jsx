import { Mail, Sparkles } from "lucide-react";

function ContactHeader() {
    return (
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 px-10 py-16 text-white shadow-xl">

            {/* Background Glow */}
            <div className="absolute -top-16 -right-16 h-56 w-56 rounded-full bg-white/10 blur-3xl"></div>
            <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-cyan-300/10 blur-3xl"></div>

            <div className="relative z-10 max-w-3xl">

                <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 backdrop-blur">

                    <Sparkles size={18} />

                    <span className="text-sm font-medium tracking-wide">
                        Let's Connect
                    </span>

                </div>

                <h1 className="text-4xl font-bold leading-tight md:text-5xl">

                    Get in Touch

                </h1>

                <p className="mt-6 max-w-2xl text-lg leading-8 text-blue-50">

                    Whether you have a question about CareerCompass AI,
                    a collaboration opportunity, or a software engineering
                    internship, I'd be happy to hear from you.
                    Feel free to reach out and let's build something amazing together.

                </p>

                <div className="mt-8 flex items-center gap-3">

                    <div className="rounded-full bg-white/20 p-3 backdrop-blur">

                        <Mail size={22} />

                    </div>

                    <div>

                        <p className="text-sm text-blue-100">

                            Usually replies within 24 hours

                        </p>

                        <p className="font-semibold">

                            Open for Internships & Collaborations

                        </p>

                    </div>

                </div>

            </div>

        </section>
    );
}

export default ContactHeader;