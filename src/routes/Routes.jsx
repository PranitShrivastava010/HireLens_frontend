import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import DashboardPage from "../pages/DashboardPage";
import AppLayout from "./AppLayout";
import AuthRedirect from "./AuthRedirect";

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
            </Route>
        </Routes>
    )
}