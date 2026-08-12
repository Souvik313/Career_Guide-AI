import {
    Mail,
    Globe,
    ArrowUpRight
} from "lucide-react";
import { FaGithub , FaLinkedin } from "react-icons/fa";

function SocialLinks() {

    const socials = [

        {
            icon: FaGithub,
            name: "GitHub",
            username: "@Souvik313",
            href: "https://github.com/Souvik313"
        },

        {
            icon: FaLinkedin,
            name: "LinkedIn",
            username: "Souvik Roy",
            href: "https://www.linkedin.com/in/souvik-roy-a8ab04337"
        },

        {
            icon: Mail,
            name: "Email",
            username: "careercompass.ai@example.com",
            href: "mailto:thisissouvik.2024@gmail.com"
        },

        {
            icon: Globe,
            name: "Portfolio",
            username: "CareerCompass AI",
            href: "/"
        }

    ];

    return (

        <section className="rounded-3xl border border-border bg-card p-8 shadow-lg">

            <div className="text-center">

                <h2 className="text-2xl font-bold text-foreground">

                    Connect With Me

                </h2>

                <p className="mt-3 text-muted-foreground">

                    You can also reach me through these platforms.

                </p>

            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-2">

                {

                    socials.map((social) => (

                        <a
                            key={social.name}
                            href={social.href}
                            target={
                                social.href.startsWith("/")
                                    ? "_self"
                                    : "_blank"
                            }
                            rel="noopener noreferrer"
                            className="group flex items-center justify-between rounded-2xl border border-border bg-background p-5 transition hover:border-primary/50 hover:bg-muted hover:shadow-md"
                        >

                            <div className="flex items-center gap-4">

                                <div className="rounded-xl bg-primary/10 p-3 text-primary">

                                    <social.icon size={22} />

                                </div>

                                <div>

                                    <h3 className="font-semibold text-foreground">

                                        {social.name}

                                    </h3>

                                    <p className="text-sm text-muted-foreground">

                                        {social.username}

                                    </p>

                                </div>

                            </div>

                            <ArrowUpRight
                                size={20}
                                className="text-muted-foreground transition group-hover:text-primary"
                            />

                        </a>

                    ))

                }

            </div>

        </section>

    );

}

export default SocialLinks;