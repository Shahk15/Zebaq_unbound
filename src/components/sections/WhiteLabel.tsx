import { Fragment, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { SITE } from "../../data/site";
import { WHITE_LABEL } from "../../data/white-label";
import { Pill } from "../common/ui";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// 15 — White-label partnerships: centered CTA panel
export default function WhiteLabel() {
  const sectionRef = useRef<HTMLElement>(null);
  const words = WHITE_LABEL.title.split(" ");

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const q = gsap.utils.selector(section);
      const panel = q(".wl-panel")[0];
      const mm = gsap.matchMedia();

      mm.add(
        {
          wide: "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
          narrow: "(max-width: 767px) and (prefers-reduced-motion: no-preference)",
        },
        (ctx) => {
          const { wide } = ctx.conditions as { wide: boolean };

          // Start states (only set when motion is allowed)
          gsap.set(q(".wl-w"), { yPercent: 110 });
          gsap.set(q(".wl-fade"), { opacity: 0, y: 24 });
          gsap.set(q(".wl-mark"), { scaleX: 0 });

          // Entrance: words rise out of their masks, the lemon marker swipes in, then copy and button
          gsap
            .timeline({ scrollTrigger: { trigger: panel, start: "top 75%", once: true } })
            .to(q(".wl-fade")[0], { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, 0)
            .to(q(".wl-w"), { yPercent: 0, duration: 1.2, stagger: 0.08, ease: "expo.out" }, 0.1)
            .to(q(".wl-mark"), { scaleX: 1, duration: 0.9, ease: "power3.inOut" }, 0.9)
            .to(q(".wl-fade").slice(1), { opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: "power3.out" }, 0.7);

          if (wide) {
            // The panel grows into place while the section scrolls in
            gsap.fromTo(
              panel,
              { scale: 0.93, y: 50, transformOrigin: "50% 0%" },
              {
                scale: 1,
                y: 0,
                ease: "none",
                scrollTrigger: { trigger: section, start: "top 95%", end: "top 40%", scrub: true },
              }
            );

            // The two circles drift in opposite directions
            gsap.fromTo(
              q(".wl-c1"),
              { yPercent: -14 },
              {
                yPercent: 14,
                ease: "none",
                scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: true },
              }
            );
            gsap.fromTo(
              q(".wl-c2"),
              { yPercent: 14 },
              {
                yPercent: -14,
                ease: "none",
                scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: true },
              }
            );
          }
        }
      );

      return () => mm.revert();
    },
    { scope: sectionRef, dependencies: [] }
  );

  return (
    <section
      ref={sectionRef}
      data-index="15"
      data-label="White-Label Partnerships"
      className="on-light bg-off pb-[clamp(48px,5vw,80px)] pt-[clamp(4px,1vw,16px)]"
    >
      <div className="wrap">
        <div className="wl-panel relative overflow-hidden rounded-[clamp(28px,3.4vw,48px)] bg-glacier px-[clamp(24px,5vw,96px)] py-[clamp(44px,5vw,80px)] text-center will-change-transform">          {/* Decorative solid circles, no glow */}
          <div
            aria-hidden="true"
            className="wl-c1 pointer-events-none absolute -left-[12%] -top-[40%] aspect-square w-[46%] rounded-full bg-glacier-2/70"
          />
          <div
            aria-hidden="true"
            className="wl-c2 pointer-events-none absolute -bottom-[45%] -right-[10%] aspect-square w-[42%] rounded-full bg-white/50"
          />

          <div className="relative mx-auto flex max-w-[1100px] flex-col items-center">
            <div className="wl-fade">
              <p className="eyebrow text-navy-2">For marketing & development agencies</p>
            </div>

            <h2 className="mx-auto mt-5 max-w-[22ch] text-[clamp(32px,4.2vw,68px)] leading-[0.98] tracking-[-0.05em] text-navy">              {words.map((w, i) => (
                <Fragment key={i}>
                  <span className="sw">
                    <span className="wl-w relative">
                      {/* Lemon marker sits behind the highlighted word */}
                      {w.includes("White-Label") && (
                        <span
                          aria-hidden="true"
                          className="wl-mark absolute inset-x-0 bottom-[0.08em] -z-10 h-[0.34em] origin-left bg-lemon"
                        />
                      )}
                      {w}
                    </span>
                  </span>{" "}
                </Fragment>
              ))}
            </h2>

            <p className="wl-fade mt-5 max-w-[34ch] text-[clamp(17px,1.5vw,22px)] leading-[1.6] text-navy-2">
              {WHITE_LABEL.d}
            </p>

            <div className="wl-fade mt-7">
              <Pill href={`mailto:${SITE.email}?subject=White-label%20partnership`} variant="navy">
                {WHITE_LABEL.cta}
              </Pill>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}