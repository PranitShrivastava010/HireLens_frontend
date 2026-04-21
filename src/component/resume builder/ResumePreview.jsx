import React from "react";
import html2pdf from "html2pdf"
import "./resumeBuilder.css";

export default function ResumePreview({ resumeData = {} }) {
  const { basics = {}, sections = {} } = resumeData;
  const { fullName, headline, summary, contact = {} } = basics;
  const { email, phone, location, links = [] } = contact;
  const { experience = [], education = [], projects = [], skills = [], certifications = [] } = sections;

  // Group skills by category
  const skillsByCategory = skills.reduce((acc, skill) => {
    const category = skill.category || "Other";
    if (!acc[category]) acc[category] = [];
    acc[category].push(skill);
    return acc;
  }, {});

  const handleDownloadPDF = () => {
    const element = document.querySelector("resume-pdf-root");
    html2pdf().from(element).save("resume.pdf");
  };

  return (
    <div className="resume-preview-wrapper" id="resume-pdf-root">
      <div className="preview-header">
        <h2>Preview</h2>
        <button className="download-btn" onClick={handleDownloadPDF}>⬇️ Download PDF</button>
      </div>

      <div className="resume-preview-content">
        <div className="preview-document">
          {/* Header Section */}
          <div className="preview-header-section">
            <h1 className="preview-name">{fullName || "Your Name"}</h1>
            <p className="preview-subtitle">{headline || "Professional Headline"}</p>
            <p className="preview-contact">
              {[email, phone, location]
                .filter((item) => item)
                .join(" • ")}
              {links.length > 0 && (
                <>
                  {[email, phone, location].some((item) => item) && " • "}
                  {links.map((link, idx) => (
                    <span key={idx}>
                      {link.label}
                      {idx < links.length - 1 ? " • " : ""}
                    </span>
                  ))}
                </>
              )}
            </p>
          </div>

          {/* Summary Section */}
          {summary && (
            <div className="preview-section">
              <h3 className="preview-section-title">Professional Summary</h3>
              <p className="preview-text">{summary}</p>
            </div>
          )}

          {/* Experience Section */}
          {experience.length > 0 && (
            <div className="preview-section">
              <h3 className="preview-section-title">Work Experience</h3>
              {experience.map((job) => (
                <div key={job.id} className="preview-job">
                  <div className="job-header">
                    <h4>{job.role}</h4>
                    <span className="job-date">{job.duration}</span>
                  </div>
                  <p className="company-name">{job.company}</p>
                  {job.location && (
                    <p className="job-location">{job.location}</p>
                  )}
                  {job.bullets && job.bullets.length > 0 && (
                    <ul className="job-bullets">
                      {job.bullets.map((bullet, idx) => (
                        <li key={idx}>{bullet}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Education Section */}
          {education.length > 0 && (
            <div className="preview-section">
              <h3 className="preview-section-title">Education</h3>
              {education.map((edu) => (
                <div key={edu.id} className="preview-education">
                  <div className="edu-header">
                    <h4>{edu.degree}</h4>
                    <span className="edu-date">{edu.duration}</span>
                  </div>
                  <p className="school-name">{edu.institute}</p>
                  {edu.field && (
                    <p className="edu-field">{edu.field}</p>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Projects Section */}
          {projects.length > 0 && (
            <div className="preview-section">
              <h3 className="preview-section-title">Projects</h3>
              {projects.map((project) => (
                <div key={project.id} className="preview-project">
                  <div className="project-header">
                    <h4>{project.name}</h4>
                  </div>
                  <p className="preview-text">{project.description}</p>
                  {project.techStack && project.techStack.length > 0 && (
                    <div className="tech-stack">
                      {project.techStack.map((tech, idx) => (
                        <span key={idx} className="tech-tag">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Skills Section */}
          {skills.length > 0 && (
            <div className="preview-section">
              <h3 className="preview-section-title">Skills</h3>
              {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
                <div key={category} className="skill-category-preview">
                  <h5 className="category-label">{category}</h5>
                  <div className="preview-skills">
                    {categorySkills.map((skill) => (
                      <span key={skill.id} className="skill-tag">
                        {skill.name}
                        <span className="skill-level-tag">{skill.level}</span>
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Certifications Section */}
          {certifications.length > 0 && (
            <div className="preview-section">
              <h3 className="preview-section-title">Certifications</h3>
              {certifications.map((cert) => (
                <div key={cert.id} className="preview-cert">
                  <div className="cert-header">
                    <h4>{cert.name}</h4>
                    {cert.year && <span className="cert-year">{cert.year}</span>}
                  </div>
                  <p className="cert-issuer">{cert.issuer}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
