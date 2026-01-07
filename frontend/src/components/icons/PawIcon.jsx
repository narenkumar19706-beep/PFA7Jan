import React from "react";

export default function PawIcon({ className = "w-6 h-6" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Main pad - larger oval at bottom */}
      <ellipse cx="12" cy="17" rx="5" ry="4" />
      
      {/* Toe pads - arranged like a real paw */}
      <ellipse cx="6.5" cy="10" rx="2.2" ry="2.5" />
      <ellipse cx="10.5" cy="7" rx="2" ry="2.3" />
      <ellipse cx="14.5" cy="7.5" rx="2" ry="2.3" />
      <ellipse cx="18" cy="10.5" rx="2.2" ry="2.5" />
    </svg>
  );
}
