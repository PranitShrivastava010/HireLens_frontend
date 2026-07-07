import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import BarChartIcon from "@mui/icons-material/BarChart";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import OutreachAnalytics from "../../component/outreach/OutreachAnalytics";
import OutreachCompanies from "../../component/outreach/OutreachCompanies";
import OutreachContacts  from "../../component/outreach/OutreachContacts";

// ─── View States ──────────────────────────────────────────────────────────────
// "analytics"  → Outreach Analytics dashboard (default landing)
// "companies"  → LinkedIn: Target Companies grid
// "contacts"   → LinkedIn: Contacts list (after clicking View Details)

export default function OutreachContainer() {
  const [view, setView]               = useState("analytics");
  const [selectedCompany, setSelectedCompany] = useState(null);

  // Navigate from Companies card → Contacts
  const handleViewDetails = (company) => {
    setSelectedCompany(company);
    setView("contacts");
  };

  // Back navigation
  const handleBack = () => {
    if (view === "contacts") {
      setView("companies");
    } else if (view === "companies") {
      setView("analytics");
    }
  };

  const isLinkedInFlow = view === "companies" || view === "contacts";

  return (
    <div style={{ minHeight: "100vh", background: "#0A0F16", color: "#fff" }}>
      {/* ── Top Action Bar ─────────────────────────────────────────────────── */}
      <div style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "rgba(10,15,22,0.85)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid #1E2A3B",
        padding: "0 36px",
        display: "flex",
        alignItems: "center",
        gap: 16,
        height: 64,
      }}>
        {/* Back button when in sub-views */}
        {isLinkedInFlow && (
          <motion.button
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={handleBack}
            style={{
              display: "flex", alignItems: "center", gap: 6,
              background: "#1A1E2C",
              border: "1px solid #2D3348",
              borderRadius: 8,
              color: "#9CA3AF",
              fontSize: 13,
              fontWeight: 600,
              padding: "6px 14px",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#27C4D6"; e.currentTarget.style.color = "#fff"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#2D3348"; e.currentTarget.style.color = "#9CA3AF"; }}
          >
            <ArrowBackIcon style={{ fontSize: 16 }} />
            Back
          </motion.button>
        )}

        {/* Breadcrumb */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#6B7280", flexGrow: 1 }}>
          <span
            style={{ cursor: "pointer", transition: "color 0.2s" }}
            onClick={() => setView("analytics")}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#27C4D6")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#6B7280")}
          >
            Outreach
          </span>
          {view === "companies" && (
            <><span style={{ color: "#374151" }}>/</span><span style={{ color: "#fff" }}>LinkedIn Companies</span></>
          )}
          {view === "contacts" && (
            <>
              <span style={{ color: "#374151" }}>/</span>
              <span style={{ cursor: "pointer", color: "#6B7280" }} onClick={() => setView("companies")}>LinkedIn Companies</span>
              <span style={{ color: "#374151" }}>/</span>
              <span style={{ color: "#fff" }}>{selectedCompany?.name ?? "Contacts"}</span>
            </>
          )}
        </div>

        {/* Primary Action Buttons */}
        <div style={{ display: "flex", gap: 12, marginLeft: "auto" }}>
          <ActionButton
            icon={<LinkedInIcon style={{ fontSize: 18 }} />}
            label="Create LinkedIn Outreach"
            gradient="linear-gradient(135deg, #0A66C2, #0077B5)"
            glow="0 0 20px rgba(10,102,194,0.35)"
            active={view === "companies"}
            onClick={() => setView("companies")}
          />
          <ActionButton
            icon={<EmailIcon style={{ fontSize: 18 }} />}
            label="Create Email Outreach"
            gradient="linear-gradient(135deg, #27C4D6, #7C3AED)"
            glow="0 0 20px rgba(39,196,214,0.3)"
            active={false}
            onClick={() => {/* email outreach TBD */}}
          />
        </div>
      </div>

      {/* ── Page Content ───────────────────────────────────────────────────── */}
      <AnimatePresence mode="wait">
        {view === "analytics" && (
          <PageSlide key="analytics">
            <OutreachAnalytics />
          </PageSlide>
        )}
        {view === "companies" && (
          <PageSlide key="companies">
            <OutreachCompanies onViewDetails={handleViewDetails} />
          </PageSlide>
        )}
        {view === "contacts" && (
          <PageSlide key="contacts">
            <OutreachContacts company={selectedCompany} />
          </PageSlide>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────
function ActionButton({ icon, label, gradient, glow, active, onClick }) {
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      style={{
        display: "flex", alignItems: "center", gap: 8,
        background: active ? gradient : "#1A1E2C",
        border: active ? "none" : "1px solid #2D3348",
        borderRadius: 10,
        color: "#fff",
        fontSize: 13,
        fontWeight: 700,
        padding: "9px 18px",
        cursor: "pointer",
        boxShadow: active ? glow : "none",
        transition: "all 0.25s",
        whiteSpace: "nowrap",
      }}
      onMouseEnter={(e) => {
        if (!active) {
          e.currentTarget.style.background = gradient;
          e.currentTarget.style.border = "none";
          e.currentTarget.style.boxShadow = glow;
        }
      }}
      onMouseLeave={(e) => {
        if (!active) {
          e.currentTarget.style.background = "#1A1E2C";
          e.currentTarget.style.border = "1px solid #2D3348";
          e.currentTarget.style.boxShadow = "none";
        }
      }}
    >
      {icon}
      {label}
    </motion.button>
  );
}

function PageSlide({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
