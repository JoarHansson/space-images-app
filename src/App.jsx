import React from "react";
// packages:
import { AnimatePresence } from "framer-motion";
import { useLocation, Routes, Route } from "react-router-dom";
// pages:
import Index from "./pages/Index/Index";
import Explore from "./pages/Explore/Explore";
import Likes from "./pages/Likes/Likes";
import NotFound from "./pages/NotFound/NotFound";
// css/font:
import "./index.css";
import "@fontsource-variable/karla";

export default function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        {/* Routes */}
        <Route index element={<Index />} />
        <Route path="explore" element={<Explore />} />
        <Route path="likes" element={<Likes />} />

        {/* 404 page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
}
