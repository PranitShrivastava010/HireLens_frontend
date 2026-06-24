import { useRef } from "react";
import { useInView } from "framer-motion";
import FeatureImage from "./FeatureImage";
import FeatureContent from "./FeatureContent";

export default function FeatureSection({
  title,
  subtitle,
  reverse = false,
  highlight = [],
  imageSrc = null
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: "-120px" });

  return (
    <section
      ref={ref}
      className="feature-grid"
    >
      {!reverse && (
        <FeatureImage inView={inView} reverse={false} imageSrc={imageSrc} />
      )}

      <FeatureContent
        inView={inView}
        reverse={reverse}
        title={title}
        subtitle={subtitle}
        highlight={highlight}
      />

      {reverse && (
        <FeatureImage inView={inView} reverse imageSrc={imageSrc} />
      )}
    </section>
  );
}
