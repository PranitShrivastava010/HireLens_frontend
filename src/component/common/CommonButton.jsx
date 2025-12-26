import { motion as Motion} from "framer-motion";

export default function CommonButton({
  text,
  color,
  radius = "8px"
}) {
  return (
    <Motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      style={{
        padding: "14px 28px",
        fontSize: "1rem",
        borderRadius: radius,
        background: color,
        color: "#fff",
        border: "none",
        cursor: "pointer",
      }}
    >
      {text}
    </Motion.button>
  );
}
