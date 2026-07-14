import AnalyticsHeader from "../components/analytics/AnalyticsHeader";
import KpiCards from "../components/analytics/KpiCards";
import SkillOverviewChart from "../components/analytics/SkillOverviewChart";
import CareerMatchChart from "../components/analytics/CareerMatchChart";
import RecommendedJobsChart from "../components/analytics/RecommendedJobsChart";
import AnalyticsInsight from "../components/analytics/AnalyticsInsight";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function AnalyticsPage() {

    const location = useLocation();
    const navigate = useNavigate();

    const report = location.state;

    useEffect(() => {
            if (!report) {
                navigate("/upload");
            }
        }, [report, navigate]);
    
    if (!report) return null;

    return (

        <main className="min-h-screen bg-slate-100">

            <div className="mx-auto max-w-7xl px-8 py-8 space-y-8">

                {/* Page Header */}

                <AnalyticsHeader />

                {/* KPI Cards */}

                <KpiCards report={report} />

                {/* Charts */}

                <div className="grid grid-cols-1 gap-8 xl:grid-cols-2">

                    <SkillOverviewChart report={report} />

                    <CareerMatchChart report={report} />

                </div>

                {/* Full Width Chart */}

                <RecommendedJobsChart report={report} />

                {/* AI Insight */}

                <AnalyticsInsight report={report} />

            </div>

        </main>

    );

}

export default AnalyticsPage;