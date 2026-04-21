import React, { useState } from "react";
import BasicsCard from "./sections/BasicsCard";
import ExperienceSection from "./sections/ExperienceSection";
import EducationSection from "./sections/EducationSection";
import ProjectsSection from "./sections/ProjectsSection";
import SkillsSection from "./sections/SkillsSection";
import CertificationsSection from "./sections/CertificationsSection";
import ResumePreview from "./ResumePreview";
import "./resumeBuilder.css";

export default function ResumeBuilder({ resume, onSaveBasics, loading }) {
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (sectionId) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  const sections = [
    {
      id: "basics",
      title: "Contact Information",
      icon: "👤",
      component: BasicsCard,
    },
    {
      id: "experience",
      title: "Work Experience",
      icon: "💼",
      component: ExperienceSection,
    },
    {
      id: "education",
      title: "Education",
      icon: "🎓",
      component: EducationSection,
    },
    {
      id: "projects",
      title: "Projects",
      icon: "🚀",
      component: ProjectsSection,
    },
    {
      id: "skills",
      title: "Skills",
      icon: "⭐",
      component: SkillsSection,
    },
    {
      id: "certifications",
      title: "Certifications",
      icon: "📜",
      component: CertificationsSection,
    },
  ];

  return (
    <div className="resume-builder-container">
      {/* LEFT */}
      <div className="resume-form-section">
        <div className="form-cards-wrapper">
          {sections.map((section) => {
            const Component = section.component;

            return (
              <Component
                key={section.id}
                section={section}
                isExpanded={expandedSection === section.id}
                onToggle={() => toggleSection(section.id)}
                data={
                  section.id === "basics"
                    ? resume?.basics
                    : resume?.sections?.[section.id]
                }
                onSave={section.id === "basics" ? onSaveBasics : undefined}
                loading={loading}
              />
            );
          })}
        </div>
      </div>

      {/* RIGHT */}
      <div className="resume-preview-section">
        <ResumePreview resumeData={resume} />
      </div>
    </div>
  );
}
