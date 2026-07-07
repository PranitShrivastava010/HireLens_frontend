import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import DashboardPage from "../pages/DashboardPage";
import AppLayout from "./AppLayout";
import AuthRedirect from "./AuthRedirect";
import JobPage from "../pages/JobPage";
import RequireJobPreferences from "./RequiredJobPreference";
import JobPreferencePage from "../pages/JobPreferencePage";
import StatsPage from "../pages/StatsPage";
import ResumeBuilderContainer from "../container/resume/ResumeBuilderContainer";
import ComingSoonPage from "../pages/ComingSoonPage";

export default function Router() {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <AuthRedirect>
                        <HomePage />
                    </AuthRedirect>
                }
            />
            <Route
                path="/register"
                element={
                    <AuthRedirect>
                        <RegisterPage />
                    </AuthRedirect>
                }
            />
            <Route
                path="/login"
                element={
                    <AuthRedirect>
                        <LoginPage />
                    </AuthRedirect>
                }
            />
            <Route element={<AppLayout />}>
                <Route
                    path="/dashboard"
                    element={<DashboardPage />}
                />
                <Route
                    path="/jobs"
                    element={
                        <RequireJobPreferences>
                            <JobPage />
                        </RequireJobPreferences>
                    }
                />
                <Route
                    path="/job-preferences"
                    element={
                        <JobPreferencePage/>
                    }
                />
                <Route
                    path="/stats"
                    element={<StatsPage />}
                />
                <Route
                    path="/resume"
                    element={<ResumeBuilderContainer/>}
                />
                <Route path="/score" element={<ComingSoonPage />} />
                <Route path="/ai" element={<ComingSoonPage />} />
                <Route path="/coverLetter" element={<ComingSoonPage />} />
                <Route path="/linkedin" element={<ComingSoonPage />} />
            </Route>
        </Routes>
    )
}