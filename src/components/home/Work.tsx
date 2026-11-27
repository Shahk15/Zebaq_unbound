import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { CASES } from "../../data/home/cases";
import type { CaseStudy } from "../../data/home/cases";
import { Split } from "../common/ui";

gsap.registerPlugin(useGSAP, ScrollTrigger);

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 17L17 7M9 7h8v8" />
    </svg>
  );
}

function CaseCard({ c, i }: { c: CaseStudy; i: number }) {
  const dark = (c.theme ?? (c.media ? "dark" : "light")) === "dark";
  return (
    <li className="work-card h-[560px] w-[min(86vw,440px)] shrink-0 snap-center min-[821px]:w-[clamp(340px,34vw,540px)] group-data-[pin=true]/work:h-[calc(100svh_-_88px_-_var(--pt)_-_var(--pb))] group-data-[pin=true]/work:max-h-none">
      <a
        href={c.href}
        data-cursor="hover"
        className={`work-face group relative block h-full overflow-hidden rounded-[28px] ${dark
            ? "bg-[radial-gradient(120%_90%_at_50%_0%,#1c3c78_0%,#0a1f44_45%,#071631_100%)] text-off"
            : "border border-navy/10 bg-glacier text-navy"
          }`}
      >
        {c.media && (
          <div className="work-media absolute inset-0 transition-transform duration-[900ms] ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover:scale-[1.04]">
            {c.media.type === "video" ? (
              <video src={c.media.src} poster={c.media.poster} autoPlay muted loop playsInline className="h-full w-full scale-[1.12] object-cover" />
            ) : (
              <img src={c.media.src} alt={c.media.alt ?? ""} loading="lazy" draggable={false} className="h-full w-full scale-[1.12] object-cover" />
            )}
          </div>
        )}

        {c.media && (
          <span
            aria-hidden="true"
            className={`pointer-events-none absolute inset-0 ${dark
                ? "bg-[linear-gradient(to_top,rgba(7,22,49,0.85)_0%,rgba(7,22,49,0.3)_45%,transparent_72%)]"
                : "bg-[linear-gradient(to_top,rgba(247,246,241,0.95)_0%,rgba(247,246,241,0.5)_40%,transparent_70%)]"
              }`}
          />
        )}

        <span className="absolute left-6 top-6 grid h-10 min-w-10 place-items-center rounded-full bg-off/90 px-3 text-sm font-bold text-navy backdrop-blur-sm">
          0{i + 1}
        </span>

        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-5 p-[clamp(22px,2.2vw,34px)]">
          <div className="min-w-0">
            <h3 className="text-[clamp(28px,2.6vw,42px)] tracking-[-0.045em]">{c.title}</h3>
            <p className={`mt-3 max-w-[34ch] text-[15px] leading-[1.6] ${dark ? "text-off/70" : "text-navy-2"}`}>{c.text}</p>
          </div>
          <span
            className={`grid h-12 w-12 shrink-0 place-items-center rounded-full border transition-colors duration-300 group-hover:border-lemon group-hover:bg-lemon group-hover:text-navy ${dark ? "border-off/40 text-off" : "border-navy/25 text-navy"
              }`}
          >
            <ArrowIcon />
          </span>
        </div>
      </a>
    </li>
  );
}

export default function Work() {
  const sectionRef = useRef<HTMLElement>(null);
  const viewRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLOListElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const view = viewRef.current;
      const track = trackRef.current;
      if (!section || !view || !track) return;

      const q = gsap.utils.selector(section);
      const mm = gsap.matchMedia();

      mm.add(
        {
          motion: "(prefers-reduced-motion: no-preference)",
          pinned: "(min-width: 821px) and (min-height: 480px)",
        },
        (ctx) => {
          const { motion, pinned } = ctx.conditions as { motion: boolean; pinned: boolean };
          const faces = q(".work-face") as HTMLElement[];

          /* Small screens: normal swipe, no pin */
          if (!pinned) {
            if (motion) {
              gsap.from(faces, {
                x: 70, opacity: 0, duration: 0.9, stagger: 0.12, ease: "power3.out",
                scrollTrigger: { trigger: view, start: "top 88%", once: true },
              });
            }
            return;
          }

          section.dataset.pin = "true";

          /* Entrance (only skipped for reduced-motion; the slide below always works) */
          if (motion) {
            gsap.timeline({
              scrollTrigger: { trigger: view, start: "top 95%", end: "top 15%", scrub: 0.8, invalidateOnRefresh: true },
            }).fromTo(
              faces,
              { y: 200, rotate: (i: number) => (i % 2 === 0 ? -5 : 5), scale: 0.92, opacity: 0, transformOrigin: "50% 100%" },
              { y: 0, rotate: 0, scale: 1, opacity: 1, ease: "power3.out", stagger: 0.14 }
            );
          }

          /* Scroll down = cards slide sideways. Only the card area is pinned,
             and it starts 88px from the top so it sits below the fixed navbar. */
          const dist = () => Math.max(0, track.offsetWidth - view.clientWidth);

          const slide = gsap.to(track, {
            x: () => -dist(),
            ease: "none",
            scrollTrigger: {
              trigger: view,
              start: "top 88px",
              end: () => `+=${Math.round(dist() * 1.15)}`,
              pin: true,
              scrub: 0.7,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          if (motion) {
            (q(".work-card") as HTMLElement[]).forEach((card) => {
              const media = card.querySelector(".work-media");
              if (!media) return;
              gsap.fromTo(
                media,
                { xPercent: -4 },
                {
                  xPercent: 4,
                  ease: "none",
                  scrollTrigger: { trigger: card, containerAnimation: slide, start: "left right", end: "right left", scrub: true },
                }
              );
            });
          }

          return () => {
            delete section.dataset.pin;
          };
        }
      );

      return () => mm.revert();
    },
    { scope: sectionRef, dependencies: [] }
  );

  return (
    <section
      ref={sectionRef}
      id="work"
      data-index="07"
      data-label="Featured Work & Results"
      className="on-light group/work relative z-10 bg-off text-navy"
    >
      {/* Header: normal scroll, NOT part of the pin */}
      <div className="wrap flex flex-col justify-between gap-8 pb-6 pt-[clamp(90px,12vw,150px)] md:flex-row md:items-end">
        <div>
          <p className="eyebrow" data-reveal>Featured work & results</p>
          <h2 className="t-xl mt-8">
            <Split text="See what we’ve built for businesses like yours" dot />
          </h2>
        </div>
        <p className="max-w-xs text-lg leading-relaxed text-navy-2" data-reveal>
          The challenge, what we changed, and the outcome we can verify.
        </p>
      </div>

      {/* Pinned area: below the navbar, cards fill it with a gap at the top and bottom */}
      <div
        ref={viewRef}
        style={{ "--pt": "clamp(8px,2vh,24px)", "--pb": "clamp(28px,5vh,56px)" } as React.CSSProperties}
        className="relative snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] group-data-[pin=true]/work:h-[calc(100svh_-_88px)] group-data-[pin=true]/work:snap-none group-data-[pin=true]/work:overflow-hidden"
      >
        <ol
          ref={trackRef}
          className="flex w-max items-start gap-4 pb-[clamp(36px,6vw,80px)] pl-[clamp(16px,3.2vw,64px)] pr-[clamp(16px,3.2vw,64px)] will-change-transform md:gap-5 group-data-[pin=true]/work:pb-[var(--pb)] group-data-[pin=true]/work:pt-[var(--pt)]"
        >
          {CASES.map((c, i) => (
            <CaseCard key={c.slug} c={c} i={i} />
          ))}
        </ol>
      </div>
    </section>
  );
}