import { Box, IconButton, Drawer, useMediaQuery } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Outlet } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import SidebarContainer from "../container/layout/SidebarContainer";

  export default function AppLayout() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const [open, setOpen] = useState(false);

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
            
          }}
        >
          {/* HAMBURGER BUTTON (MOBILE ONLY) */}
          {isMobile && (
            <IconButton
              onClick={() => setOpen(true)}
              sx={{
                position: "fixed",
                top: 16,
                left: 16,
                zIndex: 1300,
                backgroundColor: "white",
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
          )}

          <Outlet />
        </Box>
      </Box>
    );
  }
