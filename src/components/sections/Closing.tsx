import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { FINAL, FOOTER_LINKS } from "../../data/closing";
import { SERVICES } from "../../data/services";
import { SITE } from "../../data/site";
import { Arrow, Split } from "../common/ui";
import { DotField } from "../common/fx";
import LeadForm from "./Diagnostic";

// 16 — Final CTA (with the strategy-call form) & Footer.
export default function Closing() {
  const root = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      gsap.from(".wm > span", { yPercent: 100, ease: "expo.out", duration: 1.6, stagger: 0.06, scrollTrigger: { trigger: ".wm", start: "top 95%", once: true } });
    },
    { scope: root },
  );

  return (
    <section id="contact" ref={root} data-dark data-over data-index="16" data-label="Final CTA & Footer" className="grain relative overflow-hidden bg-ink text-off">
      <DotField color="207,225,238" accent="245,234,59" interactive top={0.1} className="absolute inset-x-0 top-0 h-[70%] w-full opacity-60" />
      <div className="wrap section relative grid items-start gap-16 lg:grid-cols-[1.1fr_1fr]">
        <div className="lg:sticky lg:top-32">
          <p className="eyebrow text-glacier-3" data-reveal>Book a strategy call</p>
          <h2 className="t-l mt-8 max-w-[14ch]"><Split text={FINAL.title.replace(/\.$/, "")} dot /></h2>
          <p className="mt-10 max-w-lg text-xl leading-relaxed text-glacier-2" data-reveal>{FINAL.sub}</p>
          <a href={`mailto:${SITE.email}`} className="mt-8 inline-flex items-center gap-2 text-lg text-glacier-2 hover:text-lemon" data-reveal>{SITE.email} <Arrow size={16} /></a>
        </div>
        <div data-reveal><LeadForm /></div>
      </div>

      <footer className="relative border-t border-white/10">
        <div className="wrap grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <img src="/images/logo/full-logo.png" alt="ZEBAQ" className="h-9 w-auto brightness-0 invert" />
            <p className="mt-6 text-xl tracking-tight" style={{ fontFamily: "var(--font-display)" }}>{SITE.positioning}</p>
            <div className="mt-8 space-y-3 text-sm text-glacier-3">
              {SITE.offices.map((o) => <p key={o.entity}><span className="font-semibold text-off">{o.entity}</span> — {o.address}</p>)}
            </div>
          </div>
          <div>
            <p className="eyebrow text-glacier-3">Services</p>
            <ul className="mt-6 space-y-2.5 text-sm">
              {SERVICES.map((s) => <li key={s.slug}><a href="#services" className="text-glacier-2 hover:text-lemon">{s.name}</a></li>)}
            </ul>
          </div>
          <div>
            <p className="eyebrow text-glacier-3">Company</p>
            <ul className="mt-6 space-y-2.5 text-sm">
              {FOOTER_LINKS.map((n) => <li key={n.label}><a href={n.href} className="text-glacier-2 hover:text-lemon">{n.label}</a></li>)}
            </ul>
          </div>
        </div>
        <div className="wrap overflow-hidden">
          <p className="wm flex justify-between text-[24vw] font-semibold leading-[0.78] tracking-[-0.07em] text-glacier/10" style={{ fontFamily: "var(--font-display)" }} aria-hidden="true">
            {"ZEBAQ".split("").map((c, k) => <span key={k} className="inline-block transition-colors duration-300 hover:text-lemon">{c}</span>)}
          </p>
        </div>
        <div className="wrap flex flex-col justify-between gap-4 border-t border-white/10 py-8 text-sm text-glacier-3 md:flex-row">
          <p>© {new Date().getFullYear()} ZEBAQ. All rights reserved.</p>
          <p>Sculpture photography via Unsplash · USA · UK · India</p>
        </div>
      </footer>
    </section>
  );
}
