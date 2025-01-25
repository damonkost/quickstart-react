import React from 'react';

const Button = ({ label, onClick, isLoading, disabled = false, logoUrl }) => {
  const opacity = disabled ? 0.75 : 1;
  const cursor = disabled ? "not-allowed" : "pointer";

  return (
    <button onClick={onClick} disabled={disabled} style={{ opacity, cursor }}>
      {isLoading ? 'Loading...' : label}
      {logoUrl && <img src={logoUrl} alt="logo" />}
    </button>
  );
};

export default Button;