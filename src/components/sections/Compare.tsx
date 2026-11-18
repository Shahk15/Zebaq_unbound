import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { IMAGES, WHY } from "../../data/content";
import { Split } from "../common/ui";

// "Without a system vs with ZEBAQ": the same marble horse, twice —
// fractured on the left, flawless on the right — in identical, aligned frames.
function Frame({ side }: { side: "left" | "right" }) {
  const left = side === "left";
  return (
    <figure className={`cmp-${left ? "l" : "r"}`}>
      <figcaption className="mb-4 flex items-center justify-between text-sm">
        <span className="text-navy-2">{left ? "← Without a system" : "With ZEBAQ →"}</span>
        <span className="font-medium">{left ? "Disconnected tactics" : "One connected system"}</span>
      </figcaption>
      <div className={`group relative aspect-[4/5] overflow-hidden rounded-[30px] ${left ? "bg-[radial-gradient(90%_70%_at_50%_40%,#22324f_0%,#0e1a30_60%,#071631_100%)]" : "bg-[radial-gradient(90%_70%_at_50%_40%,#ffffff_0%,#eef4f8_55%,#dbe8f1_100%)]"}`}>
        {/* floor shadow */}
        <span className={`absolute bottom-[9%] left-1/2 h-[6%] w-[62%] -translate-x-1/2 rounded-[50%] blur-xl ${left ? "bg-black/60" : "bg-navy/20"}`} />
        <img
          src={left ? IMAGES.horseCracked : IMAGES.horsePristine}
          alt={left ? "Marble horse covered in cracks" : "Flawless white marble horse"}
          draggable={false}
          className={`cmp-img absolute inset-x-[7%] bottom-[10%] mx-auto w-[86%] select-none object-contain transition-transform duration-700 ${left ? "[filter:grayscale(1)_brightness(.82)_contrast(1.12)] group-hover:animate-[shake_.5s_ease-in-out]" : "group-hover:scale-[1.03]"}`}
          loading="lazy"
        />
        {!left && <span className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(110deg,transparent_35%,rgba(255,255,255,.6)_50%,transparent_65%)] transition-transform duration-[1.4s] ease-out group-hover:translate-x-full" />}
        <span className={`absolute bottom-5 ${left ? "left-5 bg-off/90 text-navy" : "right-5 bg-lemon text-navy"} rounded-full px-4 py-2 text-xs font-semibold backdrop-blur`}>
          {left ? "Busy. Not growing." : "Visible. Chosen. Growing."}
        </span>
      </div>
    </figure>
  );
}

export default function Compare() {
  const root = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        gsap.timeline({ scrollTrigger: { trigger: root.current, start: "top 85%", end: "center 50%", scrub: 1 } })
          .fromTo(".cmp-l", { xPercent: -40, rotate: -5, opacity: 0.2 }, { xPercent: 0, rotate: 0, opacity: 1, ease: "none" }, 0)
          .fromTo(".cmp-r", { xPercent: 40, rotate: 5, opacity: 0.2 }, { xPercent: 0, rotate: 0, opacity: 1, ease: "none" }, 0);
      });
      gsap.from(".cmp-pt", { y: 30, opacity: 0, duration: 1, ease: "expo.out", stagger: 0.1, scrollTrigger: { trigger: ".cmp-list", start: "top 85%", once: true } });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="on-light relative overflow-hidden bg-off py-[clamp(110px,12vw,180px)]">
      <div className="wrap grid items-center gap-14 lg:grid-cols-[1fr_1.05fr_1fr] lg:gap-10">
        <div className="order-2 lg:order-1"><Frame side="left" /></div>
        <div className="order-1 text-center lg:order-2">
          <p className="eyebrow" data-reveal>Why ZEBAQ</p>
          <h2 className="t-l mt-6"><Split text="Why brands choose us" dot /></h2>
          <ol className="cmp-list mx-auto mt-12 max-w-md">
            {WHY.points.map((p, i) => (
              <li key={p.t} className="cmp-pt border-t border-navy/10 py-5 text-center">
                <p className="text-xs font-semibold text-navy-2">0{i + 1}</p>
                <h3 className="mt-2 text-xl font-semibold tracking-tight">{p.t}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-navy-2">{p.d}</p>
              </li>
            ))}
          </ol>
        </div>
        <div className="order-3"><Frame side="right" /></div>
      </div>
    </section>
  );
}
