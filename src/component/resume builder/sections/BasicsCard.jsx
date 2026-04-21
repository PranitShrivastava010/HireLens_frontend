import React, { useState } from "react";
import CommonCard from "../../common/CommonCard";
import "../resumeBuilder.css";

export default function BasicsCard({ section, isExpanded, onToggle, data, onDataChange }) {
  const [formData, setFormData] = useState(data || {
    fullName: "",
    headline: "",
    summary: "",
    contact: {
      email: "",
      phone: "",
      location: "",
      links: [],
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("contact.")) {
      const contactField = name.split(".")[1];
      if (contactField === "email" || contactField === "phone" || contactField === "location") {
        setFormData({
          ...formData,
          contact: {
            ...formData.contact,
            [contactField]: value,
          },
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleLinkChange = (index, field, value) => {
    const newLinks = [...(formData.contact?.links || [])];
    if (!newLinks[index]) {
      newLinks[index] = { label: "", url: "" };
    }
    newLinks[index][field] = value;
    setFormData({
      ...formData,
      contact: {
        ...formData.contact,
        links: newLinks,
      },
    });
  };

  const handleAddLink = () => {
    setFormData({
      ...formData,
      contact: {
        ...formData.contact,
        links: [...(formData.contact?.links || []), { label: "", url: "" }],
      },
    });
  };

  const handleRemoveLink = (index) => {
    const newLinks = formData.contact?.links?.filter((_, i) => i !== index) || [];
    setFormData({
      ...formData,
      contact: {
        ...formData.contact,
        links: newLinks,
      },
    });
  };

  const handleSave = () => {
    onDataChange(formData);
    onToggle();
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
        </div>
        <button className={`expand-arrow ${isExpanded ? "rotated" : ""}`}>
          →
        </button>
      </div>

      {isExpanded && (
        <div className="resume-card-content">
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName || ""}
              onChange={handleInputChange}
              placeholder="John Doe"
            />
          </div>

          <div className="form-group">
            <label>Professional Headline</label>
            <input
              type="text"
              name="headline"
              value={formData.headline || ""}
              onChange={handleInputChange}
              placeholder="Senior Full Stack Developer"
            />
          </div>

          <div className="form-group">
            <label>Professional Summary</label>
            <textarea
              name="summary"
              value={formData.summary || ""}
              onChange={handleInputChange}
              placeholder="Brief overview of your professional background and goals..."
              className="resume-textarea"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="contact.email"
                value={formData.contact?.email || ""}
                onChange={handleInputChange}
                placeholder="john@example.com"
              />
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input
                type="tel"
                name="contact.phone"
                value={formData.contact?.phone || ""}
                onChange={handleInputChange}
                placeholder="+1 (555) 123-4567"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Location</label>
            <input
              type="text"
              name="contact.location"
              value={formData.contact?.location || ""}
              onChange={handleInputChange}
              placeholder="San Francisco, CA"
            />
          </div>

          <div className="form-group">
            <label>LinkedIn Profile URL</label>
            <input
              type="url"
              value={formData.contact?.links?.find(l => l.label === "linkedin")?.url || ""}
              onChange={(e) =>
                handleLinkChange(
                  formData.contact?.links?.findIndex(l => l.label === "linkedin") ?? -1,
                  "url",
                  e.target.value
                )
              }
              placeholder="https://linkedin.com/in/johndoe"
            />
          </div>

          <div className="form-group">
            <label>GitHub Profile URL</label>
            <input
              type="url"
              value={formData.contact?.links?.find(l => l.label === "github")?.url || ""}
              onChange={(e) =>
                handleLinkChange(
                  formData.contact?.links?.findIndex(l => l.label === "github") ?? -1,
                  "url",
                  e.target.value
                )
              }
              placeholder="https://github.com/johndoe"
            />
          </div>

          {/* Additional Links */}
          {formData.contact?.links?.map((link, idx) => {
            if (link.label !== "linkedin" && link.label !== "github") {
              return (
                <div key={idx} className="link-item">
                  <div className="form-row">
                    <div className="form-group">
                      <label>Link Label</label>
                      <input
                        type="text"
                        value={link.label}
                        onChange={(e) => handleLinkChange(idx, "label", e.target.value)}
                        placeholder="e.g., Portfolio, Website"
                      />
                    </div>
                    <div className="form-group">
                      <label>Link URL</label>
                      <input
                        type="url"
                        value={link.url}
                        onChange={(e) => handleLinkChange(idx, "url", e.target.value)}
                        placeholder="https://example.com"
                      />
                    </div>
                  </div>
                  <button
                    className="btn-remove-bullet"
                    onClick={() => handleRemoveLink(idx)}
                  >
                    ✕
                  </button>
                </div>
              );
            }
            return null;
          })}

          <button className="btn-add-bullet" onClick={handleAddLink}>
            + Add Additional Link
          </button>

          <div className="resume-card-actions">
            <button className="btn-save" onClick={handleSave}>
              Save
            </button>
            <button className="btn-cancel" onClick={onToggle}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </CommonCard>
  );
}
