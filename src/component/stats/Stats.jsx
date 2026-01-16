import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import { motion as Motion } from "framer-motion";
import StatsColumn from "./StatsColumn";
import InterviewDateModal from "./InterviewDateModal";
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
} from "@dnd-kit/core";
import { useUpdateApplicationStatusMutation } from "../../features/application/applicationApi";

const columns = [
    { id: "SAVED", title: "SAVED", color: "#1BA5B8", icon: <StarIcon fontFamily="Heading" fontSize="small" sx={{mb: 0.5}}/>, count: 0 },
    { id: "APPLIED", title: "APPLIED", color: "#8B5CF6", icon: <EmailIcon fontFamily="Heading" fontSize="small" sx={{mb: 0.5}}/>, count: 0 },
    { id: "INTERVIEW", title: "INTERVIEW", color: "#22C55E", icon: <BusinessCenterIcon fontFamily="Heading" fontSize="small" sx={{mb: 0.5}}/>, count: 0 },
    { id: "OFFER", title: "OFFER", color: "#F59E0B", icon: <CelebrationIcon fontFamily="Heading" fontSize="small" sx={{mb: 0.5}}/>, count: 0 },
    {id: "REJECTED", title: "REJECTED", color: "#EF4444", icon: <ThumbDownIcon fontFamily="Heading" fontSize="small" sx={{mb: 0.5}}/>, count: 0 },
    {id: "NO_RESPONSE", title: "NO RESPONSE", color: "#6B7280", icon: <ErrorIcon fontFamily="Heading" fontSize="small" sx={{mb: 0.5}}/>, count: 0 },
];

export default function Stats({ stats, onCardInfoClick }) {
    const [interviewModal, setInterviewModal] = useState({ open: false, item: null });
    const [updateStatus] = useUpdateApplicationStatusMutation();
    
    const sensors = useSensors(
        useSensor(PointerSensor, {
            distance: 8,
        }),
        useSensor(TouchSensor, {
            distance: 8,
        }),
        useSensor(KeyboardSensor)
    );

    const handleDragEnd = async (event) => {
        const { active, over } = event;
        
        if (!over) return;
        
        const draggedData = active.data.current;
        const targetColumnId = over.id;
        
        if (!draggedData?.applicationId) return;
        
        // If dropping to INTERVIEW column, open date picker
        if (targetColumnId === "INTERVIEW" && draggedData.fromStatus !== "INTERVIEW") {
            setInterviewModal({ open: true, item: draggedData });
            return;
        }

        // For other columns, directly update status
        try {
            await updateStatus({
                applicationId: draggedData.applicationId,
                newStatusKey: targetColumnId,
            }).unwrap();
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };

    const handleInterviewDateConfirm = async (date) => {
        try {
            await updateStatus({
                applicationId: interviewModal.item.applicationId,
                newStatusKey: "INTERVIEW",
                interviewDate: date,
            }).unwrap();
            setInterviewModal({ open: false, item: null });
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };

    const handleInterviewModalClose = () => {
        setInterviewModal({ open: false, item: null });
    };
    
    return (
        <>
            <DndContext
                sensors={sensors}
                collisionDetection={closestCorners}
                onDragEnd={handleDragEnd}
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
                    Job Hunt 2025
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
                                items={stats[column.id] || []}
                                onCardInfoClick={onCardInfoClick}
                            />
                        </Motion.div>
                    ))}
                </Box>
            </Box>
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