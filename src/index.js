import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

const App = () => {
  return (
    <div>
      <header>
        <div className="logo">
          <img
            src="https://res.cloudinary.com/glide/image/fetch/f_auto,h_150,c_limit/https%3A%2F%2Ffirebasestorage.googleapis.com%2Fv0%2Fb%2Fglide-prod.appspot.com%2Fo%2Ficon-images%252Fanonymous-4ec86c98-f143-4160-851d-892f167b223c.png%3Falt%3Dmedia%26token%3Dcdc26513-26ae-48f6-b085-85b8bb806c4c"
            alt="LegalScout Logo"
          />
        </div>
        <nav>
          <a href="#">Home</a>
          <a href="#">My Cases</a>
          <a href="#">About</a>
        </nav>
      </header>

      <main className="hero">
        <h1>LegalScout AI</h1>
        <img
          src="https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/Zf7Uh2x67Yz3nEftEH2i/pub/CGUchpsfP4hSCQZJI1dr.gif"
          alt="Hero Graphic"
        />
      </main>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
