import React from "react";
import {
  Box,
  CircularProgress,
  Typography,
  Backdrop,
  Divider,
  TextField,
  InputAdornment,
} from "@mui/material";
import { motion as Motion } from "framer-motion";
import JobCard from "./JobCard";
import CommonSearchPopup from "../common/CommonSearchPopup";
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
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
  onJobClick = () => { },
}) {

  console.log("onJobClick:", onJobClick);

  return (
    <Box sx={{ position: "relative" }}>
      {/* ---------- TOP SEARCH BAR (read-only trigger) ---------- */}
      <Box sx={{ px: 3, py: 2, cursor: "pointer" }} onClick={onOpenSearch}>
        <CommonSearchPopup
          readOnly
          jobValue={searchInput || "Search jobs"}
          locationValue={locationInput || "Anywhere"}
        />
      </Box>

      {/* ---------- BACKDROP ---------- */}
      <Backdrop
        open={searchOpen}
        onClick={onCloseSearch}
        sx={{
          zIndex: 8,
          backdropFilter: "blur(6px)",
          backgroundColor: "rgba(0,0,0,0.35)",
          cursor: "pointer"
        }}
      />

      {/* ---------- POPUP SEARCH (editable) ---------- */}
      {searchOpen && (
        <Motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.25 }}
          style={{
            position: "fixed",
            top: window.innerWidth >= 900 ? "100" : 50,
            left: window.innerWidth >= 900 ? "25%" : "15%",
            transform: "translateX(-50%)",
            zIndex: 1300,
            width: "min(900px, 75vw)",
          }}
          onMouseDown={(e) => e.stopPropagation()}
          onClick={(e) => e.stopPropagation()}
        >
          <Box
            sx={{
              p: 3,
              borderRadius: "24px",
              background: "rgba(255,255,255,0.12)",
              backdropFilter: "blur(24px) saturate(160%)",
              border: "1px solid rgba(255,255,255,0.25)",
              boxShadow:
                "inset 0 1px 0 rgba(255,255,255,0.25), 0 45px 100px rgba(0,0,0,0.6)",
            }}
          >

            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                gap: { xs: 2, md: 2 },
                alignItems: "stretch",
              }}
            >
              <TextField
                fullWidth
                autoFocus
                label="Job title or company"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '10px',
                    color: '#fff',
                    '& fieldset': { borderColor: '#fff', borderWidth: '1px' },
                    '&:hover fieldset': { borderColor: '#fff' },
                    '&.Mui-focused fieldset': { borderColor: '#fff', borderWidth: '2px' },
                  },
                  '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.7)' },
                  '& .MuiInputLabel-root.Mui-focused': { color: '#fff' },
                  '& input::placeholder': { color: 'rgba(255,255,255,0.7)', opacity: 1 },
                  '& svg': { color: '#fff' },
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                fullWidth
                label="Location"
                value={locationInput}
                onChange={(e) => setLocationInput(e.target.value)}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '10px',
                    color: '#fff',
                    '& fieldset': { borderColor: '#fff', borderWidth: '1px' },
                    '&:hover fieldset': { borderColor: '#fff' },
                    '&.Mui-focused fieldset': { borderColor: '#fff', borderWidth: '2px' },
                  },
                  '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.7)' },
                  '& .MuiInputLabel-root.Mui-focused': { color: '#fff' },
                  '& input::placeholder': { color: 'rgba(255,255,255,0.7)', opacity: 1 },
                  '& svg': { color: '#fff' },
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">
                      <LocationOnIcon />
                    </InputAdornment>
                  ),
                }}
              />

              <CommonButton
                color={"linear-gradient(135deg, #1E2B5C, #27C4D6)"}
                text={"Apply"}
                radius="10px"
                sx={{ py: "8px", mt: { xs: 2, md: 0 }, minWidth: { xs: "100%", md: "auto" } }}
                onClick={onApply}
              />
            </Box>


            {/* Recent searches and locations */}
            {(searchSuggestions.length > 0 || locationSuggestions.length > 0) && (
              <>
                <Divider sx={{ my: 3, opacity: 0.3 }} />

                <Box sx={{ display: "flex", gap: 4 }}>
                  {/* SEARCHES */}
                  <Box sx={{ flex: 1 }}>
                    <Typography sx={{ opacity: 0.6, mb: 1 }}>
                      Recent searches
                    </Typography>
                    {searchSuggestions.map((item) => (
                      <Typography
                        key={item}
                        sx={{
                          py: 0.8,
                          fontSize: "0.85rem",
                          cursor: "pointer",
                          "&:hover": { color: "#27C4D6" },
                        }}
                        onClick={() => setSearchInput(item)}
                      >
                        🔍 {item}
                      </Typography>
                    ))}
                  </Box>

                  {/* LOCATIONS */}
                  <Box sx={{ flex: 1 }}>
                    <Typography sx={{ opacity: 0.6, mb: 1 }}>
                      Locations
                    </Typography>
                    {locationSuggestions.map((item) => (
                      <Typography
                        key={item}
                        sx={{
                          py: 0.8,
                          fontSize: "0.85rem",
                          cursor: "pointer",
                          "&:hover": { color: "#27C4D6" },
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
          </Box>
        </Motion.div>
      )}

      {/* ---------- JOB GRID ---------- */}
      <Box
        sx={{
          px: 3,
          py: 2,
          filter: searchOpen ? "blur(3px)" : "none",
          pointerEvents: "auto",
          transition: "0.3s",
          mr: { xs: 2, sm: 0 }
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" },
            gap: 4,
          }}
        >
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} onClick={() => onJobClick(job.id)} />
          ))}
        </Box>

        <Box
          ref={loaderRef}
          sx={{ display: "flex", justifyContent: "center", py: 4 }}
        >
          {loading && <CircularProgress />}
          {!hasMore && !loading && (
            <Typography color="white" fontFamily="Heading">No more jobs</Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
}
