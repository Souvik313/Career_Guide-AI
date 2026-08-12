import { Cpu, Globe, Server, BrainCircuit, Cloud } from "lucide-react";

const techCategories = [
    {
        icon: Globe,
        title: "Frontend",
        technologies: ["React", "Tailwind CSS", "Axios", "React Router"],
        indent: "md:ml-0",
    },
    {
        icon: Server,
        title: "Backend",
        technologies: ["FastAPI", "Python", "REST API"],
        indent: "md:ml-8",
    },
    {
        icon: BrainCircuit,
        title: "AI & Machine Learning",
        technologies: ["Sentence Transformers", "FAISS", "Groq LLM", "Pandas"],
        indent: "md:ml-16",
    },
    {
        icon: Cloud,
        title: "Deployment",
        technologies: ["GitHub", "Vercel", "Railway"],
        indent: "md:ml-24",
    },
];

function TechStack() {
    return (
        <section id="tech-stack" className="bg-background py-28">
            <div className="mx-auto max-w-4xl px-6">
                <div className="flex items-start gap-4">
                    <div className="rounded-xl border border-border bg-muted p-3">
                        <Cpu className="text-primary" size={26} />
                    </div>
                    <div>
                        <span className="text-sm font-semibold uppercase tracking-widest text-primary">
                            Under the hood
                        </span>
                        <h2 className="mt-2 font-[Fraunces] text-4xl font-medium leading-tight text-foreground md:text-5xl">
                            Built on a real stack
                        </h2>
                        <p className="mt-4 max-w-xl text-lg leading-7 text-muted-foreground">
                            Modern web tooling on top, semantic search and
                            LLM reasoning underneath, running on
                            infrastructure that just stays up.
                        </p>
                    </div>
                </div>

                <div className="mt-16 space-y-4">
                    {techCategories.map((category, index) => {
                        const Icon = category.icon;
                        return (
                            <div
                                key={index}
                                className={`
                                    rounded-2xl border border-border
                                    bg-muted p-6 transition-colors
                                    hover:border-primary/30
                                    ${category.indent}
                                `}
                            >
                                <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="rounded-lg bg-card p-2.5 ring-1 ring-border">
                                            <Icon
                                                className="text-foreground"
                                                size={20}
                                            />
                                        </div>
                                        <h3 className="text-lg font-semibold text-foreground">
                                            {category.title}
                                        </h3>
                                    </div>

                                    <div className="flex flex-1 flex-wrap gap-2">
                                        {category.technologies.map((tech) => (
                                            <span
                                                key={tech}
                                                className="rounded-md border border-border bg-card px-3 py-1 font-mono text-xs text-muted-foreground"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

export default TechStack;