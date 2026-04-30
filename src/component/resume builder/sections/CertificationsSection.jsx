import React, { useState } from "react";
import ResumeSectionCard from "../ResumeSectionCard";
import "../resumeBuilder.css";

const createEmptyCertification = () => ({
  name: "",
  issuer: "",
  year: "",
  link: "",
});

const mapCertificationToDraft = (certification) => ({
  name: certification.name || "",
  issuer: certification.issuer || "",
  year: certification.year || "",
  link: certification.link || "",
});

export default function CertificationsSection({
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
    setDraft(createEmptyCertification());
  };

  const startEdit = (certification) => {
    setEditingId(certification.id);
    setDraft(mapCertificationToDraft(certification));
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

    if (editingId) {
      await onUpdate(editingId, draft);
    } else {
      await onCreate(draft);
    }

    resetForm();
  };

  return (
    <ResumeSectionCard
      title="Certifications"
      icon="CRT"
      count={data.length}
      isExpanded={isExpanded}
      onToggle={onToggle}
      description="Optional certifications with year and clickable proof URL."
    >
      <div className="section-items">
        {data.map((certification) => (
          <div key={certification.id} className="item-preview">
            <div className="item-header">
              <h4>{certification.name}</h4>
              <span className="company-info">
                {certification.issuer}
                {certification.year ? ` - ${certification.year}` : ""}
              </span>
            </div>

            <div className="item-actions">
              <button
                type="button"
                className="btn-small btn-edit"
                onClick={() => startEdit(certification)}
              >
                Edit
              </button>
              <button
                type="button"
                className="btn-small btn-delete"
                onClick={() => onDelete(certification.id)}
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
              <label>Certification name</label>
              <input
                type="text"
                name="name"
                value={draft.name}
                onChange={handleChange}
                placeholder="AWS Certified Developer"
              />
            </div>
            <div className="form-group">
              <label>Issuer</label>
              <input
                type="text"
                name="issuer"
                value={draft.issuer}
                onChange={handleChange}
                placeholder="Amazon Web Services"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Year</label>
              <input
                type="number"
                name="year"
                value={draft.year}
                onChange={handleChange}
                placeholder="2026"
              />
            </div>
            <div className="form-group">
              <label>Proof URL</label>
              <input
                type="url"
                name="link"
                value={draft.link}
                onChange={handleChange}
                placeholder="https://credentials.example.com"
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
          + Add certification
        </button>
      )}
    </ResumeSectionCard>
  );
}
