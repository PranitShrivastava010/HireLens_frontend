import { motion as Motion } from "framer-motion";
import HeroHeadline from "./HeroHeadline";
import HeroSubtitle from "./HeroSubtitle";
import HeroVisual from "./HeroVisual";
import CommonButton from "../common/CommonButton";
import ThreeBackground from "../common/ThreeBackground";

export default function Hero() {
  return (
    <section
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        alignItems: "center",
        padding: "0 6rem",
        background: "white",
        overflow: "hidden",
        // marginTop: "5%"
      }}
    >
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

      <div style={{ position: "relative", zIndex: 1, marginTop: "10%" }}>
        <HeroHeadline />
        <HeroSubtitle />
        <CommonButton color={"black"} text={"Get Started"} />
      </div>

      <div style={{ position: "relative", zIndex: 1, marginTop: "10%" }}>
        <HeroVisual />
      </div>
    </section>
  );
}
