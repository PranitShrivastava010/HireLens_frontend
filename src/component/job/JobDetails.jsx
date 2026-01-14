import React, { useEffect, useState } from "react";
import { Box, Typography, Divider, Button, Avatar } from "@mui/material";
import { motion as Motion } from "framer-motion";
import CommonCard from "../common/CommonCard";
import CommonButton from "../common/CommonButton";

export default function JobDetails({ job, onClose, isMobile }) {
    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
        const esc = e => e.key === "Escape" && onClose();
        window.addEventListener("keydown", esc);
        return () => window.removeEventListener("keydown", esc);
    }, [onClose]);

    if (!job) return null;

    return (
        <Motion.div
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.25 }}
            style={{
                width: isMobile ? "100%" : "min(720px, 92vw)",
                height: isMobile ? "100vh" : "auto",          // mobile full-screen, desktop auto
                maxHeight: isMobile ? "100vh" : "90vh",      // desktop max height for scrolling
                overflowY: isMobile ? "auto" : "visible",    // mobile scroll, desktop controlled by inner box
                margin: isMobile ? 0 : "auto",
            }}
            onClick={e => e.stopPropagation()}
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

                        // Desktop behavior:
                        // collapsed: short preview
                        // expanded: bounded to viewport so it can scroll inside
                        maxHeight: isMobile ? "none" : (expanded ? "80vh" : 420),

                        overflowY: isMobile ? "visible" : (expanded ? "auto" : "hidden"),
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
                            <Typography variant="h5" fontWeight={700}>{job.title}</Typography>
                            <Typography sx={{ opacity: 0.7, mt: 0.5 }}>{job.companyName} • {job.location}</Typography>
                        </Box>
                    </Box>

                    {/* Apply Button */}
                    <Box sx={{ mb: 2 }}>
                        <CommonButton
                            fullWidth
                            radius="12px"
                            text="Apply Now"
                            textColor="black"
                            onClick={() => window.open(job.applyUrl, "_blank")}
                        />
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
                    <Box sx={{ mt: 2 }}>
                        <Button
                            size="small"
                            sx={{ textTransform: "none", color: "#00d4ff" }}
                            onClick={() => setExpanded(prev => !prev)}
                        >
                            {expanded ? "See less" : "See more"}
                        </Button>
                    </Box>
                </Box>
            </CommonCard>
        </Motion.div>
    );
}
