import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { MARKETS, STATS } from "../../data/impact";
import { Split, Verify } from "../common/ui";
import { Globe } from "../common/fx";

// 04 — Impact & Global Reach. Slides up over the navy Trusted section (overlap),
// counters run, and a dotted-continent globe rises and spins with live arcs
// from ZEBAQ's offices to every market.
export default function Impact() {
  const root = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>(".im-n").forEach((el) => {
        const o = { v: 0 };
        gsap.to(o, {
          v: Number(el.dataset.to), duration: 2.4, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 95%", once: true },
          onUpdate: () => (el.textContent = Math.round(o.v).toLocaleString()),
        });
      });
      gsap.fromTo(".im-globe", { scale: 0.7, rotate: -12, opacity: 0 }, {
        scale: 1, rotate: 0, opacity: 1, ease: "power2.out",
        scrollTrigger: { trigger: ".im-globe", start: "top 95%", end: "center 55%", scrub: 1 },
      });
      gsap.from(".im-chip", { y: 24, opacity: 0, duration: 0.9, ease: "expo.out", stagger: 0.05, scrollTrigger: { trigger: ".im-chips", start: "top 92%", once: true } });
    },
    { scope: root },
  );

  return (
    <section ref={root} data-over data-index="04" data-label="Impact & Global Reach" className="on-light relative overflow-hidden bg-glacier">
      <div className="wrap section grid items-center gap-16 lg:grid-cols-[1fr_1.05fr]">
        <div>
          <p className="eyebrow" data-reveal>Impact & global reach</p>
          <h2 className="t-xl mt-8"><Split text="Local insight." /><br /><Split text="Global reach" dot /></h2>
          <dl className="mt-16 grid gap-10 sm:grid-cols-3">
            {STATS.filter((s) => s.value > 0).map((s) => (
              <div key={s.label} className="border-t border-navy/15 pt-6" data-reveal>
                <dd className="text-[clamp(48px,5vw,84px)] font-medium leading-none tracking-[-0.05em] tabular-nums" style={{ fontFamily: "var(--font-display)" }}>
                  <span className="im-n" data-to={s.value}>0</span><span className="text-lemon-deep">{s.suffix}</span>
                </dd>
                <dt className="mt-3 text-sm text-navy-2">{s.label}<Verify on={s.verify} /></dt>
              </div>
            ))}
          </dl>
          <div className="mt-14">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-navy-2">Markets served <Verify on /></p>
            <ul className="im-chips mt-5 flex flex-wrap gap-2">
              {MARKETS.map((m) => (
                <li key={m.name} className="im-chip chip bg-off"><span className="mr-2 h-1.5 w-1.5 rounded-full bg-lemon-deep" />{m.name}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="im-globe relative mx-auto w-full max-w-[720px] overflow-hidden rounded-[40px] bg-ink p-[4%] shadow-[0_60px_120px_-50px_rgba(7,22,49,.7)]" data-dark>
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_45%,rgba(28,60,120,.55),transparent_70%)]" />
          <Globe points={MARKETS} className="relative" />
          <p className="relative mt-1 text-center text-xs uppercase tracking-[0.18em] text-glacier-3">Drag to spin · live arcs from our London, Texas & India offices</p>
        </div>
      </div>
    </section>
  );
}
