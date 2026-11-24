import { FINAL } from "../../data/home/closing";
import { SITE } from "../../data/home/site";
import { Arrow, Split } from "../common/ui";
import { DotField } from "../common/fx";
import LeadForm from "./Diagnostic";

// 16 — Final CTA with the strategy-call form. The footer is a separate component (layout/Footer.tsx).
export default function Closing() {
  return (
    <section id="contact" data-booking data-dark data-over data-index="16" data-label="Final CTA & Footer" className="grain relative overflow-hidden bg-ink text-off">
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
    </section>
  );
}