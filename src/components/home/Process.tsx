import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { PROCESS } from "../../data/home/process";
import { Pill, Split } from "../common/ui";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// "What happens when you get in touch" — removes the fear of the first call.
export default function Process() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      /* Desktop: track is pinned, scroll is slowed down, steps light up one by one */
      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        const steps = gsap.utils.toArray<HTMLElement>(".pr-step");
        const nodes = gsap.utils.toArray<HTMLElement>(".pr-node");
        const n = steps.length;

        gsap.set(steps, { opacity: 0.22, y: 28 });

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: ".pr-track",
            start: "center center",
            end: () => `+=${Math.round(window.innerHeight * 1.6)}`, // bigger = slower
            pin: true,
            scrub: 1, // smooth catch-up, feels premium
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // line fills across the whole timeline
        tl.fromTo(".pr-fill", { scaleX: 0 }, { scaleX: 1, duration: n - 1 }, 0);

        steps.forEach((step, i) => {
          const at = i === 0 ? 0 : i - 0.15;
          tl.to(nodes[i], { backgroundColor: "#f5ea3b", scale: 1.5, duration: 0.2, ease: "power2.out" }, at)
            .to(step, { opacity: 1, y: 0, duration: 0.45, ease: "power3.out" }, at)
            // previous step settles back a little so the active one stands out
            .to(steps[i - 1] ?? {}, { opacity: 0.55, duration: 0.3 }, at + 0.2);
        });

        // hold at the end so the last step stays on screen before the pin releases
        tl.to({}, { duration: 0.8 });
      });

      /* Mobile / reduced motion: simple scrubbed reveal, no pin */
      mm.add("(max-width: 767px), (prefers-reduced-motion: reduce)", () => {
        gsap.utils.toArray<HTMLElement>(".pr-step").forEach((el) => {
          gsap.from(el, {
            y: 30,
            opacity: 0,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top 90%", end: "top 65%", scrub: true },
          });
        });
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section id="how" ref={root} data-dark data-index="13" data-label="How We Work" className="grain relative bg-ink text-off">
      <div className="wrap section">
        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">
          <div>
            <p className="eyebrow text-glacier-3" data-reveal>Our process</p>
            <h2 className="t-xl mt-8"><Split text="What happens" /><br /><Split text="after you book" dot /></h2>
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
              <li key={p.t} className="pr-step">
                <p className="text-sm text-glacier-3">Step 0{i + 1}</p>
                <h3 className="mt-4 text-[clamp(30px,2.6vw,38px)] leading-[1.1] tracking-[-0.03em]">{p.t}</h3>
                <p className="mt-4 max-w-[30ch] leading-relaxed text-glacier-3">{p.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}