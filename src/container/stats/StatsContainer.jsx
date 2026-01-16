import React, { useMemo, useState } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import Stats from "../../component/stats/Stats";
import { useGetUserApplicationsQuery } from "../../features/application/applicationApi";
import JobDetailsContainer from "../job/JobDetailsContainer";
import InterviewDateModal from "../../component/stats/InterviewDateModal";

export default function StatsContainer() {
    const { data: applications, isLoading, error } = useGetUserApplicationsQuery();
    const [selectedJobId, setSelectedJobId] = useState(null);

    // Transform API data to match Stats component structure
    const stats = useMemo(() => {
        if (!applications || typeof applications !== 'object') {
            return {
                SAVED: [],
                APPLIED: [],
                INTERVIEW: [],
                OFFER: [],
                REJECTED: [],
                NO_RESPONSE: [],
            };
        }

        // Log the API response for debugging
        console.log("API Applications:", applications);

        const transformApps = (apps) => 
            (apps || []).map(app => ({
                id: app.applicationId,
                jobId: app.jobId,
                title: app.jobTitle,
                companyName: app.companyName,
                companyLogo: app.companyLogo,
                location: "Location",
                appliedAt: app.appliedAt,
                interviewDate: app.interviewDate,
            }));

        return {
            SAVED: transformApps(applications.SAVED),
            APPLIED: transformApps(applications.APPLIED),
            INTERVIEW: transformApps(applications.INTERVIEW),
            OFFER: transformApps(applications.OFFER),
            REJECTED: transformApps(applications.REJECTED),
            NO_RESPONSE: transformApps(applications.NO_RESPONSE),
        };
    }, [applications]);

    if (isLoading) {
        return (
            <Box sx={{ p: 3, display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ p: 3, color: "#fff" }}>
                <Typography>Error loading applications: {error?.message}</Typography>
            </Box>
        );
    }

    const handleCardInfoClick = (jobId) => {
        setSelectedJobId(jobId);
    };

    const handleCloseJobDetails = () => {
        setSelectedJobId(null);
    };

    return (
        <>
            <Box sx={{ p: 3 }}>
                <Stats stats={stats} onCardInfoClick={handleCardInfoClick} />
            </Box>
            <JobDetailsContainer 
                jobId={selectedJobId} 
                onClose={handleCloseJobDetails} 
            />
        </>
    );
}