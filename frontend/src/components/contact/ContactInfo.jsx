import {
    Mail,
    MapPin,
    Briefcase,
    ExternalLink
} from "lucide-react";
import { FaGithub , FaLinkedin } from "react-icons/fa";

function ContactInfo() {

    const contactItems = [

        {
            icon: Mail,
            title: "Email",
            value: "careercompass.ai@example.com",
            href: "mailto:thisissouvik.2024@gmail.com"
        },

        {
            icon: FaLinkedin,
            title: "LinkedIn",
            value: "linkedin.com/in/souvik-roy-a8ab04337",
            href: "https://www.linkedin.com/in/souvik-roy-a8ab04337"
        },

        {
            icon: FaGithub,
            title: "GitHub",
            value: "github.com/Souvik313",
            href: "https://github.com/Souvik313"
        },

        {
            icon: MapPin,
            title: "Location",
            value: "Kolkata, India"
        }

    ];

    return (

        <div className="rounded-3xl bg-white p-8 shadow-lg border border-slate-200">

            <h2 className="text-2xl font-bold text-slate-800">

                Contact Information

            </h2>

            <p className="mt-2 text-slate-500 leading-7">

                Feel free to connect through any of the platforms below.
                I'm always happy to discuss software engineering,
                AI/ML projects, or internship opportunities.

            </p>

            <div className="mt-8 space-y-5">

                {

                    contactItems.map((item) => (

                        <div
                            key={item.title}
                            className="flex items-start gap-4 rounded-2xl border border-slate-200 p-4 transition hover:border-blue-500 hover:bg-blue-50"
                        >

                            <div className="rounded-xl bg-blue-100 p-3 text-blue-600">

                                <item.icon size={22} />

                            </div>

                            <div className="flex-1">

                                <h3 className="font-semibold text-slate-800">

                                    {item.title}

                                </h3>

                                {

                                    item.href ? (

                                        <a
                                            href={item.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="mt-1 inline-flex items-center gap-1 text-blue-600 hover:underline break-all"
                                        >

                                            {item.value}

                                            <ExternalLink size={15} />

                                        </a>

                                    ) : (

                                        <p className="mt-1 text-slate-600">

                                            {item.value}

                                        </p>

                                    )

                                }

                            </div>

                        </div>

                    ))

                }

            </div>

            <div className="mt-10 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 p-6 text-white">

                <div className="flex items-center gap-3">

                    <Briefcase size={24} />

                    <h3 className="text-lg font-semibold">

                        Currently Available

                    </h3>

                </div>

                <ul className="mt-4 space-y-2 text-blue-50">

                    <li>• Software Engineering Internships</li>

                    <li>• Full Stack Development Projects</li>

                    <li>• AI / Machine Learning Collaborations</li>

                    <li>• Open Source Contributions</li>

                </ul>

            </div>

        </div>

    );

}

export default ContactInfo;