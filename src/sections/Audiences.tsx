import { AUDIENCES, IMAGES } from "../content";
import { Arrow, Split } from "../components/ui";
import { AutoCarousel } from "../components/fx";

const ART = [IMAGES.perfected, IMAGES.kintsugi, IMAGES.ai];

// 06 — Who We Help: an endless, draggable carousel; hover slows it and
// lifts the sculpture art into the card.
export default function Audiences() {
  const card = (a: (typeof AUDIENCES)[number], i: number) => (
    <a href="#contact" className="group relative flex h-[clamp(460px,62vh,560px)] w-[min(86vw,500px)] flex-col justify-between overflow-hidden rounded-[30px] bg-off p-8 transition-colors duration-700 hover:bg-ink hover:text-off md:p-10" draggable={false}>
      <img src={ART[i % ART.length]} alt="" aria-hidden="true" draggable={false} className="pointer-events-none absolute inset-0 h-full w-full translate-y-8 scale-110 object-cover opacity-0 transition-all duration-[1.2s] ease-out group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-35" loading="lazy" />
      <div className="relative flex items-start justify-between">
        <span className="text-[72px] font-medium leading-none tracking-[-0.06em] text-glacier-2 transition-colors group-hover:text-lemon" style={{ fontFamily: "var(--font-display)" }}>0{(i % AUDIENCES.length) + 1}</span>
        <span className="grid h-12 w-12 place-items-center rounded-full bg-navy text-off transition-all duration-500 group-hover:rotate-45 group-hover:bg-lemon group-hover:text-navy"><Arrow /></span>
      </div>
      <div className="relative">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-navy-2 group-hover:text-lemon">{a.flagship}</p>
        <h3 className="mt-4 text-[clamp(32px,3vw,48px)] tracking-[-0.045em]">{a.t}</h3>
        <p className="mt-4 leading-relaxed text-navy-2 group-hover:text-glacier-2">{a.d}</p>
        <div className="mt-6 flex flex-wrap gap-2">{a.tags.map((t) => <span key={t} className="chip">{t}</span>)}</div>
      </div>
    </a>
  );
  // repeat so the loop always overfills wide screens
  const items = [...AUDIENCES, ...AUDIENCES].map((a, i) => card(a, i));

  return (
    <section id="who" data-index="06" data-label="Who We Help" className="on-light section bg-glacier">
      <div className="wrap flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <div>
          <p className="eyebrow" data-reveal>Who we help</p>
          <h2 className="t-xl mt-8 max-w-[12ch]"><Split text="Built for people who want customers" dot /></h2>
        </div>
        <div className="max-w-sm" data-reveal>
          <p className="text-lg leading-relaxed text-navy-2">Business owners, B2B companies, consultants and coaches — across the USA, UK, Europe, the Middle East, India and Australia.</p>
          <p className="mt-4 text-sm text-navy-2">Drag the cards · hover to slow down</p>
        </div>
      </div>
      <div className="mt-16" data-reveal>
        <AutoCarousel items={items} speed={34} gap={16} />
      </div>
    </section>
  );
}
