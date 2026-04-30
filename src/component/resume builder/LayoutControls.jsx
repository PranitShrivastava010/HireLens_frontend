import React from "react";
import ResumeSectionCard from "./ResumeSectionCard";
import {
  DEFAULT_SECTION_VISIBILITY,
  DENSITY_PRESETS,
  PAGE_MODE_OPTIONS,
} from "./resumeBuilderUtils";

const sectionLabels = {
  summary: "Summary",
  experience: "Experience",
  projects: "Projects",
  skills: "Skills",
  education: "Education",
  certifications: "Certifications",
};

export default function LayoutControls({
  isExpanded,
  onToggle,
  settings,
  onDensityChange,
  onSettingChange,
  onReset,
  sectionVisibility = DEFAULT_SECTION_VISIBILITY,
  onSectionVisibilityChange,
}) {
  return (
    <ResumeSectionCard
      title="Layout Controls"
      icon="A4"
      isExpanded={isExpanded}
      onToggle={onToggle}
      description="Tune spacing, margins, and page count live."
    >
      <div className="form-row">
        <div className="form-group">
          <label>Page goal</label>
          <select
            value={settings.pageMode}
            onChange={(event) =>
              onSettingChange("pageMode", event.target.value)
            }
          >
            {PAGE_MODE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Density</label>
          <select
            value={settings.density}
            onChange={(event) => onDensityChange(event.target.value)}
          >
            {Object.keys(DENSITY_PRESETS).map((presetName) => (
              <option key={presetName} value={presetName}>
                {presetName[0].toUpperCase()}
                {presetName.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-row">
        <RangeField
          label="Font size"
          value={settings.fontSize}
          min={9}
          max={11.5}
          step={0.1}
          suffix="pt"
          onChange={(value) => onSettingChange("fontSize", value)}
        />
        <RangeField
          label="Line height"
          value={settings.lineHeight}
          min={1.05}
          max={1.35}
          step={0.01}
          onChange={(value) => onSettingChange("lineHeight", value)}
        />
      </div>

      <div className="form-row">
        <RangeField
          label="Horizontal margin"
          value={settings.pagePaddingX}
          min={0.25}
          max={0.8}
          step={0.01}
          suffix="in"
          onChange={(value) => onSettingChange("pagePaddingX", value)}
        />
        <RangeField
          label="Vertical margin"
          value={settings.pagePaddingTop}
          min={0.3}
          max={0.8}
          step={0.01}
          suffix="in"
          onChange={(value) => {
            onSettingChange("pagePaddingTop", value);
            onSettingChange("pagePaddingBottom", value);
          }}
        />
      </div>

      <div className="form-row">
        <RangeField
          label="Section spacing"
          value={settings.sectionSpacing}
          min={5}
          max={14}
          step={1}
          suffix="px"
          onChange={(value) => onSettingChange("sectionSpacing", value)}
        />
        <RangeField
          label="Bullet spacing"
          value={settings.bulletSpacing}
          min={1}
          max={6}
          step={1}
          suffix="px"
          onChange={(value) => onSettingChange("bulletSpacing", value)}
        />
      </div>

      <div className="form-group">
        <label>Preview visibility</label>
        <div className="visibility-grid">
          {Object.entries(sectionLabels).map(([sectionId, label]) => (
            <label key={sectionId} className="visibility-toggle">
              <input
                type="checkbox"
                checked={Boolean(sectionVisibility[sectionId])}
                onChange={(event) =>
                  onSectionVisibilityChange(sectionId, event.target.checked)
                }
              />
              <span>{label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="resume-card-actions">
        <button type="button" className="btn-cancel" onClick={onReset}>
          Reset
        </button>
      </div>
    </ResumeSectionCard>
  );
}

function RangeField({
  label,
  value,
  min,
  max,
  step,
  suffix = "",
  onChange,
}) {
  return (
    <div className="form-group range-field">
      <label>
        <span>{label}</span>
        <strong>
          {value}
          {suffix}
        </strong>
      </label>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </div>
  );
}
