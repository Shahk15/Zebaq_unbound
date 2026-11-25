import { useCallback, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Cursor, Loader, ScrollProgress, SectionIndex } from "./components/common/fx";
import SmoothScroll from "./components/layout/SmoothScroll";
import Footer from "./components/layout/Footer";
import PageTransition from "./components/common/PageTransition";
import BookingDialog from "./components/svc/BookingDialog";
import Home from "./pages/Home";
import ServicesPage from "./pages/ServicesPage";
import WorkPage from "./pages/WorkPage";
import ServicePage from "./pages/services/ServicePage";
import RefundPolicyPage from "./pages/legal/RefundPolicyPage";
import TermsPage from "./pages/legal/TermsPage";
import PrivacyPage from "./pages/legal/PrivacyPage";
import AboutPage from "./pages/AboutPage";
import CareersPage from "./pages/CareersPage";
import TeamPage from "./pages/TeamPage";
import InsightsPage from "./pages/InsightsPage";
import WhiteLabelPage from "./pages/WhiteLabelPage";

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
      <BookingDialog />

      <Routes>
        <Route path="/" element={<Home play={revealed} />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/work" element={<WorkPage />} />

        {/* Service detail pages */}
        <Route path="/services/:slug" element={<ServicePage />} />

        {/* Legal pages */}
        <Route path="/refund-policy" element={<RefundPolicyPage />} />
        <Route path="/terms-and-conditions" element={<TermsPage />} />
        <Route path="/privacy-policy" element={<PrivacyPage />} />

        <Route path="/about" element={<AboutPage />} />
        <Route path="/career" element={<CareersPage />} />
        <Route path="/careers" element={<CareersPage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/insights" element={<InsightsPage />} />
        <Route path="/white-label" element={<WhiteLabelPage />} />
        
      </Routes>

      <Footer key={pathname} />
    </>
  );
}