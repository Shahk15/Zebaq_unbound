import { useEffect, useState } from "react";
import { TESTIMONIALS } from "../../data/content";
import { Arrow, Split, Verify } from "../common/ui";

// 08 — Written testimonials: auto-advancing, with a progress ring per quote.
export default function Testimonials() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = TESTIMONIALS.length;
  const t = TESTIMONIALS[i];

  useEffect(() => {
    if (paused) return;
    const id = setTimeout(() => setI((v) => (v + 1) % n), 7000);
    return () => clearTimeout(id);
  }, [i, paused, n]);

  return (
    <section data-index="08" data-label="Written Testimonials" className="on-light section bg-glacier" onPointerEnter={() => setPaused(true)} onPointerLeave={() => setPaused(false)}>
      <div className="wrap">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="eyebrow" data-reveal>Client stories</p>
            <h2 className="t-xl mt-8"><Split text="In their words" dot /></h2>
          </div>
          <div className="flex items-center gap-4" data-reveal>
            <span className="tabular-nums text-navy-2">0{i + 1} / 0{n}</span>
            <button onClick={() => setI((i - 1 + n) % n)} aria-label="Previous testimonial" className="grid h-14 w-14 rotate-[-135deg] place-items-center rounded-full shadow-[inset_0_0_0_1px_rgba(10,31,68,.25)] transition hover:bg-navy hover:text-off"><Arrow /></button>
            <button onClick={() => setI((i + 1) % n)} aria-label="Next testimonial" className="grid h-14 w-14 rotate-45 place-items-center rounded-full bg-navy text-off transition hover:bg-lemon hover:text-navy"><Arrow /></button>
          </div>
        </div>

        <figure className="relative mt-16 overflow-hidden rounded-[32px] bg-off p-8 md:p-16" data-zoom>
          <span className="pointer-events-none absolute -right-6 -top-16 select-none text-[340px] leading-none text-glacier-2" style={{ fontFamily: "var(--font-display)" }} aria-hidden="true">”</span>
          <div className="relative flex gap-1 text-lemon-deep" aria-label="5 out of 5">★★★★★</div>
          <blockquote key={i} className="relative mt-8 max-w-[28ch] animate-[fadein_.6s_ease] text-[clamp(30px,4vw,64px)] font-medium leading-[1.06] tracking-[-0.045em]" style={{ fontFamily: "var(--font-display)" }}>
            “{t.quote}”
          </blockquote>
          <figcaption className="relative mt-12 flex flex-wrap items-center gap-4">
            <span className="grid h-14 w-14 place-items-center rounded-full bg-navy text-lg font-semibold text-off">{t.name[0]}</span>
            <span>
              <span className="block text-lg font-semibold">{t.name}<Verify on={t.verify} /></span>
              <span className="block text-sm text-navy-2">{t.company} · {t.service}</span>
            </span>
          </figcaption>
          <div className="relative mt-10 flex gap-2">
            {TESTIMONIALS.map((_, k) => (
              <button key={k} onClick={() => setI(k)} aria-label={`Testimonial ${k + 1}`} className="h-1 flex-1 overflow-hidden rounded-full bg-navy/10">
                <span key={`${i}-${k}`} className="block h-full origin-left bg-navy" style={{ transform: k < i ? "scaleX(1)" : "scaleX(0)", animation: k === i && !paused ? "grow 7s linear forwards" : undefined }} />
              </button>
            ))}
          </div>
        </figure>
      </div>
      <style>{`@keyframes grow{from{transform:scaleX(0)}to{transform:scaleX(1)}}`}</style>
    </section>
  );
}
