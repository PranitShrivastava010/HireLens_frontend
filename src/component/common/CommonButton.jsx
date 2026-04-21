import { motion as Motion} from "framer-motion";

export default function CommonButton({
  text,
  color,
  radius = "8px",
  sx={},
  onClick,
  textColor = "#fff",
  disabled = false,
}) {
  return (
    <Motion.button
      whileHover={!disabled ? { scale: 1.05 } : {}}
      whileTap={!disabled ? { scale: 0.97 } : {}}
      onClick={!disabled ? onClick : undefined}
      disabled={disabled}
      style={{
        padding: "14px 28px",
        fontSize: "1rem",
        fontFamily: "Heading",
        borderRadius: radius,
        background: color,
        color: textColor,
        fontWeight: 600,
        border: "none",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
        ...sx
      }}
    >
      {text}
    </Motion.button>
  );
}
