import { useCallback, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Cursor, Loader, ScrollProgress, SectionIndex } from "./components/common/fx";
import SmoothScroll from "./components/layout/SmoothScroll";
import Footer from "./components/layout/Footer";
import PageTransition from "./components/common/PageTransition";
import Home from "./pages/Home";
import ServicesPage from "./pages/ServicesPage";
import WorkPage from "./pages/WorkPage";
import AiSearchVisibilityPage from "./pages/services/AiSearchVisibilityPage";
import WebDevelopmentPage from "./pages/services/WebDevelopmentPage";
import RefundPolicyPage from "./pages/legal/RefundPolicyPage";
import TermsPage from "./pages/legal/TermsPage";
import PrivacyPage from "./pages/legal/PrivacyPage";

export default function App() {
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  // The loader belongs to Home: it only shows when the very first page opened is "/"
  const [showLoader, setShowLoader] = useState(() => window.location.pathname === "/");
  // Home's intro starts when the curtain begins to lift (or at once if there was no loader)
  const [revealed, setRevealed] = useState(() => window.location.pathname !== "/");

  const reveal = useCallback(() => setRevealed(true), []);
  const done = useCallback(() => setShowLoader(false), []);

  return (
    <>
      <SmoothScroll />
      {showLoader && <Loader onReveal={reveal} onDone={done} />}
      <Cursor />
      <ScrollProgress />
      {isHome && <SectionIndex />}
      <PageTransition />

      <Routes>
        <Route path="/" element={<Home play={revealed} />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/work" element={<WorkPage />} />

        {/* Service detail pages */}
        <Route path="/services/ai-search-visibility" element={<AiSearchVisibilityPage />} />
        <Route path="/services/web-development" element={<WebDevelopmentPage />} />

        {/* Legal pages */}
        <Route path="/refund-policy" element={<RefundPolicyPage />} />
        <Route path="/terms-and-conditions" element={<TermsPage />} />
        <Route path="/privacy-policy" element={<PrivacyPage />} />
      </Routes>

      <Footer key={pathname} />
    </>
  );
}