import React from "react";
import CommonCard from "../common/CommonCard";
import { Box, Avatar, Chip, Typography } from "@mui/material";
import { getJobAgeLabel } from "../../utils/jobAge";

export default function JobCard({ job, onClick }) {
  const handleClick = () => {
    onClick(job.id);
  };

  const jobAge = getJobAgeLabel(job)

  return (
    <CommonCard
      sx={{
        mb: 2,
        cursor: "pointer",
        width: "100%",
        overflow: "hidden",
        "&:hover": { transform: "translateY(-4px)" },
      }}
      onClick={handleClick}
    >
      {/* TOP ROW */}
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          gap: 2,
          minWidth: 0, // 🔥 important
        }}
      >
        {/* LOGO */}
        <Avatar
          src={job.companyLogo || ""}
          sx={{
            width: 48,
            height: 48,
            borderRadius: "14px",
            border: "1px solid rgba(255,255,255,0.1)",
            flexShrink: 0,
          }}
        >
          {!job.companyLogo && job.companyName?.[0]}
        </Avatar>

        {/* TEXT */}
        <Box sx={{ minWidth: 0 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              fontSize: "1rem",
              wordBreak: "break-word",
            }}
          >
            {job.title}
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: "rgba(255,255,255,0.6)",
              wordBreak: "break-word",
            }}
          >
            {job.companyName} • {job.location}
          </Typography>
        </Box>
      </Box>

      {/* CHIPS */}
      <Box
        sx={{
          mt: 2,
          display: "flex",
          flexWrap: "wrap", // 🔥 prevents overflow
          gap: 1,
        }}
      >
        <Chip
          label={job.employmentType}
          size="small"
          sx={{
            bgcolor: "rgba(0, 212, 255, 0.1)",
            color: "#00d4ff",
          }}
        />

        {job.minExperienceYears && (
          <Chip
            label={
              !job.maxExperienceYears ||
                job.minExperienceYears === job.maxExperienceYears
                ? `${job.minExperienceYears}+ yrs`
                : `${job.minExperienceYears} - ${job.maxExperienceYears} yrs`
            }
            size="small"
            sx={{
              color: "#eee",
              bgcolor: "rgba(255,255,255,0.05)",
            }}
          />
        )}

        {jobAge && (
          <Chip
            label={jobAge}
            size="small"
            color={jobAge === "Today" ? "success" : "info"}
          />
        )}
      </Box>
    </CommonCard>
  );
}
