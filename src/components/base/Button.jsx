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
        fontSize: "38px",
        background: "linear-gradient(to right, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #8f00ff)",
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
          width: "100px",
          height: "100px",
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
