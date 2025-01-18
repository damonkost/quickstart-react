import React from "react";
import ScaleLoader from "react-spinners/ScaleLoader";

const Button = ({ label, onClick, isLoading, disabled }) => {
  const opacity = disabled ? 0.35 : 1;
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
        fontSize: "28px",
        background:
          "linear-gradient(to right, #f0f0f0, #d9d9d9, #bdbdbd, #969696, #737373, #525252, #282828, #000000)",
        backgroundSize: "400% 400%",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        animation: "shimmer 2s linear infinite",
      }}
    >
      {label}
    </p>
  );

  return (
    <button
      onClick={onClick}
      style={{
        backgroundColor: "transparent",
        border: "none",
        borderRadius: "50%",
        padding: "24px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor,
        opacity,
      }}
    >
      <div
        style={{
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          backgroundColor: "lightblue",
          boxShadow: "0 0 20px 10px rgba(0, 123, 255, 0.7)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          transition: "all 0.3s ease",
          animation: "pulse 1.5s infinite",
        }}
      >
        {Contents}
      </div>
    </button>
  );
};

export default Button;
