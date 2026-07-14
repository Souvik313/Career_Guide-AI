import { Cpu , Globe , Server , BrainCircuit , Cloud } from "lucide-react";

const techCategories = [
    {
        icon: Globe,
        title: "Frontend",
        technologies: [
            "React",
            "Tailwind CSS",
            "Axios",
            "React Router",
        ],
    },
    {
        icon: Server,
        title: "Backend",
        technologies: [
            "FastAPI",
            "Python",
            "REST API",
        ],
    },
    {
        icon: BrainCircuit,
        title: "AI & Machine Learning",
        technologies: [
            "Sentence Transformers",
            "FAISS",
            "Groq LLM",
            "Pandas",
        ],
    },
    {
        icon: Cloud,
        title: "Deployment",
        technologies: [
            "GitHub",
            "Vercel",
            "Render",
        ],
    },
];

function TechStack() {

    return (

        <section id="tech-stack" className="bg-white py-24">

            <div className="mx-auto max-w-7xl px-6">

                <div className="text-center">

                    <div className="flex justify-center">

                        <div className="rounded-full bg-blue-100 p-4">

                            <Cpu
                                className="text-blue-600"
                                size={34}
                            />

                        </div>

                    </div>

                    <h2 className="mt-6 text-4xl font-bold text-slate-900">

                        Built With Modern Technologies

                    </h2>

                    <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-600">

                        CareerCompass AI combines modern web development,
                        semantic search, and large language models to
                        deliver intelligent career recommendations.

                    </p>

                </div>

                <div className="mt-16 grid gap-8 md:grid-cols-2">

                    {techCategories.map((category, index) => {

                        const Icon = category.icon;

                        return (

                            <div
                                key={index}
                                className="
                                    rounded-2xl
                                    border
                                    border-slate-200
                                    bg-slate-50
                                    p-8
                                    shadow-sm
                                "
                            >

                                <div className="flex items-center gap-4">

                                    <div className="rounded-xl bg-blue-100 p-3">

                                        <Icon
                                            className="text-blue-600"
                                            size={26}
                                        />

                                    </div>

                                    <h3 className="text-2xl font-semibold text-slate-900">

                                        {category.title}

                                    </h3>

                                </div>

                                <div className="mt-6 flex flex-wrap gap-3">

                                    {category.technologies.map((tech) => (

                                        <span
                                            key={tech}
                                            className="
                                                rounded-full
                                                bg-white
                                                border
                                                border-slate-200
                                                px-4
                                                py-2
                                                text-sm
                                                font-medium
                                                text-slate-700
                                            "
                                        >

                                            {tech}

                                        </span>

                                    ))}

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