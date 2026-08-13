import { FaGithub, FaLinkedin } from "react-icons/fa";

const links = [
    { label: "Home", href: "#home" },
    { label: "Features", href: "#features" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Tech Stack", href: "#tech-stack" },
];

function Footer() {
    return (
        <footer className="relative overflow-hidden bg-[#0B0F1A] pt-20">
            <div
                className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-20"
                style={{
                    backgroundImage:
                        "linear-gradient(to right, transparent, #F5A623, transparent)",
                }}
            />

            <div className="mx-auto max-w-6xl px-6">
                <div className="grid gap-12 md:grid-cols-[1.3fr_1fr_1fr]">
                    {/* Brand */}
                    <div>
                        <h2 className="font-[Fraunces] text-2xl font-medium text-white">
                            CareerCompass <span className="text-[#F5A623]">AI</span>
                        </h2>
                        <p className="mt-4 max-w-sm leading-7 text-slate-400">
                            AI-powered career guidance built with semantic
                            search, machine learning, and large language
                            models — helping students and professionals find
                            their next step.
                        </p>
                    </div>

                    {/* Quick links */}
                    <div>
                        <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                            Explore
                        </span>
                        <ul className="mt-5 space-y-3">
                            {links.map((link) => (
                                <li key={link.label}>
                                    <a
                                        href={link.href}
                                        className="text-slate-400 transition hover:text-[#F5A623]"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Connect */}
                    <div>
                        <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                            Connect
                        </span>
                        <div className="mt-5 flex gap-4">
                            <a
                                href="https://github.com/Souvik313"
                                target="_blank"
                                rel="noreferrer"
                                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition hover:border-[#F5A623]/40 hover:text-[#F5A623]"
                            >
                                <FaGithub size={20} />
                            </a>
                            <a
                                href="https://www.linkedin.com/in/souvik-roy-a8ab04337"
                                target="_blank"
                                rel="noreferrer"
                                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition hover:border-[#F5A623]/40 hover:text-[#F5A623]"
                            >
                                <FaLinkedin size={20} />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 py-8 text-sm text-slate-500 md:flex-row">
                    <p>© 2026 CareerCompass AI. All rights reserved.</p>
                    <p>
                        Built by{" "}
                        <a
                            href="https://github.com/Souvik313"
                            target="_blank"
                            rel="noreferrer"
                            className="text-slate-400 transition hover:text-[#F5A623]"
                        >
                            Souvik Roy
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
