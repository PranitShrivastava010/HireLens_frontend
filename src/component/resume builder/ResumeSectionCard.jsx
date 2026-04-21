import React from "react";
import CommonCard from "../common/CommonCard";
import "./resumeBuilder.css";

export default function ResumeSectionCard({ section, isExpanded, onToggle }) {
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
          <textarea
            placeholder={`Enter your ${section.title.toLowerCase()}...`}
            className="resume-textarea"
          />
          <div className="resume-card-actions">
            <button className="btn-save">Save</button>
            <button className="btn-cancel">Cancel</button>
          </div>
        </div>
      )}
    </CommonCard>
  );
}
