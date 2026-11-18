import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SERVICES, type Service } from "../../data/content";
import { Arrow, Pill, Split, Verify } from "../common/ui";

// 05 — Ten disciplines. One growth system.
// Oversized rows; a lemon card trails the cursor with each outcome;
// a row's lemon wash sweeps in on hover; clicking opens the service drawer.
export default function Services() {
  const root = useRef<HTMLElement>(null);
  const card = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);
  const [open, setOpen] = useState<Service | null>(null);

  useGSAP(
    () => {
      gsap.from(".svc-row", {
        y: 70, opacity: 0, duration: 1.2, ease: "expo.out", stagger: 0.05,
        scrollTrigger: { trigger: ".svc-list", start: "top 85%", once: true },
      });
      // the big number counter on the left follows scroll progress through the list
      gsap.fromTo(".svc-meter", { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger: { trigger: ".svc-list", start: "top 60%", end: "bottom 60%", scrub: true } });
    },
    { scope: root },
  );

  const move = (e: React.PointerEvent) => {
    if (!card.current || !root.current) return;
    const r = root.current.getBoundingClientRect();
    gsap.to(card.current, { x: e.clientX - r.left + 28, y: e.clientY - r.top - 110, duration: 0.6, ease: "power3" });
  };

  const s = active !== null ? SERVICES[active] : null;

  return (
    <section id="services" ref={root} data-dark data-index="05" data-label="Core Services" onPointerMove={move} className="relative overflow-hidden bg-ink text-off">
      <div className="wrap section">
        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">
          <div>
            <p className="eyebrow text-glacier-3" data-reveal>10 core services</p>
            <h2 className="t-xl mt-8"><Split text="Ten disciplines." /><br /><Split text="One growth system" dot /></h2>
          </div>
          <p className="max-w-sm text-lg leading-relaxed text-glacier-3" data-reveal>
            More marketing doesn't always mean more customers. Every engagement starts with the outcome you need — pick one discipline, or connect them all.
          </p>
        </div>

        <div className="relative mt-24">
          {/* scroll meter */}
          <div className="absolute -left-[clamp(8px,1.6vw,32px)] top-0 hidden h-full w-px bg-white/10 lg:block">
            <div className="svc-meter h-full w-px origin-top bg-lemon" />
          </div>
          <ul className="svc-list border-b border-white/10" onPointerLeave={() => setActive(null)}>
            {SERVICES.map((sv, i) => (
              <li key={sv.slug} className="svc-row relative overflow-hidden border-t border-white/10">
                <button
                  onPointerEnter={() => setActive(i)}
                  onClick={() => setOpen(sv)}
                  className="group relative grid w-full grid-cols-[40px_1fr_auto] items-center gap-4 py-7 text-left md:grid-cols-[80px_1fr_auto_56px] md:gap-8 md:py-9"
                >
                  {/* hover wash */}
                  <span className="pointer-events-none absolute inset-y-0 -left-[100vw] -right-[100vw] origin-bottom scale-y-0 bg-white/[0.04] transition-transform duration-500 group-hover:scale-y-100" />
                  <span className="relative self-start pt-2 text-sm text-glacier-3 transition-colors group-hover:text-lemon md:self-center md:pt-0">{sv.n}</span>
                  <span className="relative">
                    <span className="block text-[clamp(30px,4.6vw,76px)] font-medium leading-none tracking-[-0.05em] transition-all duration-500 group-hover:translate-x-3 group-hover:text-lemon" style={{ fontFamily: "var(--font-display)" }}>
                      {sv.short}
                    </span>
                    <span className="mt-3 block text-sm uppercase tracking-[0.14em] text-glacier-3">{sv.name}</span>
                  </span>
                  <span className="relative hidden max-w-[380px] flex-wrap justify-end gap-2 lg:flex">
                    {sv.tags.map((t) => <span key={t} className="chip text-glacier-2 transition-colors group-hover:text-off">{t}</span>)}
                  </span>
                  <span className="relative grid h-12 w-12 place-items-center rounded-full shadow-[inset_0_0_0_1px_rgba(255,255,255,.25)] transition-all duration-500 group-hover:rotate-45 group-hover:bg-lemon group-hover:text-navy group-hover:shadow-none md:h-14 md:w-14">
                    <Arrow />
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-6 text-sm text-glacier-3">Click any discipline for what's included.</p>
      </div>

      {/* cursor-follow outcome card (desktop) */}
      <div ref={card} className={`pointer-events-none absolute left-0 top-0 z-10 hidden w-[320px] rounded-[22px] bg-lemon p-6 text-navy shadow-2xl transition-[opacity,scale] duration-300 lg:block ${s ? "scale-100 opacity-100" : "scale-75 opacity-0"}`}>
        <p className="text-xs font-semibold uppercase tracking-[0.14em]">Built to deliver · {s?.n}</p>
        <p className="mt-3 text-xl font-semibold leading-snug tracking-tight" style={{ fontFamily: "var(--font-display)" }}>{s?.outcome}</p>
        <p className="mt-4 text-sm leading-snug text-navy/75">{s?.bullets[0]}</p>
      </div>

      <ServiceDrawer service={open} onClose={() => setOpen(null)} />
    </section>
  );
}

function ServiceDrawer({ service, onClose }: { service: Service | null; onClose: () => void }) {
  const panel = useRef<HTMLDivElement>(null);
  const shade = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!service) return;
    document.body.style.overflow = "hidden";
    gsap.fromTo(shade.current, { opacity: 0 }, { opacity: 1, duration: 0.4 });
    gsap.fromTo(panel.current, { xPercent: 100 }, { xPercent: 0, duration: 0.8, ease: "expo.out" });
    gsap.from(".dr-item", { y: 30, opacity: 0, duration: 0.8, ease: "expo.out", stagger: 0.06, delay: 0.2 });
    const esc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    addEventListener("keydown", esc);
    return () => { document.body.style.overflow = ""; removeEventListener("keydown", esc); };
  }, [service, onClose]);

  if (!service) return null;
  return (
    <div className="fixed inset-0 z-[80]" role="dialog" aria-modal="true" aria-label={service.name}>
      <div ref={shade} className="absolute inset-0 bg-ink/60 backdrop-blur-sm" onClick={onClose} />
      <div ref={panel} className="absolute inset-y-0 right-0 flex w-full max-w-[640px] flex-col overflow-y-auto bg-off p-8 text-navy md:p-14">
        <div className="flex items-center justify-between">
          <span className="text-sm text-navy-2">Service {service.n} / 10</span>
          <button onClick={onClose} className="grid h-12 w-12 place-items-center rounded-full shadow-[inset_0_0_0_1px_rgba(10,31,68,.25)] hover:bg-lemon" aria-label="Close">✕</button>
        </div>
        <h3 className="dr-item mt-16 text-[clamp(40px,5vw,72px)] leading-[0.95] tracking-[-0.05em]">{service.short}<span className="dot" /></h3>
        <p className="dr-item mt-4 text-sm uppercase tracking-[0.14em] text-navy-2">{service.name}</p>
        <p className="dr-item mt-10 text-2xl leading-snug" style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }}>{service.outcome}</p>
        <ul className="mt-10 border-b border-navy/10">
          {service.bullets.map((b) => (
            <li key={b} className="dr-item flex gap-4 border-t border-navy/10 py-5 text-lg">
              <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-lemon-deep" />{b}
            </li>
          ))}
        </ul>
        {service.verifyNote && import.meta.env.DEV && <p className="mt-4 text-sm text-red-700">{service.verifyNote}<Verify on /></p>}
        <div className="dr-item mt-auto flex flex-wrap gap-3 pt-12">
          <Pill
            variant="navy"
            onClick={() => {
              onClose();
              setTimeout(() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }), 80);
            }}
          >
            Discuss this service
          </Pill>
        </div>
      </div>
    </div>
  );
}
