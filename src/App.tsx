import { useEffect, useState } from "react";
import Loader from "./components/common/Loader";
import Home from "./pages/Home";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [revealed, setRevealed] = useState(false);

  // Safety net: never trap the visitor behind the loader
  useEffect(() => {
    const t = window.setTimeout(() => {
      document.body.style.overflow = "";
      setRevealed(true);
      setLoading(false);
    }, 12000);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <>
      {loading && (
        <Loader
          onReveal={() => setRevealed(true)}
          onDone={() => setLoading(false)}
        />
      )}
      <Home play={revealed} />
    </>
  );
}