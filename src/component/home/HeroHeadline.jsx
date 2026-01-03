import { motion as Motion } from "framer-motion";

const words = [
  { text: "Your" },
  { text: "Job", highlight: true },
  { text: "Search", highlight: true },
  { text: "Seen" },
  { text: "Clearly" },
];

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
      {words.map((wordItem, index) => (
        <Motion.span
          key={index}
          variants={word}
          style={{
            display: "inline-block",
            marginRight: "12px",
            padding: wordItem.highlight ? "4px 10px" : "0",
            backgroundColor: wordItem.highlight ? "#27C4D6" : "transparent",
            color: wordItem.highlight ? "#fff" : "#1f2937",
            borderRadius: "6px",
          }}
        >
          {wordItem.text}
        </Motion.span>
      ))}
    </Motion.h1>
  );
}
