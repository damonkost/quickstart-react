// src/index.js
import "./index.css";

import App from "./App";
import React from "react";
import ReactDOM from "react-dom/client";

// Render application
const root = ReactDOM.createRoot(document.getElementById("root")); // Changed to "root"

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
