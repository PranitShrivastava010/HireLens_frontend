import React, { useMemo, useState } from "react";
import ResumeSectionCard from "../ResumeSectionCard";
import "../resumeBuilder.css";

const skillLevels = ["Beginner", "Intermediate", "Expert"];

const createEmptySkill = () => ({
  name: "",
  category: "",
  level: "Intermediate",
});

export default function SkillsSection({
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

  const groupedSkills = useMemo(
    () =>
      data.reduce((accumulator, skill) => {
        const category = skill.category || "Other";
        if (!accumulator[category]) {
          accumulator[category] = [];
        }

        accumulator[category].push(skill);
        return accumulator;
      }, {}),
    [data]
  );

  const startCreate = () => {
    setEditingId(null);
    setDraft(createEmptySkill());
  };

  const startEdit = (skill) => {
    setEditingId(skill.id);
    setDraft({
      name: skill.name || "",
      category: skill.category || "",
      level: skill.level || "Intermediate",
    });
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
      title="Skills"
      icon="SKL"
      count={data.length}
      isExpanded={isExpanded}
      onToggle={onToggle}
      description="Categorised skills rendered as ATS-friendly text rows."
    >
      <div className="section-items">
        {Object.entries(groupedSkills).map(([category, skills]) => (
          <div key={category} className="skill-category">
            <h5 className="category-title">{category}</h5>
            {skills.map((skill) => (
              <div key={skill.id} className="skill-item">
                <div className="skill-info">
                  <span className="skill-name">{skill.name}</span>
                  <span className="skill-level">{skill.level || "Expert"}</span>
                </div>

                <div className="item-actions">
                  <button
                    type="button"
                    className="btn-small btn-edit"
                    onClick={() => startEdit(skill)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="btn-small btn-delete"
                    onClick={() => onDelete(skill.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {draft ? (
        <div className="form-container">
          <div className="form-row">
            <div className="form-group">
              <label>Skill name</label>
              <input
                type="text"
                name="name"
                value={draft.name}
                onChange={handleChange}
                placeholder="TypeScript"
              />
            </div>
            <div className="form-group">
              <label>Category</label>
              <input
                type="text"
                name="category"
                value={draft.category}
                onChange={handleChange}
                placeholder="Languages"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Level</label>
            <select name="level" value={draft.level} onChange={handleChange}>
              {skillLevels.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
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
          + Add skill
        </button>
      )}
    </ResumeSectionCard>
  );
}
