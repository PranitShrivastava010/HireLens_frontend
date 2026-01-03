import { motion as Motion } from "framer-motion";

export default function HeroSubtitle() {
  return (
    <Motion.p
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.6 }}
      style={{
        fontSize: "1.2rem",
        color: "#666",
        maxWidth: "480px",
        marginBottom: "2rem",
        fontWeight: "bold"
      }}
    >
      Stop guessing and start applying. Get the full picture on every role before you hit send.
    </Motion.p>
  );
}
