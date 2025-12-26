import "../../component/home/Paralax.css"
import ParallaxText from "../../component/home/ParallaxText";

export default function ParalaxContainer() {
  return (
    <section className="parallax-wrapper">
      <ParallaxText baseVelocity={-7}>
        HireLens - Tracker
      </ParallaxText>

      <ParallaxText baseVelocity={4}>
        AI Powered ATS — Smart Hiring
      </ParallaxText>
    </section>
  );
}
