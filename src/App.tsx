import { useCallback, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Cursor, Loader, ScrollProgress, SectionIndex } from "./components/common/fx";
import SmoothScroll from "./components/layout/SmoothScroll";
import PageTransition from "./components/common/PageTransition";
import Home from "./pages/Home";
import ServicesPage from "./pages/ServicesPage";
import WorkPage from "./pages/WorkPage";


export default function App() {
  const [ready, setReady] = useState(false);
  const done = useCallback(() => setReady(true), []);

  // Direct visit to an inner page: hold its intro until the loader is gone
  useState(() => {
    if (window.location.pathname !== "/") document.documentElement.dataset.pt = "busy";
  });

  useEffect(() => {
    if (!ready) return;
    delete document.documentElement.dataset.pt;
    window.dispatchEvent(new Event("page:ready"));
  }, [ready]);

  return (
    <>
      <SmoothScroll />
      {!ready && <Loader onDone={done} />}
      <Cursor />
      <ScrollProgress />
      <SectionIndex />
      <PageTransition />
      <Routes>
        <Route path="/" element={<Home play={ready} />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/work" element={<WorkPage />} />
      </Routes>
    </>
  );
}