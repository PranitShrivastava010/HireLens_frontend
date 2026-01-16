import React, { useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import { motion as Motion } from "framer-motion";
import CommonCard from "../common/CommonCard";

const getScoreCategory = (score) => {
    if (score >= 0.8) return "High";
    if (score >= 0.5) return "Medium";
    return "Low";
};

const getCategoryColor = (category) => {
    if (category === "High") return "#00f5ff";
    if (category === "Medium") return "#8b5cf6";
    return "#ec4899";
};

export default function Keywords({ keywords, error, onClose, isMobile }) {
    useEffect(() => {
        const esc = (e) => e.key === "Escape" && onClose();
        window.addEventListener("keydown", esc);
        return () => window.removeEventListener("keydown", esc);
    }, [onClose]);

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
                    className="hide-scrollbar"
                    sx={{
                        p: 4,
                        color: "#fff",
                        maxHeight: isMobile ? "none" : "80vh",
                        overflowY: isMobile ? "visible" : "auto",
                    }}
                >
                    {/* Header */}
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            mb: 3,
                        }}
                    >
                        <Typography variant="h5" fontWeight={700} fontFamily={"Heading"}>
                            Job Keywords
                        </Typography>
                        <Button
                            onClick={onClose}
                            sx={{
                                color: "#fff",
                                textTransform: "none",
                                "&:hover": { opacity: 0.8 },
                                fontFamily: "Heading",
                            }}
                        >
                            Close
                        </Button>
                    </Box>

                    {error ? (
                        <Box
                            sx={{
                                p: 2,
                                bgcolor: "rgba(255, 0, 0, 0.1)",
                                border: "1px solid rgba(255, 0, 0, 0.3)",
                                borderRadius: "8px",
                                color: "#ff6b6b",
                            }}
                        >
                            <Typography>
                                Failed to fetch keywords. Please try again.
                            </Typography>
                        </Box>
                    ) : keywords && keywords.length > 0 ? (
                        <Box
                            sx={{
                                display: "grid",
                                gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr",
                                gap: 3,
                            }}
                        >
                            {["High", "Medium", "Low"].map((category) => {
                                const categoryColor = getCategoryColor(category);
                                const categoryKeywords = keywords.filter(
                                    (k) => getScoreCategory(k.score) === category
                                );

                                return (
                                    <Box key={category}>
                                        <Typography
                                            sx={{
                                                fontSize: "1.1rem",
                                                fontWeight: 600,
                                                mb: 2,
                                                color: categoryColor,
                                            }}
                                        >
                                            {category} Relevance ({categoryKeywords.length})
                                        </Typography>

                                        <Box
                                            sx={{
                                                display: "flex",
                                                flexDirection: "column",
                                                gap: 1.5,
                                            }}
                                        >
                                            {categoryKeywords.map((keyword) => (
                                                <Motion.div
                                                    key={keyword.id}
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ duration: 0.3 }}
                                                >
                                                    <Box
                                                        sx={{
                                                            p: 2,
                                                            bgcolor: `rgba(0, 245, 255, 0.05)`,
                                                            border: `1px solid ${categoryColor}`,
                                                            borderRadius: "8px",
                                                            transition: "all 0.2s ease",
                                                            "&:hover": {
                                                                bgcolor: `${categoryColor}15`,
                                                                transform: "translateX(4px)",
                                                            },
                                                        }}
                                                    >
                                                        <Box
                                                            sx={{
                                                                display: "flex",
                                                                justifyContent: "space-between",
                                                                alignItems: "center",
                                                                mb: 1,
                                                            }}
                                                        >
                                                            <Typography
                                                                sx={{
                                                                    fontWeight: 600,
                                                                    color: categoryColor,
                                                                    fontSize: "0.95rem",
                                                                }}
                                                            >
                                                                {keyword.keyword}
                                                            </Typography>
                                                            <Typography
                                                                sx={{
                                                                    fontSize: "0.85rem",
                                                                    opacity: 0.8,
                                                                    color: categoryColor,
                                                                    fontWeight: 900,
                                                                }}
                                                            >
                                                                {(keyword.score * 100).toFixed(0)}%
                                                            </Typography>
                                                        </Box>

                                                        {keyword.type && (
                                                            <Typography
                                                                sx={{
                                                                    fontSize: "0.75rem",
                                                                    opacity: 0.6,
                                                                    mb: 1,
                                                                }}
                                                            >
                                                                Type: {keyword.type}
                                                            </Typography>
                                                        )}

                                                        {keyword.aliases && keyword.aliases.length > 0 && (
                                                            <Typography
                                                                sx={{
                                                                    fontSize: "0.75rem",
                                                                    opacity: 0.7,
                                                                    color: "#a5b4fc",
                                                                }}
                                                            >
                                                                Also known as: {keyword.aliases.join(", ")}
                                                            </Typography>
                                                        )}
                                                    </Box>
                                                </Motion.div>
                                            ))}

                                            {categoryKeywords.length === 0 && (
                                                <Typography sx={{ opacity: 0.5, fontSize: "0.9rem" }}>
                                                    No {category.toLowerCase()} relevance keywords
                                                </Typography>
                                            )}
                                        </Box>
                                    </Box>
                                );
                            })}
                        </Box>
                    ) : (
                        <Typography sx={{ opacity: 0.7 }}>
                            No keywords found for this job.
                        </Typography>
                    )}
                </Box>
            </CommonCard>
        </Motion.div>
    );
}