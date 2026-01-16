import React from "react";
import { Box, Typography, Avatar, IconButton } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import "./StatsCard.css";    
import CommonCard from "../common/CommonCard";
import { useDraggable } from "@dnd-kit/core";

export default function StatsCard({ item, currentStatus, onInfoClick }) {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: `draggable-${item.id}`,
        data: {
            applicationId: item.id,
            jobId: item.jobId,
            title: item.title,
            companyName: item.companyName,
            fromStatus: currentStatus,
        },
    });

    // Create the transform string
    const transformString = transform
        ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
        : undefined;

    return (
        <div
            ref={setNodeRef}
            {...listeners}
            {...attributes}
            className="stats-card-wrapper"
            style={{
                transform: transformString,
                opacity: isDragging ? 0 : 1,
                cursor: isDragging ? "grabbing" : "grab",
                touchAction: "none",
                position: "relative",
                zIndex: isDragging ? 1000 : "auto",
            }}
        >
            <Box sx={{ position: "relative" }}>
                {/* Info Button */}
                <IconButton
                    onClick={(e) => {
                        e.stopPropagation();
                        onInfoClick?.(item.jobId);
                    }}
                    onPointerDown={(e) => e.stopPropagation()}
                    sx={{
                        position: "absolute",
                        top: -12,
                        left: -12,
                        width: 32,
                        height: 32,
                        backgroundColor: "#00d4ff",
                        color: "#000",
                        zIndex: 10,
                        cursor: "pointer",
                        "&:hover": {
                            backgroundColor: "#00e5ff",
                            transform: "scale(1.1)",
                        },
                        transition: "all 0.2s ease",
                    }}
                    size="small"
                >
                    <InfoIcon sx={{ fontSize: "1.2rem" }} />
                </IconButton>

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
                                    📅 {new Date(item.interviewDate).toLocaleDateString()}
                                </Typography>
                            )}
                        </Box>
                    </Box>
                </CommonCard>
            </Box>
        </div>
    );
}