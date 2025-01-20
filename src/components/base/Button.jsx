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
        background:
          "linear-gradient(to right, #ff0000, #ff7f00, #ffff00, #ff7f00, #0000ff, #ff7f00, #ff7f00)",
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
        padding: "24px",
        display: "flex",
        flexDirection: "column", // Added to stack image and text vertically
        justifyContent: "center",
        alignItems: "center",
        cursor,
        opacity,
      }}
    >
      <img
        src="https://res.cloudinary.com/glide/image/fetch/f_auto,w_500,c_limit/https%3A%2F%2Fstorage.googleapis.com%2Fglide-prod.appspot.com%2Fuploads-v2%2FZf7Uh2x67Yz3nEftEH2i%2Fpub%2FipEv2VSSLIL0o0e2ostK.png"
        alt="LegalScout Icon"
        style={{ width: "80px", height: "80px", marginBottom: "10px" }}
      />

      <div
        style={{
          width: "300px",
          height: "100px", // Adjusted height
          borderRadius: "50%",
          background:
            "radial-gradient(circle at 50% 50%, rgba(0, 0, 100, 0.8), rgba(0, 0, 50, 0.2))",
          boxShadow: "0 0 20px 10px rgba(0, 0, 100, 0.7)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          transition: "all 0.3s ease",
          animation:
            "pulse 1.1s infinite, morph 3s ease-in-out infinite alternate",
        }}
      >
        {Contents}
      </div>
    </button>
  );
};

export default Button;
