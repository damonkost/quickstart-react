import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

export const isPublicKeyMissingError = ({ vapiError }) => {
    return !!vapiError && vapiError.error.statusCode === 403 && vapiError.error.error === "Forbidden";
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
