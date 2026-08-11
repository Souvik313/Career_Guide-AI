import { ChartNoAxesCombined , ArrowLeft } from "lucide-react";
import { useNavigate , useLocation } from "react-router-dom";
function AnalyticsHeader() {

    const navigate = useNavigate();
    const location = useLocation();
    const report = location.state;
    return (

        <section className="rounded-3xl bg-gradient-to-r from-slate-700 to-gray-800 p-8 shadow-md text-white">
  <div className="flex items-center gap-5">
    {/* Icon */}
    <div className="rounded-2xl bg-emerald-100/20 p-4">
      <ChartNoAxesCombined size={34} className="text-emerald-400" />
    </div>

    {/* Heading */}
    <div>
      <button
        onClick={() =>
          navigate("/dashboard", { state: report })
        }
        className="mb-4 flex items-center gap-2 text-emerald-300 hover:text-emerald-200 transition cursor-pointer"
      >
        <ArrowLeft size={18} />
        <span className="font-medium">Back to Dashboard</span>
      </button>

      <h1 className="text-4xl font-bold">
        Analytics Dashboard
      </h1>

      <p className="mt-3 max-w-3xl text-lg leading-8 text-emerald-100">
        Explore your resume performance, career compatibility,
        and AI-generated insights through interactive
        visualizations.
      </p>
    </div>
  </div>

</section>


    );

}

export default AnalyticsHeader;