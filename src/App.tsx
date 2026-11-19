import { useCallback, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Cursor, Loader, ScrollProgress, SectionIndex } from "./components/common/fx";
import SmoothScroll from "./components/layout/SmoothScroll";
import Aboutus from "./pages/Aboutus";
import Home from "./pages/Home";

export default function App() {
  const [ready, setReady] = useState(false);
  const done = useCallback(() => setReady(true), []);

  return (
    <BrowserRouter>
      <SmoothScroll />
      {!ready && <Loader onDone={done} />}
      <Cursor />
      <ScrollProgress />
      <SectionIndex />
      <Routes>
        <Route path="/" element={<Home play={ready} />} />
        <Route path="/about" element={<Aboutus play={ready} />} />
        <Route path="*" element={<Home play={ready} />} />
      </Routes>
    </BrowserRouter>
  );
}