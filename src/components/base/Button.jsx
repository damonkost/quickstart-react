import React from "react";
import ScaleLoader from "react-spinners/ScaleLoader";

const Button = ({ label, onClick, isLoading, disabled }) => {
  // ... (opacity and cursor logic - same as before)

  return (
    <button
      onClick={onClick}
      style={{
        backgroundColor: "transparent",
        border: "none",
        borderRadius: "50%",
        padding: "24px", // Increased padding
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor,
        opacity,
      }}
    >
      <div // Orb container
        style={{
          width: "100px", // Increased size
          height: "100px",
          borderRadius: "50%",
          backgroundColor: "lightblue",
          boxShadow: "0 0 20px 10px rgba(0, 123, 255, 0.7)", // More glow
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          transition: "all 0.3s ease",
          animation: "pulse 1.5s infinite", // Added pulsating animation
        }}
      >
        {Contents}
      </div>
    </button>
  );
};

export default Button;
