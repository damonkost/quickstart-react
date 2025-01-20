import React from "react";
import ScaleLoader from "react-spinners/ScaleLoader";

const Button = ({ label, onClick, isLoading, disabled = false }) => {
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
      css={{ display: "block", margin: "auto" }}
    />
  ) : (
    <p
      style={{
        margin: 0,
        padding: "0 10px",
        fontFamily: "Courier, monospace",
        fontWeight: "bold",
        fontSize: "32px",
        background:
          "linear-gradient(to right, #ff0000, #ff7f00, #ffff00, #ff7f00, #0000ff, #ff7f00, #ff7f00)",
        backgroundSize: "200% 200%",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        animation: "shimmer 2s linear infinite",
      }}
    >
      {label}
    </p>
  );

  return (
    <div className="button-container">
      <button
        onClick={onClick}
        style={{
          backgroundColor: "transparent",
          border: "none",
          padding: "-10px", 
          display: "block",  // Ensures the button is a block-level element
          margin: "0 auto",  // Centers the button horizontally
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          cursor,
          opacity,
          transition: "all 0.3s ease",
        }}
      >
        <div
          style={{
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            background: `url('https://res.cloudinary.com/glide/image/fetch/f_auto,w_500,c_limit/https%3A%2F%2Fstorage.googleapis.com%2Fglide-prod.appspot.com%2Fuploads-v2%2FZf7Uh2x67Yz3nEftEH2i%2Fpub%2FipEv2VSSLIL0o0e2ostK.png')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            boxShadow: "0 0 40px 10px rgba(0, 0, 100, 0.7)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            alignItems: "center",
            animation:
              "pulse 1.1s infinite, morph 3s ease-in-out infinite alternate",
            position: "relative",
          }}
        >
          <span
            style={{
              content: "''",
              position: "absolute",
              top: "100%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%)",
              animation: "emanate 2s infinite alternate",
            }}
          />

          {Contents}
        </div>
      </button>
    </div>
  );
};

export default Button;
