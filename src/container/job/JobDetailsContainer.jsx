import React, { useEffect, useState } from "react";
import { useLazyGetJobByIdQuery } from "../../features/job/jobApi";
import { Dialog, CircularProgress, Box, IconButton, useMediaQuery } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import JobDetails from "../../component/job/JobDetails";
import KeywordsContainer from "./KeywordsContainer";
import ApplicationStatusModal from "../../component/job/ApplicationStatusModal";

export default function JobDetailsContainer({ jobId, onClose }) {
    const [jobData, setJobData] = useState(null);
    const [showKeywords, setShowKeywords] = useState(false);
    const [showApplicationStatus, setShowApplicationStatus] = useState(false);
    const [getJobById, { isFetching }] = useLazyGetJobByIdQuery();
    const isMobile = useMediaQuery('(max-width:600px)');

    useEffect(() => {
        if (!jobId) return;

        Promise.resolve().then(() => setJobData(null));
        getJobById(jobId)
            .unwrap()
            .then(res => setJobData(res.data))
            .catch(console.error);
    }, [jobId, getJobById]);

    useEffect(() => {
        // Check if user just returned from applying
        const appliedJobId = sessionStorage.getItem("appliedJobId");
        if (appliedJobId && appliedJobId === jobId) {
            setTimeout(() => {
                setShowApplicationStatus(true);
                sessionStorage.removeItem("appliedJobId");
            }, 0);
        }
    }, [jobId]);

    const handleLensAIClick = () => {
        setShowKeywords(true);
    };

    const handleCloseKeywords = () => {
        setShowKeywords(false);
    };

    const handleCloseApplicationStatus = () => {
        setShowApplicationStatus(false);
    };

    return (
        <>
            <Dialog
                open={Boolean(jobId)}
                onClose={(event, reason) => {
                    if (reason === 'backdropClick' || reason === 'escapeKeyDown') {
                        onClose();
                    }
                }}
                fullScreen={isMobile}
                maxWidth={false}
                scroll="body"
                sx={{
                    "& .MuiDialog-container": {
                        alignItems: { xs: 'flex-end', md: 'center' },
                    },
                }}
                PaperProps={{
                    sx: {
                        background: "transparent",
                        boxShadow: "none",
                        overflow: "visible",
                        m: { xs: 0, md: "auto" },
                        alignItems: "center",
                        justifyContent: "center",
                        p: { xs: 0, md: 2 },
                    },
                }}
                BackdropProps={{
                    sx: {
                        backgroundColor: "rgba(0,0,0,0.55)",
                        backdropFilter: "blur(6px)",
                    },
                }}
            >
                {isFetching && !jobData ? (
                    <Box sx={{ p: 6, display: "flex", justifyContent: "center" }}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <>
                        {jobData && (
                            <JobDetails
                                job={jobData}
                                onClose={onClose}
                                isMobile={isMobile}
                                onLensAIClick={handleLensAIClick}
                            />
                        )}
                        {isMobile && (
                            <IconButton
                                onClick={onClose}
                                sx={{
                                    position: "absolute",
                                    top: 16,
                                    right: 16,
                                    color: "#fff",
                                    zIndex: 10,
                                }}
                            >
                                <CloseIcon />
                            </IconButton>
                        )}
                    </>
                )}
            </Dialog>

            {/* Keywords Modal */}
            <KeywordsContainer
                jobId={jobData?.id}
                isOpen={showKeywords}
                onClose={handleCloseKeywords}
            />

            {/* Application Status Modal */}
            <ApplicationStatusModal
                open={showApplicationStatus}
                onClose={handleCloseApplicationStatus}
                jobId={jobData?.id}
                jobTitle={jobData?.title}
            />
        </>
    );
}
