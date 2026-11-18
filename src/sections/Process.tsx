import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { PROCESS } from "../content";
import { Pill, Split } from "../components/ui";

// "What happens when you get in touch" — removes the fear of the first call.
export default function Process() {
  const root = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: ".pr-track", start: "top 75%", end: "bottom 45%", scrub: true } });
      tl.fromTo(".pr-fill", { scaleX: 0 }, { scaleX: 1, ease: "none", duration: 1 });
      gsap.utils.toArray<HTMLElement>(".pr-node").forEach((el, i, all) => {
        tl.to(el, { backgroundColor: "#f5ea3b", scale: 1.4, duration: 0.05 }, i / (all.length - 1) - 0.02);
      });
    },
    { scope: root },
  );

  return (
    <section id="how" ref={root} data-dark data-index="13" data-label="How We Work" className="grain relative bg-ink text-off">
      <div className="wrap section">
        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">
          <div>
            <p className="eyebrow text-glacier-3" data-reveal>Our process</p>
            <h2 className="t-xl mt-8"><Split text="From first call" /><br /><Split text="to growth" dot /></h2>
          </div>
          <div className="max-w-sm" data-reveal>
            <p className="text-lg leading-relaxed text-glacier-3">No mystery and no hard sell. You know exactly where you stand after every step.</p>
            <Pill href="#contact" variant="lemon" className="mt-8">Book a Strategy Call</Pill>
          </div>
        </div>

        <div className="pr-track mt-28">
          <div className="relative hidden h-4 md:block">
            <div className="absolute inset-x-0 top-1/2 h-px bg-white/15" />
            <div className="pr-fill absolute inset-x-0 top-1/2 h-px origin-left bg-lemon" />
            <div className="absolute inset-0 flex justify-between">
              {PROCESS.map((p) => <span key={p.t} className="pr-node h-4 w-4 rounded-full bg-white/25" />)}
            </div>
          </div>
          <ol className="grid gap-12 md:mt-12 md:grid-cols-4 md:gap-8">
            {PROCESS.map((p, i) => (
              <li key={p.t} data-reveal>
                <p className="text-sm text-glacier-3">Step 0{i + 1}</p>
                <h3 className="mt-4 text-4xl tracking-tight">{p.t}</h3>
                <p className="mt-4 max-w-[30ch] leading-relaxed text-glacier-3">{p.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
