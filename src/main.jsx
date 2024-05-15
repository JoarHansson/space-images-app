import React from "react";
import ReactDOM from "react-dom/client";
// packages:
import { BrowserRouter, Routes, Route } from "react-router-dom";
// pages:
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<App />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
