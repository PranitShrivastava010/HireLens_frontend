import React from "react";
import "./glass-card.css";

export default function CommonCard({ children, className = "", width = "90%", onClick, cursor = "pointer" }) {
  return (
    <div
      className={`glass-card ${className}`}
      style={{ width, cursor: cursor }}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
