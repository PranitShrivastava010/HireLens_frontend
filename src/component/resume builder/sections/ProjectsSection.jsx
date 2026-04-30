import React, { useState } from "react";
import ResumeSectionCard from "../ResumeSectionCard";
import "../resumeBuilder.css";

const createEmptyProject = () => ({
  name: "",
  description: "",
  techStackText: "",
  link: "",
  dateLabel: "",
});

const mapProjectToDraft = (project) => ({
  name: project.name || "",
  description: project.description || "",
  techStackText: project.techStack?.join(", ") || "",
  link: project.link || "",
  dateLabel: project.dateLabel || "",
});

export default function ProjectsSection({
  isExpanded,
  onToggle,
  data = [],
  onCreate,
  onUpdate,
  onDelete,
  loading,
}) {
  const [editingId, setEditingId] = useState(null);
  const [draft, setDraft] = useState(null);

  const startCreate = () => {
    setEditingId(null);
    setDraft(createEmptyProject());
  };

  const startEdit = (project) => {
    setEditingId(project.id);
    setDraft(mapProjectToDraft(project));
  };

  const resetForm = () => {
    setEditingId(null);
    setDraft(null);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDraft((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    if (!draft) {
      return;
    }

    const payload = {
      name: draft.name,
      description: draft.description,
      techStack: draft.techStackText
        .split(",")
        .map((tech) => tech.trim())
        .filter(Boolean),
      link: draft.link,
    };

    if (editingId) {
      await onUpdate(editingId, payload);
    } else {
      await onCreate(payload);
    }

    resetForm();
  };

  return (
    <ResumeSectionCard
      title="Projects"
      icon="PRJ"
      count={data.length}
      isExpanded={isExpanded}
      onToggle={onToggle}
      description="Project highlights, link, stack, and optional date label."
    >
      <div className="section-items">
        {data.map((project) => (
          <div key={project.id} className="item-preview">
            <div className="item-header">
              <h4>{project.name}</h4>
              <span className="company-info">
                {project.dateLabel || "Project entry"}
              </span>
            </div>

            <div className="item-actions">
              <button
                type="button"
                className="btn-small btn-edit"
                onClick={() => startEdit(project)}
              >
                Edit
              </button>
              <button
                type="button"
                className="btn-small btn-delete"
                onClick={() => onDelete(project.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {draft ? (
        <div className="form-container">
          <div className="form-row">
            <div className="form-group">
              <label>Project name</label>
              <input
                type="text"
                name="name"
                value={draft.name}
                onChange={handleChange}
                placeholder="AI Job Tracker & Analytics Platform"
              />
            </div>
            <div className="form-group">
              <label>Date label</label>
              <input
                type="text"
                name="dateLabel"
                value={draft.dateLabel}
                onChange={handleChange}
                placeholder="Nov 2025 - Feb 2026"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Description or bullets</label>
            <textarea
              className="resume-textarea"
              name="description"
              value={draft.description}
              onChange={handleChange}
              placeholder="Use one bullet per line for a LaTeX-style project section."
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Tech stack</label>
              <input
                type="text"
                name="techStackText"
                value={draft.techStackText}
                onChange={handleChange}
                placeholder="React, Node.js, Groq API"
              />
            </div>
            <div className="form-group">
              <label>Project link</label>
              <input
                type="url"
                name="link"
                value={draft.link}
                onChange={handleChange}
                placeholder="https://github.com/username/project"
              />
            </div>
          </div>

          <div className="resume-card-actions">
            <button
              type="button"
              className="btn-save"
              onClick={handleSave}
              disabled={loading}
            >
              Save
            </button>
            <button type="button" className="btn-cancel" onClick={resetForm}>
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button type="button" className="btn-add-section" onClick={startCreate}>
          + Add project
        </button>
      )}
    </ResumeSectionCard>
  );
}
