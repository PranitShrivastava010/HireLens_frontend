import { motion as Motion } from "framer-motion";
import { useEffect, useState } from "react";
import CommonButton from "../common/CommonButton";
import { useNavigate } from "react-router-dom";

const ghostBtn = {
  background: "transparent",
  border: "none",
  fontWeight: 500,
  cursor: "pointer",
};


export default function HomeNavbar() {
  const [expanded, setExpanded] = useState(false);

  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => setExpanded(true), 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: "1.5rem",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 50,
      }}
    >
      <Motion.div
        initial={{ width: 90 }}
        animate={{ width: expanded ? 1100 : 64 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        style={{
          height: 64,
          background: "white",
          borderRadius: 999,
          display: "flex",
          alignItems: "center",
          padding: "0 1.25rem",
          boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
          overflow: "hidden",
        }}
      >
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

        {/* Nav Content */}
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
          <div style={{ display: "flex", gap: "2rem", }}>
            <a style={{color : "#1E2B5C"}} href="#">Job tracker</a>
            <a style={{color : "#1E2B5C"}} href="#">Free AI Tools</a>
            <a style={{color : "#1E2B5C"}} href="#">For Organizations</a>
          </div>

          {/* Actions */}
          <div style={{ display: "flex", gap: "1rem" }}>
            <button style={ghostBtn} onClick={() => navigate("/login")}>Login</button>
            <CommonButton color={"linear-gradient(135deg, #1E2B5C, #27C4D6)"} text={"Get Started"} radius={"30px"} onClick={() => navigate("/register")} />
          </div>
        </Motion.div>
      </Motion.div>
    </nav>
  );
}
