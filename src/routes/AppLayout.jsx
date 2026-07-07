import { Box, IconButton, Drawer, useMediaQuery } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Outlet } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import SidebarContainer from "../container/layout/SidebarContainer";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

  export default function AppLayout() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const [open, setOpen] = useState(false);
    const accessToken = useSelector((state) => state.auth.accessToken);

    if (!accessToken) {
      return <Navigate to="/login" replace />;
    }

    return (
      <Box className="app-background" sx={{ display: "flex", height: "100vh" }}>
        
        {/* DESKTOP SIDEBAR */}
        {!isMobile && <SidebarContainer />}

        {/* MOBILE SIDEBAR */}
        {isMobile && (
          <Drawer
            open={open}
            onClose={() => setOpen(false)}
            variant="temporary"
            ModalProps={{ keepMounted: true }}
            sx={{
              "& .MuiDrawer-paper": {
                width: 260,
              },
            }}
          >
            <SidebarContainer onClose={() => setOpen(false)} />
          </Drawer>
        )}

        {/* MAIN CONTENT */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            overflowY: "auto",
            position: "relative",
            display: "flex",
            flexDirection: "column"
          }}
        >
          {/* MOBILE HEADER */}
          {isMobile && (
            <Box sx={{ p: 2, display: "flex", alignItems: "center", flexShrink: 0 }}>
              <IconButton
                onClick={() => setOpen(true)}
                sx={{
                  backgroundColor: "white",
                  color: "black",
                  width: 44,
                  height: 44,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                  "&:hover": {
                    backgroundColor: "#f5f5f5",
                  },
                }}
              >
                <MenuIcon />
              </IconButton>
            </Box>
          )}

          <Box sx={{ flexGrow: 1 }}>
            <Outlet />
          </Box>
        </Box>
      </Box>
    );
  }
