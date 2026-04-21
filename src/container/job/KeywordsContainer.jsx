import React, { useEffect, useState } from "react";
import { useGetJobKeywordsMutation } from "../../features/job/jobApi";
import { Dialog, CircularProgress, Box, useMediaQuery } from "@mui/material";
import Keywords from "../../component/job/Keywords";

export default function KeywordsContainer({ jobId, onClose, isOpen }) {
    const [getJobKeywords, { data: keywordsData, isLoading, error }] = useGetJobKeywordsMutation();
    const isMobile = useMediaQuery('(max-width:600px)');
    const [keywordsFetched, setKeywordsFetched] = useState(false);

    useEffect(() => {
        if (!isOpen || !jobId || keywordsFetched) return;

        const fetchKeywords = async () => {
            try {
                await getJobKeywords(jobId).unwrap();
                setKeywordsFetched(true);
            } catch (err) {
                console.error("Failed to fetch keywords:", err);
                setKeywordsFetched(true);
            }
        };

        fetchKeywords();
    }, [isOpen, jobId, getJobKeywords, keywordsFetched]);

    const handleClose = () => {
        setKeywordsFetched(false);
        onClose();
    };

    return (
        <Dialog
            open={isOpen}
            onClose={(event, reason) => {
                if (reason === 'backdropClick' || reason === 'escapeKeyDown') {
                    handleClose();
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
            {isLoading && !keywordsData ? (
                <Box sx={{ p: 6, display: "flex", justifyContent: "center" }}>
                    <CircularProgress sx={{ color: "#00f5ff" }} />
                </Box>
            ) : (
                <Keywords
                    jobId={jobId}
                    isLoading={isLoading}
                    keywords={keywordsData?.keywords || []}
                    error={error}
                    onClose={handleClose}
                    isMobile={isMobile}
                />
            )}
        </Dialog>
    );
}