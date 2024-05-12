import React from "react";
// packages:
import { AnimatePresence } from "framer-motion";
import { useLocation, useRoutes } from "react-router-dom";
// pages:
import Index from "./pages/Index";
import Home from "./pages/Home";

export default function App() {
  const element = useRoutes([
    {
      path: "/",
      element: <Index />,
    },
    {
      path: "/home",
      element: <Home />,
    },
  ]);

  const location = useLocation();

  if (!element) return null;

  return (
    <AnimatePresence mode="wait" initial={false}>
      {React.cloneElement(element, { key: location.pathname })}
    </AnimatePresence>
  );
}
