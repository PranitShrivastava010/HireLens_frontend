import React, { useEffect, useMemo, useRef, useState } from "react";
import LayoutControls from "./LayoutControls";
import BasicsCard from "./sections/BasicsCard";
import ExperienceSection from "./sections/ExperienceSection";
import ProjectsSection from "./sections/ProjectsSection";
import SkillsSection from "./sections/SkillsSection";
import EducationSection from "./sections/EducationSection";
import CertificationsSection from "./sections/CertificationsSection";
import ResumePreview from "./ResumePreview";
import {
  applyDensityPreset,
  createDefaultUiState,
  DEFAULT_LAYOUT_SETTINGS,
  DEFAULT_SECTION_VISIBILITY,
  sanitizeCustomLinks,
} from "./resumeBuilderUtils";
import "./resumeBuilder.css";

export default function ResumeBuilder({ resume, loading, handlers }) {
  const [expandedSection, setExpandedSection] = useState("layout");
  const [layoutSettings, setLayoutSettings] = useState(DEFAULT_LAYOUT_SETTINGS);
  const [customLinks, setCustomLinks] = useState([]);
  const [sectionVisibility, setSectionVisibility] = useState(
    createDefaultUiState().sectionVisibility
  );
  const hasHydratedLayoutRef = useRef(false);

  useEffect(() => {
    setLayoutSettings({
      ...DEFAULT_LAYOUT_SETTINGS,
      ...(resume.layoutSettings ?? {}),
    });
    setCustomLinks(sanitizeCustomLinks(resume.customLinks ?? []));
    setSectionVisibility({
      ...DEFAULT_SECTION_VISIBILITY,
      ...(resume.sectionVisibility ?? {}),
    });
    hasHydratedLayoutRef.current = false;
  }, [resume.customLinks, resume.layoutSettings, resume.sectionVisibility]);

  useEffect(() => {
    if (!resume?.id) {
      return undefined;
    }

    if (!hasHydratedLayoutRef.current) {
      hasHydratedLayoutRef.current = true;
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      handlers.updateLayoutSettings({
        ...layoutSettings,
        sectionVisibility,
      });
    }, 350);

    return () => window.clearTimeout(timeoutId);
  }, [handlers, layoutSettings, resume?.id, sectionVisibility]);

  const toggleSection = (sectionId) => {
    setExpandedSection((currentSection) =>
      currentSection === sectionId ? null : sectionId
    );
  };

  const sectionCounts = useMemo(
    () => ({
      experience: resume.experiences?.length || 0,
      projects: resume.projects?.length || 0,
      skills: resume.skills?.length || 0,
      education: resume.educations?.length || 0,
      certifications: resume.certifications?.length || 0,
    }),
    [resume]
  );

  const handleBasicsSave = async (formState) => {
    const nextCustomLinks = formState.customLinks ?? [];
    setCustomLinks(nextCustomLinks);
    await handlers.saveBasics(formState);
  };

  const handleDensityChange = (presetName) => {
    setLayoutSettings((current) => applyDensityPreset(presetName, current));
  };

  const handleLayoutChange = (key, value) => {
    setLayoutSettings((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const handleResetLayout = () => {
    setLayoutSettings({ ...DEFAULT_LAYOUT_SETTINGS });
    setSectionVisibility({ ...DEFAULT_SECTION_VISIBILITY });
  };

  const handleSectionVisibilityChange = (sectionId, isVisible) => {
    setSectionVisibility((current) => ({
      ...current,
      [sectionId]: isVisible,
    }));
  };

  return (
    <div className="resume-builder-shell">
      <div className="resume-builder-intro">
        <div>
          <p className="resume-eyebrow">Resume Builder</p>
          <h1>HireLens-style resume builder</h1>
          <p className="resume-subcopy">
            Built around your shared template: compact A4 layout, live page-fit
            controls, and clickable links in the printed PDF.
          </p>
        </div>
        {loading ? <span className="resume-status-chip">Saving changes...</span> : null}
      </div>

      <div className="resume-builder-container">
        <div className="resume-form-section">
          <LayoutControls
            isExpanded={expandedSection === "layout"}
            onToggle={() => toggleSection("layout")}
            settings={layoutSettings}
            onDensityChange={handleDensityChange}
            onSettingChange={handleLayoutChange}
            onReset={handleResetLayout}
            sectionVisibility={sectionVisibility}
            onSectionVisibilityChange={handleSectionVisibilityChange}
          />

          <BasicsCard
            isExpanded={expandedSection === "basics"}
            onToggle={() => toggleSection("basics")}
            data={resume.basics}
            customLinks={customLinks}
            onSave={handleBasicsSave}
            loading={loading}
          />

          <ExperienceSection
            isExpanded={expandedSection === "experience"}
            onToggle={() => toggleSection("experience")}
            data={resume.experiences}
            count={sectionCounts.experience}
            onCreate={handlers.createExperience}
            onUpdate={handlers.updateExperience}
            onDelete={handlers.deleteExperience}
            loading={loading}
          />

          <ProjectsSection
            isExpanded={expandedSection === "projects"}
            onToggle={() => toggleSection("projects")}
            data={resume.projects}
            count={sectionCounts.projects}
            onCreate={handlers.createProject}
            onUpdate={handlers.updateProject}
            onDelete={handlers.deleteProject}
            loading={loading}
          />

          <SkillsSection
            isExpanded={expandedSection === "skills"}
            onToggle={() => toggleSection("skills")}
            data={resume.skills}
            count={sectionCounts.skills}
            onCreate={handlers.createSkill}
            onUpdate={handlers.updateSkill}
            onDelete={handlers.deleteSkill}
            loading={loading}
          />

          <EducationSection
            isExpanded={expandedSection === "education"}
            onToggle={() => toggleSection("education")}
            data={resume.educations}
            count={sectionCounts.education}
            onCreate={handlers.createEducation}
            onUpdate={handlers.updateEducation}
            onDelete={handlers.deleteEducation}
            loading={loading}
          />

          <CertificationsSection
            isExpanded={expandedSection === "certifications"}
            onToggle={() => toggleSection("certifications")}
            data={resume.certifications}
            count={sectionCounts.certifications}
            onCreate={handlers.createCertification}
            onUpdate={handlers.updateCertification}
            onDelete={handlers.deleteCertification}
            loading={loading}
          />
        </div>

        <div className="resume-preview-section">
          <ResumePreview
            resumeData={resume}
            customLinks={customLinks}
            layoutSettings={layoutSettings}
            sectionVisibility={sectionVisibility}
          />
        </div>
      </div>
    </div>
  );
}
