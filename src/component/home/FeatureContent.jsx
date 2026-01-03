import { motion as Motion } from "framer-motion";

export default function FeatureContent({
    inView,
    title,
    subtitle,
    reverse,
    highlight = []
}) {
    const fromX = reverse ? -160 : 160;

    return (
        <div style={{ order: reverse ? 1 : 2 }}>
            <Motion.h2
                initial={{
                    x: fromX,
                    opacity: 0,
                    clipPath: reverse
                        ? "inset(0 100% 0 0)"
                        : "inset(0 0 0 100%)",
                }}
                animate={
                    inView
                        ? { x: 0, opacity: 1, clipPath: "inset(0 0 0 0)" }
                        : {
                            x: fromX,
                            opacity: 0,
                        }
                }
                transition={{ duration: 0.8, ease: "easeOut" }}
                style={{
                    fontSize: "3rem",
                    fontWeight: 800,
                    marginBottom: "1rem",
                }}
            >
                {title.split(" ").map((word, index) => (
                    <span
                        key={index}
                        style={{
                            background: highlight.includes(word)
                                ? "#27C4D6"
                                : "none",
                            color: highlight.includes(word) ? "#fff" : "inherit",
                            padding: highlight.includes(word) ? "0 0.25rem" : 0,
                            borderRadius: highlight.includes(word) ? "4px" : 0,
                        }}
                    >
                        {word}{" "}
                    </span>
                ))}
            </Motion.h2>

            <Motion.p
                initial={{ x: fromX, opacity: 0 }}
                animate={inView ? { x: 0, opacity: 1 } : { x: fromX, opacity: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                style={{
                    fontSize: "1.1rem",
                    color: "#555",
                    maxWidth: "460px",
                    fontWeight: 500,
                }}
            >
                {subtitle}
            </Motion.p>
        </div>
    );
}
