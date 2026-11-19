
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Split } from "../common/ui";
import { WHY_ITEMS, WHY_SIDES } from "../../data/why";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// Both images need a transparent background (PNG or WebP)
const CRACKED = "/images/why/cracked.png";
const PERFECT = "/images/why/perfect.png";

// Scroll lengths on desktop, in viewport heights
const CHOREO_VH = 240;
const COVER_VH = 100;
const STEP = 0.9;

export default function Why() {
  const root = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const spacerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = root.current;
      const pinEl = pinRef.current;

      if (!section || !pinEl) return;

      const q = gsap.utils.selector(section);
      const mm = gsap.matchMedia();

      mm.add(
        {
          motion: "(prefers-reduced-motion: no-preference)",
          pinned: "(min-width: 821px) and (min-height: 560px)",
        },
        (ctx) => {
          const { motion, pinned } = ctx.conditions as {
            motion: boolean;
            pinned: boolean;
          };

          if (!motion) return;

          const items = q(".why-item") as HTMLElement[];
          const lines = q(".why-line");

          // Starting states
          gsap.set(items, { y: 140, opacity: 0 });
          gsap.set(lines, { scaleX: 0 });

          /* ---------- Small screens: no pin, everything plays once ---------- */
          if (!pinned) {
            gsap.fromTo(
              q(".why-statue-l"),
              { xPercent: -45, opacity: 0 },
              {
                xPercent: 0,
                opacity: 1,
                duration: 1.1,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: pinEl,
                  start: "top 80%",
                  once: true,
                },
              }
            );

            gsap.fromTo(
              q(".why-statue-r"),
              { xPercent: 45, opacity: 0 },
              {
                xPercent: 0,
                opacity: 1,
                duration: 1.1,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: pinEl,
                  start: "top 80%",
                  once: true,
                },
              }
            );

            gsap.to(items, {
              y: 0,
              opacity: 1,
              duration: 0.9,
              stagger: 0.14,
              ease: "power3.out",
              scrollTrigger: {
                trigger: q(".why-list")[0],
                start: "top 85%",
                once: true,
              },
            });

            gsap.to(lines, {
              scaleX: 1,
              duration: 0.9,
              stagger: 0.14,
              ease: "power2.inOut",
              scrollTrigger: {
                trigger: q(".why-list")[0],
                start: "top 85%",
                once: true,
              },
            });

            return;
          }

          // Empty space below the pinned part
          const spacer = spacerRef.current;

          if (spacer) {
            spacer.style.height = `${CHOREO_VH}svh`;
          }

          /* ---------- Desktop 1: statues arrive ---------- */

          gsap
            .timeline({
              scrollTrigger: {
                trigger: section,
                start: "top 88%",
                end: "top top",
                scrub: 0.8,
                invalidateOnRefresh: true,
              },
            })
            .fromTo(
              q(".why-statue-l"),
              {
                xPercent: -80,
                rotate: -6,
                scale: 0.92,
                opacity: 0,
                transformOrigin: "0% 100%",
              },
              {
                xPercent: 0,
                rotate: 0,
                scale: 1,
                opacity: 1,
                ease: "power3.out",
              },
              0
            )
            .fromTo(
              q(".why-statue-r"),
              {
                xPercent: 80,
                rotate: 6,
                scale: 0.92,
                opacity: 0,
                transformOrigin: "100% 100%",
              },
              {
                xPercent: 0,
                rotate: 0,
                scale: 1,
                opacity: 1,
                ease: "power3.out",
              },
              0
            );

          /* ---------- Desktop 2: pinned reasons ---------- */

          const choreoLen = (items.length - 1) * STEP + 1 + 0.6;
          const coverLen = choreoLen * (COVER_VH / CHOREO_VH);

          const tl = gsap.timeline({
            defaults: { ease: "power3.out" },
            scrollTrigger: {
              trigger: pinEl,
              start: "top top",
              end: () =>
                `+=${Math.round(
                  window.innerHeight * ((CHOREO_VH + COVER_VH) / 100)
                )}`,
              pin: true,
              pinSpacing: false,
              scrub: 0.8,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          // Reasons rise one by one
          items.forEach((item, i) => {
            tl.to(
              item,
              {
                y: 0,
                opacity: 1,
                duration: 1,
              },
              i * STEP
            ).to(
              item.querySelector(".why-line"),
              {
                scaleX: 1,
                duration: 0.9,
                ease: "power2.inOut",
              },
              i * STEP
            );
          });

          // Statues slowly rise and lean toward the center
          tl.to(
            q(".why-img-l"),
            {
              xPercent: 3,
              yPercent: -3,
              ease: "none",
              duration: choreoLen,
            },
            0
          ).to(
            q(".why-img-r"),
            {
              xPercent: -3,
              yPercent: -3,
              ease: "none",
              duration: choreoLen,
            },
            0
          );

          // Cover phase
          tl.to(
            pinEl,
            {
              scale: 0.9,
              transformOrigin: "50% 100%",
              ease: "none",
              duration: coverLen,
            },
            choreoLen
          ).to(
            q(".why-shade"),
            {
              opacity: 0.6,
              ease: "none",
              duration: coverLen,
            },
            choreoLen
          );

          return () => {
            if (spacer) spacer.style.height = "";
          };
        }
      );

      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      data-over
      data-dark
      data-index="11"
      data-label="Why Zebaq"
      className="relative bg-ink text-off"
    >
      <div
        ref={pinRef}
        className="relative flex min-h-[100svh] flex-col overflow-hidden bg-ink min-[821px]:h-[100svh] min-[821px]:min-h-[560px]"
      >
        {/* Soft blue glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_45%_at_50%_42%,rgba(28,60,120,0.55),transparent_70%)]"
        />

        {/* ===== Statues ===== */}
        <div className="relative z-0 grid grid-cols-2 gap-3 px-[4.4vw] pt-24 min-[821px]:contents">

          {/* Left: cracked statue */}
          <figure
            className="why-statue-l relative m-0 min-[821px]:absolute min-[821px]:inset-y-0 min-[821px]:left-0 min-[821px]:w-[min(44vw,720px)] [@media(min-width:821px)_and_(max-width:1100px)]:w-[35vw]"
          >
            <div className="mb-3 min-[821px]:absolute min-[821px]:left-[4.4vw] min-[821px]:top-[clamp(92px,12vh,128px)] min-[821px]:z-10 min-[821px]:mb-0">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-lemon">
                [ {WHY_SIDES.left.tag} ]
              </p>

              <p
                className="mt-2 text-[clamp(16px,1.7vw,26px)] leading-tight text-off"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {WHY_SIDES.left.line}
              </p>
            </div>

            <div className="why-img-l relative mx-auto aspect-[2/3] h-[38svh] min-[821px]:absolute min-[821px]:bottom-[-14%] min-[821px]:left-[-4vw] min-[821px]:mx-0 min-[821px]:h-[min(92%,50vw)]">
              <img
                src={CRACKED}
                alt="A cracked marble statue"
                draggable={false}
                className="h-full w-full select-none object-contain"
              />
            </div>
          </figure>

          {/* Right: perfect statue */}
          <figure
            className="why-statue-r relative m-0 min-[821px]:absolute min-[821px]:inset-y-0 min-[821px]:right-0 min-[821px]:w-[min(44vw,720px)] [@media(min-width:821px)_and_(max-width:1100px)]:w-[35vw]"
          >
            <div className="mb-3 text-right min-[821px]:absolute min-[821px]:right-[4.4vw] min-[821px]:top-[clamp(92px,12vh,128px)] min-[821px]:z-10 min-[821px]:mb-0">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-lemon">
                [ {WHY_SIDES.right.tag} ]
              </p>

              <p
                className="mt-2 text-[clamp(16px,1.7vw,26px)] leading-tight text-off"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {WHY_SIDES.right.line}
              </p>
            </div>

            <div className="why-img-r relative mx-auto aspect-[2/3] h-[38svh] min-[821px]:absolute min-[821px]:bottom-[-14%] min-[821px]:right-[-4vw] min-[821px]:mx-0 min-[821px]:h-[min(92%,50vw)]">
              <img
                src={PERFECT}
                alt="A perfect marble statue"
                draggable={false}
                className="h-full w-full select-none object-contain"
              />
            </div>
          </figure>
        </div>

        {/* Bottom fade */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-[22%] bg-gradient-to-t from-ink to-transparent"
        />

        {/* ===== Center: heading and four reasons ===== */}
        <div
          className="relative z-10 mx-auto flex w-full max-w-[400px] flex-1 flex-col items-center justify-center px-6 py-14 text-center min-[821px]:py-0 [@media(min-width:821px)_and_(max-height:700px)]:justify-start [@media(min-width:821px)_and_(max-height:700px)]:pt-5"
        >
          <p className="eyebrow text-glacier-3" data-reveal>
            Why Zebaq
          </p>

          <h2
            className="mt-5 text-[clamp(38px,4.4vw,68px)] font-medium leading-[1] tracking-[-0.045em] text-off [@media(min-width:821px)_and_(max-height:700px)]:mt-3 [@media(min-width:821px)_and_(max-height:700px)]:text-[clamp(36px,4vw,52px)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            <Split text="Why brands" />
            <br />
            <Split text="choose us" dot />
          </h2>

          <ol className="why-list mt-9 w-full [@media(min-width:821px)_and_(max-height:700px)]:mt-4">
            {WHY_ITEMS.map((item, i) => (
              <li
                key={item.title}
                className="why-item relative py-5 last:border-b last:border-white/15 [@media(min-width:821px)_and_(max-height:700px)]:py-2.5"
              >
                <span
                  aria-hidden="true"
                  className="why-line absolute inset-x-0 top-0 h-px origin-center bg-white/15"
                />

                <span className="font-mono text-[11px] tracking-[0.1em] text-lemon">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <h3 className="mt-2 text-[clamp(17px,1.4vw,21px)] font-medium text-off tracking-[0.05em]">
                  {item.title}
                </h3>

                <p className="mt-1.5 text-[14px] leading-[1.55] text-glacier-3">
                  {item.text}
                </p>
              </li>
            ))}
          </ol>
        </div>

        {/* Darkens section while next section slides over */}
        <div
          aria-hidden="true"
          className="why-shade pointer-events-none absolute inset-0 z-[60] bg-ink opacity-0"
        />
      </div>

      {/* Empty scroll space */}
      <div ref={spacerRef} aria-hidden="true" />
    </section>
  );
}
