import { Card, CardContent, Typography, Box } from "@mui/material";

export default function CommonCard({
  title,
  subtitle,
//   accentColor = "#4f46e5",
  backgroundColor = "#EFF6FF",
  borderColor = "#BEDBFF",
  children,
  sx={},
  contentHeight = 300
}) {
  return (
    <Card
      sx={{
        borderRadius: 4,
        backgroundColor,
        border: `1px solid ${borderColor}`,
        boxShadow: "none",
        ...sx
      }}
    >
      <CardContent sx={{ p: 3, height: contentHeight }}>
        {/* Header */}
        {(title || subtitle) && (
          <Box sx={{ mb: 2 }}>
            {title && (
              <Typography
                fontWeight={600}
                fontSize={16}
                sx={{ color: "#111827" }}
              >
                {title}
              </Typography>
            )}

            {subtitle && (
              <Typography
                variant="body2"
                sx={{ color: "#6b7280", mt: 0.3 }}
              >
                {subtitle}
              </Typography>
            )}
          </Box>
        )}

        {/* Body */}
        <Box>{children}</Box>
      </CardContent>
    </Card>
  );
}
