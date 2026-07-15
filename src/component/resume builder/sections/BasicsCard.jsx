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

// Returns an error string if the URL is non-empty but missing protocol.
const getUrlError = (value) => {
  if (!value || value.trim() === "") return "";
  const trimmed = value.trim();
  if (!trimmed.startsWith("http://") && !trimmed.startsWith("https://")) {
    return 'Add "https://" at the start — e.g. https://linkedin.com/in/you';
  }
  return "";
};

// Prepend https:// to bare URLs before sending to the backend validator.
const normalizeUrl = (value) => {
  if (!value || value.trim() === "") return "";
  const trimmed = value.trim();
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) return trimmed;
  return `https://${trimmed}`;
};

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
  const [urlErrors, setUrlErrors] = useState({ linkedin: "", github: "" });

  useEffect(() => {
    setFormState(createInitialState(data, customLinks));
    setUrlErrors({ linkedin: "", github: "" });
  }, [customLinks, data]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState((current) => ({ ...current, [name]: value }));
    // Clear error while the user is actively typing
    if (name === "linkedin" || name === "github") {
      setUrlErrors((current) => ({ ...current, [name]: "" }));
    }
  };

  // Validate URL fields on blur so user sees error after leaving the field
  const handleUrlBlur = (event) => {
    const { name, value } = event.target;
    setUrlErrors((current) => ({ ...current, [name]: getUrlError(value) }));
  };

  const handleCustomLinkChange = (index, field, value) => {
    setFormState((current) => {
      const nextLinks = [...current.customLinks];
      nextLinks[index] = { ...nextLinks[index], [field]: value };
      return { ...current, customLinks: nextLinks };
    });
  };

  const handleAddCustomLink = () => {
    setFormState((current) => ({
      ...current,
      customLinks: [
        ...current.customLinks,
        { id: `custom-link-${Date.now()}`, label: "", url: "" },
      ],
    }));
  };

  const handleRemoveCustomLink = (index) => {
    setFormState((current) => ({
      ...current,
      customLinks: current.customLinks.filter((_, i) => i !== index),
    }));
  };

  const handleSave = async () => {
    // Final validation — block save if URLs are malformed
    const linkedinError = getUrlError(formState.linkedin);
    const githubError = getUrlError(formState.github);
    if (linkedinError || githubError) {
      setUrlErrors({ linkedin: linkedinError, github: githubError });
      return;
    }

    // Normalize bare URLs before sending to backend (e.g. "linkedin.com/..." → "https://...")
    const normalizedState = {
      ...formState,
      linkedin: normalizeUrl(formState.linkedin),
      github: normalizeUrl(formState.github),
    };

    await onSave(normalizedState);
    onToggle();
  };

  const handleCancel = () => {
    setFormState(createInitialState(data, customLinks));
    setUrlErrors({ linkedin: "", github: "" });
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
          <label>
            LinkedIn
            {urlErrors.linkedin && (
              <span className="url-field-error">{urlErrors.linkedin}</span>
            )}
          </label>
          <input
            type="text"
            name="linkedin"
            value={formState.linkedin}
            onChange={handleInputChange}
            onBlur={handleUrlBlur}
            placeholder="https://linkedin.com/in/your-handle"
            style={urlErrors.linkedin ? { borderColor: "rgba(255,100,100,0.7)" } : {}}
          />
        </div>
      </div>

      <div className="form-group">
        <label>
          GitHub
          {urlErrors.github && (
            <span className="url-field-error">{urlErrors.github}</span>
          )}
        </label>
        <input
          type="text"
          name="github"
          value={formState.github}
          onChange={handleInputChange}
          onBlur={handleUrlBlur}
          placeholder="https://github.com/your-handle"
          style={urlErrors.github ? { borderColor: "rgba(255,100,100,0.7)" } : {}}
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
                type="text"
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
