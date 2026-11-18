import { SITE, WHITE_LABEL } from "../content";
import { Pill } from "../components/ui";

// 15 — White-label partnerships: compact band near the bottom.
export default function WhiteLabel() {
  return (
    <section data-index="15" data-label="White-Label Partnerships" className="on-light bg-off py-[clamp(72px,8vw,120px)]">
      <div className="wrap">
        <div className="grid gap-10 overflow-hidden rounded-[32px] bg-glacier p-8 md:p-14 lg:grid-cols-[1.1fr_1fr] lg:items-center" data-reveal>
          <div>
            <p className="eyebrow">For marketing & development agencies</p>
            <h2 className="mt-6 text-[clamp(32px,3.6vw,56px)] leading-[1] tracking-[-0.045em]">{WHITE_LABEL.title}</h2>
            <p className="mt-5 max-w-lg text-lg text-navy-2">{WHITE_LABEL.d}</p>
            <div className="mt-8">
              <Pill href={`mailto:${SITE.email}?subject=White-label%20partnership`} variant="navy">{WHITE_LABEL.cta}</Pill>
            </div>
          </div>
          <ul className="grid gap-2" data-cascade>
            {WHITE_LABEL.items.map((it, i) => (
              <li key={it} className="flex items-center gap-4 rounded-2xl bg-off px-5 py-4 transition hover:translate-x-1.5 hover:bg-white">
                <span className="text-sm tabular-nums text-navy-2">0{i + 1}</span>
                <span className="font-medium">{it}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
