import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import BusinessIcon from "@mui/icons-material/Business";
import CircularProgress from "@mui/material/CircularProgress";
import { useAddCompanyMutation } from "../../features/linkedinOutreach/linkedOutreachApi";

export default function AddCompanyModal({ open, onClose, onAdd }) {
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  const [addCompany, { isLoading }] = useAddCompanyMutation();

  const handleAdd = async () => {
    const lines = text
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);
    if (lines.length === 0) {
      setError("Please enter at least one company name.");
      return;
    }

    try {
      await addCompany({ companies: lines }).unwrap();
      onAdd(lines);
      setText("");
      setError("");
      onClose();
    } catch (err) {
      setError(err?.data?.message || "Failed to add companies. Please try again.");
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.65)",
              backdropFilter: "blur(6px)",
              zIndex: 1000,
            }}
          />
          {/* Modal */}
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.9,
              x: "-50%",
              y: "calc(-50% + 40px)",
            }}
            animate={{
              opacity: 1,
              scale: 1,
              x: "-50%",
              y: "-50%",
            }}
            exit={{
              opacity: 0,
              scale: 0.9,
              x: "-50%",
              y: "calc(-50% + 40px)",
            }}
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              zIndex: 1001,
              width: 540,
              maxWidth: "90vw",
            }}
          >
            {/* Close */}
            <button
              onClick={onClose}
              style={{
                position: "absolute",
                top: 18,
                right: 18,
                background: "#1F2937",
                border: "none",
                color: "#9CA3AF",
                borderRadius: 8,
                width: 32,
                height: 32,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#374151")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#1F2937")}
            >
              <CloseIcon style={{ fontSize: 18 }} />
            </button>

            {/* Icon */}
            <div style={{
              width: 48, height: 48, borderRadius: 12,
              background: "linear-gradient(135deg, #27C4D620, #7C3AED20)",
              border: "1px solid #27C4D640",
              display: "flex", alignItems: "center", justifyContent: "center",
              marginBottom: 20,
            }}>
              <BusinessIcon style={{ color: "#27C4D6", fontSize: 24 }} />
            </div>

            <h2 style={{ margin: "0 0 6px", fontSize: 22, fontWeight: 800, color: "#fff" }}>
              Add Target Companies
            </h2>
            <p style={{ margin: "0 0 20px", color: "#6B7280", fontSize: 14, lineHeight: 1.5 }}>
              Enter company names below — one per line. HireLens will discover
              relevant contacts (recruiters, engineers, hiring managers) for each.
            </p>

            {/* Textarea */}
            <textarea
              value={text}
              onChange={(e) => {
                setText(e.target.value);
                setError("");
              }}
              placeholder={`Google\nMicrosoft\nAtlassian\nStripe\n...`}
              rows={8}
              style={{
                width: "100%",
                background: "#0D1117",
                border: `1px solid ${error ? "#EF4444" : "#27C4D630"}`,
                borderRadius: 12,
                color: "#fff",
                fontSize: 15,
                padding: "14px 16px",
                resize: "vertical",
                outline: "none",
                fontFamily: "inherit",
                lineHeight: 1.8,
                boxSizing: "border-box",
                transition: "border-color 0.2s",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#27C4D6")}
              onBlur={(e) => (e.target.style.borderColor = error ? "#EF4444" : "#27C4D630")}
            />

            {error && (
              <p style={{ color: "#EF4444", fontSize: 12, margin: "8px 0 0" }}>{error}</p>
            )}

            <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
              <button
                onClick={onClose}
                style={{
                  flex: 1,
                  padding: "12px 0",
                  background: "#1F2937",
                  border: "1px solid #374151",
                  borderRadius: 10,
                  color: "#9CA3AF",
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#374151")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#1F2937")}
              >
                Cancel
              </button>
              <button
                onClick={handleAdd}
                disabled={isLoading}
                style={{
                  flex: 2,
                  padding: "12px 0",
                  background: "linear-gradient(135deg, #27C4D6, #7C3AED)",
                  border: "none",
                  borderRadius: 10,
                  color: "#fff",
                  fontSize: 14,
                  fontWeight: 700,
                  cursor: isLoading ? "not-allowed" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  transition: "opacity 0.2s",
                  opacity: isLoading ? 0.7 : 1,
                }}
                onMouseEnter={(e) => (!isLoading && (e.currentTarget.style.opacity = 0.88))}
                onMouseLeave={(e) => (!isLoading && (e.currentTarget.style.opacity = 1))}
              >
                {isLoading ? (
                  <CircularProgress size={18} style={{ color: "#fff" }} />
                ) : (
                  <AddIcon style={{ fontSize: 18 }} />
                )}
                {isLoading ? "Adding..." : "Add Companies"}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
