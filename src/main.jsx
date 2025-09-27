import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import App from "./app.jsx";
import Providers from "./providers/Providers.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Providers>
      <App />
    </Providers>
  </React.StrictMode>
);
