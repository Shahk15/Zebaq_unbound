import { useEffect, useRef, useState } from "react";
import type { PointerEvent } from "react";
import { IMAGES } from "../../data/home/images";
import { VIDEOS } from "../../data/shared/videos";
import type { VideoItem } from "../../data/shared/videos";
import { Split } from "../common/ui";
import { AutoCarousel } from "../common/fx";

const FALLBACK = [IMAGES.kintsugi, IMAGES.perfected, IMAGES.broken, IMAGES.ai];

// Accepts a YouTube link or a plain 11 character id
const youtubeId = (s: string) => {
  const m = s.match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{11})/);
  if (m) return m[1];
  return /^[\w-]{11}$/.test(s) ? s : "";
};

/* ---------- One card in the reel ---------- */

function VideoCard({ v, i, onOpen }: { v: VideoItem; i: number; onOpen: () => void }) {
  const vid = useRef<HTMLVideoElement>(null);
  const hasFile = Boolean(v.src);
  const playable = hasFile || Boolean(v.youtube && youtubeId(v.youtube));

  // Hover preview: only with a mouse, and only for video files
  const startPreview = (e: PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    vid.current?.play().catch(() => { });
  };
  const stopPreview = () => {
    const el = vid.current;
    if (!el) return;
    el.pause();
    el.currentTime = 0;
  };

  return (
    <button
      type="button"
      onClick={() => playable && onOpen()}
      onPointerEnter={startPreview}
      onPointerLeave={stopPreview}
      data-cursor={playable ? "Play" : undefined}
      aria-label={playable ? `Play video: ${v.caption}` : v.caption}
      className={`group relative aspect-[4/5] w-[min(78vw,380px)] overflow-hidden rounded-[28px] bg-navy text-left ${i % 2 ? "mt-10" : ""}`}
    >
      <img
        src={v.poster || FALLBACK[i % FALLBACK.length]}
        alt=""
        draggable={false}
        loading="lazy"
        className="absolute inset-0 h-full w-full scale-105 object-cover opacity-60 grayscale transition duration-[1.2s] group-hover:scale-100 group-hover:opacity-85 group-hover:grayscale-0"
      />

      {hasFile && (
        <video
          ref={vid}
          src={v.src}
          poster={v.poster || undefined}
          muted
          loop
          playsInline
          preload="none"
          className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />
      )}

      <span className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />

      {playable && (
        <span
          className={`absolute left-1/2 top-1/2 grid h-20 w-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-lemon text-navy transition duration-500 ${hasFile ? "group-hover:scale-75 group-hover:opacity-0" : "group-hover:scale-110"
            }`}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M8 5v14l11-7z" fill="currentColor" />
          </svg>
        </span>
      )}

      <span className="absolute inset-x-0 bottom-0 p-6">
        <span className="block text-lg font-medium leading-snug tracking-tight text-off">“{v.caption}”</span>
        <span className="mt-2 block text-sm text-glacier-3">
          {v.name} · {v.company}
        </span>
      </span>
    </button>
  );
}

// 09 — Video testimonials: an endless, draggable reel. Hover a clip to preview it,
// click to open it in a lightbox. Slides up over the written quotes.
export default function Videos() {
  const [playing, setPlaying] = useState<number | null>(null);

  const items = Array.from({ length: Math.max(6, VIDEOS.length * 2) }, (_, i) => (
    <VideoCard key={i} v={VIDEOS[i % VIDEOS.length]} i={i} onOpen={() => setPlaying(i % VIDEOS.length)} />
  ));

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
            <p className="mt-4 text-sm text-glacier-3">Drag the reel · hover a clip to preview it</p>
          </div>
        </div>
        <div className="mt-16" data-reveal>
          <AutoCarousel items={items} speed={30} reverse gap={18} />
        </div>
      </div>
      {playing !== null && <Lightbox v={VIDEOS[playing]} onClose={() => setPlaying(null)} />}
    </section>
  );
}

/* ---------- Lightbox: video file or YouTube ---------- */

function Lightbox({ v, onClose }: { v: VideoItem; onClose: () => void }) {
  const vid = useRef<HTMLVideoElement>(null);
  const yt = v.src ? "" : youtubeId(v.youtube ?? "");

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const esc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", esc);
    vid.current?.play().catch(() => { });
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", esc);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[85] grid place-items-center bg-ink/90 p-4 backdrop-blur"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div className="w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
        {v.src ? (
          <video
            ref={vid}
            src={v.src}
            poster={v.poster || undefined}
            controls
            playsInline
            className="max-h-[85vh] w-full rounded-[24px]"
          />
        ) : (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${yt}?autoplay=1&rel=0`}
            title={v.caption}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
            className="aspect-video w-full rounded-[24px]"
          />
        )}
      </div>
      <button
        type="button"
        onClick={onClose}
        className="absolute right-6 top-6 grid h-12 w-12 place-items-center rounded-full bg-lemon text-navy"
        aria-label="Close video"
      >
        ✕
      </button>
    </div>
  );
}