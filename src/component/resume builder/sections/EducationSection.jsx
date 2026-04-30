import React, { useState } from "react";
import ResumeSectionCard from "../ResumeSectionCard";
import "../resumeBuilder.css";

const createEmptyEducation = () => ({
  institute: "",
  degree: "",
  field: "",
  startYear: "",
  endYear: "",
});

const mapEducationToDraft = (education) => ({
  institute: education.institute || "",
  degree: education.degree || "",
  field: education.field || "",
  startYear: education.startYear || "",
  endYear: education.endYear || "",
});

export default function EducationSection({
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
    setDraft(createEmptyEducation());
  };

  const startEdit = (education) => {
    setEditingId(education.id);
    setDraft(mapEducationToDraft(education));
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
      title="Education"
      icon="EDU"
      count={data.length}
      isExpanded={isExpanded}
      onToggle={onToggle}
      description="Degrees, school names, and graduation years."
    >
      <div className="section-items">
        {data.map((education) => (
          <div key={education.id} className="item-preview">
            <div className="item-header">
              <h4>{education.institute}</h4>
              <span className="company-info">
                {education.degree}
                {education.field ? ` - ${education.field}` : ""}
              </span>
            </div>

            <div className="item-actions">
              <button
                type="button"
                className="btn-small btn-edit"
                onClick={() => startEdit(education)}
              >
                Edit
              </button>
              <button
                type="button"
                className="btn-small btn-delete"
                onClick={() => onDelete(education.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {draft ? (
        <div className="form-container">
          <div className="form-group">
            <label>Institution</label>
            <input
              type="text"
              name="institute"
              value={draft.institute}
              onChange={handleChange}
              placeholder="Oriental College of Technology"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Degree</label>
              <input
                type="text"
                name="degree"
                value={draft.degree}
                onChange={handleChange}
                placeholder="Bachelor of Technology"
              />
            </div>
            <div className="form-group">
              <label>Field</label>
              <input
                type="text"
                name="field"
                value={draft.field}
                onChange={handleChange}
                placeholder="Information Technology | GPA: 7.0/10"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Start year</label>
              <input
                type="number"
                name="startYear"
                value={draft.startYear}
                onChange={handleChange}
                placeholder="2021"
              />
            </div>
            <div className="form-group">
              <label>End year</label>
              <input
                type="number"
                name="endYear"
                value={draft.endYear}
                onChange={handleChange}
                placeholder="2025"
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
          + Add education
        </button>
      )}
    </ResumeSectionCard>
  );
}
