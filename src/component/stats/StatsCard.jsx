import React from "react";
import { Box, Typography, Avatar } from "@mui/material";
import { motion as Motion } from "framer-motion";
import "./StatsCard.css";    
import CommonCard from "../common/CommonCard";

const MotionDiv = Motion.div;

export default function StatsCard({ item }) {
    return (
        <MotionDiv
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
            className="stats-card-wrapper"
            overflow="hidden"
        >
            <CommonCard width="100%" cursor="grab">
                <Box sx={{ display: "flex", gap: 1.5, alignItems: "flex-start" }}>
                    {/* Company Logo */}
                    <Avatar
                        src={item.companyLogo || ""}
                        sx={{
                            width: 40,
                            height: 40,
                            bgcolor: "#1f2933",
                            fontWeight: 700,
                            fontSize: "0.9rem",
                            flexShrink: 0,
                        }}
                    >
                        {!item.companyLogo && item.companyName?.[0]}
                    </Avatar>

                    {/* Job Info */}
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                        {/* Title */}
                        <Typography
                            sx={{
                                fontWeight: 700,
                                fontSize: "0.95rem",
                                mb: 0.5,
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                            }}
                        >
                            {item.title}
                        </Typography>

                        {/* Company Name */}
                        <Typography
                            sx={{
                                fontSize: "0.8rem",
                                opacity: 0.7,
                                mb: 0.5,
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                            }}
                        >
                            {item.companyName}
                        </Typography>

                        {/* Interview Date if exists */}
                        {item.interviewDate && (
                            <Typography
                                sx={{
                                    fontSize: "0.75rem",
                                    opacity: 0.6,
                                    color: "#ffd700",
                                }}
                            >
                                � {new Date(item.interviewDate).toLocaleDateString()}
                            </Typography>
                        )}
                    </Box>
                </Box>
            </CommonCard>
        </MotionDiv>
    );
}