// src/index.js
import "./index.css";

import App from "./App";
import React from "react";
import { createRoot } from "react-dom/client";

// Render application
const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
