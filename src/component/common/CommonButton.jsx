import { motion as Motion} from "framer-motion";

export default function CommonButton({
  text,
  color,
  radius = "8px",
  sx={},
  onClick,
  textColor = "#fff",
}) {
  return (
    <Motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      style={{
        padding: "14px 28px",
        fontSize: "1rem",
        fontFamily: "Heading",
        borderRadius: radius,
        background: color,
        color: {textColor},
        fontWeight: 600,
        border: "none",
        cursor: "pointer",
        ...sx
      }}
    >
      {text}
    </Motion.button>
  );
}
