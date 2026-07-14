import DashboardSidebar from "../components/dashboard/DashboardSidebar";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import CareerSummaryCard from "../components/dashboard/CareerSummaryCard";
import MatchScoreCard from "../components/dashboard/MatchScoreCard";
import CareerPathsCard from "../components/dashboard/CareerPathsCard";
import ResumeSkillsCard from "../components/dashboard/ResumeSkillsCard";
import MissingSkillsCard from "../components/dashboard/MissingSkillsCard";
import RecommendedJobsCard from "../components/dashboard/RecommendedJobsCard";
import StrengthAnalysisCard from "../components/dashboard/StrengthAnalysisCard";
import RoadmapCard from "../components/dashboard/RoadMapCard";
import MotivationCard from "../components/dashboard/MotivationCard";
import { useLocation , useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Dashboard() {

    const location = useLocation();
    const navigate = useNavigate();

    const report = location.state;

    useEffect(() => {
        if (!report) {
            navigate("/upload");
        }
    }, [report, navigate]);

    if (!report) return null;

    console.log(report);

    return (

        <main className="min-h-screen bg-slate-100 p-8">

            <div className="flex">

                <DashboardSidebar report={report}/>

                <div className="flex-1 p-8">

                    <DashboardHeader report={report}/>
                    <CareerSummaryCard
                        summary={report.ai_report.career_summary}
                    />
                    <MatchScoreCard score={report.career_report.match_score}/>
                    <CareerPathsCard 
                        roles={report.career_report.best_roles}
                        explanation={report.ai_report.career_path_explanation}
                    />
                    <ResumeSkillsCard
                        skills={report.resume_skills}
                    />
                    <MissingSkillsCard
                        skills={report.missing_skills}
                    />
                    <RecommendedJobsCard jobs = {report.recommended_jobs}/>
                    <StrengthAnalysisCard
                        strengths={report.career_report.strengths}
                        analysis={report.ai_report.strength_analysis}
                    />
                    <RoadmapCard
                        roadmap={report.ai_report.learning_roadmap}
                    />
                    <MotivationCard 
                        motivation={report.ai_report.motivation}
                    />

                </div>

            </div>

        </main>

    );

}

export default Dashboard;