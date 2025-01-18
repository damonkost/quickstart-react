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
    <p style={{ margin: 0, padding: 0 }}>{label}</p>
  );

  return (
    <button
      onClick={onClick}
      style={{
        backgroundColor: "transparent", // Transparent background
        border: "none", // No border
        borderRadius: "50%", // Make it circular
        padding: "16px", // Adjust padding as needed
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor,
        opacity,
      }}
    >
      <div // Orb container
        style={{
          width: "60px", // Adjust size as needed
          height: "60px",
          borderRadius: "50%",
          backgroundColor: "lightblue", // Orb color
          boxShadow: "0 0 10px 5px rgba(0, 123, 255, 0.5)", // Glowing effect
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          transition: "all 0.3s ease", // Smooth transitions
        }}
      >
        {Contents}
      </div>
    </button>
  );
};

export default Button;
