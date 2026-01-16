import React from "react";
import { Box, Typography } from "@mui/material";
import { motion as Motion } from "framer-motion";
import "./StatsCard.css";    
import CommonCard from "../common/CommonCard";

const MotionDiv = Motion.div;

export default function StatsCard({ item, }) {
    return (
        <MotionDiv
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
            className="stats-card-wrapper"
            overflow="hidden"
        >
            <CommonCard width="100%" cursor="grab">
                {/* Label */}
                <Typography
                    sx={{
                        fontSize: "0.75rem",
                        opacity: 0.7,
                        fontWeight: 600,
                        mb: 0.5,
                    }}
                >
                    Your applied job
                </Typography>

                {/* Title */}
                <Typography
                    sx={{
                        fontWeight: 700,
                        fontSize: "1rem",
                        mb: 0.5,
                    }}
                >
                    {item.title}
                </Typography>

                {/* Location */}
                <Box
                    sx={{
                        fontSize: "0.8rem",
                        opacity: 0.7,
                        display: "flex",
                        alignItems: "center",
                        gap: 0.5,
                    }}
                >
                    📍 {item.location}
                </Box>
            </CommonCard>
        </MotionDiv>
    );
}