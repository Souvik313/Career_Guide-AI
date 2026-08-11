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

            <div className="mx-auto max-w-[1500px] px-4 py-8 sm:px-6 lg:px-8 space-y-8">

                {/* Page Header */}

                <AnalyticsHeader />

                {/* KPI Cards */}

                <KpiCards report={report} />

                {/* Charts */}

                <div className="grid grid-cols-1 gap-8 xl:grid-cols-[minmax(560px,1.05fr)_minmax(460px,0.95fr)]">

                    <div className="min-w-0">

                        <SkillOverviewChart report={report} />

                    </div>

                    <div className="min-w-0">

                        <CareerMatchChart report={report} />

                    </div>

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