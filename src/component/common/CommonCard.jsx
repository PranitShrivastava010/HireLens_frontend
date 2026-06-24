import React from "react";
import "./glass-card.css";
import { Box } from "@mui/material";

export default function CommonCard({ children, className = "", width = "100%", onClick, cursor = "pointer", sx }) {
  return (
    <Box
      className={`glass-card ${className}`}
      sx={{ width, cursor: cursor, ...sx }}
      onClick={onClick}
    >
      {children}
    </Box>
  );
}
