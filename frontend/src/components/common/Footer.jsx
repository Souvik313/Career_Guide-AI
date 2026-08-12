import { FaGithub, FaLinkedin } from "react-icons/fa";

function Footer() {
    return (
        <footer className="border-t border-border bg-foreground py-12 text-background">

            <div className="mx-auto flex max-w-7xl flex-col items-center px-6">

                <h2 className="text-2xl font-bold">

                    CareerCompass AI

                </h2>

                <p className="mt-4 max-w-xl text-center leading-7 text-background/80">

                    AI-powered career guidance platform built using
                    semantic search, machine learning, and large language
                    models to help students and professionals discover
                    their ideal career path.

                </p>

                <div className="mt-8 flex gap-6">

                    <a
                        href="https://github.com/Souvik313"
                        target="_blank"
                        rel="noreferrer"
                        className="transition hover:text-primary"
                    >

                        <FaGithub size={28} />

                    </a>

                    <a
                        href="https://www.linkedin.com/in/souvik-roy-a8ab04337"
                        target="_blank"
                        rel="noreferrer"
                        className="transition hover:text-primary"
                    >

                        <FaLinkedin size={28} />

                    </a>

                </div>

                <div className="mt-8 h-px w-full bg-background/20"></div>

                <p className="mt-8 text-center text-sm text-background/70">

                    © 2026 CareerCompass AI • Built with ❤️ by Souvik Roy

                </p>

            </div>

        </footer>
    );
}

export default Footer;