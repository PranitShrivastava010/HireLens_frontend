import CardFeature from "../../component/home/CardFeature";
import { motion as Motion } from "framer-motion";

export default function CardContainer() {
  const cardData = [
    {
      title: "Automatic Customized Workflow",
      subtitle:
        "Design a recruitment journey that aligns seamlessly with your unique needs.",
      highlight: "Tailored Efficiency, Every Step of the Way",
      color: "#FFB74D",
    },
    {
      title: "Collaboration & Analytical reports",
      subtitle:
        "Empower your team to work cohesively while driving continuous improvement.",
      highlight: "Foster Team Harmony, Illuminate Insights",
      color: "#4FC3F7",
    },
    {
      title: "Candidate Sourcing",
      subtitle:
        "Say goodbye to manual sourcing challenges and welcome a streamlined approach.",
      highlight: "Effortless Talent Discovery",
      color: "#81C784",
    },
  ];

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <Motion.section
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-120px" }}
      style={{
        position: "relative",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "2rem",
        padding: "5rem 6rem",
        background: "linear-gradient(135deg, #1E2B5C, #27C4D6)", // ✅ base color
        overflow: "hidden",
      }}
    >
      {/* Pattern overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: 'url("/pattern.png")',
          backgroundRepeat: "repeat",
          backgroundSize: "900px",
          opacity: 0.18, // ✅ controls visibility
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "2rem",
        }}
      >
        {cardData.map((card, idx) => (
          <CardFeature key={idx} {...card} />
        ))}
      </div>
    </Motion.section>
  );
}
