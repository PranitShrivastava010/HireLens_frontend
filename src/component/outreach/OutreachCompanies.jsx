import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import AddIcon from "@mui/icons-material/Add";
import RefreshIcon from "@mui/icons-material/Refresh";
import AddCompanyModal from "./AddCompanyModal";
import {
  useGetCompaniesQuery,
  useCreateDiscoveryQueueMutation,
} from "../../features/linkedinOutreach/linkedOutreachApi";

// ─── Constants ────────────────────────────────────────────────────────────────
const STATUS_COLORS = {
  ACTIVE: { bg: "#10B98120", text: "#10B981", border: "#10B98130" },
  PAUSED: { bg: "#F59E0B20", text: "#F59E0B", border: "#F59E0B30" },
  COMPLETED: { bg: "#6B728020", text: "#9CA3AF", border: "#6B728030" },
};

const TABS = ["All", "Active", "Paused", "Completed"];

// ─── Skeleton Card ────────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div style={{
      background: "linear-gradient(145deg, #131929, #0D1117)",
      border: "1px solid #1E2A3B",
      borderRadius: 16,
      padding: "24px",
      display: "flex",
      flexDirection: "column",
      gap: 14,
    }}>
      {[52, 20, 60, 30].map((w, i) => (
        <div key={i} style={{
          height: i === 0 ? 52 : 14,
          width: i === 0 ? 52 : `${w}%`,
          background: "#1F2937",
          borderRadius: 8,
          animation: "pulse 1.6s ease-in-out infinite",
        }} />
      ))}
      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }`}</style>
    </div>
  );
}

// ─── Discovery Queue Modal ─────────────────────────────────────────────────────
function StartDiscoveryModal({ open, onClose, companies }) {
  const [selected, setSelected] = useState([]);
  const [roles, setRoles] = useState(["Recruiter", "Hiring Manager", "Engineer"]);
  const [createDiscoveryQueue, { isLoading, error }] = useCreateDiscoveryQueueMutation();

  const toggleCompany = (id) =>
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

  const toggleRole = (role) =>
    setRoles((prev) =>
      prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role]
    );

  const handleStart = async () => {
    if (selected.length === 0 || roles.length === 0) return;
    try {
      await createDiscoveryQueue({ companyIds: selected, roles }).unwrap();
      setSelected([]);
      onClose();
    } catch (_) { /* error shown inline */ }
  };

  const ROLE_OPTIONS = ["Recruiter", "Hiring Manager", "Engineer", "Tech Lead", "HR Manager"];

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.65)", backdropFilter: "blur(6px)", zIndex: 1000 }}
          />
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.92,
              x: "-50%",
              y: "calc(-50% + 30px)",
            }}
            animate={{
              opacity: 1,
              scale: 1,
              x: "-50%",
              y: "-50%",
            }}
            exit={{
              opacity: 0,
              scale: 0.92,
              x: "-50%",
              y: "calc(-50% + 30px)",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              zIndex: 1001,
              width: 560,
              maxWidth: "92vw",
              background: "linear-gradient(145deg, #141824, #0D1117)",
              border: "1px solid #27C4D640",
              borderRadius: 20,
              padding: 32,
              boxShadow: "0 25px 80px rgba(0,0,0,0.6)",
            }}
          >
            <h2 style={{ margin: "0 0 6px", fontSize: 22, fontWeight: 800, color: "#fff" }}>
              Start LinkedIn Discovery
            </h2>
            <p style={{ margin: "0 0 24px", color: "#6B7280", fontSize: 14 }}>
              Select companies and contact types to discover. The Chrome Extension will run the searches automatically.
            </p>

            {/* Select Companies */}
            <p style={{ color: "#9CA3AF", fontSize: 12, fontWeight: 700, letterSpacing: 0.8, marginBottom: 10, textTransform: "uppercase" }}>
              Select Companies
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, maxHeight: 200, overflowY: "auto", marginBottom: 20 }}>
              {companies.map((c) => {
                const isChecked = selected.includes(c.id);
                return (
                  <div
                    key={c.id}
                    onClick={() => toggleCompany(c.id)}
                    style={{
                      display: "flex", alignItems: "center", gap: 12,
                      padding: "10px 14px",
                      background: isChecked ? "#27C4D610" : "#0D1117",
                      border: `1px solid ${isChecked ? "#27C4D6" : "#1F2937"}`,
                      borderRadius: 10, cursor: "pointer", transition: "all 0.2s",
                    }}
                  >
                    <div style={{
                      width: 18, height: 18, borderRadius: 5,
                      border: `2px solid ${isChecked ? "#27C4D6" : "#374151"}`,
                      background: isChecked ? "#27C4D6" : "transparent",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0, transition: "all 0.2s",
                    }}>
                      {isChecked && <span style={{ color: "#000", fontSize: 11, fontWeight: 800 }}>✓</span>}
                    </div>
                    <span style={{ fontSize: 14, color: "#fff", fontWeight: 500 }}>{c.name}</span>
                    <span style={{ fontSize: 12, color: "#6B7280", marginLeft: "auto" }}>{c.domain}</span>
                  </div>
                );
              })}
              {companies.length === 0 && (
                <p style={{ color: "#4B5563", textAlign: "center", padding: "20px 0" }}>No companies added yet.</p>
              )}
            </div>

            {/* Select Role Types */}
            <p style={{ color: "#9CA3AF", fontSize: 12, fontWeight: 700, letterSpacing: 0.8, marginBottom: 10, textTransform: "uppercase" }}>
              Contact Types to Find
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
              {ROLE_OPTIONS.map((role) => {
                const isOn = roles.includes(role);
                return (
                  <button
                    key={role}
                    onClick={() => toggleRole(role)}
                    style={{
                      background: isOn ? "#27C4D620" : "transparent",
                      border: `1px solid ${isOn ? "#27C4D6" : "#2D3348"}`,
                      borderRadius: 20, color: isOn ? "#27C4D6" : "#9CA3AF",
                      fontSize: 13, fontWeight: 600, padding: "6px 14px",
                      cursor: "pointer", transition: "all 0.2s",
                    }}
                  >
                    {role}
                  </button>
                );
              })}
            </div>

            {error && (
              <p style={{ color: "#EF4444", fontSize: 13, marginBottom: 16 }}>
                {error?.data?.message || "Failed to create discovery queue. Please try again."}
              </p>
            )}

            <div style={{ display: "flex", gap: 12 }}>
              <button
                onClick={onClose}
                style={{
                  flex: 1, padding: "12px 0",
                  background: "#1F2937", border: "1px solid #374151",
                  borderRadius: 10, color: "#9CA3AF",
                  fontSize: 14, fontWeight: 600, cursor: "pointer",
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleStart}
                disabled={isLoading || selected.length === 0 || roles.length === 0}
                style={{
                  flex: 2, padding: "12px 0",
                  background: selected.length > 0 && roles.length > 0
                    ? "linear-gradient(135deg, #0A66C2, #0077B5)"
                    : "#1F2937",
                  border: "none", borderRadius: 10,
                  color: "#fff", fontSize: 14, fontWeight: 700,
                  cursor: isLoading || selected.length === 0 ? "not-allowed" : "pointer",
                  opacity: isLoading ? 0.7 : 1,
                  transition: "all 0.2s",
                }}
              >
                {isLoading ? "Creating Queue…" : `Start Discovery (${selected.length} companies)`}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ─── Company Card ─────────────────────────────────────────────────────────────
function CompanyCard({ company, onViewDetails, index }) {
  const [imgError, setImgError] = useState(false);
  const statusStyle = STATUS_COLORS[company.status] || STATUS_COLORS.ACTIVE;
  const initial = company.name.charAt(0).toUpperCase();
  const logoUrl = company.logo || `https://logo.clearbit.com/${company.domain}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.35 }}
      whileHover={{ y: -4, boxShadow: "0 12px 40px rgba(39,196,214,0.12)" }}
      style={{
        background: "linear-gradient(145deg, #131929, #0D1117)",
        border: "1px solid #1E2A3B",
        borderRadius: 16, padding: "24px",
        display: "flex", flexDirection: "column", gap: 14,
        cursor: "default", transition: "box-shadow 0.3s",
        position: "relative", overflow: "hidden",
      }}
    >
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 2,
        background: "linear-gradient(90deg, #27C4D640, transparent)",
        borderRadius: "16px 16px 0 0",
      }} />

      {/* Company header */}
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div style={{
          width: 52, height: 52, borderRadius: 12, background: "#1F2937",
          display: "flex", alignItems: "center", justifyContent: "center",
          overflow: "hidden", border: "1px solid #2D3348", flexShrink: 0,
        }}>
          {!imgError ? (
            <img src={logoUrl} alt={company.name} onError={() => setImgError(true)}
              style={{ width: 32, height: 32, objectFit: "contain" }} />
          ) : (
            <span style={{ fontSize: 20, fontWeight: 800, color: "#27C4D6" }}>{initial}</span>
          )}
        </div>
        <div>
          <div style={{ fontSize: 16, fontWeight: 700, color: "#fff" }}>{company.name}</div>
          <div style={{ fontSize: 12, color: "#6B7280" }}>{company.domain}</div>
        </div>
      </div>

      {/* Stats pills */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <StatPill value={company.contacts ?? company._count?.contacts ?? 0} label="contacts" color="#27C4D6" />
        <StatPill value={company.connected ?? 0} label="connected" color="#10B981" />
        <StatPill value={company.emailsSent ?? company.emailsCount ?? 0} label="emails sent" color="#7C3AED" />
      </div>

      {/* Status badge + jobs */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
        <span style={{
          background: statusStyle.bg, color: statusStyle.text,
          border: `1px solid ${statusStyle.border}`,
          borderRadius: 20, padding: "3px 12px",
          fontSize: 11, fontWeight: 700, letterSpacing: 0.5,
        }}>
          {company.status ?? "ACTIVE"}
        </span>
        {company.jobs != null && (
          <span style={{ color: "#6B7280", fontSize: 12 }}>
            {company.jobs} active job postings
          </span>
        )}
      </div>

      <div style={{ height: 1, background: "#1F2937" }} />

      <button
        onClick={() => onViewDetails(company)}
        style={{
          background: "none", border: "none", color: "#27C4D6",
          fontSize: 14, fontWeight: 600, cursor: "pointer",
          display: "flex", alignItems: "center", gap: 6, padding: 0,
          transition: "gap 0.2s",
        }}
        onMouseEnter={(e) => { e.currentTarget.style.gap = "10px"; }}
        onMouseLeave={(e) => { e.currentTarget.style.gap = "6px"; }}
      >
        View Details <ArrowForwardIcon style={{ fontSize: 16 }} />
      </button>
    </motion.div>
  );
}

function StatPill({ value, label, color }) {
  return (
    <div style={{
      background: `${color}18`, border: `1px solid ${color}30`,
      borderRadius: 8, padding: "5px 10px",
      display: "flex", flexDirection: "column", alignItems: "center", minWidth: 56,
    }}>
      <span style={{ fontSize: 15, fontWeight: 800, color }}>{value}</span>
      <span style={{ fontSize: 10, color: "#6B7280", whiteSpace: "nowrap" }}>{label}</span>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function OutreachCompanies({ onViewDetails }) {
  const [activeTab, setActiveTab] = useState("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [discoveryOpen, setDiscoveryOpen] = useState(false);

  const { data: companies = [], isLoading, isError, refetch } = useGetCompaniesQuery();

  const tabCounts = {
    All: companies.length,
    Active: companies.filter((c) => c.status === "ACTIVE").length,
    Paused: companies.filter((c) => c.status === "PAUSED").length,
    Completed: companies.filter((c) => c.status === "COMPLETED").length,
  };

  const filtered =
    activeTab === "All"
      ? companies
      : companies.filter((c) => c.status === activeTab.toUpperCase());

  return (
    <div style={{ padding: "32px 36px", maxWidth: 1200, minHeight: "100vh", color: "#fff" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 28, flexWrap: "wrap", gap: 16 }}>
        <div>
          <h1 style={{ fontSize: 32, fontWeight: 800, margin: 0, letterSpacing: -0.5 }}>
            Target Companies
          </h1>
          <p style={{ margin: "6px 0 0", color: "#9CA3AF", fontSize: 14 }}>
            {isLoading ? "Loading…" : `${companies.length} companies tracked`}
          </p>
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          <button
            onClick={() => refetch()}
            title="Refresh"
            style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              width: 40, height: 40,
              background: "#1A1E2C", border: "1px solid #2D3348",
              borderRadius: 10, color: "#9CA3AF", cursor: "pointer",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#27C4D6"; e.currentTarget.style.color = "#27C4D6"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#2D3348"; e.currentTarget.style.color = "#9CA3AF"; }}
          >
            <RefreshIcon style={{ fontSize: 18 }} />
          </button>
          <button
            onClick={() => setDiscoveryOpen(true)}
            style={{
              display: "flex", alignItems: "center", gap: 8,
              background: "transparent", border: "1px solid #27C4D6",
              borderRadius: 10, color: "#27C4D6",
              fontSize: 14, fontWeight: 700, padding: "10px 20px",
              cursor: "pointer", transition: "background 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#27C4D610")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            <AutoAwesomeIcon style={{ fontSize: 16 }} />
            Start Discovery
          </button>
          <button
            onClick={() => setModalOpen(true)}
            style={{
              display: "flex", alignItems: "center", gap: 8,
              background: "linear-gradient(135deg, #27C4D6, #7C3AED)",
              border: "none", borderRadius: 10, color: "#fff",
              fontSize: 14, fontWeight: 700, padding: "10px 20px",
              cursor: "pointer", transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = 0.88)}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = 1)}
          >
            <AddIcon style={{ fontSize: 18 }} />
            Add Company
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 8, marginBottom: 28 }}>
        {TABS.map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button key={tab} onClick={() => setActiveTab(tab)}
              style={{
                background: isActive ? "#27C4D6" : "transparent",
                border: `1px solid ${isActive ? "#27C4D6" : "#2D3348"}`,
                borderRadius: 20, color: isActive ? "#000" : "#9CA3AF",
                fontSize: 13, fontWeight: isActive ? 700 : 500,
                padding: "6px 16px", cursor: "pointer", transition: "all 0.2s",
              }}
            >
              {tab} ({tabCounts[tab]})
            </button>
          );
        })}
      </div>

      {/* Error */}
      {isError && (
        <div style={{
          background: "#EF444415", border: "1px solid #EF444430",
          borderRadius: 12, padding: "16px 20px", marginBottom: 20, color: "#FCA5A5",
        }}>
          Failed to load companies. <button onClick={() => refetch()}
            style={{ background: "none", border: "none", color: "#27C4D6", cursor: "pointer", fontWeight: 600 }}>
            Retry
          </button>
        </div>
      )}

      {/* Grid */}
      {isLoading ? (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 18 }}>
          {[1, 2, 3, 4, 5, 6].map((i) => <SkeletonCard key={i} />)}
        </div>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 18 }}
          >
            {filtered.map((company, i) => (
              <CompanyCard key={company.id} company={company} index={i} onViewDetails={onViewDetails} />
            ))}
          </motion.div>
        </AnimatePresence>
      )}

      {!isLoading && filtered.length === 0 && (
        <div style={{ textAlign: "center", padding: "80px 0", color: "#4B5563" }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🏢</div>
          <p style={{ fontSize: 16 }}>
            {activeTab === "All" ? "No companies added yet." : `No ${activeTab.toLowerCase()} companies.`}
          </p>
        </div>
      )}

      <AddCompanyModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onAdd={() => { }}
      />

      <StartDiscoveryModal
        open={discoveryOpen}
        onClose={() => setDiscoveryOpen(false)}
        companies={companies}
      />
    </div>
  );
}
