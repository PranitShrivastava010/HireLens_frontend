import { motion as Motion } from "framer-motion";

export default function FeatureImage({ reverse, inView }) {
  return (
    <Motion.div
      initial={{
        x: reverse ? 120 : -120,
        opacity: 0,
      }}
      animate={
        inView
          ? {
              x: 0,
              opacity: 1,
              y: [0, -12, 0], 
            }
          : {
              x: reverse ? 120 : -120,
              opacity: 0,
              y: 0,
            }
      }
      transition={{
        x: { duration: 0.9, ease: "easeOut" },
        y: {
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
      style={{
        order: reverse ? 2 : 1,
        width: "420px",
        height: "280px",
        borderRadius: "16px",
        background: "linear-gradient(135deg, #27C4D6, #1E6FD9)",
        boxShadow: "0 20px 40px rgba(0,0,0,0.12)",
      }}
    />
  );
}
