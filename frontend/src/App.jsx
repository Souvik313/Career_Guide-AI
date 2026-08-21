import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import UploadResume from "./pages/UploadResume";
import Dashboard from "./pages/Dashboard";
import LoadingPage from "./pages/LoadingPage";
import ReportPage from "./pages/ReportPage";
import NotFound from "./pages/NotFound";
import AnalyticsPage from "./pages/AnalyticsPage";
import Contact from "./pages/Contact";
import CareerCoach from "./pages/CareerCoach.jsx";

import MainLayout from "./layouts/MainLayout";
import ProtectedRoute from "./layouts/ProtectedRoute";
import ProfileLayout from "./layouts/ProfileLayout";
import ProfilePersonalInfo from "./pages/profile/ProfilePersonalInfo.jsx";
import ProfileResumes from "./pages/profile/ProfileResumes.jsx";
import ProfileSavedJobs from "./pages/profile/ProfileSavedJobs.jsx";
import ProfileConversationHistory from "./pages/profile/ProfileConversationHistory.jsx";
import ProfileSettings from "./pages/profile/ProfileSettings.jsx";

import JobUpdates from "./pages/jobs/JobUpdates.jsx";

function App() {
  return (
    <Routes>

        {/* =====================================================
            Main Layout
        ===================================================== */}

        <Route element={<MainLayout />}>

            {/* =================================================
                Public Routes
            ================================================= */}

            <Route
                path="/"
                element={<Home />}
            />

            <Route
                path="/contact"
                element={<Contact />}
            />

            <Route
                path="/loading"
                element={<LoadingPage />}
            />

            <Route
                path="/login"
                element={<Login />}
            />

            <Route
                path="/register"
                element={<Register />}
            />


            {/* =================================================
                Protected Main Application Routes
            ================================================= */}

            <Route element={<ProtectedRoute />}>

                <Route
                    path="/upload"
                    element={<UploadResume />}
                />

                <Route
                    path="/dashboard"
                    element={<Dashboard />}
                />

                <Route
                    path="/report"
                    element={<ReportPage />}
                />

                <Route
                    path="/analytics"
                    element={<AnalyticsPage />}
                />

                <Route
                    path="/career-coach"
                    element={<CareerCoach />}
                />

                <Route
                    path="/job-updates"
                    element={<JobUpdates />}
                />

            </Route>


            {/* =================================================
                Protected Profile Routes
            ================================================= */}

            <Route element={<ProtectedRoute />}>

                <Route
                    path="/profile"
                    element={<ProfileLayout />}
                >

                    <Route
                        index
                        element={<ProfilePersonalInfo />}
                    />

                    <Route
                        path="personal-info"
                        element={<ProfilePersonalInfo />}
                    />

                    <Route
                        path="resumes"
                        element={<ProfileResumes />}
                    />

                    <Route
                        path="saved-jobs"
                        element={<ProfileSavedJobs />}
                    />

                    <Route
                        path="conversations"
                        element={<ProfileConversationHistory />}
                    />

                    <Route
                        path="settings"
                        element={<ProfileSettings />}
                    />

                </Route>

            </Route>

        </Route>


        {/* =====================================================
            Not Found
        ===================================================== */}

        <Route
            path="*"
            element={<NotFound />}
        />

    </Routes>
  );
}

export default App;