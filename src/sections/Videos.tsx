import { useEffect, useRef, useState } from "react";
import { IMAGES, VIDEOS } from "../content";
import { Split, Verify } from "../components/ui";
import { AutoCarousel } from "../components/fx";

const FALLBACK = [IMAGES.kintsugi, IMAGES.perfected, IMAGES.broken, IMAGES.ai];

// 09 — Video testimonials: an endless, draggable reel of click-to-play cards
// that opens a captioned lightbox player. Slides up over the written quotes.
// Hidden in production until real clips are added to VIDEOS in content.ts.
export default function Videos() {
  const [playing, setPlaying] = useState<number | null>(null);
  const hasAny = VIDEOS.some((v) => v.src);
  if (!hasAny && !import.meta.env.DEV) return null;

  const card = (i: number) => {
    const v = VIDEOS[i % VIDEOS.length];
    return (
      <button
        onClick={() => v.src && setPlaying(i % VIDEOS.length)}
        className={`group relative aspect-[4/5] w-[min(78vw,380px)] overflow-hidden rounded-[28px] bg-navy text-left ${i % 2 ? "mt-10" : ""}`}
      >
        <img src={v.poster || FALLBACK[i % FALLBACK.length]} alt="" draggable={false} className="absolute inset-0 h-full w-full scale-105 object-cover opacity-60 grayscale transition duration-[1.2s] group-hover:scale-100 group-hover:opacity-85 group-hover:grayscale-0" loading="lazy" />
        <span className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
        <span className="absolute left-1/2 top-1/2 grid h-20 w-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-lemon text-navy transition duration-500 group-hover:scale-110">
          <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z" fill="currentColor" /></svg>
        </span>
        <span className="absolute inset-x-0 bottom-0 p-6">
          <span className="block text-lg font-medium leading-snug tracking-tight text-off">“{v.caption}”</span>
          <span className="mt-2 block text-sm text-glacier-3">{v.name} · {v.company}{!v.src && <Verify on />}</span>
        </span>
      </button>
    );
  };
  const items = Array.from({ length: Math.max(6, VIDEOS.length * 2) }, (_, i) => card(i));

  return (
    <section data-dark data-over data-index="09" data-label="Video Testimonials" className="grain relative bg-ink text-off">
      <div className="section">
        <div className="wrap flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="eyebrow text-glacier-3" data-reveal>Video testimonials</p>
            <h2 className="t-xl mt-8"><Split text="Hear it from them" dot /></h2>
          </div>
          <div className="max-w-sm" data-reveal>
            <p className="text-lg leading-relaxed text-glacier-3">Real clients, unscripted. Captions on every clip.</p>
            <p className="mt-4 text-sm text-glacier-3">Drag the reel · hover to slow down</p>
          </div>
        </div>
        <div className="mt-16" data-reveal>
          <AutoCarousel items={items} speed={30} reverse gap={18} />
        </div>
        {!hasAny && import.meta.env.DEV && <p className="wrap mt-12 text-sm text-red-300">Dev note: add real client clips (mp4 + poster) in VIDEOS — this section is hidden in production until then.</p>}
      </div>
      {playing !== null && <Lightbox src={VIDEOS[playing].src} poster={VIDEOS[playing].poster} onClose={() => setPlaying(null)} />}
    </section>
  );
}

function Lightbox({ src, poster, onClose }: { src: string; poster: string; onClose: () => void }) {
  const vid = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const esc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    addEventListener("keydown", esc);
    vid.current?.play().catch(() => {});
    return () => { document.body.style.overflow = ""; removeEventListener("keydown", esc); };
  }, [onClose]);
  return (
    <div className="fixed inset-0 z-[85] grid place-items-center bg-ink/90 p-4 backdrop-blur" role="dialog" aria-modal="true" onClick={onClose}>
      <video ref={vid} src={src} poster={poster || undefined} controls playsInline className="max-h-[85vh] w-full max-w-5xl rounded-[24px]" onClick={(e) => e.stopPropagation()} />
      <button onClick={onClose} className="absolute right-6 top-6 grid h-12 w-12 place-items-center rounded-full bg-lemon text-navy" aria-label="Close video">✕</button>
    </div>
  );
}
