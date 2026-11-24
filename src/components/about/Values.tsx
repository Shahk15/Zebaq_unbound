import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Split } from "../common/ui";
import { useSectionReveal } from "../../hooks/useSectionReveal";
import type { ValuesContent } from "../../data/about";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Values({ data }: { data: ValuesContent }) {
    const root = useRef<HTMLElement>(null);

    useSectionReveal(root);

    useGSAP(
        () => {
            const mm = gsap.matchMedia();
            mm.add("(prefers-reduced-motion: no-preference)", () => {
                gsap.set(".vl-card", { y: 60, opacity: 0 });
                ScrollTrigger.batch(".vl-card", {
                    start: "top 90%",
                    once: true,
                    onEnter: (els) =>
                        gsap.to(els, {
                            y: 0,
                            opacity: 1,
                            duration: 1.1,
                            ease: "expo.out",
                            stagger: 0.1,
                            // Hand the transform back to the hover tilt
                            clearProps: "transform,opacity",
                        }),
                });
            });
            return () => mm.revert();
        },
        { scope: root }
    );

    // Spotlight follows the cursor and the card tilts slightly towards it
    const onMove = (e: React.PointerEvent<HTMLElement>) => {
        const el = e.currentTarget;
        const r = el.getBoundingClientRect();
        const x = e.clientX - r.left;
        const y = e.clientY - r.top;
        el.style.setProperty("--mx", `${x}px`);
        el.style.setProperty("--my", `${y}px`);
        const rx = (y / r.height - 0.5) * -6;
        const ry = (x / r.width - 0.5) * 6;
        el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
    };
    const onLeave = (e: React.PointerEvent<HTMLElement>) => {
        e.currentTarget.style.transform = "";
    };

    return (
        <section ref={root} className="relative z-10 overflow-hidden rounded-t-[clamp(28px,4vw,56px)] bg-glacier text-navy">
            <div className="wrap section">
                <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
                    <div>
                        <p className="eyebrow text-navy-2" data-reveal>{data.eyebrow}</p>
                        <h2 className="t-xl mt-8">
                            <Split text={data.title} dot />
                        </h2>
                    </div>
                    <p className="max-w-sm text-lg leading-relaxed text-navy-2" data-reveal>{data.text}</p>
                </div>

                <div className="mt-[clamp(40px,6vw,88px)] grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {data.items.map((v) => (
                        <article
                            key={v.n}
                            onPointerMove={onMove}
                            onPointerLeave={onLeave}
                            className="vl-card group relative min-h-[clamp(240px,22vw,320px)] overflow-hidden rounded-[28px] bg-off p-[clamp(24px,2.4vw,36px)] text-navy will-change-transform [transition:transform_0.5s_cubic-bezier(0.2,0.7,0.2,1),background-color_0.5s,color_0.5s] hover:bg-ink hover:text-off"
                        >
                            {/* Lemon spotlight under the cursor */}
                            <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(380px_circle_at_var(--mx,50%)_var(--my,50%),rgba(245,234,59,0.2),transparent_65%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                            <div className="relative flex h-full flex-col">
                                <span className="text-sm text-navy-2 transition-colors duration-500 group-hover:text-lemon">{v.n}</span>
                                <span className="mt-6 block h-px w-10 bg-navy/20 transition-all duration-500 group-hover:w-full group-hover:bg-lemon" />
                                <h3 className="mt-8 text-[clamp(22px,2vw,32px)] font-medium leading-tight tracking-[-0.04em] transition-transform duration-500 group-hover:translate-x-1">
                                    {v.title}
                                </h3>
                                <p className="mt-4 max-w-[32ch] text-[15px] leading-relaxed text-navy-2 transition-colors duration-500 group-hover:text-glacier-3">
                                    {v.text}
                                </p>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}