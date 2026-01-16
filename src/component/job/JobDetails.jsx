import React, { useEffect, useState } from "react";
import { Box, Typography, Divider, Button, Avatar } from "@mui/material";
import { motion as Motion } from "framer-motion";
import CommonCard from "../common/CommonCard";
import CommonButton from "../common/CommonButton";
import { LensAILogo } from "../common/LensAi";
import { useApplyJobMutation } from "../../features/application/applicationApi";

export default function JobDetails({ job, onClose, isMobile, onLensAIClick }) {
    const [expanded, setExpanded] = useState(false);
    const [applyJob] = useApplyJobMutation();

    useEffect(() => {
        const esc = (e) => e.key === "Escape" && onClose();
        window.addEventListener("keydown", esc);
        return () => window.removeEventListener("keydown", esc);
    }, [onClose]);

    if (!job) return null;

    const applicationStatus = job.applicationStatus?.key;
    const isApplied = applicationStatus === "APPLIED";
    const isSaved = applicationStatus === "SAVED";

    const handleSaveJob = async () => {
        try {
            await applyJob({
                jobId: job.id,
                statusKey: "SAVED",
            }).unwrap();
        } catch (error) {
            console.error("Error saving job:", error);
        }
    };

    return (
        <Motion.div
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.25 }}
            style={{
                width: isMobile ? "100%" : "min(720px, 92vw)",
                height: isMobile ? "100vh" : "auto",
                maxHeight: isMobile ? "100vh" : "90vh",
                overflowY: isMobile ? "auto" : "visible",
                margin: isMobile ? 0 : "auto",
            }}
            onClick={(e) => e.stopPropagation()}
        >
            <CommonCard
                fullHeight={false}
                sx={{
                    width: "100%",
                    borderRadius: isMobile ? 0 : "12px",
                }}
            >
                <Box
                    className={!isMobile && expanded ? "hide-scrollbar" : ""}
                    sx={{
                        p: 4,
                        color: "#fff",
                        maxHeight: isMobile ? "none" : expanded ? "80vh" : 420,
                        overflowY: isMobile ? "visible" : expanded ? "auto" : "hidden",
                        transition: "max-height 0.25s ease",
                    }}
                >
                    {/* Header */}
                    <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start", mb: 2 }}>
                        <Avatar
                            src={job.companyLogo || ""}
                            sx={{
                                width: 56,
                                height: 56,
                                bgcolor: "#1f2933",
                                fontWeight: 700,
                                fontSize: "1.1rem",
                            }}
                        >
                            {!job.companyLogo && job.companyName?.[0]}
                        </Avatar>
                        <Box>
                            <Typography variant="h5" fontWeight={700}>
                                {job.title}
                            </Typography>
                            <Typography sx={{ opacity: 0.7, mt: 0.5 }}>
                                {job.companyName} • {job.location}
                            </Typography>
                        </Box>
                    </Box>

                    {/* Apply Button */}
                    <Box
                        sx={{
                            mb: 2,
                            display: "flex",
                            alignItems: "center",
                            gap: 1.5,
                            flexWrap: "wrap",
                        }}
                    >
                        {isApplied ? (
                            <>
                                <CommonButton
                                    radius="12px"
                                    text="Applied"
                                    textColor="black"
                                    disabled={true}
                                    sx={{ opacity: 0.6 }}
                                />
                                <CommonButton
                                    radius="12px"
                                    text="Can't Save"
                                    textColor="black"
                                    disabled={true}
                                    sx={{ opacity: 0.6 }}
                                />
                            </>
                        ) : (
                            <>
                                <CommonButton
                                    radius="12px"
                                    text="Apply Now"
                                    textColor="black"
                                    onClick={() => {
                                        sessionStorage.setItem("appliedJobId", job.id);
                                        window.open(job.applyUrl, "_blank");
                                    }}
                                />

                                <CommonButton
                                    radius="12px"
                                    text={isSaved ? "Already Saved" : "Save Job"}
                                    textColor="black"
                                    disabled={isSaved}
                                    onClick={handleSaveJob}
                                />
                            </>
                        )}

                        {/* LensAI Logo — Extract Keywords */}
                        {!isMobile && !isApplied && (
                            <LensAILogo
                                title={"Click to extract keywords"}
                                onClick={onLensAIClick}
                            />
                        )}
                    </Box>

                    <Divider sx={{ my: 2, opacity: 0.25 }} />

                    {/* Description */}
                    <Typography
                        sx={{
                            whiteSpace: "pre-line",
                            lineHeight: 1.7,
                            opacity: 0.9,
                            fontSize: "0.95rem",
                            display: "-webkit-box",
                            WebkitLineClamp: isMobile ? "unset" : expanded ? "unset" : 6,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                        }}
                    >
                        {job.description}
                    </Typography>

                    {/* See More / Less */}
                    {!isMobile && (
                        <Box sx={{ mt: 2 }}>
                            <Button
                                size="small"
                                sx={{ textTransform: "none", color: "#00d4ff" }}
                                onClick={() => setExpanded((prev) => !prev)}
                            >
                                {expanded ? "See less" : "See more"}
                            </Button>
                        </Box>
                    )}
                </Box>
            </CommonCard>
        </Motion.div>
    );
}
