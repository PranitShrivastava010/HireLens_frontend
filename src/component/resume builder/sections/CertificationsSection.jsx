import React, { useState } from "react";
import CommonCard from "../../common/CommonCard";
import "../resumeBuilder.css";

export default function CertificationsSection({ section, isExpanded, onToggle, data, onDataChange }) {
  const [certifications, setCertifications] = useState(data || []);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(null);

  const handleAddCertification = () => {
    const newCert = {
      id: Date.now().toString(),
      name: "",
      issuer: "",
      year: new Date().getFullYear(),
      link: "",
    };
    setFormData(newCert);
    setEditingId(newCert.id);
  };

  const handleEditCertification = (cert) => {
    setFormData({ ...cert });
    setEditingId(cert.id);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "year" ? (value ? parseInt(value) : null) : value,
    });
  };

  const handleSaveCertification = () => {
    const updatedCerts = editingId
      ? certifications.map((cert) => (cert.id === editingId ? formData : cert))
      : [...certifications, formData];
    setCertifications(updatedCerts);
    onDataChange(updatedCerts);
    setEditingId(null);
    setFormData(null);
  };

  const handleDeleteCertification = (id) => {
    const updatedCerts = certifications.filter((cert) => cert.id !== id);
    setCertifications(updatedCerts);
    onDataChange(updatedCerts);
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
          {certifications.length > 0 && (
            <span className="section-count">{certifications.length}</span>
          )}
        </div>
        <button className={`expand-arrow ${isExpanded ? "rotated" : ""}`}>
          →
        </button>
      </div>

      {isExpanded && (
        <div className="resume-card-content">
          {/* List of existing certifications */}
          <div className="section-items">
            {certifications.map((cert) => (
              <div key={cert.id} className="item-preview">
                <div className="item-header">
                  <h4>{cert.name}</h4>
                  <span className="company-info">{cert.issuer}</span>
                </div>
                <div className="item-actions">
                  <button
                    className="btn-small btn-edit"
                    onClick={() => handleEditCertification(cert)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn-small btn-delete"
                    onClick={() => handleDeleteCertification(cert.id)}
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
                <label>Certification Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="AWS Certified Solutions Architect"
                />
              </div>

              <div className="form-group">
                <label>Issuing Organization</label>
                <input
                  type="text"
                  name="issuer"
                  value={formData.issuer}
                  onChange={handleInputChange}
                  placeholder="Amazon Web Services"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Year Obtained</label>
                  <input
                    type="number"
                    name="year"
                    value={formData.year || ""}
                    onChange={handleInputChange}
                    placeholder="2023"
                    min="1950"
                    max={new Date().getFullYear()}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Certification Link (Optional)</label>
                <input
                  type="url"
                  name="link"
                  value={formData.link}
                  onChange={handleInputChange}
                  placeholder="https://certificate-url.com"
                />
              </div>

              <div className="resume-card-actions">
                <button className="btn-save" onClick={handleSaveCertification}>
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
            <button className="btn-add-section" onClick={handleAddCertification}>
              + Add Certification
            </button>
          )}
        </div>
      )}
    </CommonCard>
  );
}
