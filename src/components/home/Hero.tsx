import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { HERO } from "../../data/home/hero";
import { IMAGES } from "../../data/home/images";
import { MARKETS, STATS } from "../../data/home/impact";
import { Dot, Pill, Verify } from "../common/ui";
import { DotField } from "../common/fx";

// 02 — Hero. Centred headline over a rearing marble horse mended with gold (kintsugi).
// Cursor: horse turns toward you, marble gilds under the light, seams burn molten,
// dot field bends away; click floods the horse with gold + sends a ripple.
// Scroll (pinned): horse charges toward camera, the two words part, then the screen
// fades to navy and carries you into the next (navy) section.
export default function Hero({ play }: { play: boolean }) {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const gold = useRef<HTMLDivElement>(null);
  const glow = useRef<HTMLDivElement>(null);

  // cursor interaction
  useEffect(() => {
    const sec = root.current!, st = stage.current!, g = gold.current!, gl = glow.current!;
    const fine = matchMedia("(pointer: fine)").matches && !matchMedia("(prefers-reduced-motion: reduce)").matches;
    const rx = gsap.quickTo(st, "rotationY", { duration: 1.2, ease: "power3" });
    const ry = gsap.quickTo(st, "rotationX", { duration: 1.2, ease: "power3" });
    const tx = gsap.quickTo(st, "x", { duration: 1.4, ease: "power3" });
    const gx = gsap.quickTo(gl, "x", { duration: 0.9, ease: "power3" });
    const gy = gsap.quickTo(gl, "y", { duration: 0.9, ease: "power3" });
    const light = { x: 50, y: 40, r: 0 };
    const paint = () => {
      const m = `radial-gradient(circle ${light.r}px at ${light.x}% ${light.y}%, #000 0%, #000 35%, transparent 100%)`;
      g.style.maskImage = m; g.style.webkitMaskImage = m;
    };
    paint();
    gsap.set(gl, { x: sec.clientWidth * 0.5, y: sec.clientHeight * 0.5 });

    if (!fine) {
      const sweep = gsap.timeline({ repeat: -1, yoyo: true, onUpdate: paint });
      sweep.fromTo(light, { x: 25, y: 25, r: 200 }, { x: 75, y: 70, r: 240, duration: 5, ease: "sine.inOut" });
      return () => { sweep.kill(); };
    }
    const onMove = (e: PointerEvent) => {
      const r = sec.getBoundingClientRect();
      const nx = (e.clientX - r.left) / r.width - 0.5, ny = (e.clientY - r.top) / r.height - 0.5;
      rx(nx * 20); ry(-ny * 10); tx(nx * 36);
      gx(e.clientX - r.left); gy(e.clientY - r.top);
      const s = st.getBoundingClientRect();
      gsap.to(light, { x: ((e.clientX - s.left) / s.width) * 100, y: ((e.clientY - s.top) / s.height) * 100, r: 240, duration: 0.6, ease: "power3", onUpdate: paint });
    };
    const onLeave = () => { rx(0); ry(0); tx(0); gsap.to(light, { r: 0, duration: 0.8, onUpdate: paint }); };
    const onDown = (e: PointerEvent) => {
      if ((e.target as HTMLElement).closest("a,button")) return;
      gsap.fromTo(light, { r: 240 }, { r: 1100, duration: 0.9, ease: "expo.out", yoyo: true, repeat: 1, onUpdate: paint });
    };
    sec.addEventListener("pointermove", onMove);
    sec.addEventListener("pointerleave", onLeave);
    sec.addEventListener("pointerdown", onDown);
    return () => {
      sec.removeEventListener("pointermove", onMove);
      sec.removeEventListener("pointerleave", onLeave);
      sec.removeEventListener("pointerdown", onDown);
    };
  }, []);

  // intro once the loader lifts
  useGSAP(
    () => {
      if (!play) return;
      gsap.timeline({ defaults: { ease: "expo.out" } })
        .from(".hz-horse", { yPercent: 16, scale: 1.1, opacity: 0, duration: 2.4 }, 0)
        .fromTo(".hz-glint", { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: 2.6, ease: "power2.inOut" }, 0.4)
        .from(".hz-line .sw > span", { yPercent: 115, duration: 1.6, stagger: 0.08 }, 0.15)
        .from(".hz-fade", { y: 26, opacity: 0, duration: 1.3, stagger: 0.07 }, 0.7);
      gsap.utils.toArray<HTMLElement>(".hz-count").forEach((el) => {
        const o = { v: 0 };
        gsap.to(o, { v: Number(el.dataset.to), duration: 2.2, delay: 0.8, ease: "power3.out", onUpdate: () => (el.textContent = Math.round(o.v).toLocaleString()) });
      });
    },
    { scope: root, dependencies: [play] },
  );

  // pinned scroll scene (created at mount so later triggers measure after it)
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        gsap.timeline({ scrollTrigger: { trigger: root.current, start: "top top", end: "+=130%", scrub: 0.8, pin: true } })
          .to(".hz-horse-wrap", { scale: 1.6, yPercent: -6, ease: "none" }, 0)
          .to(".hz-left", { xPercent: -30, opacity: 0, ease: "none" }, 0)
          .to(".hz-right", { xPercent: 30, opacity: 0, ease: "none" }, 0)
          .to(".hz-tail, .hz-band", { y: -60, opacity: 0, ease: "none" }, 0)
          .to(".hz-field", { opacity: 0, ease: "none" }, 0)
          .fromTo(".hz-veil", { opacity: 0 }, { opacity: 1, ease: "power1.inOut" }, 0.4)
          .from(".hz-veil-word", { yPercent: 60, opacity: 0, ease: "none" }, 0.75);
      });
    },
    { scope: root },
  );

  return (
    <section
      id="top"
      ref={root}
      data-hero
      data-index="02"
      data-label="AI + Human Strategy"
      className="on-light relative h-[100svh] min-h-[620px] overflow-hidden bg-[radial-gradient(120%_80%_at_50%_30%,#ffffff_0%,#eef4f8_45%,#e4eef5_100%)]"
    >
      <DotField interactive top={0.45} className="hz-field absolute inset-0 h-full w-full" />
      <div ref={glow} className="pointer-events-none absolute left-0 top-0 -ml-[22vmin] -mt-[22vmin] h-[44vmin] w-[44vmin] rounded-full bg-lemon/25 blur-[70px]" />

      {/* the horse: now top-centre, just under the header (was bottom-centre) */}
      <div className="hz-horse-wrap pointer-events-none absolute inset-x-0 top-[10%] flex justify-center opacity-40 md:opacity-100" style={{ perspective: "1400px" }}>
        <div ref={stage} className="hz-horse relative h-[48svh] [transform-style:preserve-3d] md:h-[61svh]">
          {/* soft floor shadow (a CSS drop-shadow filter renders as a faint box in Chrome) */}
          <span className="pointer-events-none absolute bottom-[1%] left-1/2 h-[7%] w-[56%] -translate-x-[42%] rounded-[50%] bg-navy/25 blur-2xl" />
          <div className="relative h-full [mask-image:linear-gradient(to_bottom,black_93%,transparent_100%)]">
            <img src={IMAGES.horse} alt="Rearing white marble horse mended with gold kintsugi seams" className="h-full w-auto max-w-none select-none" draggable={false} fetchPriority="high" />
            <img src={IMAGES.horseSeams} alt="" aria-hidden="true" className="hz-glint absolute inset-0 h-full w-auto max-w-none select-none [filter:brightness(1.6)_drop-shadow(0_0_6px_#f5ea3b)]" draggable={false} />
            <div ref={gold} className="absolute inset-0" aria-hidden="true">
              <img src={IMAGES.horse} alt="" className="h-full w-auto max-w-none select-none [filter:sepia(1)_saturate(2.2)_hue-rotate(12deg)_brightness(1.18)_contrast(1.05)]" draggable={false} />
              <img src={IMAGES.horseSeams} alt="" className="absolute inset-0 h-full w-auto max-w-none select-none [filter:brightness(1.8)_drop-shadow(0_0_10px_#f5ea3b)_drop-shadow(0_0_24px_rgba(245,234,59,.8))]" draggable={false} />
            </div>
          </div>
        </div>
      </div>

      <div className="wrap relative flex h-full flex-col pb-[4vh] pt-[max(96px,15vh)]">
        {/* TOP ROW: CTAs on the left, stats on the right (fades out on scroll, as before) */}
        <div className="hz-band grid items-start gap-8 md:grid-cols-[1fr_auto]">
          <div className="max-w-[360px]">
            <p className="hz-fade text-[clamp(15px,2.2vh,19px)] leading-relaxed text-navy">{HERO.sub}</p>
            <div className="hz-fade mt-[2.5vh] flex flex-wrap gap-3">
              <Pill href="#contact" variant="navy">{HERO.primary}</Pill>
              <Pill href="#services" variant="ghost" className="hidden text-navy xl:inline-flex">{HERO.secondary}</Pill>
            </div>
          </div>

          <div className="hidden flex-col items-end md:flex md:pt-3">
            <div>
              <dl className="hz-fade flex">
                {STATS.filter((s) => s.value > 0).map((s) => (
                  <div key={s.label} className="px-7 first:pl-0 last:pr-0 [&:not(:first-child)]:border-l [&:not(:first-child)]:border-navy/35">
                    <dt className="whitespace-nowrap text-[12px] font-bold uppercase tracking-[0.14em] text-navy [&_.verify-tag]:ml-0 [&_.verify-tag]:mt-1.5 [&_.verify-tag]:block [&_.verify-tag]:w-fit">
                      {s.label}<Verify on={s.verify} />
                    </dt>
                    <dd className="mt-1.5 text-[clamp(28px,4.7vh,44px)] font-medium tracking-tight text-navy" style={{ fontFamily: "var(--font-display)" }}>
                      <span className="hz-count" data-to={s.value}>0</span>{s.suffix}
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="hz-fade mt-3 whitespace-nowrap text-[clamp(13px,2vh,15px)] text-navy-2">
                Trusted across {MARKETS.slice(0, 5).map((m) => m.name).join(" · ")} and beyond.
              </p>
            </div>
          </div>
        </div>

        {/* BOTTOM BLOCK: eyebrow, big headline, tagline */}
        <div className="mt-auto text-center">
          <p className="hz-tail hz-fade eyebrow mx-auto text-center">{HERO.eyebrow}</p>

          <h1 className="mt-[1vh] text-center" aria-label={`${HERO.h1.join(" ")} ${HERO.h1Tail}`}>
            <span className="flex flex-wrap justify-center gap-x-[0.24em] text-[clamp(56px,min(12vw,17.6vh),220px)] font-medium leading-[0.86] tracking-[-0.06em]" style={{ fontFamily: "var(--font-display)" }}>
              <span className="hz-line hz-left" data-split><span className="sw"><span>AI-Driven<Dot /></span></span></span>
              <span className="hz-line hz-right" data-split><span className="sw"><span>Human-Led<Dot /></span></span></span>
            </span>
            <span
              className="hz-tail hz-fade mt-[1.8vh] block text-[clamp(18px,2.7vh,26px)] font-medium leading-[1.25] tracking-[-0.02em] text-navy"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Solutions. Strategies. Built around{" "}
              <span className="relative isolate whitespace-nowrap font-semibold">
                <span aria-hidden="true" className="absolute inset-x-0 bottom-[0.06em] -z-10 h-[0.34em] bg-lemon" />
                your business
              </span>
            </span>
          </h1>
        </div>
      </div>

      {/* full-screen navy fade that carries you into the next section */}
      <div className="hz-veil pointer-events-none absolute inset-0 z-20 grid place-items-center bg-ink" style={{ opacity: 0 }}>
        <p className="hz-veil-word text-center text-[clamp(28px,4vw,56px)] font-medium tracking-[-0.04em] text-off" style={{ fontFamily: "var(--font-display)" }}>
          Trusted by brands <span className="text-lemon">across industries</span>
        </p>
      </div>
    </section>
  );
}