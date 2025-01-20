import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import App from "./App";
import Button from "./Button";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Render the Button component in the react-button div
const buttonRoot = ReactDOM.createRoot(document.getElementById("react-button"));
buttonRoot.render(
  <Button label="Get Started" onClick={() => alert("Button clicked!")} isLoading={false} disabled={false} />
);
