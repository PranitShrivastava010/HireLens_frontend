import { motion as Motion } from "framer-motion";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import WorkIcon from '@mui/icons-material/Work';
import BarChartIcon from "@mui/icons-material/BarChart";
import DescriptionIcon from "@mui/icons-material/Description";
import PsychologyIcon from "@mui/icons-material/Psychology";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

const drawerWidth = 260;

const iconMap = {
  home: <SpaceDashboardIcon />,
  board: <WorkIcon />,
  stats: <BarChartIcon />,
  resume: <DescriptionIcon />,
  score: <AutoAwesomeIcon />,
  ai: <PsychologyIcon />,
  cover: <DescriptionIcon />,
  linkedin: <LinkedInIcon />,
};

const MotionListItemButton = Motion(ListItemButton);

export default function Sidebar({ menuItems, activePath, onNavigate }) {
  const normalizedActivePath = activePath.split("?")[0].replace(/\/$/, "");

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          height: "100vh",
          overflowY: "auto",
          bgcolor: "#1A1E2C",
          borderRight: "none",
          px: 1,
          py: 2,
        },
      }}
    >
      {/* Logo */}
      <Box sx={{ px: 4, py: 1 }}>
        <Typography
          variant="h4"
          sx={{ fontWeight: "bold", color: "#ffffff", mb: 0.5 }}
        >
          Hire<span style={{ color: "#27C4D6" }}>Lens</span>
        </Typography>
        <Typography variant="caption" sx={{ color: "#aaa" }}>
          EE-Tracker for Careers
        </Typography>
      </Box>

      {/* Menu */}
      <List sx={{ mt: 2 }}>
        {menuItems.map((item) => {
          const normalizedItemPath = item.path.replace(/\/$/, "");
          const isActive =
            normalizedActivePath === normalizedItemPath ||
            normalizedActivePath.startsWith(normalizedItemPath + "/");

          return (
            <ListItem key={item.label} disablePadding sx={{ mb: 1 }}>
              <MotionListItemButton
                onClick={() => onNavigate(item.path)}
                initial={false}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                sx={{
                  mx: 1,
                  borderRadius: "12px",
                  px: 2,
                  py: 1.2,
                  color: "#fff",
                  fontWeight: 500,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 36,
                    color: isActive ? "#27C4D6" : "#888",
                    transition: "0.3s",
                    filter: isActive
                      ? "drop-shadow(0 0 6px #27C4D6)"
                      : "none",
                    animation: isActive
                      ? "glowPulse 1.5s ease-in-out infinite alternate"
                      : "none",
                    "&:hover": {
                      color: "#27C4D6",
                      filter: "drop-shadow(0 0 6px #27C4D6)",
                    },
                  }}
                >
                  {iconMap[item.icon]}
                </ListItemIcon>

                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    sx: { fontWeight: 500, fontSize: "0.95rem", color: "#fff" },
                  }}
                />
              </MotionListItemButton>
            </ListItem>
          );
        })}
      </List>

      {/* Glow pulse keyframes */}
      <style>
        {`
          @keyframes glowPulse {
            0% {
              filter: drop-shadow(0 0 4px #27C4D6);
            }
            50% {
              filter: drop-shadow(0 0 12px #27C4D6);
            }
            100% {
              filter: drop-shadow(0 0 4px #27C4D6);
            }
          }
        `}
      </style>
    </Drawer>
  );
}
