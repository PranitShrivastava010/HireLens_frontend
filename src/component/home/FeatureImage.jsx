import { motion as Motion } from "framer-motion";

export default function FeatureImage({ reverse, inView, imageSrc }) {
  const commonStyles = {
    width: "100%",
    maxWidth: "420px",
    height: "auto",
    aspectRatio: "420 / 280",
    borderRadius: "16px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.12)",
  };

  const animationProps = {
    initial: {
      x: reverse ? 120 : -120,
      opacity: 0,
    },
    animate: inView
      ? {
          x: 0,
          opacity: 1,
          y: [0, -12, 0],
        }
      : {
          x: reverse ? 120 : -120,
          opacity: 0,
          y: 0,
        },
    transition: {
      x: { duration: 0.9, ease: "easeOut" },
      y: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  if (imageSrc) {
    return (
      <Motion.img
        className="feature-image"
        src={imageSrc}
        alt="Feature presentation"
        {...animationProps}
        style={{
          ...commonStyles,
          objectFit: "cover",
          display: "block",
        }}
      />
    );
  }

  return (
    <Motion.div
      className="feature-image"
      {...animationProps}
      style={{
        ...commonStyles,
        background: "linear-gradient(135deg, #27C4D6, #1E6FD9)",
      }}
    />
  );
}
