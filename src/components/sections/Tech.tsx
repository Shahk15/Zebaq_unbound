import { TECH, TECH_NOTE, TECH_TITLE } from "../../data/content";
import { Split } from "../common/ui";

// 10 — Technology Ecosystem: rows that light up as you hover across them.
export default function Tech() {
  return (
    <section data-index="10" data-label="Technology Ecosystem" className="on-light section bg-off">
      <div className="wrap">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="eyebrow" data-reveal>Technology ecosystem</p>
            <h2 className="t-l mt-8 max-w-[14ch]"><Split text={TECH_TITLE} dot /></h2>
          </div>
          <p className="max-w-xs text-navy-2" data-reveal>We plug into the tools you already use — or set up the right ones.</p>
        </div>
        <div className="mt-20 border-b border-navy/10">
          {TECH.map((g, i) => (
            <div key={g.group} className="group grid gap-5 border-t border-navy/10 py-8 transition-colors duration-500 hover:bg-glacier/60 md:grid-cols-[80px_300px_1fr] md:items-center md:px-4" data-reveal>
              <span className="hidden text-sm text-navy-2 md:block">0{i + 1}</span>
              <p className="text-2xl font-medium tracking-tight" style={{ fontFamily: "var(--font-display)" }}>{g.group}</p>
              <div className="flex flex-wrap gap-2.5" data-cascade>
                {g.items.map((it, k) => (
                  <span key={it} className="chip !px-5 !py-3 !text-base transition-all duration-500 group-hover:bg-navy group-hover:text-off" style={{ transitionDelay: `${k * 60}ms` }}>{it}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <p className="mt-6 text-sm text-navy-2">{TECH_NOTE}</p>
      </div>
    </section>
  );
}
