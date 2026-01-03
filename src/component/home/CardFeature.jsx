import { motion as Motion } from "framer-motion";

export default function CardFeature({ title, subtitle, highlight, color }) {
  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const boxVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    show: { opacity: 1, scale: 1, transition: { delay: 0.2, duration: 0.8 } },
  };

  return (
    <Motion.div
      variants={cardVariants}
      style={{
        background: "#fff",
        borderRadius: "16px",
        boxShadow: "0 12px 24px rgba(0,0,0,0.1)",
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      {/* Placeholder colored box */}
      <Motion.div
        variants={boxVariants}
        style={{
          width: "100px",
          height: "100px",
          backgroundColor: color,
          marginBottom: "1.5rem",
          borderRadius: "12px",
        }}
      />

      <h3 style={{ fontWeight: 700, fontSize: "1.2rem", marginBottom: "0.8rem" }}>
        {title}
      </h3>

      <p style={{ color: "#555", fontWeight: 500, marginBottom: "0.5rem" }}>
        <span style={{ color: "#f97316", fontWeight: 600 }}>{highlight}. </span>
        {subtitle}
      </p>
    </Motion.div>
  );
}
