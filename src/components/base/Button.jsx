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
        background: "linear-gradient(to right, #ff0000, #ff7f00, #ffff00, #ff7f00, #0000ff, #ff7f00, #ff7f00)",
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
          width: "300px",
          height: "300px",
          // borderRadius: "50%", // Remove border radius for amorphous shape
          backgroundColor: "rgba(135, 206, 250, 0.5)", // Light blue with transparency
          boxShadow: "0 0 20px 10px rgba(0, 123, 255, 0.7)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          transition: "all 0.3s ease",
          animation: "pulse 1.1s infinite, morph 3s ease-in-out infinite alternate", // Add morph animation
          position: "relative", // To position the whisps
          overflow: "hidden", // To hide whisps that extend beyond the blob
        }}
      >
        {/* Whisps */}
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            style={{
              position: "absolute",
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              backgroundColor: "rgba(255, 255, 255, 0.3)", // White with transparency
              animation: `whisp ${index + 2}s ease-in-out infinite alternate`, // Different animation duration for each whisp
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          />
        ))}

        {Contents}
      </div>
    </button>
  );
};

export default Button;
