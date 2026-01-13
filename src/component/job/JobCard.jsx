import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  Chip,
} from "@mui/material";
import { getJobAgeLabel } from "../../utils/jobAge";

export default function JobCard({ job }) {

  const jobAge = getJobAgeLabel(job)

  return (
    <Card
      sx={{
        mb: 2,
        borderRadius: 3,
        // boxShadow: 2,
        // transition: "0.2s",
        "&:hover": { boxShadow: 6 },
        cursor: "pointer",
        background: "rgba(240, 240, 240, 0.6)", // light grey glass
        backdropFilter: "blur(10px)",            // frosted effect
        WebkitBackdropFilter: "blur(10px)",      // Safari support
        border: "1px solid rgba(200, 200, 200, 0.5)", // subtle grey border
        boxShadow: "0 2px 5px rgba(0,0,0,0.05)",     // soft shadow
        color: "#222",                            // darker text for contrast
        transition: "all 0.3s ease",
        ":hover": {
          background: "rgba(240, 240, 240, 0.75)",
          boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
        },
      }}
    >
      <CardContent>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Avatar
            src={job.companyLogo || ""}
            alt={job.companyName}
            sx={{ width: 48, height: 48 }}
          />

          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h6">
              {job.title}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              {job.companyName} • {job.location}  {job.state ? `• ${job.state}` : null}  {job.city ? `• ${job.city}` : null}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ mt: 2, display: "flex", gap: 1, flexWrap: "wrap" }}>
          {job.employmentType && (
            <Chip label={job.employmentType} size="small" />
          )}

          {job.minExperienceYears && (
            <Chip
              label={`${job.minExperienceYears}+ yrs`}
              size="small"
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
      </CardContent>
    </Card>
  );
}
