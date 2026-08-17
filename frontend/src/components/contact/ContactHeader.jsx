import { Mail, Sparkles } from "lucide-react";
 
function ContactHeader() {
    return (
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 px-8 py-12 text-white shadow-xl md:px-12 md:py-14">
 
            {/* Background Glow */}
            <div className="absolute -top-16 -right-16 h-56 w-56 rounded-full bg-white/10 blur-3xl"></div>
            <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-cyan-300/10 blur-3xl"></div>
 
            <div className="relative z-10 max-w-3xl">
 
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3.5 py-1.5 backdrop-blur">
 
                    <Sparkles size={16} />
 
                    <span className="text-sm font-medium tracking-wide">
                        Let's Connect
                    </span>
 
                </div>
 
                <h1 className="text-3xl font-bold leading-tight md:text-4xl">
 
                    Get in Touch
 
                </h1>
 
                <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-300 md:text-lg">
 
                    Whether you have a question about CareerCompass AI,
                    a collaboration opportunity, or a software engineering
                    internship, I'd be happy to hear from you.
                    Feel free to reach out and let's build something amazing together.
 
                </p>
 
                <div className="mt-6 flex items-center gap-3">
 
                    <div className="rounded-full border border-white/10 bg-white/20 p-2.5 backdrop-blur">
 
                        <Mail size={20} />
 
                    </div>
 
                    <div>
 
                        <p className="text-sm text-slate-400">
 
                            Usually replies within 24 hours
 
                        </p>
 
                        <p className="text-sm font-semibold">
 
                            Open for Internships & Collaborations
 
                        </p>
 
                    </div>
 
                </div>
 
            </div>
 
        </section>
    );
}
 
export default ContactHeader;