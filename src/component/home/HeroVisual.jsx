import { motion as Motion } from "framer-motion";

export default function HeroVisual() {
  return (
    <Motion.div
      animate={{ y: [0, -12, 0] }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      style={{
        width: "420px",
        height: "280px",
        borderRadius: "16px",
        background: "linear-gradient(135deg, #f5f5f5, #eaeaea)",
        boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
        marginLeft: "auto",
      }}
    />
  );
}
