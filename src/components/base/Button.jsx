import React from "react";
import ScaleLoader from "react-spinners/ScaleLoader";

const Button = ({ label, onClick, isLoading, disabled = false, logo }) => {
  const opacity = disabled ? 0.75 : 1;
  const cursor = disabled ? "not-allowed" : "pointer";

  // Check if it's the default LegalScout logo
  const isLegalScoutLogo = !logo || logo.includes('glide-prod.appspot.com');

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
        fontFamily: isLegalScoutLogo ? "Courier, monospace" : "Inter, sans-serif",
        fontWeight: "bold",
        fontSize: "24px",
        ...(isLegalScoutLogo ? {
          background: "linear-gradient(to right, #ff0000, #ff7f00, #ffff00, #ff7f00, #0000ff, #ff7f00, #ff7f00)",
          backgroundSize: "200% 200%",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          animation: "shimmer 2s linear infinite",
        } : {
          color: "#1a1a1a",
          textAlign: "center",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          borderRadius: "8px",
          padding: "8px 16px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        }),
        position: "relative",
        zIndex: 2,
        marginBottom: "20px"
      }}
    >
      {label}
    </p>
  );

  return (
    <div className="button-container">
      <button
        onClick={onClick}
        disabled={disabled}
        style={{
          backgroundColor: "transparent",
          border: "none",
          padding: "0px",
          display: "block",
          margin: "0 auto",
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
            background: `url('${logo || "https://res.cloudinary.com/glide/image/fetch/f_auto,w_500,c_limit/https%3A%2F%2Fstorage.googleapis.com%2Fglide-prod.appspot.com%2Fuploads-v2%2FZf7Uh2x67Yz3nEftEH2i%2Fpub%2FipEv2VSSLIL0o0e2ostK.png"}')`,
            backgroundColor: "#ffffff",
            backgroundSize: isLegalScoutLogo ? "cover" : "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            boxShadow: isLegalScoutLogo 
              ? "0 0 40px 10px rgba(0, 0, 100, 0.7)"
              : "0 0 40px 10px rgba(0, 0, 0, 0.15)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            alignItems: "center",
            animation: isLegalScoutLogo 
              ? "pulse 1.1s infinite, morph 3s ease-in-out infinite alternate"
              : "pulse 1.1s infinite",
            position: "relative",
            border: isLegalScoutLogo ? "none" : "2px solid #f0f0f0"
          }}
        >
          <span
            style={{
              content: "''",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%)",
              animation: "emanate 2s infinite alternate",
              zIndex: 1
            }}
          />
          {Contents}
        </div>
      </button>

      <style jsx global>{`
        @keyframes shimmer {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }

        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.02); }
          100% { transform: scale(1); }
        }

        @keyframes morph {
          0% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
          100% { border-radius: 40% 60% 70% 30% / 30% 60% 40% 70%; }
        }

        @keyframes emanate {
          from {
            opacity: 0.5;
            transform: translate(-50%, -50%) scale(0.8);
          }
          to {
            opacity: 0;
            transform: translate(-50%, -50%) scale(1.2);
          }
        }

        .button-container {
          margin: 20px auto;
          text-align: center;
        }

        button:hover > div {
          transform: scale(1.05);
          box-shadow: ${isLegalScoutLogo 
            ? "0 0 40px 15px rgba(0, 0, 100, 0.8)"
            : "0 0 50px 15px rgba(0, 0, 0, 0.2)"};
        }

        button:active > div {
          transform: scale(0.95);
        }
      `}</style>
    </div>
  );
};

export default Button;
