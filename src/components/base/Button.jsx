import React from "react";
import ScaleLoader from "react-spinners/ScaleLoader";

const Button = ({ label, onClick, isLoading, disabled }) => {
  const opacity = disabled ? 0.75 : 1;
  const cursor = disabled ? "not-allowed" : "pointer";

  const Contents = isLoading ? (
    <ScaleLoader
      color="#000"
      height={10}
      width={2.5}
      margin={0.5}
      loading={true}
      size={50}
      css={{ display: "block", margin: "0 auto" }}
    />
  ) : (
    <p
      style={{
        margin: 0,
        padding: 0,
        fontFamily: "Courier, monospace",
        fontWeight: "bold",
        fontSize: "18px", // Adjusted font size for better visibility
        background: "linear-gradient(to right, #e60073, #ff1493, #ff69b4, #ffb6c1, #ffc0cb)", // More visible gradient
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        animation: "shimmer 2s linear infinite",
        // Fallback color for browsers that don't support -webkit-background-clip: text
        color: "#e60073", // Matches the first color in the gradient
      }}
    >
      {label}
    </p>
  );

  // ... (button JSX - same as before)
};

export default Button;
