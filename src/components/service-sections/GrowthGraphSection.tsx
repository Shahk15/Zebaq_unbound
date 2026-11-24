import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Split } from "../common/ui";
import type { GraphContent } from "../../data/services/types";
import { useSectionReveal } from "../../hooks/useSectionReveal";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const W = 1000;
const H = 260;
// Slow start, steep finish: the shape of compounding
const LINE = "M0,244 C200,242 380,232 520,196 C680,154 820,76 1000,18";
const AREA = `${LINE} L${W},${H} L0,${H} Z`;

export default function GrowthGraphSection({ data }: { data: GraphContent }) {
    const root = useRef<HTMLElement>(null);
    const pathRef = useRef<SVGPathElement>(null);
    const clipRef = useRef<SVGRectElement>(null);
    const dotRef = useRef<SVGGElement>(null);
    const dropRef = useRef<SVGLineElement>(null);
    const valRef = useRef<HTMLSpanElement>(null);


    useSectionReveal(root);

    useGSAP(
        () => {
            const section = root.current;
            const path = pathRef.current;
            const clip = clipRef.current;
            const dot = dotRef.current;
            const drop = dropRef.current;
            const val = valRef.current;
            if (!section || !path || !clip || !dot || !drop || !val) return;

            const len = path.getTotalLength();
            path.style.strokeDasharray = String(len);

            const months = Array.from(section.querySelectorAll<HTMLElement>(".dc-m"));
            const phases = Array.from(section.querySelectorAll<HTMLElement>(".dc-phase"));
            const { from, to } = data.meter;

            // Draws the whole chart for a given progress 0..1
            const render = (p: number) => {
                const pt = path.getPointAtLength(len * p);
                path.style.strokeDashoffset = String(len * (1 - p));
                clip.setAttribute("width", String(pt.x));
                dot.setAttribute("transform", `translate(${pt.x} ${pt.y})`);
                drop.setAttribute("x1", String(pt.x));
                drop.setAttribute("x2", String(pt.x));
                drop.setAttribute("y1", String(pt.y));
                val.textContent = String(Math.round(from + (to - from) * p));

                const cur = Math.round(p * data.months);
                months.forEach((m, i) => (m.dataset.on = String(i <= cur)));

                let active = 0;
                data.phases.forEach((ph, i) => {
                    if (ph.from <= Math.max(cur, 1)) active = i;
                });
                phases.forEach((el, i) => (el.dataset.on = String(i === active)));
            };

            const mm = gsap.matchMedia();
            mm.add(
                {
                    motion: "(prefers-reduced-motion: no-preference)",
                    pin: "(min-width: 768px) and (min-height: 640px)",
                },
                (ctx) => {
                    const { motion, pin } = ctx.conditions as { motion: boolean; pin: boolean };

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
                            ? { trigger: section, start: "top top", end: "+=150%", pin: true, anticipatePin: 1, scrub: 0.6, invalidateOnRefresh: true }
                            : { trigger: section, start: "top 70%", end: "bottom 70%", scrub: 0.6 },
                    });
                }
            );

            return () => mm.revert();
        },
        { scope: root, dependencies: [data] }
    );

    return (
        <section ref={root} data-dark className="relative z-10 flex flex-col justify-center overflow-hidden rounded-t-[clamp(28px,4vw,56px)] bg-ink text-off md:min-h-[100svh]">
            <div className="wrap py-[clamp(72px,10vh,120px)]">
                <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
                    <div>
                        <p className="eyebrow text-glacier-3" data-reveal>{data.eyebrow}</p>
                        <h2 className="t-xl mt-8">
                            <Split text={data.title} dot />
                        </h2>
                    </div>

                    <div className="md:text-right">
                        <p className="flex items-baseline gap-2 md:justify-end" style={{ fontFamily: "var(--font-display)" }}>
                            <span ref={valRef} className="text-[clamp(56px,8vw,128px)] font-light leading-none tracking-[-0.05em] text-lemon">0</span>
                            <span className="text-[clamp(20px,2vw,32px)] text-glacier-3">{data.meter.suffix}</span>
                        </p>
                        <p className="mt-3 text-sm uppercase tracking-[0.14em] text-glacier-3">{data.meter.label}</p>
                    </div>
                </div>

                {/* Chart */}
                <div className="mt-[clamp(32px,6vh,72px)]">
                    <svg viewBox={`0 0 ${W} ${H}`} className="block w-full overflow-visible" role="img" aria-label="Illustrative visibility growth over 12 months">
                        <defs>
                            <linearGradient id="dc-fill" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#F5EA3B" stopOpacity="0.22" />
                                <stop offset="100%" stopColor="#F5EA3B" stopOpacity="0" />
                            </linearGradient>
                            <clipPath id="dc-clip">
                                <rect ref={clipRef} x="0" y="0" width="0" height={H} />
                            </clipPath>
                        </defs>

                        {/* Grid */}
                        {[65, 130, 195].map((y) => (
                            <line key={y} x1="0" x2={W} y1={y} y2={y} stroke="rgba(255,255,255,0.08)" />
                        ))}
                        <line x1="0" x2={W} y1={H} y2={H} stroke="rgba(255,255,255,0.18)" />

                        {/* Area + line */}
                        <path d={AREA} fill="url(#dc-fill)" clipPath="url(#dc-clip)" />
                        <path ref={pathRef} d={LINE} fill="none" stroke="#F5EA3B" strokeWidth="3" strokeLinecap="round" />

                        {/* Marker */}
                        <line ref={dropRef} x1="0" x2="0" y1="0" y2={H} stroke="rgba(245,234,59,0.35)" strokeDasharray="4 6" />
                        <g ref={dotRef}>
                            <circle r="18" fill="rgba(245,234,59,0.18)" />
                            <circle r="7" fill="#F5EA3B" />
                        </g>
                    </svg>

                    {/* Month axis */}
                    <div className="mt-4 flex justify-between text-xs tabular-nums">
                        {Array.from({ length: data.months + 1 }, (_, i) => (
                            <span key={i} data-on="false" className="dc-m text-glacier-3/40 transition-colors duration-300 data-[on=true]:text-off">
                                {i}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Phases */}
                <div className="mt-[clamp(28px,5vh,56px)] grid gap-6 md:grid-cols-3">
                    {data.phases.map((ph) => (
                        <div
                            key={ph.title}
                            data-on="false"
                            className="dc-phase group border-t border-white/15 pt-5 opacity-40 transition-[opacity,border-color] duration-500 data-[on=true]:border-lemon data-[on=true]:opacity-100"
                        >
                            <p className="text-lg font-medium transition-colors duration-500 group-data-[on=true]:text-lemon">{ph.title}</p>
                            <p className="mt-1 text-xs uppercase tracking-[0.14em] text-glacier-3">{ph.range}</p>
                            <p className="mt-3 max-w-[34ch] text-sm leading-relaxed text-glacier-3">{ph.text}</p>
                        </div>
                    ))}
                </div>

                <p className="mt-8 text-xs text-glacier-3/70">{data.note}</p>
            </div>
        </section>
    );
}