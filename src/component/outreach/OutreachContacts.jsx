import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {
  useGetContactsQuery,
  useGetCompaniesQuery,
} from "../../features/linkedinOutreach/linkedOutreachApi";

// ─── Constants ────────────────────────────────────────────────────────────────
const STATUS_CONFIG = {
  DISCOVERED:              { label: "DISCOVERED",              color: "#6B7280", bg: "#6B728015", border: "#6B728030" },
  CONNECTION_NOTE_READY:   { label: "CONNECTION_NOTE_READY",   color: "#F59E0B", bg: "#F59E0B15", border: "#F59E0B30" },
  CONNECTION_SENT:         { label: "CONNECTION_SENT",         color: "#27C4D6", bg: "#27C4D615", border: "#27C4D630" },
  CONNECTION_ACCEPTED:     { label: "CONNECTION_ACCEPTED",     color: "#10B981", bg: "#10B98115", border: "#10B98130" },
  DM_SENT:                 { label: "DM_SENT",                 color: "#A78BFA", bg: "#A78BFA15", border: "#A78BFA30" },
  EMAIL_ONLY:              { label: "EMAIL_ONLY",              color: "#60A5FA", bg: "#60A5FA15", border: "#60A5FA30" },
  REPLIED:                 { label: "REPLIED",                 color: "#34D399", bg: "#34D39915", border: "#34D39930" },
};

const AVATAR_COLORS = [
  "#7C3AED","#2563EB","#DC2626","#B45309","#065F46","#6D28D9","#047857","#9D174D",
  "#1D4ED8","#059669","#D97706","#7C3AED",
];

const TYPE_OPTIONS    = ["All Types", "Recruiter", "Engineer", "Manager"];
const STATUS_OPTIONS  = ["LinkedIn Status", ...Object.keys(STATUS_CONFIG)];

// ─── Helpers ──────────────────────────────────────────────────────────────────
function getInitials(name = "") {
  return name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
}

function getAvatarColor(id) {
  const n = typeof id === "number" ? id : parseInt(id, 10) || 0;
  return AVATAR_COLORS[n % AVATAR_COLORS.length];
}

// ─── Dropdown ─────────────────────────────────────────────────────────────────
function Dropdown({ options, value, onChange }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ position: "relative" }}>
      <button
        onClick={() => setOpen((p) => !p)}
        style={{
          display: "flex", alignItems: "center", gap: 8,
          background: "#111827", border: `1px solid ${open ? "#27C4D6" : "#2D3348"}`,
          borderRadius: 10, color: "#fff",
          fontSize: 13, fontWeight: 500, padding: "9px 14px",
          cursor: "pointer", transition: "border-color 0.2s", whiteSpace: "nowrap",
        }}
      >
        {value}
        <KeyboardArrowDownIcon style={{
          fontSize: 16, color: "#6B7280",
          transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s",
        }} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            style={{
              position: "absolute", top: "calc(100% + 6px)", left: 0,
              background: "#141824", border: "1px solid #2D3348",
              borderRadius: 10, minWidth: 200, zIndex: 100,
              overflow: "hidden", boxShadow: "0 8px 30px rgba(0,0,0,0.4)",
            }}
          >
            {options.map((opt) => (
              <div
                key={opt}
                onClick={() => { onChange(opt); setOpen(false); }}
                style={{
                  padding: "10px 16px", fontSize: 13,
                  color: value === opt ? "#27C4D6" : "#D1D5DB",
                  cursor: "pointer", transition: "background 0.15s",
                  fontWeight: value === opt ? 600 : 400,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#1F2937")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                {opt}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Skeleton Row ─────────────────────────────────────────────────────────────
function SkeletonRow() {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 16,
      background: "linear-gradient(145deg, #131929, #0D1117)",
      border: "1px solid #1E2A3B", borderRadius: 14,
      padding: "16px 20px", marginBottom: 8,
    }}>
      <div style={{ width: 44, height: 44, borderRadius: 12, background: "#1F2937", animation: "pulse 1.6s infinite" }} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
        <div style={{ width: "30%", height: 14, background: "#1F2937", borderRadius: 6, animation: "pulse 1.6s infinite" }} />
        <div style={{ width: "20%", height: 10, background: "#1F2937", borderRadius: 6, animation: "pulse 1.6s infinite" }} />
      </div>
      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }`}</style>
    </div>
  );
}

// ─── Contact Row ──────────────────────────────────────────────────────────────
function ContactRow({ contact, index }) {
  const [imgError, setImgError] = useState(false);
  const statusCfg = STATUS_CONFIG[contact.linkedinStatus] || STATUS_CONFIG.DISCOVERED;

  const name        = contact.name || contact.fullName || "Unknown";
  const role        = contact.role || contact.title || "";
  const companyName = contact.company?.name || contact.companyName || "";
  const companyLogo = contact.company?.logo
    || (contact.company?.domain ? `https://logo.clearbit.com/${contact.company.domain}` : "");
  const hasEmail    = Boolean(contact.email || contact.emailReady);
  const timeLabel   = contact.updatedAt
    ? new Date(contact.updatedAt).toLocaleDateString()
    : contact.time || "";

  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.04, duration: 0.3 }}
      style={{
        display: "flex", alignItems: "center", gap: 16,
        background: "linear-gradient(145deg, #131929, #0D1117)",
        border: "1px solid #1E2A3B", borderRadius: 14,
        padding: "16px 20px", marginBottom: 8,
        transition: "border-color 0.2s, box-shadow 0.2s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "#27C4D630";
        e.currentTarget.style.boxShadow = "0 4px 24px rgba(39,196,214,0.06)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "#1E2A3B";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Avatar */}
      <div style={{
        width: 44, height: 44, borderRadius: 12,
        background: getAvatarColor(contact.id),
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 14, fontWeight: 800, color: "#fff",
        flexShrink: 0, letterSpacing: 0.5,
      }}>
        {getInitials(name)}
      </div>

      {/* Name & role */}
      <div style={{ minWidth: 180 }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: "#fff" }}>{name}</div>
        <div style={{ fontSize: 12, color: "#6B7280" }}>{role}</div>
      </div>

      {/* Company */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 130 }}>
        {companyLogo && !imgError ? (
          <img src={companyLogo} alt={companyName} onError={() => setImgError(true)}
            style={{ width: 20, height: 20, objectFit: "contain", borderRadius: 4 }} />
        ) : (
          <span style={{ fontSize: 11, color: "#9CA3AF", fontWeight: 700 }}>{companyName[0]}</span>
        )}
        <span style={{ fontSize: 13, color: "#D1D5DB", fontWeight: 500 }}>{companyName}</span>
      </div>

      {/* Channel icons */}
      <div style={{ display: "flex", alignItems: "center", gap: 6, minWidth: 60 }}>
        <LinkedInIcon style={{ fontSize: 20, color: "#0A66C2" }} />
        <EmailIcon style={{ fontSize: 20, color: hasEmail ? "#10B981" : "#374151" }} />
      </div>

      {/* Status badge */}
      <div style={{ flexGrow: 1 }}>
        <span style={{
          background: statusCfg.bg, color: statusCfg.color,
          border: `1px solid ${statusCfg.border}`,
          borderRadius: 20, padding: "4px 12px",
          fontSize: 11, fontWeight: 700, letterSpacing: 0.3, whiteSpace: "nowrap",
        }}>
          {statusCfg.label}
        </span>
      </div>

      {/* Time */}
      <div style={{ color: "#6B7280", fontSize: 13, minWidth: 100, textAlign: "right" }}>
        {contact.linkedinStatus === "CONNECTION_ACCEPTED" ? (
          <span style={{ color: "#10B981", fontWeight: 700, display: "flex", alignItems: "center", gap: 4, justifyContent: "flex-end" }}>
            <CheckCircleIcon style={{ fontSize: 14 }} /> DM Ready
          </span>
        ) : timeLabel}
      </div>

      {/* More */}
      <button style={{
        background: "none", border: "none", color: "#6B7280",
        cursor: "pointer", padding: 4, borderRadius: 6,
        display: "flex", alignItems: "center", transition: "color 0.2s",
      }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "#6B7280")}
      >
        <MoreHorizIcon style={{ fontSize: 20 }} />
      </button>
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function OutreachContacts({ company }) {
  const [companyFilter, setCompanyFilter] = useState(company ? company.name : "All Companies");
  const [typeFilter,    setTypeFilter]    = useState("All Types");
  const [statusFilter,  setStatusFilter]  = useState("LinkedIn Status");
  const [search,        setSearch]        = useState("");

  // Fetch companies for the dropdown
  const { data: companies = [] } = useGetCompaniesQuery();

  // Build query params — companyId comes from the matched company object
  const selectedCompany = useMemo(
    () => companies.find((c) => c.name === companyFilter),
    [companies, companyFilter]
  );

  const queryParams = useMemo(() => {
    const p = {};
    if (selectedCompany) p.companyId = selectedCompany.id;
    if (statusFilter !== "LinkedIn Status") p.linkedinStatus = statusFilter;
    if (search) p.search = search;
    return p;
  }, [selectedCompany, statusFilter, search]);

  const { data: contacts = [], isLoading, isError, refetch } = useGetContactsQuery(queryParams);

  // Build company options for dropdown
  const companyOptions = useMemo(
    () => ["All Companies", ...companies.map((c) => c.name)],
    [companies]
  );

  // Client-side type filter (since API may not support it yet)
  const filtered = useMemo(() => {
    if (typeFilter === "All Types") return contacts;
    return contacts.filter((c) => {
      const role = (c.role || c.title || "").toLowerCase();
      return role.includes(typeFilter.toLowerCase());
    });
  }, [contacts, typeFilter]);

  return (
    <div style={{ padding: "32px 36px", maxWidth: 1100, minHeight: "100vh", color: "#fff" }}>
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 32, fontWeight: 800, margin: 0, letterSpacing: -0.5 }}>Contacts</h1>
        <p style={{ margin: "6px 0 0", color: "#9CA3AF", fontSize: 14 }}>
          {isLoading
            ? "Loading contacts…"
            : `${filtered.length} contact${filtered.length !== 1 ? "s" : ""} discovered across ${companies.length} companies`}
        </p>
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: 10, marginBottom: 24, flexWrap: "wrap", alignItems: "center" }}>
        <Dropdown options={companyOptions} value={companyFilter} onChange={setCompanyFilter} />
        <Dropdown options={TYPE_OPTIONS}   value={typeFilter}    onChange={setTypeFilter}    />
        <Dropdown options={STATUS_OPTIONS} value={statusFilter}  onChange={setStatusFilter}  />

        {/* Search */}
        <div style={{
          display: "flex", alignItems: "center", gap: 8,
          background: "#111827", border: "1px solid #2D3348",
          borderRadius: 10, padding: "9px 14px",
          flexGrow: 1, maxWidth: 280, transition: "border-color 0.2s",
        }}
          onFocus={(e) => (e.currentTarget.style.borderColor = "#27C4D6")}
          onBlur={(e)  => (e.currentTarget.style.borderColor = "#2D3348")}
        >
          <SearchIcon style={{ fontSize: 16, color: "#6B7280" }} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search contacts…"
            style={{ background: "none", border: "none", color: "#fff", fontSize: 13, outline: "none", width: "100%" }}
          />
        </div>
      </div>

      {/* Error */}
      {isError && (
        <div style={{
          background: "#EF444415", border: "1px solid #EF444430",
          borderRadius: 12, padding: "16px 20px", marginBottom: 20, color: "#FCA5A5",
        }}>
          Failed to load contacts.{" "}
          <button onClick={() => refetch()}
            style={{ background: "none", border: "none", color: "#27C4D6", cursor: "pointer", fontWeight: 600 }}>
            Retry
          </button>
        </div>
      )}

      {/* Contacts list */}
      {isLoading ? (
        <div>{[1, 2, 3, 4, 5].map((i) => <SkeletonRow key={i} />)}</div>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div key={`${companyFilter}-${statusFilter}-${search}`}>
            {filtered.map((contact, i) => (
              <ContactRow key={contact.id} contact={contact} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>
      )}

      {!isLoading && filtered.length === 0 && !isError && (
        <div style={{ textAlign: "center", padding: "80px 0", color: "#4B5563" }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🔍</div>
          <p style={{ fontSize: 16 }}>No contacts match your filters.</p>
        </div>
      )}
    </div>
  );
}
