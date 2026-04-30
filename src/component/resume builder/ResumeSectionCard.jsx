import React from "react";
import CommonCard from "../common/CommonCard";
import "./resumeBuilder.css";

export default function ResumeSectionCard({
  title,
  icon,
  count,
  isExpanded,
  onToggle,
  children,
  description,
}) {
  return (
    <CommonCard
      className={`resume-section-card ${isExpanded ? "expanded" : ""}`}
      width="100%"
      cursor="default"
    >
      <button
        type="button"
        className="resume-card-header-button"
        onClick={onToggle}
      >
        <div className="resume-card-header">
          <div className="resume-card-title">
            <span className="card-icon">{icon}</span>
            <div className="resume-card-title-copy">
              <h3>{title}</h3>
              {description ? <p>{description}</p> : null}
            </div>
            {typeof count === "number" ? (
              <span className="section-count">{count}</span>
            ) : null}
          </div>
          <span className={`expand-arrow ${isExpanded ? "rotated" : ""}`}>
            &gt;
          </span>
        </div>
      </button>

      {isExpanded ? <div className="resume-card-content">{children}</div> : null}
    </CommonCard>
  );
}
