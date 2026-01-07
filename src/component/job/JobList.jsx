import React from "react";
import {
  Box,
  CircularProgress,
  Typography,
  Button,
  TextField,
  Backdrop,
  Paper,
  Divider,
  InputAdornment,
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { motion as Motion } from "framer-motion";
import JobCard from "./JobCard";
import CommonButton from "../common/CommonButton";

export default function JobsList({
  jobs,
  loading,
  loaderRef,
  hasMore,
  searchInput,
  locationInput,
  setSearchInput,
  setLocationInput,
  searchSuggestions,
  locationSuggestions,
  onApply,
  searchOpen,
  onOpenSearch,
  onCloseSearch,
}) {
  return (
    <Box sx={{ position: "relative" }}>
      {/* ---------- INITIAL SEARCH BAR ---------- */}
      <Box sx={{ px: 3, py: 2 }}>
        <TextField
          fullWidth
          placeholder="Search your desired job"
          // value={searchInput}
          InputProps={{
            readOnly: true,
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            )
          }}
          onClick={onOpenSearch}

          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '10px'
            }
          }}
        />
      </Box>

      {/* ---------- BACKDROP ---------- */}
      <Backdrop
        open={searchOpen}
        onClick={onCloseSearch}
        sx={{
          zIndex: 8,
          backdropFilter: "blur(4px)",
          backgroundColor: "rgba(0,0,0,0.25)",
        }}
      />

      {/* ---------- FLOATING SEARCH PANEL ---------- */}
      {searchOpen && (
        <Motion.div
          initial={{ y: -15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.25 }}
          style={{
            position: "fixed",
            top: 90,
            left: "30%",
            transform: "translateX(-50%)",
            zIndex: 9,
            width: "70%",
            maxWidth: 900,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            {/* INPUTS */}
            <Box sx={{ display: { md: "flex" }, gap: 2 }}>
              <TextField
                fullWidth
                autoFocus
                label="Job title or company"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '10px'
                  }
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  )
                }}
              />

              <TextField
                fullWidth
                label="Location"
                value={locationInput}
                onChange={(e) => setLocationInput(e.target.value)}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '10px'
                  },
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">
                      <LocationOnIcon/>
                    </InputAdornment>
                  )
                }}
              />

              <CommonButton color={"linear-gradient(135deg, #1E2B5C, #27C4D6)"} text={"Apply"} radius="10px" sx={{py: "-2px"}} onClick={onApply}/>
            </Box>

            {/* ---------- SUGGESTIONS ---------- */}
            {(searchSuggestions.length > 0 ||
              locationSuggestions.length > 0) && (
                <>
                  <Divider sx={{ my: 2 }} />

                  <Box sx={{ display: "flex", gap: 4 }}>
                    {/* SEARCH HISTORY */}
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle2" color="text.secondary">
                        Recent searches
                      </Typography>

                      {searchSuggestions.map((item) => (
                        <Typography
                          key={item}
                          sx={{
                            py: 0.8,
                            cursor: "pointer",
                            "&:hover": { color: "primary.main" },
                          }}
                          onClick={() => setSearchInput(item)}
                        >
                          🔍 {item}
                        </Typography>
                      ))}
                    </Box>

                    {/* LOCATION HISTORY */}
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle2" color="text.secondary">
                        Locations
                      </Typography>

                      {locationSuggestions.map((item) => (
                        <Typography
                          key={item}
                          sx={{
                            py: 0.8,
                            cursor: "pointer",
                            "&:hover": { color: "primary.main" },
                          }}
                          onClick={() => setLocationInput(item)}
                        >
                          📍 {item}
                        </Typography>
                      ))}
                    </Box>
                  </Box>
                </>
              )}
          </Paper>
        </Motion.div>
      )}

      {/* ---------- JOB LIST ---------- */}
      <Box
        sx={{
          px: 3,
          py: 2,
          filter: searchOpen ? "blur(3px)" : "none",
          pointerEvents: searchOpen ? "none" : "auto",
          transition: "0.3s",
        }}
      >
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}

        <Box
          ref={loaderRef}
          sx={{ display: "flex", justifyContent: "center", py: 3 }}
        >
          {loading && <CircularProgress />}
          {!hasMore && !loading && (
            <Typography color="text.secondary">
              No more jobs
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
}
