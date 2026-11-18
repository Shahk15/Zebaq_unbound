import { useCallback, useState } from "react";
import { Cursor, Loader, ScrollProgress, SectionIndex } from "./components/common/fx";
import SmoothScroll from "./components/layout/SmoothScroll";
import Home from "./pages/Home";

export default function App() {
  const [ready, setReady] = useState(false);
  const done = useCallback(() => setReady(true), []);

  return (
    <>
      <SmoothScroll />
      {!ready && <Loader onDone={done} />}
      <Cursor />
      <ScrollProgress />
      <SectionIndex />
      <Home play={ready} />
    </>
  );
}