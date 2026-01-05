import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import JobCard from "./JobCard";

export default function JobsList({ jobs, loading, loaderRef, hasMore }) {
  return (
    <Box sx={{ px: 3, py: 2 }}>
      {jobs.map(job => (
        <JobCard key={job.id} job={job} />
      ))}

      <Box
        ref={loaderRef}
        sx={{
          display: "flex",
          justifyContent: "center",
          py: 3,
        }}
      >
        {loading && <CircularProgress />}
        {!hasMore && !loading && (
          <Typography color="text.secondary">
            No more jobs
          </Typography>
        )}
      </Box>
    </Box>
  );
}