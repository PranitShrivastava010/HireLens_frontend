import React, { useState } from "react";
import ResumeSectionCard from "../ResumeSectionCard";
import "../resumeBuilder.css";

const createEmptyExperience = () => ({
  company: "",
  role: "",
  location: "",
  startDate: "",
  endDate: "",
  isCurrent: false,
  bullets: [""],
});

const mapExperienceToDraft = (experience) => ({
  company: experience.company || "",
  role: experience.role || "",
  location: experience.location || "",
  startDate: experience.startDate?.slice(0, 10) || "",
  endDate: experience.endDate?.slice(0, 10) || "",
  isCurrent: Boolean(experience.isCurrent),
  bullets: experience.bullets?.length ? [...experience.bullets] : [""],
});

export default function ExperienceSection({
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
    setDraft(createEmptyExperience());
  };

  const startEdit = (experience) => {
    setEditingId(experience.id);
    setDraft(mapExperienceToDraft(experience));
  };

  const resetForm = () => {
    setEditingId(null);
    setDraft(null);
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setDraft((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
      ...(name === "isCurrent" && checked ? { endDate: "" } : {}),
    }));
  };

  const handleBulletChange = (index, value) => {
    setDraft((current) => {
      const nextBullets = [...current.bullets];
      nextBullets[index] = value;

      return {
        ...current,
        bullets: nextBullets,
      };
    });
  };

  const addBullet = () => {
    setDraft((current) => ({
      ...current,
      bullets: [...current.bullets, ""],
    }));
  };

  const removeBullet = (index) => {
    setDraft((current) => {
      const nextBullets = current.bullets.filter((_, itemIndex) => itemIndex !== index);
      return {
        ...current,
        bullets: nextBullets.length ? nextBullets : [""],
      };
    });
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
      title="Work Experience"
      icon="EXP"
      count={data.length}
      isExpanded={isExpanded}
      onToggle={onToggle}
      description="Company, role, date range, and impact bullets."
    >
      <div className="section-items">
        {data.map((experience) => (
          <div key={experience.id} className="item-preview">
            <div className="item-header">
              <h4>{experience.company}</h4>
              <span className="company-info">
                {experience.role}
                {experience.location ? ` - ${experience.location}` : ""}
              </span>
            </div>

            <div className="item-actions">
              <button
                type="button"
                className="btn-small btn-edit"
                onClick={() => startEdit(experience)}
              >
                Edit
              </button>
              <button
                type="button"
                className="btn-small btn-delete"
                onClick={() => onDelete(experience.id)}
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
              <label>Company</label>
              <input
                type="text"
                name="company"
                value={draft.company}
                onChange={handleChange}
                placeholder="Techstalwarts"
              />
            </div>
            <div className="form-group">
              <label>Role</label>
              <input
                type="text"
                name="role"
                value={draft.role}
                onChange={handleChange}
                placeholder="Associate Full Stack Developer"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Location</label>
            <input
              type="text"
              name="location"
              value={draft.location}
              onChange={handleChange}
              placeholder="Bhopal, India"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Start date</label>
              <input
                type="date"
                name="startDate"
                value={draft.startDate}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>End date</label>
              <input
                type="date"
                name="endDate"
                value={draft.endDate}
                onChange={handleChange}
                disabled={draft.isCurrent}
              />
            </div>
          </div>

          <label className="checkbox-row">
            <input
              type="checkbox"
              name="isCurrent"
              checked={draft.isCurrent}
              onChange={handleChange}
            />
            <span>I currently work here</span>
          </label>

          <div className="form-group">
            <label>Impact bullets</label>
            {draft.bullets.map((bullet, index) => (
              <div key={`${index}-${bullet}`} className="bullet-input-group">
                <input
                  type="text"
                  value={bullet}
                  onChange={(event) =>
                    handleBulletChange(index, event.target.value)
                  }
                  placeholder="Quantify your contribution or result."
                />
                <button
                  type="button"
                  className="btn-remove-bullet"
                  onClick={() => removeBullet(index)}
                >
                  x
                </button>
              </div>
            ))}
            <button type="button" className="btn-add-bullet" onClick={addBullet}>
              + Add bullet
            </button>
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
          + Add experience
        </button>
      )}
    </ResumeSectionCard>
  );
}
