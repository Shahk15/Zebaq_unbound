import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Split } from "../common/ui";
import { useSectionReveal } from "../../hooks/useSectionReveal";
import type { WhoContent } from "../../data/about";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function WhoWeAre({ data }: { data: WhoContent }) {
    const root = useRef<HTMLElement>(null);

    useSectionReveal(root);

    useGSAP(
        () => {
            const mm = gsap.matchMedia();
            mm.add("(prefers-reduced-motion: no-preference)", () => {
                // Capsules pop in one after another
                gsap.from(".wc-chip", {
                    y: 26,
                    opacity: 0,
                    duration: 0.9,
                    ease: "expo.out",
                    stagger: 0.05,
                    scrollTrigger: { trigger: ".wc-wrap", start: "top 92%", once: true },
                });

                // Figures rise in and count up
                gsap.from(".wf-item", {
                    y: 50,
                    opacity: 0,
                    duration: 1.1,
                    ease: "expo.out",
                    stagger: 0.12,
                    scrollTrigger: { trigger: ".wf-grid", start: "top 90%", once: true },
                });

                gsap.utils.toArray<HTMLElement>(".wf-val").forEach((el) => {
                    const to = Number(el.dataset.to ?? 0);
                    const o = { v: 0 };
                    el.textContent = "0";
                    gsap.to(o, {
                        v: to,
                        duration: 1.6,
                        ease: "power2.out",
                        onUpdate: () => {
                            el.textContent = String(Math.round(o.v));
                        },
                        scrollTrigger: { trigger: ".wf-grid", start: "top 90%", once: true },
                    });
                });
            });
            return () => mm.revert();
        },
        { scope: root }
    );

    return (
        <section ref={root} className="relative z-10 overflow-hidden rounded-t-[clamp(28px,4vw,56px)] bg-glacier text-navy">
            <div className="wrap pb-[clamp(72px,9vw,140px)] pt-[clamp(56px,7vw,110px)]">
                <p className="eyebrow mb-8 text-navy-2" data-reveal>{data.eyebrow}</p>

                {/* Same size as the hero heading, two lines */}
                <h2
                    className="text-[clamp(44px,8vw,150px)] font-normal leading-[1] tracking-[-0.05em]"
                    style={{ fontFamily: "var(--font-display)" }}
                >
                    <Split text={data.line1} />
                    <br />
                    <Split text={data.line2} dot />
                </h2>

                {/* Subhead: full width under the heading */}
                <p
                    className="mt-[clamp(28px,4vw,56px)] text-pretty text-[clamp(20px,2vw,32px)] leading-[1.45] tracking-[-0.01em] text-navy"
                    data-reveal
                >
                    {data.lead}
                </p>

                {/* Capsules */}
                <div className="wc-wrap mt-[clamp(32px,4.5vw,64px)] flex flex-wrap gap-2.5 md:gap-3">
                    {data.chips.map((c) => (
                        <span
                            key={c}
                            className="wc-chip cursor-default rounded-full border border-navy/15 bg-off/60 px-5 py-2.5 text-sm text-navy transition-[transform,background-color,border-color] duration-300 hover:-translate-y-1 hover:border-lemon hover:bg-lemon"
                        >
                            {c}
                        </span>
                    ))}
                </div>

                {/* Figures */}
                <dl className="wf-grid mt-[clamp(48px,7vw,96px)] grid border-t border-navy/15 md:grid-cols-3">
                    {data.figures.map((f) => (
                        <div
                            key={f.label}
                            className="wf-item group relative border-b border-navy/15 py-[clamp(28px,3vw,44px)] md:border-b-0 md:border-r md:px-[clamp(20px,2.4vw,40px)] md:first:pl-0 md:last:border-r-0 md:last:pr-0"
                        >
                            <dt className="text-sm uppercase tracking-[0.14em] text-navy-2">{f.label}</dt>
                            <dd
                                className="mt-5 flex items-baseline gap-1 text-[clamp(64px,8vw,128px)] font-light leading-none tracking-[-0.05em] transition-transform duration-500 group-hover:translate-x-2"
                                style={{ fontFamily: "var(--font-display)" }}
                            >
                                <span className="wf-val" data-to={f.value}>{f.value}</span>
                                {f.suffix && <span className="text-[0.55em] text-lemon-deep">{f.suffix}</span>}
                            </dd>
                            <dd className="mt-5 max-w-[26ch] text-[15px] leading-snug text-navy-2">{f.note}</dd>

                            {/* Line that draws across on hover */}
                            <span className="absolute bottom-0 left-0 h-px w-0 bg-lemon-deep transition-all duration-700 group-hover:w-full" />
                        </div>
                    ))}
                </dl>
            </div>
        </section>
    );
}