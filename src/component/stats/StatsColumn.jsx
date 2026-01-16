import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { motion as Motion } from "framer-motion";
import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import StatsCard from "./StatsCard";
import InterviewDateModal from "./InterviewDateModal";
import { useUpdateApplicationStatusMutation } from "../../features/application/applicationApi";
import "./StatsColumn.css";

const MotionBox = Motion(Box);

export default function StatsColumn({ column, items, onCardInfoClick }) {
    const [interviewModal, setInterviewModal] = useState({ open: false, item: null });
    const [updateStatus, { isLoading: isUpdating }] = useUpdateApplicationStatusMutation();

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        const draggedData = JSON.parse(e.dataTransfer.getData("application/json"));
        
        // If dropping to INTERVIEW column, open date picker
        if (column.id === "INTERVIEW" && draggedData.fromStatus !== "INTERVIEW") {
            setInterviewModal({ open: true, item: draggedData });
            return;
        }

        // For other columns, directly update status
        try {
            await updateStatus({
                applicationId: draggedData.applicationId,
                newStatusKey: column.id,
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
        <Box
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            sx={{    
                minWidth: 250,
                maxWidth: 320,
                display: "flex",
                flexDirection: "column",
                gap: 0,
                height: "100%",
                minHeight: "77vh",
                background: "rgba(255, 255, 255, 0.04)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",

                border: "1px solid rgba(255, 255, 255, 0.12)",
                borderRadius: "16px",

                boxShadow: "0 18px 45px rgba(0,0,0,0.45)",

                overflow: "hidden",
                transition: "all 0.2s ease",
                "&:hover": {
                    borderColor: "rgba(255, 255, 255, 0.3)",
                },
            }}
        >
            {/* Column Header */}
            <Box
                sx={{
                    background: `linear-gradient(135deg, ${column.color} 0%, ${column.color}dd 100%)`,
                    p: "12px 16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderRadius: "12px 12px 0 0",
                }}
            >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    {column.icon}
                    <Typography
                        sx={{
                            fontSize: "0.75rem",
                            fontWeight: 800,
                            color: "#fff",
                            letterSpacing: "1px",
                        }}
                    >
                     {column.title} ({items.length})
                    </Typography>
                </Box>
                <Box sx={{ display: "flex", gap: 0.5 }}>
                    <Button
                        size="small"
                        sx={{
                            minWidth: "auto",
                            p: 0.5,
                            color: "#fff",
                            "&:hover": { bgcolor: "rgba(255, 255, 255, 0.2)" },
                        }}
                    >
                        <MoreVertIcon sx={{ fontSize: "1.2rem" }} />
                    </Button>
                </Box>
            </Box>

            {/* Cards Container */}
            <MotionBox
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 1.5,
                    p: 2,
                    minHeight: 300,
                    flex: 1,
                    overflowY: "auto",
                    overflowX: "hidden",
                }}
            >
                {items.length > 0 ? (
                    items.map((item, index) => (
                        <Motion.div
                            key={item.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                            <StatsCard 
                                item={item} 
                                columnColor={column.color}
                                currentStatus={column.id}
                                onInfoClick={onCardInfoClick}
                            />
                        </Motion.div>
                    ))
                ) : (
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            minHeight: 200,
                            color: "rgba(255, 255, 255, 0.2)",
                            fontSize: "0.9rem",
                            textAlign: "center",
                            flex: 1,
                        }}
                    >
                        Empty
                    </Box>
                )}
            </MotionBox>

            {/* Interview Date Modal */}
            <InterviewDateModal
                open={interviewModal.open}
                onClose={handleInterviewModalClose}
                onConfirm={handleInterviewDateConfirm}
                jobTitle={interviewModal.item?.title}
                isLoading={isUpdating}
            />
        </Box>
    );
}