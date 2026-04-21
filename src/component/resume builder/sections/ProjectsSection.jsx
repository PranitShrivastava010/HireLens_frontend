import React, { useState } from "react";
import CommonCard from "../../common/CommonCard";
import "../resumeBuilder.css";

export default function ProjectsSection({ section, isExpanded, onToggle, data, onDataChange }) {
  const [projects, setProjects] = useState(data || []);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(null);

  const handleAddProject = () => {
    const newProject = {
      id: Date.now().toString(),
      name: "",
      description: "",
      techStack: [],
      link: "",
    };
    setFormData(newProject);
    setEditingId(newProject.id);
  };

  const handleEditProject = (project) => {
    setFormData({ ...project });
    setEditingId(project.id);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleTechStackChange = (e) => {
    const value = e.target.value;
    const techStack = value.split(",").map((tech) => tech.trim());
    setFormData({
      ...formData,
      techStack,
    });
  };

  const handleSaveProject = () => {
    const updatedProjects = editingId
      ? projects.map((proj) => (proj.id === editingId ? formData : proj))
      : [...projects, formData];
    setProjects(updatedProjects);
    onDataChange(updatedProjects);
    setEditingId(null);
    setFormData(null);
  };

  const handleDeleteProject = (id) => {
    const updatedProjects = projects.filter((proj) => proj.id !== id);
    setProjects(updatedProjects);
    onDataChange(updatedProjects);
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
          {projects.length > 0 && (
            <span className="section-count">{projects.length}</span>
          )}
        </div>
        <button className={`expand-arrow ${isExpanded ? "rotated" : ""}`}>
          →
        </button>
      </div>

      {isExpanded && (
        <div className="resume-card-content">
          {/* List of existing projects */}
          <div className="section-items">
            {projects.map((project) => (
              <div key={project.id} className="item-preview">
                <div className="item-header">
                  <h4>{project.name}</h4>
                </div>
                <div className="item-actions">
                  <button
                    className="btn-small btn-edit"
                    onClick={() => handleEditProject(project)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn-small btn-delete"
                    onClick={() => handleDeleteProject(project.id)}
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
              <div className="form-group">
                <label>Project Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="AI Job Tracker Platform"
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Brief description of your project..."
                  className="resume-textarea"
                />
              </div>

              <div className="form-group">
                <label>Tech Stack (comma separated)</label>
                <input
                  type="text"
                  value={formData.techStack?.join(", ") || ""}
                  onChange={handleTechStackChange}
                  placeholder="React, Node.js, MongoDB, AWS"
                />
              </div>

              <div className="form-group">
                <label>Project Link</label>
                <input
                  type="url"
                  name="link"
                  value={formData.link}
                  onChange={handleInputChange}
                  placeholder="https://github.com/username/project"
                />
              </div>

              <div className="resume-card-actions">
                <button className="btn-save" onClick={handleSaveProject}>
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
            <button className="btn-add-section" onClick={handleAddProject}>
              + Add Project
            </button>
          )}
        </div>
      )}
    </CommonCard>
  );
}
