import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { IMAGES, WHY } from "../../data/content";
import { Dot } from "../common/ui";

// Cinematic image reveal: the frame opens from a small window to full bleed
// while the three-line manifesto slides across it.
export default function AiHuman() {
  const root = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        gsap.timeline({ scrollTrigger: { trigger: root.current, start: "top top", end: "+=150%", scrub: 1, pin: true } })
          .fromTo(".ai-frame", { clipPath: "inset(22% 30% 22% 30% round 32px)" }, { clipPath: "inset(0% 0% 0% 0% round 0px)", ease: "none" }, 0)
          .fromTo(".ai-img", { scale: 1.35 }, { scale: 1, ease: "none" }, 0)
          .from(".ai-line", { xPercent: (i) => (i % 2 ? 40 : -40), opacity: 0, stagger: 0.12, ease: "none" }, 0.25)
          .from(".ai-foot", { y: 40, opacity: 0, ease: "none" }, 0.6);
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} data-dark className="relative h-[100svh] min-h-[620px] overflow-hidden bg-ink text-off">
      <div className="ai-frame absolute inset-0 overflow-hidden">
        <img src={IMAGES.ai} alt="Two classical statues wearing virtual-reality headsets" className="ai-img h-full w-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/30" />
      </div>
      <div className="wrap relative flex h-full flex-col justify-end pb-14">
        <p className="eyebrow text-glacier-2">How we work</p>
        <h2 className="t-xl mt-6">
          {WHY.title.map((l, i) => (
            <span key={l} className={`ai-line block ${i === 1 ? "text-glacier-2" : ""}`}>
              {l.replace(/\.$/, "")}{i === 2 ? <Dot /> : "."}
            </span>
          ))}
        </h2>
        <p className="ai-foot mt-8 max-w-xl text-lg leading-relaxed text-glacier-2">
          AI makes us faster and sharper. Experienced strategists decide what ships — and answer for the results.
        </p>
      </div>
    </section>
  );
}
