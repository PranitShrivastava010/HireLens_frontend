import React from "react";
import "./glass-card.css";

export default function CommonCard({ children, className = "", width = "90%", onClick, }) {
  return (
    <div
      className={`glass-card ${className}`}
      style={{ width }}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
