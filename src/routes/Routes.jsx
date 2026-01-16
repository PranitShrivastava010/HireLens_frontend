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

export default function Router() {
    return (
        <Routes>
            <Route
                path="/"
                element={<HomePage />}
            />
            <Route
                path="/register"
                element={<RegisterPage />}
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
            </Route>
        </Routes>
    )
}