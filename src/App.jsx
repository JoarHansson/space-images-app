import React from "react";
// packages:
import { AnimatePresence } from "framer-motion";
import { useLocation, useRoutes, Routes, Route } from "react-router-dom";
// pages:
import Index from "./pages/Index";
import Home from "./pages/Home";

export default function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        {/* Routes */}
        <Route index element={<Index />} />
        <Route path="home" element={<Home />} />

        {/* 404 page */}
        <Route
          path="*"
          element={<div style={{ margin: "2rem" }}>404 - not found</div>}
        />
      </Routes>
    </AnimatePresence>
  );
}
