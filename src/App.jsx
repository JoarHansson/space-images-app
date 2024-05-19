import React from "react";
// packages:
import { AnimatePresence } from "framer-motion";
import { useLocation, useRoutes, Routes, Route } from "react-router-dom";
// pages:
import Index from "./pages/Index/Index";
import Home from "./pages/Home/Home";
import Likes from "./pages/Likes/Likes";
import NotFound from "./pages/NotFound/NotFound";
// css:
import "./index.css";

export default function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        {/* Routes */}
        <Route index element={<Index />} />
        <Route path="home" element={<Home />} />
        <Route path="likes" element={<Likes />} />

        {/* 404 page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
}
