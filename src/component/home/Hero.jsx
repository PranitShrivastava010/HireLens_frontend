import { motion as Motion } from "framer-motion";
import HeroHeadline from "./HeroHeadline";
import HeroSubtitle from "./HeroSubtitle";
import HeroVisual from "./HeroVisual";
import CommonButton from "../common/CommonButton";
import ThreeBackground from "../common/ThreeBackground";

export default function Hero() {
  return (
    <section className="hero-grid">
      <ThreeBackground/>
      {/* Gradient overlay */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "45%",
          background: "linear-gradient(to top, #27C4D6, transparent)",
          zIndex: 0,
        }}
      />

      <div className="hero-text" style={{ position: "relative", zIndex: 1, marginTop: "10%" }}>
        <HeroHeadline />
        <HeroSubtitle />
        <CommonButton color={"black"} text={"Get Started"} />
      </div>

      <div className="hero-image" style={{ position: "relative", zIndex: 1, marginTop: "10%" }}>
        <HeroVisual />
      </div>
    </section>
  );
}
