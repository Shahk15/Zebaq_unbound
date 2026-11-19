import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import {
  IMPACT_STATS,
  MARKETS,
  MARKET_CHIPS,
  WALL_COLUMNS,
  flagSrc,
} from "../../data/markets";
import { Split } from "../common/ui";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// Repeat each column for a seamless vertical loop.
const COPIES = 4;

const PANEL_FROM = "polygon(0% 12%, 100% 1.5%, 100% 100%, 0% 100%)";
const BLADE_FROM = "polygon(0% 10%, 100% 0%, 100% 100%, 0% 100%)";
const FLAT = "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)";

const WALL_MASK =
  "[mask-image:linear-gradient(to_bottom,transparent,#000_14%,#000_86%,transparent)] " +
  "[-webkit-mask-image:linear-gradient(to_bottom,transparent,#000_14%,#000_86%,transparent)]";

/* ---------- Odometer ---------- */

const DIGITS = Array.from({ length: 10 }, (_, i) => i);

function Odometer({ value }: { value: number }) {
  return (
    <span className="inline-flex" aria-label={String(value)}>
      {String(value)
        .split("")
        .map((digit, index) => (
          <span
            key={index}
            aria-hidden="true"
            className="relative inline-block h-[1em] overflow-hidden"
          >
            <span className="imp-reel block will-change-transform" data-digit={digit}>
              {DIGITS.map((number) => (
                <span key={number} className="block h-[1em] leading-[1]">
                  {number}
                </span>
              ))}
            </span>
          </span>
        ))}
    </span>
  );
}

/* ---------- Flag card ---------- */

function FlagCard({ code }: { code: string }) {
  const market = MARKETS[code];

  if (!market) return null;

  return (
    <div className="imp-card group w-full shrink-0 rounded-[22px] border border-navy/[0.07] bg-white p-2.5 shadow-[0_24px_50px_-30px_rgba(11,27,58,0.38)] transition-shadow duration-500 hover:shadow-[0_28px_60px_-28px_rgba(11,27,58,0.3)]">
      <div className="relative aspect-[3/2] overflow-hidden rounded-[15px] bg-navy/5">
        <img
          src={flagSrc(code)}
          alt={`${market.name} flag`}
          loading="lazy"
          draggable={false}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />

        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.25),transparent_45%,rgba(11,27,58,0.10))]"
        />
      </div>

      <div className="flex items-center justify-between gap-3 px-2.5 pb-2 pt-4">
        <div className="min-w-0">
          <p
            className="truncate text-[clamp(15px,1.25vw,21px)] font-medium leading-tight tracking-[-0.025em] text-navy"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {market.name}
          </p>

          <p className="mt-1 text-[12px] text-navy-2">{market.region}</p>
        </div>

        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-navy/15 transition-colors duration-300 group-hover:border-lemon-deep">
          <span className="h-2 w-2 rounded-full bg-lemon-deep" />
        </span>
      </div>
    </div>
  );
}

/* ---------- Impact metric ---------- */

function ImpactMetric({
  value,
  suffix,
  label,
  text,
}: {
  value: number;
  suffix: string;
  label: string;
  text: string;
}) {
  return (
    <li className="imp-stat group relative">
      {/* Hairline that draws itself across the top of the row (hidden on the first row) */}
      <span
        aria-hidden="true"
        className="imp-bar absolute -top-px left-0 h-px w-full origin-left bg-navy/15 group-first:hidden"
      />

      {/* Soft wash on hover */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -inset-x-3 inset-y-0 rounded-2xl bg-[linear-gradient(90deg,rgba(255,255,255,0.6),transparent_85%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />

      <div className="relative grid grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] items-center gap-x-5 py-[clamp(18px,2.6vh,30px)] md:gap-x-7">
        <p
          className="flex items-baseline whitespace-nowrap text-[clamp(48px,5vw,84px)] font-bold leading-none tracking-[-0.01em] tabular-nums text-navy"
          style={{ fontFamily: "var(--font-display)" }}
        >
          <Odometer value={value} />
          <span className="ml-1 text-[0.8em] font-bold text-lemon-deep">{suffix}</span>
        </p>

        {/* lemon vertical divider */}
        <div className="min-w-0 border-l-2 border-lemon-deep pl-5 md:pl-6">
          <h3 className="text-[clamp(16px,1.45vw,22px)] font-semibold leading-[1.2] tracking-[-0.025em] text-navy">
            {label}
          </h3>

          <p className="mt-1.5 max-w-[34ch] text-[13px] leading-[1.6] text-navy-2">{text}</p>
        </div>
      </div>
    </li>
  );
}

/* ---------- Main section ---------- */

// 04 — Impact and global reach
export default function Impact() {
  const sectionRef = useRef<HTMLElement>(null);
  const wallRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const wall = wallRef.current;

      if (!section || !wall) return;

      const q = gsap.utils.selector(section);
      const mm = gsap.matchMedia();

      // "motion" matches on every screen unless the user asked for reduced motion,
      // so mobile gets the animations too.
      mm.add(
        {
          motion: "(prefers-reduced-motion: no-preference)",
          desktop: "(min-width: 821px)",
        },
        (ctx) => {
          const { motion, desktop } = ctx.conditions as {
            motion: boolean;
            desktop: boolean;
          };

          const reels = q(".imp-reel") as HTMLElement[];
          const cards = q(".imp-card");
          const stats = q(".imp-stat") as HTMLElement[];

          /* ---------- Reduced motion: numbers show their final value ---------- */

          if (!motion) {
            reels.forEach((reel) => {
              gsap.set(reel, { yPercent: -Number(reel.dataset.digit) * 10 });
            });
            return;
          }

          /* ---------- Section transition: the top edge flattens while scrolling ---------- */

          gsap.fromTo(
            q(".imp-blade"),
            { clipPath: BLADE_FROM },
            {
              clipPath: FLAT,
              ease: "none",
              scrollTrigger: { trigger: section, start: "top 96%", end: "top 18%", scrub: 1 },
            }
          );

          gsap.fromTo(
            q(".imp-panel"),
            { clipPath: PANEL_FROM },
            {
              clipPath: FLAT,
              ease: "none",
              scrollTrigger: { trigger: section, start: "top 96%", end: "top 18%", scrub: 1 },
            }
          );

          /* ---------- Background Z movement ---------- */

          gsap.fromTo(
            q(".imp-z"),
            { yPercent: 14, rotate: -6 },
            {
              yPercent: -14,
              rotate: 4,
              ease: "none",
              scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: true },
            }
          );

          /* ---------- Flag wall perspective ---------- */

          const tilt = q(".imp-tilt");

          gsap.set(tilt, { transformPerspective: 1500, transformOrigin: "50% 50%" });

          gsap.fromTo(
            tilt,
            desktop
              ? { rotateY: -34, rotateX: 12, rotateZ: 7, xPercent: 10, scale: 0.92 }
              : { rotateY: -20, rotateX: 8, rotateZ: 4, xPercent: 6, scale: 0.94 },
            {
              rotateY: desktop ? -16 : -10,
              rotateX: desktop ? 5 : 3,
              rotateZ: desktop ? 3 : 2,
              xPercent: 0,
              scale: 1,
              ease: "none",
              scrollTrigger: { trigger: wall, start: "top bottom", end: "center 55%", scrub: 0.6 },
            }
          );

          /* ---------- Continuous flag movement ---------- */

          const cols = q(".imp-col") as HTMLElement[];

          const tweens = cols.map((col, index) =>
            gsap.fromTo(
              col,
              { yPercent: index % 2 ? -100 / COPIES : 0 },
              {
                yPercent: index % 2 ? 0 : -100 / COPIES,
                duration: 34 + index * 7,
                ease: "none",
                repeat: -1,
                paused: true,
              }
            )
          );

          let inView = false;

          const wallTrigger = ScrollTrigger.create({
            trigger: wall,
            start: "top bottom",
            end: "bottom top",
            onToggle: (self) => {
              inView = self.isActive;
              tweens.forEach((tween) => (inView ? tween.play() : tween.pause()));
            },
          });

          // Scrolling changes speed. Hover does not pause the wall.
          let lastY = window.scrollY;
          let boost = 1;

          const tick = () => {
            const currentY = window.scrollY;
            const delta = Math.abs(currentY - lastY);

            lastY = currentY;

            if (!inView) return;

            const target = 1 + Math.min(delta / 14, 4);
            boost += (target - boost) * 0.07;

            tweens.forEach((tween) => tween.timeScale(boost));
          };

          gsap.ticker.add(tick);

          /* ---------- Content entrance ---------- */

          gsap.set(stats, { opacity: 0, y: 34 });
          gsap.set(q(".imp-bar"), { scaleX: 0 });
          gsap.set(q(".imp-chip"), { opacity: 0, y: 14 });
          gsap.set(cards, { opacity: 0, scale: 0.94 });

          /* ---------- Metric rows and odometers ---------- */

          stats.forEach((row, rowIndex) => {
            const tl = gsap.timeline({
              scrollTrigger: { trigger: row, start: "top 90%", once: true },
              delay: rowIndex * 0.08,
            });

            tl.to(row, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" }, 0).to(
              row.querySelector(".imp-bar"),
              { scaleX: 1, duration: 1.3, ease: "power3.inOut" },
              0
            );

            const rowReels = Array.from(row.querySelectorAll<HTMLElement>(".imp-reel"));

            rowReels.forEach((reel, digitIndex) => {
              tl.fromTo(
                reel,
                { yPercent: 0 },
                {
                  yPercent: -Number(reel.dataset.digit) * 10,
                  duration: 1.8 + digitIndex * 0.2,
                  ease: "power4.out",
                },
                0.2
              );
            });
          });

          /* ---------- Market chips ---------- */

          gsap.to(q(".imp-chip"), {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.06,
            ease: "power3.out",
            scrollTrigger: { trigger: q(".imp-chips")[0], start: "top 95%", once: true },
          });

          /* ---------- Flag cards ---------- */

          gsap.to(cards, {
            opacity: 1,
            scale: 1,
            duration: 1,
            stagger: { each: 0.04, from: "center" },
            ease: "power3.out",
            scrollTrigger: { trigger: wall, start: "top 85%", once: true },
          });

          return () => {
            gsap.ticker.remove(tick);
            wallTrigger.kill();
          };
        }
      );

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      data-over
      data-index="04"
      data-label="Impact & Global Reach"
      className="on-light relative overflow-hidden pb-[clamp(50px,6vw,90px)] pt-[clamp(75px,9vw,120px)]"
    >
      {/* Accent layer: only a thin diagonal slice of it shows while the section slides up */}
      <div
        aria-hidden="true"
        className="imp-blade pointer-events-none absolute inset-0 bg-lemon-deep will-change-[clip-path]"
      />

      {/* Main background */}
      <div
        aria-hidden="true"
        className="imp-panel pointer-events-none absolute inset-0 overflow-hidden bg-glacier will-change-[clip-path]"
      >
        {/* Soft light from the top */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.3)_0%,rgba(255,255,255,0)_50%,rgba(255,255,255,0.2)_100%)]" />

        {/* Subtle dot grid */}
        <div className="absolute inset-0 [background-image:radial-gradient(rgba(11,27,58,0.16)_1px,transparent_1.3px)] [background-size:22px_22px] [mask-image:radial-gradient(70%_60%_at_80%_40%,#000,transparent_75%)] [-webkit-mask-image:radial-gradient(70%_60%_at_80%_40%,#000,transparent_75%)]" />

        {/* ZEBAQ background mark */}
        <img
          src="/images/logo/z.png"
          alt=""
          draggable={false}
          className="imp-z absolute -right-[7vw] top-[6%] w-[clamp(340px,44vw,760px)] max-w-none select-none opacity-[0.08]"
        />
      </div>

      <div className="relative mx-auto max-w-[1600px]">
        {/* ---------- Section heading ---------- */}

        <div className="mb-14 px-[4.4vw] md:mb-20">
          <p className="eyebrow" data-reveal>
            Impact & global reach
          </p>

          <div className="mt-8 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <h2 className="t-xl">
              <Split text="Local insight" dot />
              <br />
              <Split text="Global reach" dot />
            </h2>

            <p
              className="max-w-[310px] text-[15px] leading-[1.7] text-navy-2 md:pb-2"
              data-reveal
            >
              Verified businesses across international markets rely on us for digital experiences,
              technology and growth-focused solutions.
            </p>
          </div>
        </div>

        {/* ---------- Main content ---------- */}

        <div className="grid items-center gap-12 px-[4.4vw] lg:grid-cols-12 lg:gap-8 lg:pr-0">
          {/* Left: impact metrics */}

          <div className="lg:col-span-5">
            {/* heading: lemon underline on the title, "01 — 03" on the right */}
            <div className="mb-5 flex items-end justify-between gap-4 border-b border-navy/10">
              <p className="relative -mb-px pb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-navy">
                Our impact in numbers
                <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[2px] bg-lemon-deep" />
              </p>

              <span className="pb-3 font-mono text-[10px] tracking-wider text-navy">01 — 03</span>
            </div>

            {/* frosted glass card */}
            <div className="relative isolate rounded-[28px]">
              {/* lemon glow behind the bottom-right corner */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-4 -right-4 -z-10 h-28 w-44 rounded-full bg-lemon/45 blur-2xl"
              />

              <div className="relative rounded-[28px] bg-[linear-gradient(155deg,rgba(255,255,255,0.92),rgba(236,243,249,0.75))] px-[clamp(20px,2.4vw,36px)] shadow-[0_30px_60px_-30px_rgba(10,31,68,0.35),inset_0_1px_0_rgba(255,255,255,0.95)] ring-1 ring-white/80 backdrop-blur-xl">
                <ul>
                  {IMPACT_STATS.map((stat) => (
                    <ImpactMetric
                      key={stat.label}
                      value={stat.value}
                      suffix={stat.suffix}
                      label={stat.label}
                      text={stat.text}
                    />
                  ))}
                </ul>

                {/* lemon edge on the bottom-right corner, fading out along the sides */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute bottom-0 right-0 h-24 w-40 rounded-br-[28px] border-b-[3px] border-r-[3px] border-lemon-deep [-webkit-mask-image:linear-gradient(135deg,transparent_35%,#000_100%)] [mask-image:linear-gradient(135deg,transparent_35%,#000_100%)]"
                />
              </div>
            </div>

            {/* Market chips */}

            <div className="imp-chips mt-8">
              <div className="mb-4 flex items-center gap-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-navy">
                  Markets represented
                </p>
                <span className="h-px flex-1 bg-navy/15" />
              </div>

              <ul className="flex flex-wrap gap-2.5">
                {MARKET_CHIPS.map((market) => (
                  <li
                    key={market.label}
                    className="imp-chip flex items-center gap-2 rounded-full border border-navy/[0.06] bg-white py-1.5 pl-1.5 pr-3.5 text-[12px] font-medium text-navy shadow-[0_8px_18px_-12px_rgba(10,31,68,0.4)] transition-[translate,border-color,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-lemon-deep"
                  >
                    {/* design shows one flag per chip */}
                    {market.codes.slice(0, 1).map((code) => (
                      <img
                        key={code}
                        src={flagSrc(code, 80)}
                        alt=""
                        loading="lazy"
                        draggable={false}
                        className="h-[18px] w-[18px] rounded-full object-cover ring-1 ring-navy/10"
                      />
                    ))}

                    {market.label}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right: animated global flag wall */}

          <div
            ref={wallRef}
            aria-hidden="true"
            className={`relative h-[clamp(460px,76vh,780px)] overflow-hidden lg:col-span-7 ${WALL_MASK}`}
          >
            <div className="imp-tilt absolute inset-y-[-8%] left-[6%] right-[-10%] will-change-transform lg:left-[12%]">
              <div className="grid h-full grid-cols-3 gap-4 md:gap-5">
                {WALL_COLUMNS.map((codes, columnIndex) => (
                  <div
                    key={columnIndex}
                    className={
                      columnIndex === 1 ? "mt-[14%]" : columnIndex === 2 ? "-mt-[4%]" : ""
                    }
                  >
                    <div className="imp-col flex flex-col gap-4 will-change-transform md:gap-5">
                      {Array.from({ length: COPIES }).flatMap((_, copyIndex) =>
                        codes.map((code, index) => (
                          <FlagCard key={`${copyIndex}-${code}-${index}`} code={code} />
                        ))
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}