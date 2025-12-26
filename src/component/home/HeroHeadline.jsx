import { motion as Motion } from "framer-motion";

const sentence = "Your Job Search Seen Clearly".split(" ");

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const word = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      ease: "easeOut",
      duration: 0.6,
    },
  },
};

export default function HeroHeadline() {
  return (
    <Motion.h1
      variants={container}
      initial="hidden"
      animate="visible"
      style={{
        fontSize: "4rem",
        fontWeight: 800,
        lineHeight: 1.1,
        marginBottom: "1rem",
      }}
    >
      {sentence.map((wordText, index) => (
        <Motion.span
          key={index}
          variants={word}
          style={{ display: "inline-block", marginRight: "12px" }}
        >
          {wordText}
        </Motion.span>
      ))}
    </Motion.h1>
  );
}
