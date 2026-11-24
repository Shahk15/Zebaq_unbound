import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Split } from "../common/ui";
import { useSectionReveal } from "../../hooks/useSectionReveal";
import type { SpeedContent } from "../../data/services/types";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const clamp = (n: number) => Math.min(1, Math.max(0, n));

// A browser window that paints in as you scroll, next to four speed targets that count up
export default function SpeedSection({ data }: { data: SpeedContent }) {
    const root = useRef<HTMLElement>(null);

    useSectionReveal(root);

    useGSAP(
        () => {
            const section = root.current;
            if (!section) return;

            const vals = Array.from(section.querySelectorAll<HTMLElement>(".pf-val"));
            const bars = Array.from(section.querySelectorAll<HTMLElement>(".pf-bar"));
            const blocks = Array.from(section.querySelectorAll<HTMLElement>(".pf-blk"));
            const loadbar = section.querySelector<HTMLElement>(".pf-load");
            const status = section.querySelector<HTMLElement>(".pf-status");
            const ease = gsap.parseEase("power2.out");

            // Paints the whole section for a given progress 0..1
            const render = (p: number) => {
                const k = ease(p);

                vals.forEach((el, i) => {
                    const m = data.metrics[i];
                    el.textContent = `${m.prefix ?? ""}${(m.value * k).toFixed(m.decimals ?? 0)}`;
                    el.dataset.done = String(p >= 0.98);
                });
                bars.forEach((b) => (b.style.transform = `scaleX(${k})`));
                if (loadbar) loadbar.style.transform = `scaleX(${p})`;

                // Page blocks paint in one after another, like a real page loading
                blocks.forEach((b, i) => {
                    const t = clamp((p - 0.08 - i * 0.09) / 0.22);
                    b.style.opacity = String(0.12 + t * 0.88);
                    b.style.transform = `translateY(${(1 - t) * 14}px)`;
                });

                if (status) {
                    status.textContent = p >= 0.98 ? data.frame.ready : data.frame.loading;
                    status.dataset.done = String(p >= 0.98);
                }
            };

            const mm = gsap.matchMedia();
            mm.add(
                {
                    motion: "(prefers-reduced-motion: no-preference)",
                    pin: "(min-width: 768px) and (min-height: 640px)",
                },
                (ctx) => {
                    const { motion, pin } = ctx.conditions as { motion: boolean; pin: boolean };

                    // Reduced motion: show the finished state
                    if (!motion) {
                        render(1);
                        return;
                    }

                    render(0);
                    const state = { p: 0 };
                    gsap.to(state, {
                        p: 1,
                        ease: "none",
                        onUpdate: () => render(state.p),
                        scrollTrigger: pin
                            ? { trigger: section, start: "top top", end: "+=140%", pin: true, anticipatePin: 1, scrub: 0.6, invalidateOnRefresh: true }
                            : { trigger: section, start: "top 70%", end: "bottom 70%", scrub: 0.6 },
                    });
                }
            );

            return () => mm.revert();
        },
        { scope: root, dependencies: [data] }
    );

    return (
        <section
            ref={root}
            data-dark
            className="relative z-10 flex flex-col justify-center overflow-hidden rounded-t-[clamp(28px,4vw,56px)] bg-ink text-off md:min-h-[100svh]"
        >
            <div className="wrap py-[clamp(72px,10vh,120px)]">
                <div className="grid gap-[clamp(40px,6vw,96px)] lg:grid-cols-[1fr_1.05fr] lg:items-center">
                    {/* Left: copy + live targets */}
                    <div>
                        <p className="eyebrow text-glacier-3" data-reveal>{data.eyebrow}</p>
                        <h2 className="t-xl mt-8 max-w-[12ch]">
                            <Split text={data.title} dot />
                        </h2>
                        <p className="mt-8 max-w-md text-lg leading-relaxed text-glacier-3" data-reveal>{data.text}</p>

                        <ul className="mt-[clamp(28px,5vh,56px)]">
                            {data.metrics.map((m) => (
                                <li key={m.label} className="border-t border-white/10 py-5">
                                    <div className="flex items-baseline justify-between gap-6">
                                        <div>
                                            <p className="text-sm uppercase tracking-[0.14em] text-glacier-3">{m.label}</p>
                                            <p className="mt-1 text-xs text-glacier-3/60">{m.note}</p>
                                        </div>
                                        <p
                                            className="flex items-baseline gap-1 whitespace-nowrap font-light leading-none tracking-[-0.04em]"
                                            style={{ fontFamily: "var(--font-display)" }}
                                        >
                                            <span className="pf-val text-[clamp(30px,3.2vw,52px)] text-off transition-colors duration-300 data-[done=true]:text-lemon">0</span>
                                            <span className="text-[clamp(14px,1.2vw,20px)] text-glacier-3">{m.unit}</span>
                                        </p>
                                    </div>
                                    <div className="mt-4 h-px bg-white/10">
                                        <div className="pf-bar h-px origin-left scale-x-0 bg-lemon" />
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Right: a browser window that paints in as you scroll */}
                    <div className="overflow-hidden rounded-[22px] border border-white/15 bg-white/[0.04] shadow-2xl">
                        <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
                            <span className="flex gap-1.5">
                                <i className="h-2.5 w-2.5 rounded-full bg-white/20" />
                                <i className="h-2.5 w-2.5 rounded-full bg-white/20" />
                                <i className="h-2.5 w-2.5 rounded-full bg-white/20" />
                            </span>
                            <span className="flex-1 truncate rounded-full bg-white/[0.06] px-4 py-1.5 text-xs text-glacier-3">{data.frame.url}</span>
                            <span className="pf-status text-xs text-glacier-3 transition-colors data-[done=true]:text-lemon">{data.frame.loading}</span>
                        </div>
                        <div className="h-[2px] bg-white/5">
                            <div className="pf-load h-[2px] origin-left scale-x-0 bg-lemon" />
                        </div>

                        <div className="space-y-4 p-5 md:p-7">
                            <div className="pf-blk h-[clamp(90px,14vh,150px)] rounded-2xl bg-white/[0.14]" />
                            <div className="pf-blk h-3 w-3/4 rounded-full bg-white/[0.14]" />
                            <div className="pf-blk h-3 w-1/2 rounded-full bg-white/[0.14]" />
                            <div className="grid grid-cols-3 gap-4 pt-2">
                                <div className="pf-blk h-[clamp(60px,10vh,100px)] rounded-xl bg-white/[0.1]" />
                                <div className="pf-blk h-[clamp(60px,10vh,100px)] rounded-xl bg-white/[0.1]" />
                                <div className="pf-blk h-[clamp(60px,10vh,100px)] rounded-xl bg-lemon/70" />
                            </div>
                            <div className="pf-blk h-10 w-36 rounded-full bg-white/[0.18]" />
                        </div>
                    </div>
                </div>

                <p className="mt-10 max-w-2xl text-xs text-glacier-3/70">{data.note}</p>
            </div>
        </section>
    );
}