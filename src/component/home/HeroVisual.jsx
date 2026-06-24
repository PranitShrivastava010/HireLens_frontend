import { motion as Motion } from "framer-motion";

export default function HeroVisual() {
  return (
    <Motion.img
      src="/enhanced_job_dashboard.png"
      alt="Job Page Dashboard"
      animate={{ y: [0, -12, 0] }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      style={{
        width: "100%",
        maxWidth: "490px",
        height: "auto",
        borderRadius: "16px",
        boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
        marginLeft: "auto",
        objectFit: "contain",
        display: "block",
      }}
    />
  );
}
