import { MODELS } from "../content";
import { Split } from "../components/ui";

export default function Models() {
  return (
    <section data-index="12" data-label="Flexible Engagement Models" className="on-light section bg-glacier">
      <div className="wrap">
        <p className="eyebrow" data-reveal>Flexible engagement</p>
        <h2 className="t-xl mt-8"><Split text="Work with us your way" dot /></h2>
        <div className="mt-24 grid gap-4 md:grid-cols-2 lg:grid-cols-4" data-flip>
          {MODELS.map((m, i) => (
            <div key={m.t} className="group flex min-h-[320px] flex-col justify-between rounded-[28px] bg-off p-8 transition-colors duration-500 hover:bg-lemon">
              <span className="text-[88px] font-medium leading-none tracking-[-0.06em] text-glacier-2 transition-colors group-hover:text-navy" style={{ fontFamily: "var(--font-display)" }}>{i + 1}</span>
              <div>
                <h3 className="text-2xl font-semibold tracking-tight">{m.t}</h3>
                <p className="mt-3 leading-relaxed text-navy-2 group-hover:text-navy">{m.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
