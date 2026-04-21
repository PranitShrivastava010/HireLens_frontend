import React, { useState } from "react";
import CommonCard from "../../common/CommonCard";
import "../resumeBuilder.css";

export default function SkillsSection({ section, isExpanded, onToggle, data, onDataChange }) {
  const [skills, setSkills] = useState(data || []);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(null);

  const skillLevels = ["Beginner", "Intermediate", "Advanced", "Expert"];

  const handleAddSkill = () => {
    const newSkill = {
      id: Date.now().toString(),
      name: "",
      level: "Intermediate",
      category: "",
    };
    setFormData(newSkill);
    setEditingId(newSkill.id);
  };

  const handleEditSkill = (skill) => {
    setFormData({ ...skill });
    setEditingId(skill.id);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSaveSkill = () => {
    const updatedSkills = editingId
      ? skills.map((skill) => (skill.id === editingId ? formData : skill))
      : [...skills, formData];
    setSkills(updatedSkills);
    onDataChange(updatedSkills);
    setEditingId(null);
    setFormData(null);
  };

  const handleDeleteSkill = (id) => {
    const updatedSkills = skills.filter((skill) => skill.id !== id);
    setSkills(updatedSkills);
    onDataChange(updatedSkills);
  };

  // Group skills by category
  const skillsByCategory = skills.reduce((acc, skill) => {
    const category = skill.category || "Other";
    if (!acc[category]) acc[category] = [];
    acc[category].push(skill);
    return acc;
  }, {});

  return (
    <CommonCard
      className={`resume-section-card ${isExpanded ? "expanded" : ""}`}
      onClick={onToggle}
    >
      <div className="resume-card-header">
        <div className="resume-card-title">
          <span className="card-icon">{section.icon}</span>
          <h3>{section.title}</h3>
          {skills.length > 0 && (
            <span className="section-count">{skills.length}</span>
          )}
        </div>
        <button className={`expand-arrow ${isExpanded ? "rotated" : ""}`}>
          →
        </button>
      </div>

      {isExpanded && (
        <div className="resume-card-content">
          {/* List of existing skills by category */}
          <div className="section-items">
            {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
              <div key={category} className="skill-category">
                <h5 className="category-title">{category}</h5>
                {categorySkills.map((skill) => (
                  <div key={skill.id} className="skill-item">
                    <div className="skill-info">
                      <span className="skill-name">{skill.name}</span>
                      <span className="skill-level">{skill.level}</span>
                    </div>
                    <div className="item-actions">
                      <button
                        className="btn-small btn-edit"
                        onClick={() => handleEditSkill(skill)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn-small btn-delete"
                        onClick={() => handleDeleteSkill(skill.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Edit/Add form */}
          {editingId && formData && (
            <div className="form-container">
              <div className="form-row">
                <div className="form-group">
                  <label>Skill Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="React.js"
                  />
                </div>
                <div className="form-group">
                  <label>Category</label>
                  <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    placeholder="Frontend, Backend, etc."
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Proficiency Level</label>
                <select
                  name="level"
                  value={formData.level}
                  onChange={handleInputChange}
                >
                  {skillLevels.map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
              </div>

              <div className="resume-card-actions">
                <button className="btn-save" onClick={handleSaveSkill}>
                  Save
                </button>
                <button
                  className="btn-cancel"
                  onClick={() => {
                    setEditingId(null);
                    setFormData(null);
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Add new button */}
          {!editingId && (
            <button className="btn-add-section" onClick={handleAddSkill}>
              + Add Skill
            </button>
          )}
        </div>
      )}
    </CommonCard>
  );
}
