import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Split } from "../common/ui";
import { useEdgeReveal } from "../../hooks/useEdgeReveal";
import type { ServiceDetail } from "../../data/services/detail.types";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function DetailScope({ data }: { data: ServiceDetail["scope"] }) {
    const root = useRef<HTMLElement>(null);

    useEdgeReveal(root);

    useGSAP(
        () => {
            const section = root.current;
            if (!section) return;

            const mm = gsap.matchMedia();
            mm.add("(prefers-reduced-motion: no-preference)", () => {
                // Scope items rise in batches
                gsap.set(".ds-item", { y: 50, opacity: 0 });
                ScrollTrigger.batch(".ds-item", {
                    start: "top 90%",
                    once: true,
                    onEnter: (els) => gsap.to(els, { y: 0, opacity: 1, duration: 1, ease: "expo.out", stagger: 0.08 }),
                });

                // Timeline: the lemon line fills with scroll and each step lights up in turn
                const steps = Array.from(section.querySelectorAll<HTMLElement>(".dt-step"));
                const fill = section.querySelector<HTMLElement>(".dt-fill");
                const paint = (p: number) => {
                    if (fill) fill.style.transform = `scaleX(${p})`;
                    steps.forEach((el, i) => (el.dataset.on = String(p >= i / steps.length)));
                };
                paint(0);
                ScrollTrigger.create({
                    trigger: ".dt-wrap",
                    start: "top 75%",
                    end: "bottom 55%",
                    scrub: true,
                    onUpdate: (self) => paint(self.progress),
                });
            });

            // Reduced motion: show everything lit
            mm.add("(prefers-reduced-motion: reduce)", () => {
                section.querySelectorAll<HTMLElement>(".dt-step").forEach((el) => (el.dataset.on = "true"));
                const fill = section.querySelector<HTMLElement>(".dt-fill");
                if (fill) fill.style.transform = "scaleX(1)";
            });

            return () => mm.revert();
        },
        { scope: root }
    );

    return (
        <section ref={root} data-dark className="relative z-10 rounded-t-[clamp(28px,4vw,56px)] bg-ink text-off">
            <div className="wrap section">
                <p className="eyebrow text-glacier-3" data-reveal>{data.eyebrow}</p>
                <h2 className="t-xl mt-8 max-w-[14ch]">
                    <Split text={data.title} dot />
                </h2>

                <div className="mt-[clamp(48px,7vw,96px)] grid gap-x-10 md:grid-cols-2 lg:grid-cols-3">
                    {data.items.map((it) => (
                        <article key={it.title} className="ds-item border-t border-white/10 py-8 pr-4">
                            <span className="block h-1.5 w-1.5 bg-lemon" />
                            <h3 className="mt-6 text-xl font-medium tracking-[-0.02em]">{it.title}</h3>
                            <p className="mt-3 max-w-[36ch] text-[15px] leading-relaxed text-glacier-3">{it.text}</p>
                        </article>
                    ))}
                </div>

                {/* Timeline */}
                <div className="dt-wrap mt-[clamp(72px,10vw,150px)]">
                    <p className="eyebrow text-glacier-3" data-reveal>{data.timeline.eyebrow}</p>
                    <p className="mt-6 max-w-2xl text-lg leading-relaxed text-glacier-2" data-reveal>{data.timeline.text}</p>

                    <div className="relative mt-[clamp(40px,6vw,80px)]">
                        {/* Track + fill (desktop) */}
                        <div className="absolute left-0 right-0 top-[7px] hidden h-px bg-white/15 md:block">
                            <div className="dt-fill h-px origin-left scale-x-0 bg-lemon" />
                        </div>

                        <div className="grid gap-10 md:grid-cols-4 md:gap-6">
                            {data.timeline.steps.map((s) => (
                                <div key={s.title} data-on="false" className="dt-step group">
                                    <span className="relative z-10 block h-[15px] w-[15px] rounded-full border border-white/30 bg-ink transition-colors duration-500 group-data-[on=true]:border-lemon group-data-[on=true]:bg-lemon" />
                                    <h4
                                        className="mt-8 text-[clamp(26px,2.8vw,46px)] font-medium leading-[1.02] tracking-[-0.04em] text-off/25 transition-colors duration-500 group-data-[on=true]:text-off"
                                        style={{ fontFamily: "var(--font-display)" }}
                                    >
                                        {s.title}
                                    </h4>
                                    <p className="mt-4 max-w-[28ch] text-sm leading-relaxed text-glacier-3/60 transition-colors duration-500 group-data-[on=true]:text-glacier-3">
                                        {s.text}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}