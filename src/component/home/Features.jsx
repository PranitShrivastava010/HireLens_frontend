import { useRef } from "react";
import { useInView } from "framer-motion";
import FeatureImage from "./FeatureImage";
import FeatureContent from "./FeatureContent";

export default function FeatureSection({
  title,
  subtitle,
  reverse = false,
  highlight = []
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: "-120px" });

  return (
    <section
      ref={ref}
      style={{
        minHeight: "60vh",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        alignItems: "center",
        padding: "0 6rem",
        background: "#fff",
        overflow: "hidden",
        gap: "3rem", // reduced gap
      }}
    >
      {!reverse && (
        <FeatureImage inView={inView} reverse={false} />
      )}

      <FeatureContent
        inView={inView}
        reverse={reverse}
        title={title}
        subtitle={subtitle}
        highlight={highlight}
      />

      {reverse && (
        <FeatureImage inView={inView} reverse />
      )}
    </section>
  );
}
