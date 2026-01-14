import React from "react";
import { Box, InputBase, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import LocationOnIcon from "@mui/icons-material/LocationOn";

export default function CommonSearchPopup({
  jobValue,
  locationValue,
  onJobChange,
  onLocationChange,
  onApply,
  readOnly = false,
}) {
  return (
    <Box sx={{ position: "relative" }}>
      
      {/* 🔥 BLUR BACKGROUND ONLY */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          borderRadius: "18px",
          background: "rgba(255,255,255,0.12)",
          backdropFilter: "blur(20px) saturate(160%)",
          border: "1px solid rgba(255,255,255,0.25)",
          zIndex: 0,
        }}
      />

      {/* ✅ FOREGROUND CONTENT (NO BLUR) */}
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          alignItems: "center",
          gap: 2,
          p: "14px 18px",
        }}
      >
        {/* JOB INPUT */}
        <Box sx={{ flex: 1, display: "flex", alignItems: "center", gap: 1.5 }}>
          <SearchIcon sx={{ opacity: 0.7, color: "#fff" }} />
          <InputBase
            placeholder="Job title or company"
            value={jobValue}
            onChange={(e) => onJobChange(e.target.value)}
            inputProps={{ readOnly }}
            sx={{
              width: "100%",
              "& input": {
                color: "#fff",
                caretColor: "#fff",
              },
            }}
          />
        </Box>

        <Box sx={{ width: 1, height: 32, bgcolor: "rgba(255,255,255,0.25)" }} />

        {/* LOCATION INPUT */}
        <Box sx={{ flex: 1, display: "flex", alignItems: "center", gap: 1.5 }}>
          <LocationOnIcon sx={{ opacity: 0.7, color: "#fff" }} />
          <InputBase
            placeholder="Location"
            value={locationValue}
            onChange={(e) => onLocationChange(e.target.value)}
            inputProps={{ readOnly }}
            sx={{
              width: "100%",
              "& input": {
                color: "#fff",
                caretColor: "#fff",
              },
            }}
          />
        </Box>

        {!readOnly && (
          <Box
            onClick={onApply}
            sx={{
              ml: 1,
              px: 3,
              py: 1.2,
              borderRadius: "14px",
              background: "linear-gradient(135deg, #1E2B5C, #27C4D6)",
              color: "#fff",
              fontWeight: 600,
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            Apply
          </Box>
        )}
      </Box>
    </Box>
  );
}

