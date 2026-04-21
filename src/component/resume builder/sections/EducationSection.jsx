import React, { useState } from "react";
import CommonCard from "../../common/CommonCard";
import "../resumeBuilder.css";

export default function EducationSection({ section, isExpanded, onToggle, data, onDataChange }) {
  const [educations, setEducations] = useState(data || []);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(null);

  const handleAddEducation = () => {
    const newEducation = {
      id: Date.now().toString(),
      institute: "",
      degree: "",
      field: "",
      duration: "",
      startYear: "",
      endYear: "",
    };
    setFormData(newEducation);
    setEditingId(newEducation.id);
  };

  const handleEditEducation = (education) => {
    setFormData({ ...education });
    setEditingId(education.id);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name.includes("Year") ? (value ? parseInt(value) : "") : value,
    });
  };

  const handleSaveEducation = () => {
    const updatedEducations = editingId
      ? educations.map((edu) => (edu.id === editingId ? formData : edu))
      : [...educations, formData];
    setEducations(updatedEducations);
    onDataChange(updatedEducations);
    setEditingId(null);
    setFormData(null);
  };

  const handleDeleteEducation = (id) => {
    const updatedEducations = educations.filter((edu) => edu.id !== id);
    setEducations(updatedEducations);
    onDataChange(updatedEducations);
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
          {educations.length > 0 && (
            <span className="section-count">{educations.length}</span>
          )}
        </div>
        <button className={`expand-arrow ${isExpanded ? "rotated" : ""}`}>
          →
        </button>
      </div>

      {isExpanded && (
        <div className="resume-card-content">
          {/* List of existing educations */}
          <div className="section-items">
            {educations.map((education) => (
              <div key={education.id} className="item-preview">
                <div className="item-header">
                  <h4>{education.degree}</h4>
                  <span className="company-info">{education.institute}</span>
                </div>
                <div className="item-actions">
                  <button
                    className="btn-small btn-edit"
                    onClick={() => handleEditEducation(education)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn-small btn-delete"
                    onClick={() => handleDeleteEducation(education.id)}
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
                  <label>Institution</label>
                  <input
                    type="text"
                    name="institute"
                    value={formData.institute}
                    onChange={handleInputChange}
                    placeholder="University Name"
                  />
                </div>
                <div className="form-group">
                  <label>Degree</label>
                  <input
                    type="text"
                    name="degree"
                    value={formData.degree}
                    onChange={handleInputChange}
                    placeholder="Bachelor of Science"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Field of Study</label>
                <input
                  type="text"
                  name="field"
                  value={formData.field}
                  onChange={handleInputChange}
                  placeholder="Computer Science"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Start Year</label>
                  <input
                    type="number"
                    name="startYear"
                    value={formData.startYear}
                    onChange={handleInputChange}
                    placeholder="2018"
                    min="1950"
                    max={new Date().getFullYear()}
                  />
                </div>
                <div className="form-group">
                  <label>End Year</label>
                  <input
                    type="number"
                    name="endYear"
                    value={formData.endYear || ""}
                    onChange={handleInputChange}
                    placeholder="2022"
                    min="1950"
                    max={new Date().getFullYear() + 5}
                  />
                </div>
              </div>

              <div className="resume-card-actions">
                <button className="btn-save" onClick={handleSaveEducation}>
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
            <button className="btn-add-section" onClick={handleAddEducation}>
              + Add Education
            </button>
          )}
        </div>
      )}
    </CommonCard>
  );
}
