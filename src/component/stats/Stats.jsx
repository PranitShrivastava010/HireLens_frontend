import React, { useState, useEffect, useRef } from "react";
import { Box, Typography, Avatar, IconButton } from "@mui/material";
import { motion as Motion } from "framer-motion";
import StatsColumn from "./StatsColumn";
import InterviewDateModal from "./InterviewDateModal";
import CommonCard from "../common/CommonCard";
import InfoIcon from "@mui/icons-material/Info";
import "./Stats.css";
import StarIcon from '@mui/icons-material/Star';
import EmailIcon from '@mui/icons-material/Email';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import CelebrationIcon from '@mui/icons-material/Celebration';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ErrorIcon from '@mui/icons-material/Error';
import {
    DndContext,
    closestCorners,
    KeyboardSensor,
    PointerSensor,
    TouchSensor,
    useSensor,
    useSensors,
    DragOverlay,
} from "@dnd-kit/core";
import { useUpdateApplicationStatusMutation } from "../../features/application/applicationApi";
import { fireFullScreenCelebration } from "../../utils/fullScreeenCelebration";

const columns = [
    { id: "SAVED", title: "SAVED", color: "#1BA5B8", icon: <StarIcon fontFamily="Heading" fontSize="small" sx={{ mb: 0.5 }} />, count: 0 },
    { id: "APPLIED", title: "APPLIED", color: "#8B5CF6", icon: <EmailIcon fontFamily="Heading" fontSize="small" sx={{ mb: 0.5 }} />, count: 0 },
    { id: "INTERVIEW", title: "INTERVIEW", color: "#22C55E", icon: <BusinessCenterIcon fontFamily="Heading" fontSize="small" sx={{ mb: 0.5 }} />, count: 0 },
    { id: "OFFER", title: "OFFER", color: "#F59E0B", icon: <CelebrationIcon fontFamily="Heading" fontSize="small" sx={{ mb: 0.5 }} />, count: 0 },
    { id: "REJECTED", title: "REJECTED", color: "#EF4444", icon: <ThumbDownIcon fontFamily="Heading" fontSize="small" sx={{ mb: 0.5 }} />, count: 0 },
    { id: "NO_RESPONSE", title: "NO RESPONSE", color: "#6B7280", icon: <ErrorIcon fontFamily="Heading" fontSize="small" sx={{ mb: 0.5 }} />, count: 0 },
];

export default function Stats({ stats, onCardInfoClick }) {
    const [interviewModal, setInterviewModal] = useState({ open: false, item: null });
    const [activeId, setActiveId] = useState(null);
    const [dragInfo, setDragInfo] = useState({
        applicationId: null,
        fromStatus: null,
        toStatus: null,
        item: null,
    });
    const [updateStatus] = useUpdateApplicationStatusMutation();
    const dragTimeoutRef = useRef(null);

    useEffect(() => {
        if (!dragInfo.applicationId || !dragInfo.toStatus) return;

        const confirmed = stats[dragInfo.toStatus]?.some(
            item => String(item.id) === dragInfo.applicationId
        );

        if (confirmed) {
            setDragInfo({
                applicationId: null,
                fromStatus: null,
                toStatus: null,
                item: null,
            });
            setActiveId(null);
        }
    }, [stats, dragInfo]);


    // Find the active item being dragged
    const getActiveItem = () => {
        if (!activeId) return null;
        const numericId = activeId.replace("draggable-", "");
        for (const columnItems of Object.values(stats)) {
            const item = columnItems.find(i => String(i.id) === numericId);
            if (item) return item;
        }
        return null;
    };

    const sensors = useSensors(
        useSensor(PointerSensor, {
            distance: 8,
        }),
        useSensor(TouchSensor, {
            distance: 8,
        }),
        useSensor(KeyboardSensor)
    );

    const handleDragStart = (event) => {
        setActiveId(event.active.id);
    };

    const handleDragEnd = async (event) => {
        const { active, over } = event;

        if (!over) {
            setActiveId(null);
            setDragInfo({ applicationId: null, fromStatus: null, toStatus: null });
            return;
        }

        const draggedData = active.data.current;
        const fromStatus = columns.find(col =>
            stats[col.id]?.some(item => String(item.id) === String(draggedData.applicationId))
        )?.id;

        const targetColumnId = over.id;

        if (!draggedData?.applicationId) {
            setActiveId(null);
            setDragInfo({ applicationId: null, fromStatus: null, toStatus: null });
            return;
        }

        // If dropping to INTERVIEW column, open date picker
        if (targetColumnId === "INTERVIEW" && draggedData.fromStatus !== "INTERVIEW") {
            setActiveId(null);
            setDragInfo({ applicationId: null, fromStatus: null, toStatus: null });
            setInterviewModal({ open: true, item: draggedData });
            return;
        }

        if (targetColumnId === "OFFER" && draggedData.fromStatus !== "OFFER") {
            fireFullScreenCelebration();
        }

        setDragInfo({
            applicationId: String(draggedData.applicationId),
            fromStatus,
            toStatus: targetColumnId,
            item: {
                ...draggedData,
                id: draggedData.applicationId,
            },
        });


        try {
            await updateStatus({
                applicationId: draggedData.applicationId,
                currentStatusKey: fromStatus,
                newStatusKey: targetColumnId,
            }).unwrap();
            // Don't clear activeId here - wait for stats to update
        } catch (error) {
            console.error("Error updating status:", error);
            setActiveId(null);
            setDragInfo({ applicationId: null, fromStatus: null, toStatus: null });
        }
    };

    const handleDragCancel = () => {
        setActiveId(null);
        setDragInfo({ applicationId: null, fromStatus: null, toStatus: null });
    };

    const handleInterviewDateConfirm = async (date) => {
        try {
            await updateStatus({
                applicationId: interviewModal.item.applicationId,
                currentStatusKey: interviewModal.item.fromStatus,
                newStatusKey: "INTERVIEW",
                interviewDate: date,
            }).unwrap();
            fireFullScreenCelebration();
            setInterviewModal({ open: false, item: null });
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };

    const handleInterviewModalClose = () => {
        setInterviewModal({ open: false, item: null });
    };

    const getColumnItems = (columnId) => {
        // No optimistic move active
        if (!dragInfo.applicationId || !dragInfo.item) {
            return stats[columnId] || [];
        }

        // Source column: remove the dragged card
        if (columnId === dragInfo.fromStatus) {
            return (stats[columnId] || []).filter(
                item => String(item.id) !== dragInfo.applicationId
            );
        }

        // Target column: insert dragged card exactly once
        if (columnId === dragInfo.toStatus) {
            const exists = (stats[columnId] || []).some(
                item => String(item.id) === dragInfo.applicationId
            );

            if (exists) {
                return stats[columnId] || [];
            }

            return [...(stats[columnId] || []), dragInfo.item];
        }

        // Other columns unchanged
        return stats[columnId] || [];
    };

    return (
        <>
            <DndContext
                sensors={sensors}
                collisionDetection={closestCorners}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                onDragCancel={handleDragCancel}
            >
                <Box
                    sx={{
                        width: "100%",
                        minHeight: "calc(100vh - 100px)",
                        // p: 2,
                        pt: 0,

                        boxSizing: "border-box",
                        overflowX: "hidden",
                    }}
                >
                    {/* Header */}
                    <Typography
                        variant="h4"
                        fontFamily={"Heading"}
                        sx={{
                            fontWeight: 700,
                            color: "#fff",
                            mb: 3,
                        }}
                    >
                        Job Hunt 2026
                    </Typography>

                    {/* Horizontal Scrollable Container */}
                    <Box
                        className="stats-scrollable-container"
                        sx={{
                            display: "flex",
                            gap: 2,
                            overflowX: "auto",
                            pb: 1,
                            "&::-webkit-scrollbar": {
                                height: "8px",
                            },
                            "&::-webkit-scrollbar-track": {
                                background: "rgba(255, 255, 255, 0.05)",
                                borderRadius: "10px",
                            },
                            "&::-webkit-scrollbar-thumb": {
                                background: "rgba(39, 196, 214, 0.4)",
                                borderRadius: "10px",
                                "&:hover": {
                                    background: "rgba(39, 196, 214, 0.6)",
                                },
                            },
                        }}
                    >
                        {columns.map((column) => (
                            <Motion.div
                                key={column.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                style={{ flex: "0 0 auto" }}
                            >
                                <StatsColumn
                                    column={column}
                                    items={getColumnItems(column.id)}
                                    onCardInfoClick={onCardInfoClick}
                                    activeId={activeId}
                                    draggingApplicationId={dragInfo.applicationId}
                                    draggingFromStatus={dragInfo.fromStatus}
                                />
                            </Motion.div>
                        ))}
                    </Box>
                </Box>
                <DragOverlay>
                    {activeId ? (
                        <Box
                            sx={{
                                minWidth: 280,
                                maxWidth: 320,
                            }}
                        >
                            {(() => {
                                const activeItem = getActiveItem();
                                if (!activeItem) return null;

                                // Render the full card design with info button
                                return (
                                    <Box sx={{ position: "relative" }}>
                                        {/* Info Button */}
                                        <IconButton
                                            sx={{
                                                position: "absolute",
                                                top: -12,
                                                left: -12,
                                                width: 32,
                                                height: 32,
                                                backgroundColor: "#00d4ff",
                                                color: "#000",
                                                zIndex: 10,
                                                "&:hover": {
                                                    backgroundColor: "#00e5ff",
                                                },
                                            }}
                                            size="small"
                                        >
                                            <InfoIcon sx={{ fontSize: "1.2rem" }} />
                                        </IconButton>

                                        <CommonCard width="100%" cursor="grab">
                                            <Box sx={{ display: "flex", gap: 1.5, alignItems: "flex-start" }}>
                                                {/* Company Logo */}
                                                <Avatar
                                                    src={activeItem.companyLogo || ""}
                                                    sx={{
                                                        width: 40,
                                                        height: 40,
                                                        bgcolor: "#1f2933",
                                                        fontWeight: 700,
                                                        fontSize: "0.9rem",
                                                        flexShrink: 0,
                                                    }}
                                                >
                                                    {!activeItem.companyLogo && activeItem.companyName?.[0]}
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
                                                        {activeItem.title}
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
                                                        {activeItem.companyName}
                                                    </Typography>

                                                    {/* Interview Date if exists */}
                                                    {activeItem.interviewDate && (
                                                        <Typography
                                                            sx={{
                                                                fontSize: "0.75rem",
                                                                opacity: 0.6,
                                                                color: "#ffd700",
                                                            }}
                                                        >
                                                            📅 {new Date(activeItem.interviewDate).toLocaleDateString()}
                                                        </Typography>
                                                    )}
                                                </Box>
                                            </Box>
                                        </CommonCard>
                                    </Box>
                                );
                            })()}
                        </Box>
                    ) : null}
                </DragOverlay>
            </DndContext>
            <InterviewDateModal
                open={interviewModal.open}
                onClose={handleInterviewModalClose}
                onConfirm={handleInterviewDateConfirm}
                title={interviewModal.item?.title}
                company={interviewModal.item?.companyName}
            />
        </>
    );
}
