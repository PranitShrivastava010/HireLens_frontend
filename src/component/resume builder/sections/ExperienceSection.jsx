import React, { useState } from "react";
import CommonCard from "../../common/CommonCard";
import "../resumeBuilder.css";

export default function ExperienceSection({ section, isExpanded, onToggle, data, onDataChange }) {
  const [experiences, setExperiences] = useState(data || []);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(null);

  const handleAddExperience = () => {
    const newExperience = {
      id: Date.now().toString(),
      company: "",
      role: "",
      location: "",
      duration: "",
      startDate: "",
      endDate: null,
      isCurrent: false,
      bullets: [],
      orderIndex: experiences.length,
    };
    setFormData(newExperience);
    setEditingId(newExperience.id);
  };

  const handleEditExperience = (experience) => {
    setFormData({ ...experience });
    setEditingId(experience.id);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleBulletChange = (index, value) => {
    const newBullets = [...(formData.bullets || [])];
    newBullets[index] = value;
    setFormData({
      ...formData,
      bullets: newBullets,
    });
  };

  const handleAddBullet = () => {
    setFormData({
      ...formData,
      bullets: [...(formData.bullets || []), ""],
    });
  };

  const handleRemoveBullet = (index) => {
    const newBullets = formData.bullets.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      bullets: newBullets,
    });
  };

  const handleSaveExperience = () => {
    const updatedExperiences = editingId
      ? experiences.map((exp) => (exp.id === editingId ? formData : exp))
      : [...experiences, formData];
    setExperiences(updatedExperiences);
    onDataChange(updatedExperiences);
    setEditingId(null);
    setFormData(null);
  };

  const handleDeleteExperience = (id) => {
    const updatedExperiences = experiences.filter((exp) => exp.id !== id);
    setExperiences(updatedExperiences);
    onDataChange(updatedExperiences);
  };

  return (
    <CommonCard
      className={`resume-section-card ${isExpanded ? "expanded" : ""}`}
      onClick={onToggle}
    >
      <div className="resume-card-header">
        <div className="resume-card-title">
          <span className="card-icon">{section.icon}</span>
          <h3>{section.title}</h3>
          {experiences.length > 0 && (
            <span className="section-count">{experiences.length}</span>
          )}
        </div>
        <button className={`expand-arrow ${isExpanded ? "rotated" : ""}`}>
          →
        </button>
      </div>

      {isExpanded && (
        <div className="resume-card-content">
          {/* List of existing experiences */}
          <div className="section-items">
            {experiences.map((experience) => (
              <div key={experience.id} className="item-preview">
                <div className="item-header">
                  <h4>{experience.role}</h4>
                  <span className="company-info">{experience.company}</span>
                </div>
                <div className="item-actions">
                  <button
                    className="btn-small btn-edit"
                    onClick={() => handleEditExperience(experience)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn-small btn-delete"
                    onClick={() => handleDeleteExperience(experience.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Edit/Add form */}
          {editingId && formData && (
            <div className="form-container">
              <div className="form-row">
                <div className="form-group">
                  <label>Job Title</label>
                  <input
                    type="text"
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    placeholder="Senior Developer"
                  />
                </div>
                <div className="form-group">
                  <label>Company</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="Tech Company Inc."
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="San Francisco, CA"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Start Date</label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>End Date</label>
                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate || ""}
                    onChange={handleInputChange}
                    disabled={formData.isCurrent}
                  />
                </div>
              </div>

              <div className="form-group checkbox">
                <input
                  type="checkbox"
                  name="isCurrent"
                  checked={formData.isCurrent}
                  onChange={handleInputChange}
                  id="isCurrent"
                />
                <label htmlFor="isCurrent">I currently work here</label>
              </div>

              <div className="form-group">
                <label>Key Achievements</label>
                {formData.bullets?.map((bullet, index) => (
                  <div key={index} className="bullet-input-group">
                    <input
                      type="text"
                      value={bullet}
                      onChange={(e) => handleBulletChange(index, e.target.value)}
                      placeholder="Add a bullet point..."
                    />
                    <button
                      className="btn-remove-bullet"
                      onClick={() => handleRemoveBullet(index)}
                    >
                      ✕
                    </button>
                  </div>
                ))}
                <button
                  className="btn-add-bullet"
                  onClick={handleAddBullet}
                >
                  + Add Bullet Point
                </button>
              </div>

              <div className="resume-card-actions">
                <button className="btn-save" onClick={handleSaveExperience}>
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
            <button className="btn-add-section" onClick={handleAddExperience}>
              + Add Experience
            </button>
          )}
        </div>
      )}
    </CommonCard>
  );
}
