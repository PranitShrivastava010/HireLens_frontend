import {
  Box,
  Card,
  CardContent,
  Typography,
  Autocomplete,
  TextField,
  Chip,
  Button,
  CircularProgress,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function JobPreference({
  options,
  selected,
  setSelected,
  onSearch,
  onSubmit,
  loading,
}) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
        background: "#0a2e2e", // Deep dark teal background
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative Background Blobs */}
      <Box
        sx={{
          position: "absolute",
          top: "10%",
          right: "5%",
          width: 300,
          height: 300,
          background: "linear-gradient(135deg, #4fd1c5 0%, #219ebc 100%)",
          borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",
          filter: "blur(60px)",
          opacity: 0.4,
          zIndex: 0,
        }}
      />

      <Card
        sx={{
          width: "100%",
          maxWidth: 800, // Matching the wider aspect ratio of the image
          minHeight: 450,
          borderRadius: 8,
          background: "rgba(255, 255, 255, 0.85)",
          backdropFilter: "blur(20px)",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
          position: "relative",
          zIndex: 1,
          border: "1px solid rgba(255, 255, 255, 0.3)",
          overflow: "visible",
        }}
      >
        {/* Floating Accent Shapes (The teal wave in the top right) */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "35%",
            height: "100%",
            background: "linear-gradient(180deg, #4fd1c5 0%, #0891b2 100%)",
            clipPath: "polygon(25% 0%, 100% 0%, 100% 100%, 0% 100%, 15% 70%, 0% 35%)",
            borderRadius: "0 32px 32px 0",
            opacity: 0.9,
            display: { xs: "none", md: "block" },
          }}
        />

        <CardContent sx={{ p: { xs: 3, md: 8 }, position: "relative", zIndex: 2 }}>
          <Box sx={{ maxWidth: { md: "60%" } }}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 900,
                color: "#1a365d",
                letterSpacing: "-1px",
                textTransform: "uppercase",
                lineHeight: 1.1,
                mb: 1,
                fontFamily: "stardum",
              }}
            >
              Select Your <br /> Preferences
            </Typography>

            <Typography
              variant="body1"
              sx={{ color: "text.secondary", mb: 4, fontWeight: 500 }}
            >
              Choose roles and skills to personalize your job matches
            </Typography>

            <Autocomplete
              multiple
              options={options || []}
              value={selected || []}
              loading={loading}
              onChange={(_, value) => setSelected(value || [])}
              onInputChange={(_, value) => onSearch(value)}
              getOptionLabel={(option) => option?.label || ""}
              filterSelectedOptions
              renderTags={(value, getTagProps) =>
                (value || []).map((option, index) => (
                  <Chip
                    {...getTagProps({ index })}
                    key={option.value}
                    label={option.label}
                    sx={{
                      bgcolor: "#1a365d",
                      color: "white",
                      fontWeight: 600,
                      borderRadius: "8px",
                    }}
                  />
                ))
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder={
                    selected.length === 0
                      ? "e.g. React, Backend Developer"
                      : ""
                  }
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "15px",
                      bgcolor: "rgba(255,255,255,0.5)",
                    },
                  }}
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                      <>
                        <SearchIcon sx={{ color: "text.secondary", ml: 1 }} />
                        {params.InputProps.startAdornment}
                      </>
                    ),
                    endAdornment: (
                      <>
                        {loading ? <CircularProgress size={18} /> : null}
                        {params.InputProps.endAdornment}
                      </>
                    ),
                  }}
                />
              )}
            />

            <Button
              variant="contained"
              fullWidth={false}
              onClick={onSubmit}
              disabled={!selected || selected.length === 0 || loading}
              sx={{
                mt: 4,
                px: 6,
                py: 1.5,
                borderRadius: "50px",
                bgcolor: "#2dd4bf",
                fontSize: "1.1rem",
                fontWeight: 800,
                textTransform: "uppercase",
                boxShadow: "0 10px 15px -3px rgba(45, 212, 191, 0.4)",
                "&:hover": {
                  bgcolor: "#14b8a6",
                },
              }}
            >
              Continue
            </Button>
          </Box>

          {/* This represents the right side content/chips visible in your image */}
          <Box
            sx={{
              position: "absolute",
              right: "5%",
              top: "50%",
              transform: "translateY(-50%)",
              display: { xs: "none", md: "flex" },
              flexDirection: "column",
              gap: 2,
              alignItems: "flex-end",
            }}
          >
            {['AIFTS', '3017A', 'BPFS', '2HBX8', 'OPPS'].map((text) => (
              <Chip
                key={text}
                label={text}
                sx={{
                  bgcolor: "rgba(0,0,0,0.2)",
                  color: "white",
                  backdropFilter: "blur(5px)",
                  fontWeight: 700
                }}
              />
            ))}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
} 