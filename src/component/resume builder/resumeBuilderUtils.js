export const DENSITY_PRESETS = {
  comfortable: {
    fontSize: 10.4,
    lineHeight: 1.28,
    pagePaddingTop: 0.58,
    pagePaddingBottom: 0.58,
    pagePaddingX: 0.52,
    sectionSpacing: 11,
    itemSpacing: 8,
    bulletSpacing: 4,
  },
  balanced: {
    fontSize: 10,
    lineHeight: 1.2,
    pagePaddingTop: 0.45,
    pagePaddingBottom: 0.45,
    pagePaddingX: 0.4,
    sectionSpacing: 8,
    itemSpacing: 5,
    bulletSpacing: 2,
  },
  compact: {
    fontSize: 9.4,
    lineHeight: 1.12,
    pagePaddingTop: 0.36,
    pagePaddingBottom: 0.36,
    pagePaddingX: 0.32,
    sectionSpacing: 6,
    itemSpacing: 3,
    bulletSpacing: 1,
  },
};

export const PAGE_MODE_OPTIONS = [
  { value: "auto", label: "Auto" },
  { value: "single", label: "Prefer 1 Page" },
  { value: "two-page", label: "Allow Up To 2 Pages" },
];

export const DEFAULT_SECTION_VISIBILITY = {
  summary: true,
  experience: true,
  projects: true,
  skills: true,
  education: true,
  certifications: true,
};

export const DEFAULT_LAYOUT_SETTINGS = {
  pageMode: "auto",
  density: "balanced",
  ...DENSITY_PRESETS.balanced,
};

export const sanitizeCustomLinks = (links = []) =>
  links
    .filter((link) => link && (link.label || link.url))
    .map((link, index) => ({
      id: link.id || `custom-link-${index + 1}`,
      label: link.label || "",
      url: link.url || "",
    }));

export const applyDensityPreset = (presetName, currentSettings = {}) => ({
  ...currentSettings,
  density: presetName,
  ...(DENSITY_PRESETS[presetName] ?? DENSITY_PRESETS.balanced),
});

export const createDefaultUiState = () => ({
  layoutSettings: { ...DEFAULT_LAYOUT_SETTINGS },
  customLinks: [],
  sectionVisibility: { ...DEFAULT_SECTION_VISIBILITY },
});
