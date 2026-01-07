import React from "react";

export default function PawIcon({ className = "w-6 h-6" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Main pad */}
      <ellipse cx="12" cy="16" rx="4" ry="3.5" />
      
      {/* Toe pads - top row */}
      <circle cx="7" cy="10" r="2" />
      <circle cx="11" cy="7" r="2" />
      <circle cx="17" cy="10" r="2" />
      
      {/* Toe pad - middle top */}
      <circle cx="14" cy="8" r="1.8" />
    </svg>
  );
}
