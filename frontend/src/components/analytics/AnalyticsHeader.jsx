import { ChartNoAxesCombined , ArrowLeft } from "lucide-react";
import { useNavigate , useLocation } from "react-router-dom";
function AnalyticsHeader() {

    const navigate = useNavigate();
    const location = useLocation();
    const report = location.state;
    return (

        <section className="rounded-3xl bg-white p-8 shadow-md">

            <div className="flex items-center gap-5">

                {/* Icon */}

                <div className="rounded-2xl bg-blue-100 p-4">

                    <ChartNoAxesCombined
                        size={34}
                        className="text-blue-600"
                    />

                </div>

                {/* Heading */}

                <div>

                    <button
                        onClick={() =>
                            navigate("/dashboard", {
                                state: report
                            })
                        }
                        className="mb-4 flex items-center gap-2 text-blue-600 hover:text-blue-700 transition cursor-pointer"
                    >
                        <ArrowLeft size={18} />
                        <span className="font-medium">Back to Dashboard</span>
                    </button>

                    <h1 className="text-4xl font-bold text-slate-900">

                        Analytics Dashboard

                    </h1>

                    <p className="mt-3 max-w-3xl text-lg leading-8 text-slate-600">

                        Explore your resume performance, career compatibility,
                        and AI-generated insights through interactive
                        visualizations.

                    </p>

                </div>

            </div>

            {/* Divider */}

            <div className="mt-8 h-px bg-slate-200"></div>

        </section>

    );

}

export default AnalyticsHeader;