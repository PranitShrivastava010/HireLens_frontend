import { motion as Motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import CommonButton from "../common/CommonButton";
import { useNavigate } from "react-router-dom";
import { useMediaQuery, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const ghostBtn = {
  background: "transparent",
  border: "none",
  fontWeight: 900,
  cursor: "pointer",
};

export default function HomeNavbar() {
  const [expanded, setExpanded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  
  const isMobile = useMediaQuery("(max-width: 900px)");
  const navigate = useNavigate();

  useEffect(() => {
    // Only animate the bar expansion on desktop, on mobile we keep it small and expand downwards
    const timer = setTimeout(() => setExpanded(true), 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: "1.5rem",
        left: "50%",
        transform: "translateX(-55%)",
        zIndex: 50,
        width: isMobile ? "80%" : "auto"
      }}
    >
      <Motion.div
        initial={{ width: isMobile ? "100%" : 90 }}
        animate={{ width: isMobile ? "100%" : (expanded ? 1100 : 64) }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        style={{
          background: "white",
          borderRadius: menuOpen && isMobile ? 20 : 999,
          display: "flex",
          flexDirection: "column",
          padding: "0 1.25rem",
          boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
          overflow: "hidden",
        }}
      >
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 64,
          width: "100%"
        }}>
          {/* Logo */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              fontWeight: 600,
              fontSize: "1.1rem",
              whiteSpace: "nowrap",
            }}
          >
            <img
              src="./hrLogo.png"
              alt="logo"
              style={{ width: 100, height: 100 }}
            />
          </div>

          {isMobile && (
            <IconButton onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
          )}

          {/* Desktop Nav Content */}
          {!isMobile && (
            <Motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: expanded ? 1 : 0 }}
              transition={{ delay: 0.5 }}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                marginLeft: "3rem",
              }}
            >
              {/* Links */}
              <div style={{ display: "flex", gap: "2rem" }}>
                <a style={{color : "#1E2B5C", fontFamily: "Heading", fontWeight: 600}} href="#">Job tracker</a>
                <a style={{color : "#1E2B5C", fontFamily: "Heading", fontWeight: 600}} href="#">Free AI Tools</a>
                <a style={{color : "#1E2B5C", fontFamily: "Heading", fontWeight: 600}} href="#">For Organizations</a>
              </div>

              {/* Actions */}
              <div style={{ display: "flex", gap: "1rem" }}>
                <button style={ghostBtn} onClick={() => navigate("/login")}>Login</button>
                <CommonButton color={"linear-gradient(135deg, #1E2B5C, #27C4D6)"} text={"Get Started"} radius={"30px"} onClick={() => navigate("/register")} />
              </div>
            </Motion.div>
          )}
        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {isMobile && menuOpen && (
            <Motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              style={{ display: "flex", flexDirection: "column", gap: "1.5rem", paddingBottom: "1.5rem" }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginTop: "1rem" }}>
                <a style={{color : "#1E2B5C", fontFamily: "Heading", fontWeight: 600, textAlign: "center"}} href="#">Job tracker</a>
                <a style={{color : "#1E2B5C", fontFamily: "Heading", fontWeight: 600, textAlign: "center"}} href="#">Free AI Tools</a>
                <a style={{color : "#1E2B5C", fontFamily: "Heading", fontWeight: 600, textAlign: "center"}} href="#">For Organizations</a>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem", alignItems: "center" }}>
                <button style={ghostBtn} onClick={() => navigate("/login")}>Login</button>
                <CommonButton color={"linear-gradient(135deg, #1E2B5C, #27C4D6)"} text={"Get Started"} radius={"30px"} onClick={() => navigate("/register")} />
              </div>
            </Motion.div>
          )}
        </AnimatePresence>
      </Motion.div>
    </nav>
  );
}
