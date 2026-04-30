import React, { useEffect, useState } from "react";
import ResumeSectionCard from "../ResumeSectionCard";
import "../resumeBuilder.css";

const createInitialState = (data, customLinks) => ({
  fullName: data?.fullName || "",
  headline: data?.headline || "",
  summary: data?.summary || "",
  email: data?.email || "",
  phone: data?.phone || "",
  location: data?.location || "",
  linkedin: data?.linkedin || "",
  github: data?.github || "",
  customLinks:
    customLinks?.map((link, index) => ({
      id: link.id || `custom-link-${index + 1}`,
      label: link.label || "",
      url: link.url || "",
    })) || [],
});

export default function BasicsCard({
  isExpanded,
  onToggle,
  data,
  customLinks,
  onSave,
  loading,
}) {
  const [formState, setFormState] = useState(
    createInitialState(data, customLinks)
  );

  useEffect(() => {
    setFormState(createInitialState(data, customLinks));
  }, [customLinks, data]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleCustomLinkChange = (index, field, value) => {
    setFormState((current) => {
      const nextLinks = [...current.customLinks];
      nextLinks[index] = {
        ...nextLinks[index],
        [field]: value,
      };

      return {
        ...current,
        customLinks: nextLinks,
      };
    });
  };

  const handleAddCustomLink = () => {
    setFormState((current) => ({
      ...current,
      customLinks: [
        ...current.customLinks,
        {
          id: `custom-link-${Date.now()}`,
          label: "",
          url: "",
        },
      ],
    }));
  };

  const handleRemoveCustomLink = (index) => {
    setFormState((current) => ({
      ...current,
      customLinks: current.customLinks.filter((_, itemIndex) => itemIndex !== index),
    }));
  };

  const handleSave = async () => {
    await onSave(formState);
    onToggle();
  };

  const handleCancel = () => {
    setFormState(createInitialState(data, customLinks));
    onToggle();
  };

  return (
    <ResumeSectionCard
      title="Header & Summary"
      icon="ID"
      isExpanded={isExpanded}
      onToggle={onToggle}
      description="Contact details, summary, and clickable custom links."
    >
      <div className="form-group">
        <label>Full name</label>
        <input
          type="text"
          name="fullName"
          value={formState.fullName}
          onChange={handleInputChange}
          placeholder="Pranit Shrivastava"
        />
      </div>

      <div className="form-group">
        <label>Headline</label>
        <input
          type="text"
          name="headline"
          value={formState.headline}
          onChange={handleInputChange}
          placeholder="Full Stack Developer"
        />
      </div>

      <div className="form-group">
        <label>Summary</label>
        <textarea
          className="resume-textarea"
          name="summary"
          value={formState.summary}
          onChange={handleInputChange}
          placeholder="Concise overview focused on roles, systems, and measurable impact."
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formState.email}
            onChange={handleInputChange}
            placeholder="name@example.com"
          />
        </div>
        <div className="form-group">
          <label>Phone</label>
          <input
            type="tel"
            name="phone"
            value={formState.phone}
            onChange={handleInputChange}
            placeholder="+91 98765 43210"
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Location</label>
          <input
            type="text"
            name="location"
            value={formState.location}
            onChange={handleInputChange}
            placeholder="Bhopal, Madhya Pradesh"
          />
        </div>
        <div className="form-group">
          <label>LinkedIn</label>
          <input
            type="url"
            name="linkedin"
            value={formState.linkedin}
            onChange={handleInputChange}
            placeholder="https://linkedin.com/in/your-handle"
          />
        </div>
      </div>

      <div className="form-group">
        <label>GitHub</label>
        <input
          type="url"
          name="github"
          value={formState.github}
          onChange={handleInputChange}
          placeholder="https://github.com/your-handle"
        />
      </div>

      <div className="form-group">
        <label>Custom clickable links</label>
        <div className="inline-note">
          Add any label you want. The label becomes the clickable text in the
          preview and PDF.
        </div>
      </div>

      {formState.customLinks.map((link, index) => (
        <div key={link.id} className="link-item">
          <div className="form-row">
            <div className="form-group">
              <label>Label</label>
              <input
                type="text"
                value={link.label}
                onChange={(event) =>
                  handleCustomLinkChange(index, "label", event.target.value)
                }
                placeholder="Portfolio"
              />
            </div>
            <div className="form-group">
              <label>URL</label>
              <input
                type="url"
                value={link.url}
                onChange={(event) =>
                  handleCustomLinkChange(index, "url", event.target.value)
                }
                placeholder="https://your-site.com"
              />
            </div>
          </div>
          <button
            type="button"
            className="btn-remove-bullet"
            onClick={() => handleRemoveCustomLink(index)}
          >
            x
          </button>
        </div>
      ))}

      <button type="button" className="btn-add-bullet" onClick={handleAddCustomLink}>
        + Add custom link
      </button>

      <div className="resume-card-actions">
        <button
          type="button"
          className="btn-save"
          onClick={handleSave}
          disabled={loading}
        >
          Save
        </button>
        <button type="button" className="btn-cancel" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </ResumeSectionCard>
  );
}
