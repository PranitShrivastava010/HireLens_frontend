import React, { useEffect, useState } from "react";
import { useLazyGetJobByIdQuery } from "../../features/job/jobApi";
import { Dialog, CircularProgress, Box, IconButton, useMediaQuery } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import JobDetails from "../../component/job/JobDetails";

export default function JobDetailsContainer({ jobId, onClose }) {
    const [jobData, setJobData] = useState(null);
    const [getJobById, { isFetching }] = useLazyGetJobByIdQuery();
    const isMobile = useMediaQuery('(max-width:600px)');

    useEffect(() => {
        if (!jobId) return;

        // Defer clearing previous data to avoid synchronous setState inside the effect
        Promise.resolve().then(() => setJobData(null));
        getJobById(jobId)
            .unwrap()
            .then(res => setJobData(res.data))
            .catch(console.error);
    }, [jobId, getJobById]);

    return (
        <Dialog
            open={Boolean(jobId)}
            onClose={(event, reason) => {
                // Only close on backdrop click or ESC - ignore other reasons
                if (reason === 'backdropClick' || reason === 'escapeKeyDown') {
                    onClose();
                }
            }}
            fullScreen={isMobile}
            maxWidth={false}
            scroll="body"
            sx={{
                "& .MuiDialog-container": {
                    alignItems: { xs: 'flex-end', md: 'center' }, // mobile bottom, desktop center
                },
            }}
            PaperProps={{
                sx: {
                    background: "transparent",
                    boxShadow: "none",
                    overflow: "visible",
                    m: { xs: 0, md: "auto" },
                    // display: "flex",
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
                    {jobData && <JobDetails job={jobData} onClose={onClose} isMobile={isMobile} />}
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
    );
}
