import { useState } from "react";
import { FAQ } from "../../data/shared/faq";
import { Split } from "../common/ui";

// Answers are written for the questions buyers ask ChatGPT, Gemini and
// Perplexity. The same Q&A is emitted as FAQPage JSON-LD (see vite.config.ts).
export default function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" data-index="14" data-label="FAQs" className="on-light section bg-off">
      <div className="wrap grid gap-16 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <p className="eyebrow" data-reveal>FAQ</p>
          <h2 className="t-xl mt-8"><Split text="Straight answers" dot /></h2>
        </div>
        <div className="border-b border-navy/10" data-rise>
          {FAQ.map((f, i) => {
            const on = open === i;
            return (
              <div key={f.q} className="border-t border-navy/10">
                <h3 className="!font-sans !tracking-normal">
                  <button
                    onClick={() => setOpen(on ? -1 : i)}
                    aria-expanded={on}
                    className="flex w-full items-center justify-between gap-6 py-7 text-left text-xl font-medium tracking-tight md:text-2xl"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    <span className="flex gap-5"><span className="pt-1.5 text-sm text-navy-2">0{i + 1}</span>{f.q}</span>
                    <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-full transition duration-500 ${on ? "rotate-45 bg-lemon" : "shadow-[inset_0_0_0_1px_rgba(10,31,68,.2)]"}`}>
                      <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
                    </span>
                  </button>
                </h3>
                <div className={`grid transition-all duration-500 ${on ? "grid-rows-[1fr] pb-8" : "grid-rows-[0fr]"}`}>
                  <p className="overflow-hidden pl-10 pr-14 text-lg leading-relaxed text-navy-2">{f.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
