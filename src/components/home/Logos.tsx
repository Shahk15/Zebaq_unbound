
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { INDUSTRIES, INDUSTRIES_VERIFY, LOGOS, LOGOS_TITLE } from "../../data/shared/logos";
import { STATS } from "../../data/home/impact";
import { Split, Verify } from "../common/ui";
import { AutoCarousel } from "../common/fx";

type Logo = (typeof LOGOS)[number];

function LogoTile({ l }: { l: Logo }) {
  const light = l.tone === "light";

  return (
    <div
      className={`group flex h-[110px] w-[230px] shrink-0 items-center justify-center rounded-[22px] transition duration-500 hover:-translate-y-1 md:h-[140px] md:w-[300px] ${light
        ? "bg-white/[0.04] shadow-[inset_0_0_0_1px_rgba(255,255,255,.1)] hover:bg-white/[0.08]"
        : "bg-off hover:bg-white"
        }`}
      title={l.alt}
    >

      <div className="flex h-full w-full items-center justify-center p-3">
        <img
          src={l.src}
          alt={l.alt}
          draggable={false}
          loading="lazy"
          className={`block h-auto w-auto max-h-[70%] max-w-[70%] object-contain object-center transition duration-500 group-hover:scale-105 ${light
            ? "opacity-85 brightness-0 invert group-hover:opacity-100"
            : "mix-blend-multiply grayscale group-hover:grayscale-0"
            }`}
        />
      </div>

    </div>
  );
}

// 03 — Trusted by Brands Across Industries. Lives in navy so the hero's iris
// flows straight into it. Everything here drifts on its own, slows on hover,
// and can be dragged — add as many logos / industries as you like in content.ts.

export default function Logos() {
  const root = useRef<HTMLElement>(null);

  // keep rows long enough to look rich even with few logos
  const pool = LOGOS.length < 8
    ? [...LOGOS, ...LOGOS, ...LOGOS].slice(0, Math.max(8, LOGOS.length))
    : LOGOS;

  const rowA = pool.map((l, i) => (
    <LogoTile key={`a${i}`} l={l} />
  ));

  const rowB = [...pool].reverse().map((l, i) => (
    <LogoTile key={`b${i}`} l={l} />
  ));

  const half = Math.ceil(INDUSTRIES.length / 2);

  const word = (t: string, outline: boolean) => (
    <span className="group flex items-center gap-[0.45em] pr-[0.45em]">
      <span
        className={`relative transition-colors duration-500 ${outline
          ? "text-transparent [-webkit-text-stroke:1.4px_rgba(247,246,241,.7)] group-hover:text-lemon group-hover:[-webkit-text-stroke:0px]"
          : "text-off group-hover:text-lemon"
          }`}
      >
        {t}
      </span>
      <span className="inline-block h-[0.14em] w-[0.14em] rounded-full bg-lemon" />
    </span>
  );

  const indA = INDUSTRIES.slice(0, half).map((t) => word(t, false));
  const indB = INDUSTRIES.slice(half).map((t) => word(t, true));

  const countries = STATS.find((s) => /countr/i.test(s.label));
  const industries = STATS.find((s) => /industr/i.test(s.label));

  useGSAP(
    () => {
      gsap.from(".tb-strip", {
        opacity: 0,
        x: (i) => (i % 2 ? -160 : 160),
        duration: 1.6,
        ease: "expo.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: ".tb-strips",
          start: "top 85%",
          once: true,
        },
      });

      gsap.from(".tb-ind-row", {
        opacity: 0,
        yPercent: 40,
        duration: 1.4,
        ease: "expo.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: ".tb-ind",
          start: "top 85%",
          once: true,
        },
      });
    },
    { scope: root },
  );

  return (
    <section
      id="logos"
      ref={root}
      data-dark
      data-index="03"
      data-label="Trusted by Brands"
      className="grain relative overflow-hidden bg-ink text-off"
    >
      <div className="wrap pt-[clamp(100px,11vw,160px)]">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_.8fr] lg:items-end">
          <div>
            <p className="eyebrow text-glacier-3" data-reveal>
              Clients & industries
            </p>

            <h2 className="t-xl mt-8 max-w-[12ch]">
              <Split text={LOGOS_TITLE.replace(/\.$/, "")} dot />
            </h2>
          </div>

          <div className="flex gap-12 lg:justify-start" data-reveal>
            {[industries, countries].filter(Boolean).map((s) => (
              <div key={s!.label}>
                <p
                  className="text-[clamp(48px,5vw,84px)] font-medium leading-none tracking-[-0.05em]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {s!.value}
                  <span className="text-lemon">{s!.suffix}</span>
                </p>

                <p className="mt-2 text-sm text-glacier-3">
                  {s!.label}
                  <Verify on={s!.verify} />
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* brands — two endless rows, opposite directions */}
      <div className="tb-strips mt-16 space-y-4 [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
        <div className="tb-strip">
          <AutoCarousel items={rowA} speed={38} gap={16} />
        </div>

        <div className="tb-strip">
          <AutoCarousel items={rowB} speed={30} reverse gap={16} />
        </div>
      </div>

      {/* industries — big kinetic type, endless */}
      <div className="tb-ind mt-[clamp(70px,8vw,120px)] border-t border-white/10 pb-[clamp(100px,11vw,160px)] pt-12">
        <div className="wrap flex items-center justify-between">
          <p className="eyebrow text-glacier-3">
            Industries we've served
            <Verify on={INDUSTRIES_VERIFY} />
          </p>

          <p className="hidden text-sm text-glacier-3 md:block">
            Drag to explore · hover to pause
          </p>
        </div>

        <div
          className="mt-10 space-y-3 text-[clamp(44px,7vw,116px)] font-medium leading-[1.05] tracking-[-0.05em]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          <div className="tb-ind-row">
            <AutoCarousel
              items={indA}
              speed={55}
              gap={0}
              slowOnHover={0}
            />
          </div>

          <div className="tb-ind-row">
            <AutoCarousel
              items={indB}
              speed={45}
              reverse
              gap={0}
              slowOnHover={0}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
