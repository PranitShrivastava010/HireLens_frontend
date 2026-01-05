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

export default function Sidebar(
    {
        menuItems,
        activePath,
        onNavigate,
    }
) {
    return (
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                bgcolor: "#555",
                "& .MuiDrawer-paper": {
                    width: drawerWidth,
                    height: "100vh",
                    overflowY: "auto",
                    overflowX: "hidden",
                    borderRight: "3px solid #eee",
                    bgcolor: "#f5f5f5",
                    boxSizing: "border-box",
                },
            }}
        >
            {/* Logo */}
            <Box sx={{ px: -1, py: -1, mt: -13, ml: -4, mb: -4 }}>
                <Box
                    component="img"
                    src="/hrText.png"
                    alt="eztrackr logo"
                    sx={{
                        width: "300px",
                        height: "auto",
                        display: "block",
                    }}
                />
            </Box>

            {/* Navigation */}
            <List sx={{ mt: -9 }}>
                {menuItems.map((item) => {
                    const isActive = activePath === item.path;
                    return (
                        <ListItem key={item.label} disablePadding>
                            <ListItemButton
                                component={Motion.div}
                                onClick={() => onNavigate(item.path)}
                                whileHover={{
                                    scale: 1.02,
                                    backgroundColor: "#424c70ff",
                                    color: "white"
                                }}
                                whileTap={{ scale: 0.98 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 20,
                                }}
                                sx={{
                                    mx: 1,
                                    my: 0.5,
                                    borderRadius: "10px",
                                    color: isActive ? "white" : "#555",
                                    cursor: "pointer",
                                    backgroundColor: isActive ? "#424c70ff" : "transparent",
                                    fontWeight: isActive ? 600 : 500,

                                    "& .MuiListItemIcon-root": {
                                        minWidth: 36,
                                        color: "inherit",
                                    },
                                }}
                            >
                                <ListItemIcon>{iconMap[item.icon]}</ListItemIcon>
                                <ListItemText primary={item.label} />
                            </ListItemButton>
                        </ListItem>
                    )

                })}
            </List>
        </Drawer>
    );
}
