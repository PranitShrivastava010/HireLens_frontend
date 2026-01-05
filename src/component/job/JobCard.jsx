import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  Chip,
} from "@mui/material";

export default function JobCard({ job }) {
  return (
    <Card
      sx={{
        mb: 2,
        borderRadius: 3,
        boxShadow: 2,
        transition: "0.2s",
        "&:hover": { boxShadow: 6 },
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
              {job.companyName} • {job.location}
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

          {job.postedAt && (
            <Chip
              label={job.postedAt}
              size="small"
              color="success"
            />
          )}
        </Box>
      </CardContent>
    </Card>
  );
}
