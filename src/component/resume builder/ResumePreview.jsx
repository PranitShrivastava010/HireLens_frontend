import React, { useLayoutEffect, useMemo, useRef, useState } from "react";
import "./resumeBuilder.css";

const A4_WIDTH_PX = 794;
const A4_HEIGHT_PX = 1123;

const formatMonthYear = (value) => {
  if (!value) {
    return "";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "numeric",
  }).format(new Date(value));
};

const formatExperienceRange = (item) => {
  const start = formatMonthYear(item.startDate);
  if (!start) {
    return "";
  }

  if (item.isCurrent) {
    return `${start} -- Present`;
  }

  const end = formatMonthYear(item.endDate);
  return end ? `${start} -- ${end}` : start;
};

const formatEducationRange = (item) => {
  if (!item.startYear) {
    return "";
  }

  return item.endYear ? `${item.startYear} -- ${item.endYear}` : `${item.startYear}`;
};

const normalizeHref = (url) => {
  if (!url) {
    return "";
  }

  const trimmed = url.trim();
  if (!trimmed) {
    return "";
  }

  if (
    trimmed.startsWith("http://") ||
    trimmed.startsWith("https://") ||
    trimmed.startsWith("mailto:")
  ) {
    return trimmed;
  }

  return `https://${trimmed}`;
};

const displayLinkText = (url, fallback = "") => {
  if (!url) {
    return fallback;
  }

  return url
    .replace(/^https?:\/\//, "")
    .replace(/^mailto:/, "")
    .replace(/\/$/, "");
};

const splitProjectDescription = (description) =>
  description
    .split(/\r?\n/)
    .map((line) => line.replace(/^[\-\u2022]\s*/, "").trim())
    .filter(Boolean);

const shallowEqual = (left, right) => {
  const leftKeys = Object.keys(left);
  const rightKeys = Object.keys(right);

  if (leftKeys.length !== rightKeys.length) {
    return false;
  }

  return leftKeys.every((key) => left[key] === right[key]);
};

const buildContactItems = (basics, customLinks) => {
  const items = [];

  if (basics.location) {
    items.push({ label: basics.location });
  }

  if (basics.phone) {
    items.push({ label: basics.phone });
  }

  if (basics.email) {
    items.push({
      label: basics.email,
      href: `mailto:${basics.email}`,
    });
  }

  if (basics.linkedin) {
    items.push({
      label: displayLinkText(basics.linkedin, "LinkedIn"),
      href: normalizeHref(basics.linkedin),
    });
  }

  if (basics.github) {
    items.push({
      label: displayLinkText(basics.github, "GitHub"),
      href: normalizeHref(basics.github),
    });
  }

  customLinks.forEach((link) => {
    if (!link?.url) {
      return;
    }

    items.push({
      label: link.label?.trim() || displayLinkText(link.url, "Link"),
      href: normalizeHref(link.url),
    });
  });

  return items;
};

const buildSkillGroups = (skills) => {
  const grouped = skills.reduce((accumulator, skill) => {
    const category = skill.category || "Skills";
    if (!accumulator[category]) {
      accumulator[category] = [];
    }

    accumulator[category].push(skill.name);
    return accumulator;
  }, {});

  return Object.entries(grouped).map(([category, items]) => ({
    category,
    items,
  }));
};

const buildBlocks = ({
  resumeData,
  customLinks,
  sectionVisibility,
}) => {
  const basics = resumeData?.basics ?? {};
  const experiences = resumeData?.experiences ?? [];
  const educations = resumeData?.educations ?? [];
  const projects = resumeData?.projects ?? [];
  const skills = resumeData?.skills ?? [];
  const certifications = resumeData?.certifications ?? [];
  const skillGroups = buildSkillGroups(skills);

  const blocks = [
    {
      id: "header",
      type: "header",
      basics,
      customLinks,
    },
  ];

  if (sectionVisibility.summary && basics.summary?.trim()) {
    blocks.push({
      id: "summary",
      type: "summary",
      summary: basics.summary.trim(),
    });
  }

  if (sectionVisibility.experience) {
    experiences.forEach((experience, index) => {
      blocks.push({
        id: `experience-${experience.id}`,
        type: "experience",
        showTitle: index === 0,
        item: experience,
      });
    });
  }

  if (sectionVisibility.projects) {
    projects.forEach((project, index) => {
      blocks.push({
        id: `project-${project.id}`,
        type: "project",
        showTitle: index === 0,
        item: project,
      });
    });
  }

  if (sectionVisibility.skills) {
    skillGroups.forEach((group, index) => {
      blocks.push({
        id: `skills-${group.category}-${index}`,
        type: "skill-group",
        showTitle: index === 0,
        group,
      });
    });
  }

  if (sectionVisibility.education) {
    educations.forEach((education, index) => {
      blocks.push({
        id: `education-${education.id}`,
        type: "education",
        showTitle: index === 0,
        item: education,
      });
    });
  }

  if (sectionVisibility.certifications) {
    certifications.forEach((certification, index) => {
      blocks.push({
        id: `certification-${certification.id}`,
        type: "certification",
        showTitle: index === 0,
        item: certification,
      });
    });
  }

  return blocks;
};

const renderSectionHeading = (label) => (
  <div className="resume-section-heading">
    <span>{label}</span>
  </div>
);

const renderBlock = (block) => {
  switch (block.type) {
    case "header": {
      const { basics, customLinks } = block;
      const contactItems = buildContactItems(basics, customLinks);

      return (
        <div className="resume-block resume-block--header">
          <div className="resume-header-name">
            {basics.fullName || "Your Name"}
          </div>
          {basics.headline ? (
            <div className="resume-header-headline">{basics.headline}</div>
          ) : null}
          {contactItems.length ? (
            <div className="resume-header-contact">
              {contactItems.map((item, index) => (
                <React.Fragment key={`${item.label}-${index}`}>
                  {item.href ? (
                    <a href={item.href} target="_blank" rel="noreferrer">
                      {item.label}
                    </a>
                  ) : (
                    <span>{item.label}</span>
                  )}
                  {index < contactItems.length - 1 ? (
                    <span className="resume-contact-separator">|</span>
                  ) : null}
                </React.Fragment>
              ))}
            </div>
          ) : null}
        </div>
      );
    }

    case "summary":
      return (
        <div className="resume-block">
          {renderSectionHeading("SUMMARY")}
          <p className="resume-summary-copy">{block.summary}</p>
        </div>
      );

    case "experience": {
      const { item, showTitle } = block;
      return (
        <div className="resume-block">
          {showTitle ? renderSectionHeading("WORK EXPERIENCE") : null}
          <div className="resume-entry">
            <div className="resume-entry-row">
              <strong>{item.company}</strong>
              <span>{item.location}</span>
            </div>
            <div className="resume-entry-row resume-entry-row--muted">
              <em>{item.role}</em>
              <em>{formatExperienceRange(item)}</em>
            </div>
            {item.bullets?.length ? (
              <ul className="resume-bullet-list">
                {item.bullets.map((bullet, index) => (
                  <li key={`${item.id}-bullet-${index}`}>{bullet}</li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>
      );
    }

    case "project": {
      const { item, showTitle } = block;
      const bullets = splitProjectDescription(item.description);
      const projectLink = normalizeHref(item.link);

      return (
        <div className="resume-block">
          {showTitle ? renderSectionHeading("PROJECTS") : null}
          <div className="resume-entry">
            <div className="resume-entry-row">
              {projectLink ? (
                <a
                  className="resume-entry-link"
                  href={projectLink}
                  target="_blank"
                  rel="noreferrer"
                >
                  <strong>{item.name}</strong>
                </a>
              ) : (
                <strong>{item.name}</strong>
              )}
              <em>{item.dateLabel || ""}</em>
            </div>
            {bullets.length ? (
              <ul className="resume-bullet-list">
                {bullets.map((bullet, index) => (
                  <li key={`${item.id}-project-bullet-${index}`}>{bullet}</li>
                ))}
                {item.techStack?.length ? (
                  <li>{`Tech Stack: ${item.techStack.join(", ")}`}</li>
                ) : null}
              </ul>
            ) : item.techStack?.length ? (
              <p className="resume-summary-copy">{`Tech Stack: ${item.techStack.join(
                ", "
              )}`}</p>
            ) : null}
          </div>
        </div>
      );
    }

    case "skill-group":
      return (
        <div className="resume-block">
          {block.showTitle ? renderSectionHeading("SKILLS") : null}
          <p className="resume-skill-row">
            <strong>{`${block.group.category}:`}</strong>{" "}
            <span>{block.group.items.join(", ")}</span>
          </p>
        </div>
      );

    case "education": {
      const { item, showTitle } = block;
      return (
        <div className="resume-block">
          {showTitle ? renderSectionHeading("EDUCATION") : null}
          <div className="resume-entry">
            <div className="resume-entry-row">
              <strong>{item.institute}</strong>
              <span>{formatEducationRange(item)}</span>
            </div>
            <div className="resume-entry-row resume-entry-row--muted">
              <em>
                {item.degree}
                {item.field ? ` | ${item.field}` : ""}
              </em>
              <span />
            </div>
          </div>
        </div>
      );
    }

    case "certification": {
      const { item, showTitle } = block;
      return (
        <div className="resume-block">
          {showTitle ? renderSectionHeading("CERTIFICATIONS") : null}
          <div className="resume-entry">
            <div className="resume-entry-row">
              <strong>{item.name}</strong>
              <span>{item.year || ""}</span>
            </div>
            <div className="resume-entry-row resume-entry-row--muted">
              <em>{item.issuer}</em>
              {item.link ? (
                <a href={normalizeHref(item.link)} target="_blank" rel="noreferrer">
                  {displayLinkText(item.link, "Credential")}
                </a>
              ) : (
                <span />
              )}
            </div>
          </div>
        </div>
      );
    }

    default:
      return null;
  }
};

const paginateBlocks = (blocks, blockHeights, availableHeight) => {
  if (!blocks.length) {
    return [[]];
  }

  const pages = [];
  let currentPage = [];
  let currentHeight = 0;

  blocks.forEach((block) => {
    const height = blockHeights[block.id] ?? 0;
    const fitsCurrentPage = currentPage.length === 0 || currentHeight + height <= availableHeight;

    if (fitsCurrentPage) {
      currentPage.push(block);
      currentHeight += height;
      return;
    }

    pages.push(currentPage);
    currentPage = [block];
    currentHeight = height;
  });

  if (currentPage.length) {
    pages.push(currentPage);
  }

  return pages;
};

export default function ResumePreview({
  resumeData,
  customLinks = [],
  layoutSettings,
  sectionVisibility = {},
}) {
  const measureRefs = useRef({});
  const [blockHeights, setBlockHeights] = useState({});

  const blocks = useMemo(
    () =>
      buildBlocks({
        resumeData,
        customLinks,
        sectionVisibility,
      }),
    [customLinks, resumeData, sectionVisibility]
  );

  const availableHeight = useMemo(() => {
    const verticalPadding =
      (layoutSettings.pagePaddingTop + layoutSettings.pagePaddingBottom) * 96;
    return A4_HEIGHT_PX - verticalPadding;
  }, [layoutSettings.pagePaddingBottom, layoutSettings.pagePaddingTop]);

  useLayoutEffect(() => {
    const nextHeights = {};
    let hasAllMeasurements = true;

    blocks.forEach((block) => {
      const node = measureRefs.current[block.id];
      if (!node) {
        hasAllMeasurements = false;
        return;
      }

      nextHeights[block.id] = node.offsetHeight;
    });

    if (hasAllMeasurements) {
      setBlockHeights((current) =>
        shallowEqual(current, nextHeights) ? current : nextHeights
      );
    }
  }, [availableHeight, blocks, layoutSettings]);

  const pages = useMemo(
    () => paginateBlocks(blocks, blockHeights, availableHeight),
    [availableHeight, blockHeights, blocks]
  );

  const maxPages =
    layoutSettings.pageMode === "single"
      ? 1
      : layoutSettings.pageMode === "two-page"
        ? 2
        : null;

  const isOverGoal = maxPages ? pages.length > maxPages : false;

  const paperStyle = {
    "--resume-font-size": `${layoutSettings.fontSize}px`,
    "--resume-line-height": layoutSettings.lineHeight,
    "--resume-page-padding-top": `${layoutSettings.pagePaddingTop}in`,
    "--resume-page-padding-bottom": `${layoutSettings.pagePaddingBottom}in`,
    "--resume-page-padding-x": `${layoutSettings.pagePaddingX}in`,
    "--resume-section-spacing": `${layoutSettings.sectionSpacing}px`,
    "--resume-item-spacing": `${layoutSettings.itemSpacing}px`,
    "--resume-bullet-spacing": `${layoutSettings.bulletSpacing}px`,
  };

  return (
    <div className="resume-preview-wrapper resume-preview-print-root">
      <div className="preview-header">
        <div>
          <h2>Live A4 Preview</h2>
          <p>
            {pages.length} page{pages.length === 1 ? "" : "s"}
            {maxPages ? ` · target ${maxPages}` : ""}
          </p>
        </div>

        <div className="preview-toolbar">
          {isOverGoal ? (
            <span className="preview-warning">Over target</span>
          ) : (
            <span className="preview-ok">Within target</span>
          )}
          <button
            type="button"
            className="download-btn"
            onClick={() => window.print()}
          >
            Print / Save PDF
          </button>
        </div>
      </div>

      <div className="resume-measure-stage" aria-hidden="true">
        <div className="resume-page" style={paperStyle}>
          <div className="resume-page-content">
            {blocks.map((block) => (
              <div
                key={`measure-${block.id}`}
                ref={(node) => {
                  measureRefs.current[block.id] = node;
                }}
              >
                {renderBlock(block)}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="resume-preview-pages">
        {pages.map((pageBlocks, pageIndex) => (
          <div key={`page-${pageIndex + 1}`} className="resume-page" style={paperStyle}>
            <div className="resume-page-number">Page {pageIndex + 1}</div>
            <div className="resume-page-content">
              {pageBlocks.map((block) => (
                <React.Fragment key={block.id}>{renderBlock(block)}</React.Fragment>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
