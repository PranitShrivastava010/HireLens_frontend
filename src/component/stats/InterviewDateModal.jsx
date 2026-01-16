import React, { useState } from "react";
import { Dialog, Box, Typography, TextField } from "@mui/material";
import CommonCard from "../common/CommonCard";
import CommonButton from "../common/CommonButton";

export default function InterviewDateModal({
    open,
    onClose,
    onConfirm,
    jobTitle,
    isLoading,
}) {
    const [selectedDate, setSelectedDate] = useState("");

    const handleConfirm = () => {
        if (!selectedDate) {
            alert("Please select a date");
            return;
        }
        onConfirm(new Date(selectedDate));
        setSelectedDate("");
    };

    const handleCancel = () => {
        setSelectedDate("");
        onClose();
    };

    return (
        <Dialog
            open={open}
            onClose={handleCancel}
            maxWidth="sm"
            fullWidth
            PaperProps={{
                sx: {
                    background: "transparent",
                    boxShadow: "none",
                },
            }}
            BackdropProps={{
                sx: {
                    backgroundColor: "rgba(0,0,0,0.55)",
                    backdropFilter: "blur(6px)",
                },
            }}
        >
            <CommonCard>
                <Box
                    sx={{
                        p: 3,
                        color: "#fff",
                        display: "flex",
                        flexDirection: "column",
                        gap: 2.5,
                    }}
                >
                    <Box>
                        <Typography
                            variant="h6"
                            fontWeight={700}
                            sx={{ mb: 1 }}
                        >
                            Schedule Interview
                        </Typography>
                        <Typography
                            sx={{
                                opacity: 0.7,
                                fontSize: "0.9rem",
                            }}
                        >
                            {jobTitle}
                        </Typography>
                    </Box>

                    <TextField
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        slotProps={{
                            input: {
                                sx: {
                                    color: "#fff",
                                    "& input": {
                                        color: "#fff",
                                        cursor: "pointer",
                                    },
                                    "& input::placeholder": {
                                        opacity: 0.5,
                                    },
                                },
                            },
                        }}
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                "& fieldset": {
                                    borderColor: "rgba(255, 255, 255, 0.3)",
                                },
                                "&:hover fieldset": {
                                    borderColor: "rgba(255, 255, 255, 0.5)",
                                },
                                "&.Mui-focused fieldset": {
                                    borderColor: "#00d4ff",
                                },
                            },
                            "& .MuiOutlinedInput-input": {
                                "&::-webkit-calendar-picker-indicator": {
                                    filter: "invert(1)",
                                    cursor: "pointer",
                                },
                            },
                        }}
                        fullWidth
                    />

                    <Box
                        sx={{
                            display: "flex",
                            gap: 2,
                            justifyContent: "flex-end",
                        }}
                    >
                        <CommonButton
                            radius="12px"
                            text="Cancel"
                            textColor="black"
                            onClick={handleCancel}
                            disabled={isLoading}
                        />
                        <CommonButton
                            radius="12px"
                            text="Confirm"
                            textColor="black"
                            onClick={handleConfirm}
                            disabled={isLoading || !selectedDate}
                        />
                    </Box>
                </Box>
            </CommonCard>
        </Dialog>
    );
}
