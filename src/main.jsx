import React from "react";
import ReactDOM from "react-dom/client";
// packages:
import { BrowserRouter } from "react-router-dom";
// pages:
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
