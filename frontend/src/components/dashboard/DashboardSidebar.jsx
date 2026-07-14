import {
    LayoutDashboard,
    BriefcaseBusiness,
    Code2,
    BookOpen,
    Rocket,
    Download,
    RotateCcw,
    ChartColumn
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { generatePDF } from "../../utils/pdfGenerator.js";

function DashboardSidebar({report}) {
    const navigate = useNavigate();

    const menuItems = [

        {
            icon: LayoutDashboard,
            label: "Overview",
            id: "dashboard-header"
        },

        {
            icon: BriefcaseBusiness,
            label: "Career",
            id: "career-paths"
        },

        {
            icon: Code2,
            label: "Skills",
            id: "resume-skills"
        },

        {
            icon: BookOpen,
            label: "AI Insights",
            id: "strength-analysis"
        },

        {
            icon: Rocket,
            label: "Final Thoughts",
            id: "motivation"
        },

        {
            icon: ChartColumn,
            label: "Analytics",
            id: "Analytics"
        }

    ];

    return (

        <aside className="sticky top-0 h-screen w-72 border-r border-slate-200 bg-white p-6 flex flex-col">

            <h2 className="text-2xl font-bold text-blue-600">

                CareerCompass AI

            </h2>

            <div className="my-6 h-px bg-slate-200"></div>

            <nav className="flex-1 overflow-y-auto hide-scrollbar">

                {

                    menuItems.map((item) => (

                        <button

                            key={item.id}

                            className="flex w-full items-center gap-4 rounded-xl px-4 py-3 text-left text-slate-700 transition hover:bg-blue-50 hover:text-blue-600"

                            onClick={() => {

                                if (item.label === "Analytics") {

                                    navigate("/analytics", {
                                        state: report
                                    });

                                    return;
                                }

                                document.getElementById(item.id)?.scrollIntoView({
                                    behavior: "smooth"
                                });

                            }}

                        >

                            <item.icon size={20} />

                            <span>

                                {item.label}

                            </span>

                        </button>

                    ))

                }

            </nav>

            <div className="border-t pt-6">

                <button
                    className="flex w-full items-center gap-3 rounded-xl px-4 py-3 hover:bg-slate-100"
                    onClick={() => generatePDF(report)}
                >

                    <Download size={20}/>

                    Export Report

                </button>

                <button
                    className="flex w-full items-center gap-3 rounded-xl px-4 py-3 hover:bg-slate-100"
                    onClick={() => navigate("/upload")}
                >

                    <RotateCcw size={20}/>

                    New Analysis

                </button>

            </div>

        </aside>

    );

}

export default DashboardSidebar;