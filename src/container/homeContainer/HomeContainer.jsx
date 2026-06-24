import { motion as Motion } from "framer-motion";
import CommonBox from "../../component/common/CommonBox";
import FeatureSection from "../../component/home/Features";
import Hero from "../../component/home/Hero";
import CardFeature from "../../component/home/CardFeature";
import { Box } from "@mui/material";
import ParallaxText from "../../component/home/ParallaxText";
import "../../component/home/Paralax.css"
import HomeNavbar from "../../component/layout/HomeNavbar";

export default function HomeContainer() {

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
        <>
            <Box>
                <HomeNavbar/>
            </Box>
            <Hero />
             <Box>
                <section className="parallax-wrapper">
                    <ParallaxText baseVelocity={-7}>
                        HireLens - Tracker
                    </ParallaxText>

                    <ParallaxText baseVelocity={4}>
                        AI Powered ATS — Smart Hiring
                    </ParallaxText>
                </section>
            </Box>
            <Box>
                <FeatureSection
                    title="AI-Powered Requirement Mapping"
                    subtitle="Instantly extract and rank job requirements by priority. We turn dense descriptions into a clear checklist for success."
                    reverse={false}
                    highlight={["AI-Powered"]}
                    imageSrc="/ai_keyword_extraction.png"
                />

                <FeatureSection
                    title="Make Your Resume ATS-Friendly"
                    subtitle="Craft the perfect resume using precise Layout Controls. Tune spacing, margins, and section density in real-time with our Live A4 Preview to ensure your profile stands out and flawlessly passes any ATS scan."
                    reverse={true}
                    highlight={["ATS-Friendly", "Layout Controls"]}
                    imageSrc="/resume_builder_ui.png"
                />

                <FeatureSection
                    title="Track Your Job Hunt Effortlessly"
                    subtitle="Stay completely organized with our intuitive Kanban board. Effortlessly drag and drop job applications across custom stages—from Saved to Interview to Offer—so you never miss a vital opportunity."
                    reverse={false}
                    highlight={["Effortlessly"]}
                    imageSrc="/job_tracker_ui.png"
                />
            </Box>
            <Box>
                <Motion.section
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-120px" }}
                    className="home-card-grid"
                >
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
            </Box>
        </>
    )
}