import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import SidebarContainer from "../container/layout/SidebarContainer";

export default function AppLayout() {
  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
      }}
    >
      <SidebarContainer />

      {/* Route pages render here */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          overflowY: "auto", 
          overflowX: "hidden",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
