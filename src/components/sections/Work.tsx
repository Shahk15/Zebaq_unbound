import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { WORK } from "../../data/content";
import { Arrow, Split, Verify } from "../common/ui";

// 07 — Featured Work & Results: real client sites in laptop mockups,
// told as Challenge → Solution → Verified Outcome → View Case Study.
export default function Work() {
  const root = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>(".wk-dev").forEach((el) => {
        gsap.fromTo(el, { rotateX: 24, y: 60, scale: 0.9 }, { rotateX: 0, y: 0, scale: 1, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "center 55%", scrub: true } });
      });
    },
    { scope: root },
  );

  const tilt = (e: React.PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const dev = e.currentTarget.querySelector(".wk-inner");
    gsap.to(dev, { rotateY: ((e.clientX - r.left) / r.width - 0.5) * 10, rotateX: -((e.clientY - r.top) / r.height - 0.5) * 8, duration: 0.8, ease: "power3" });
  };
  const untilt = (e: React.PointerEvent<HTMLElement>) => gsap.to(e.currentTarget.querySelector(".wk-inner"), { rotateY: 0, rotateX: 0, duration: 1 });

  return (
    <section id="work" ref={root} data-index="07" data-label="Featured Work & Results" className="on-light section bg-off">
      <div className="wrap">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="eyebrow" data-reveal>Featured work & results</p>
            <h2 className="t-xl mt-8"><Split text="Selected work" dot /></h2>
          </div>
          <p className="max-w-xs text-lg leading-relaxed text-navy-2" data-reveal>The challenge, what we changed, and the outcome we can verify.</p>
        </div>

        <div className="mt-20 grid gap-x-6 gap-y-24 lg:grid-cols-2">
          {WORK.map((w, i) => (
            <article key={w.client} className={`group ${i % 2 ? "lg:mt-40" : ""}`} data-reveal>
              <a href={w.url} target="_blank" rel="noreferrer" onPointerMove={tilt} onPointerLeave={untilt} className="relative block overflow-hidden rounded-[28px] bg-[radial-gradient(120%_90%_at_50%_0%,#1c3c78_0%,#0a1f44_45%,#071631_100%)] px-[8%] pt-[12%] [perspective:1400px]" data-cursor="hover">
                <div className="wk-dev origin-bottom">
                  <div className="wk-inner [transform-style:preserve-3d]">
                    <div className="mx-auto w-full rounded-t-[14px] border-[6px] border-b-0 border-[#1a1d24] bg-[#1a1d24] shadow-[0_40px_80px_-20px_rgba(0,0,0,.6)]">
                      <div className="aspect-[16/10] overflow-hidden rounded-t-[8px] bg-white">
                        <img src={w.img} alt={`${w.client} website`} className="h-full w-full object-cover object-top transition-transform duration-[1.6s] ease-out group-hover:scale-[1.04]" loading="lazy" />
                      </div>
                    </div>
                    <div className="mx-[-6%] h-3 rounded-b-[14px] bg-gradient-to-b from-[#c9ced6] to-[#8a919c]" />
                  </div>
                </div>
                <span className="absolute left-6 top-6 grid h-20 w-20 place-items-center rounded-full bg-lemon text-xs font-bold uppercase tracking-widest text-navy transition-transform duration-500 group-hover:scale-110">View</span>
              </a>

              <div className="mt-7">
                <p className="text-sm text-navy-2">0{i + 1} — {w.sector} · {w.services}</p>
                <h3 className="mt-3 text-[clamp(34px,3vw,48px)] tracking-[-0.045em]">{w.client}</h3>
              </div>
              <ol className="mt-8 grid gap-px overflow-hidden rounded-[20px] bg-navy/10 sm:grid-cols-3">
                {[
                  { k: "Client challenge", v: w.challenge },
                  { k: "ZEBAQ solution", v: w.solution },
                  { k: "Verified outcome", v: w.outcome, hl: true },
                ].map((s, j) => (
                  <li key={s.k} className={`relative p-5 ${s.hl ? "bg-lemon-soft" : "bg-off"}`}>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-navy-2">{j + 1} · {s.k}{s.hl && <Verify on={w.verify} />}</p>
                    <p className="mt-3 text-[15px] leading-relaxed">{s.v}</p>
                  </li>
                ))}
              </ol>
              <a href={w.url} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 font-semibold underline-offset-4 hover:underline">View case study <Arrow size={16} /></a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
