import React, { useState, useEffect } from "react";
import { Dialog, Box, Typography } from "@mui/material";
import CommonCard from "../common/CommonCard";
import CommonButton from "../common/CommonButton";
import { useApplyJobMutation } from "../../features/application/applicationApi";

export default function ApplicationStatusModal({
    open,
    onClose,
    jobId,
    jobTitle,
}) {
    const [step, setStep] = useState("apply"); // "apply" | "save"
    const [applyJob, { isLoading: isApplying }] = useApplyJobMutation();

    useEffect(() => {
        if (open) {
            setTimeout(() => {
                setStep("apply");
            }, 0);
        }
    }, [open]);

    const handleAppliedYes = async () => {
        try {
            await applyJob({
                jobId,
                statusKey: "APPLIED",
            }).unwrap();
            onClose();
            setStep("apply");
        } catch (error) {
            console.error("Error applying to job:", error);
        }
    };

    const handleAppliedNo = () => {
        setStep("save");
    };

    const handleSaveYes = async () => {
        try {
            await applyJob({
                jobId,
                statusKey: "SAVED",
            }).unwrap();
            onClose();
            setStep("apply");
        } catch (error) {
            console.error("Error saving job:", error);
        }
    };

    const handleSaveNo = () => {
        onClose();
        setStep("apply");
    };

    const handleClose = () => {
        onClose();
        setStep("apply");
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
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
                        gap: 3,
                    }}
                >
                    {step === "apply" ? (
                        <>
                            <Box>
                                <Typography
                                    variant="h6"
                                    fontWeight={700}
                                    sx={{ mb: 1 }}
                                >
                                    Did you apply for this job?
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

                            <Box
                                sx={{
                                    display: "flex",
                                    gap: 2,
                                    justifyContent: "flex-end",
                                }}
                            >
                                <CommonButton
                                    radius="12px"
                                    text="No"
                                    textColor="black"
                                    onClick={handleAppliedNo}
                                    disabled={isApplying}
                                />
                                <CommonButton
                                    radius="12px"
                                    text="Yes"
                                    textColor="black"
                                    onClick={handleAppliedYes}
                                    disabled={isApplying}
                                />
                            </Box>
                        </>
                    ) : (
                        <>
                            <Box>
                                <Typography
                                    variant="h6"
                                    fontWeight={700}
                                    sx={{ mb: 1 }}
                                >
                                    Do you want to save this job?
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

                            <Box
                                sx={{
                                    display: "flex",
                                    gap: 2,
                                    justifyContent: "flex-end",
                                }}
                            >
                                <CommonButton
                                    radius="12px"
                                    text="No"
                                    textColor="black"
                                    onClick={handleSaveNo}
                                    disabled={isApplying}
                                />
                                <CommonButton
                                    radius="12px"
                                    text="Yes"
                                    textColor="black"
                                    onClick={handleSaveYes}
                                    disabled={isApplying}
                                />
                            </Box>
                        </>
                    )}
                </Box>
            </CommonCard>
        </Dialog>
    );
}
