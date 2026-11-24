import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { geoEquirectangular, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import type { GeometryCollection, Topology } from "topojson-specification";
import countries from "world-atlas/countries-110m.json";
import "flag-icons/css/flag-icons.min.css";
import { Split } from "../common/ui";
import { SERVICES } from "../../data/shared/services";
import { useSectionReveal } from "../../hooks/useSectionReveal";
import type { MapContent } from "../../data/about";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// true: every country label shows its code next to the flag all the time. false: the code shows on hover.
const SHOW_CODES = false;

// Map space: a lon/lat grid cropped to 80°N .. 58°S
const W = 1000;
const LAT_TOP = 80;
const LAT_BOTTOM = -58;
const H = Math.round((W * (LAT_TOP - LAT_BOTTOM)) / 360);
// Small, fine dots like the reference
const STEP = 5;
const DOT_R = 1.15;

const projection = geoEquirectangular()
    .scale(W / (2 * Math.PI))
    .translate([W / 2, (W * LAT_TOP) / 360]);

// 0 = not served, 1 = served, 2 = featured
type Dot = { x: number; y: number; tier: 0 | 1 | 2; r: number };

// Rasterises the countries offscreen, then samples a dot grid from it
function buildDots(featured: string[], exclude: string[]): Dot[] {
    const canvas = document.createElement("canvas");
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return [];

    const topo = countries as unknown as Topology;
    const fc = feature(topo, topo.objects.countries as GeometryCollection<{ name: string }>);
    const path = geoPath(projection, ctx);

    // Channel encoding: blue = not served, green = served, red = featured
    fc.features.forEach((f) => {
        const name = f.properties.name;
        ctx.fillStyle = exclude.includes(name) ? "#0000ff" : featured.includes(name) ? "#ff0000" : "#00ff00";
        ctx.beginPath();
        path(f);
        ctx.fill();
    });

    const data = ctx.getImageData(0, 0, W, H).data;
    const dots: Dot[] = [];
    for (let y = STEP / 2; y < H; y += STEP) {
        for (let x = STEP / 2; x < W; x += STEP) {
            const i = (Math.floor(y) * W + Math.floor(x)) * 4;
            if (data[i + 3] < 128) continue;
            const tier: 0 | 1 | 2 = data[i] > 128 ? 2 : data[i + 1] > 128 ? 1 : 0;
            dots.push({ x, y, tier, r: Math.random() });
        }
    }
    return dots;
}

const clamp = (n: number) => Math.min(1, Math.max(0, n));

export default function ReachMap({ data }: { data: MapContent }) {
    const root = useRef<HTMLElement>(null);
    const wrap = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const arcRefs = useRef<(SVGPathElement | null)[]>([]);
    const markRefs = useRef<(HTMLDivElement | null)[]>([]);
    const prog = useRef({ p: 0 });
    const pointer = useRef({ x: 0, y: 0, on: false });
    const drawRef = useRef<() => void>(() => { });
    const [time, setTime] = useState("");

    useSectionReveal(root);

    const dots = useMemo(
        () => buildDots([data.hq.atlas, ...data.featured.map((t) => t.atlas)], data.exclude),
        [data.hq, data.featured, data.exclude]
    );

    const place = (t: { lon: number; lat: number }) => {
        const p = projection([t.lon, t.lat]) ?? [0, 0];
        return { x: p[0], y: p[1] };
    };
    const hq = { ...data.hq, ...place(data.hq) };
    const targets = data.featured.map((t) => ({ ...t, ...place(t) }));

    // Live clock in Bhubaneswar
    useEffect(() => {
        const tick = () =>
            setTime(new Date().toLocaleTimeString("en-GB", { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit" }));
        tick();
        const id = window.setInterval(tick, 20000);
        return () => window.clearInterval(id);
    }, []);

    // Canvas: size, draw loop, pointer ripple
    useEffect(() => {
        const box = wrap.current;
        const canvas = canvasRef.current;
        if (!box || !canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reduce) prog.current.p = 1;

        const draw = () => {
            const s = canvas.width / W;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const p = prog.current.p;
            const ptr = pointer.current;

            for (const d of dots) {
                // Dots fade in from left to right. Their size never changes with scroll.
                const t = (d.x / W) * 0.7 + d.r * 0.15;
                const local = clamp((p * 1.15 - t) / 0.18);
                if (local <= 0) continue;

                let r = d.tier === 2 ? DOT_R * 1.15 : DOT_R;
                let ox = 0;
                let oy = 0;
                let boost = 0;

                if (ptr.on) {
                    const dx = d.x - ptr.x;
                    const dy = d.y - ptr.y;
                    const dist = Math.hypot(dx, dy);
                    if (dist < 70) {
                        const k = 1 - dist / 70;
                        boost = k;
                        r *= 1 + k * 0.7;
                        ox = (dx / (dist || 1)) * k * 5;
                        oy = (dy / (dist || 1)) * k * 5;
                    }
                }

                const base = d.tier === 2 ? 0.95 : d.tier === 1 ? 0.42 : 0.2;
                const a = Math.min(1, (base + boost * 0.45) * local);
                ctx.fillStyle = d.tier === 0 ? `rgba(207,225,238,${a})` : `rgba(245,234,59,${a})`;
                ctx.beginPath();
                ctx.arc((d.x + ox) * s, (d.y + oy) * s, r * s, 0, Math.PI * 2);
                ctx.fill();
            }
        };
        drawRef.current = draw;

        const resize = () => {
            const dpr = Math.min(window.devicePixelRatio, 2);
            canvas.width = Math.round(box.clientWidth * dpr);
            canvas.height = Math.round(box.clientHeight * dpr);
            draw();
        };
        const ro = new ResizeObserver(resize);
        ro.observe(box);
        resize();

        let raf = 0;
        const loop = () => {
            draw();
            raf = requestAnimationFrame(loop);
        };
        const io = new IntersectionObserver(([e]) => {
            cancelAnimationFrame(raf);
            if (e.isIntersecting && !reduce) raf = requestAnimationFrame(loop);
        });
        io.observe(box);

        return () => {
            cancelAnimationFrame(raf);
            io.disconnect();
            ro.disconnect();
        };
    }, [dots]);

    // Scroll: dots fade in, then arcs draw and the flag labels appear
    useGSAP(
        () => {
            const section = root.current;
            if (!section) return;

            const paint = () => {
                const p = prog.current.p;
                const arcP = clamp((p - 0.6) / 0.35);

                arcRefs.current.forEach((a, i) => {
                    if (!a) return;
                    const k = clamp(arcP * 1.7 - i * 0.04);
                    a.style.strokeDashoffset = String(1 - k);
                });
                markRefs.current.forEach((m, i) => {
                    if (!m) return;
                    // Index 0 is the HQ label; the rest follow their arcs
                    const k = i === 0 ? clamp((p - 0.45) / 0.15) : clamp((arcP * 1.7 - (i - 1) * 0.04 - 0.7) / 0.3);
                    m.style.opacity = String(k);
                    m.style.transform = `translate(-50%, -50%) scale(${0.6 + k * 0.4})`;
                });
            };

            const mm = gsap.matchMedia();
            mm.add("(prefers-reduced-motion: no-preference)", () => {
                prog.current.p = 0;
                paint();
                gsap.to(prog.current, {
                    p: 1,
                    ease: "none",
                    onUpdate: paint,
                    scrollTrigger: { trigger: section, start: "top 70%", end: "bottom 85%", scrub: 0.6 },
                });
            });
            mm.add("(prefers-reduced-motion: reduce)", () => {
                prog.current.p = 1;
                paint();
                drawRef.current();
            });
            return () => mm.revert();
        },
        { scope: root }
    );

    const onMove = (e: React.PointerEvent) => {
        const r = e.currentTarget.getBoundingClientRect();
        pointer.current = { x: ((e.clientX - r.left) / r.width) * W, y: ((e.clientY - r.top) / r.height) * H, on: true };
    };
    const onLeave = () => {
        pointer.current.on = false;
    };

    const statCls = "mt-3 text-[clamp(32px,3.4vw,56px)] font-light leading-none tracking-[-0.04em]";
    const labelCls = SHOW_CODES ? "opacity-100" : "opacity-0 group-hover:opacity-100";

    return (
        <section ref={root} data-dark className="relative z-10 overflow-hidden rounded-t-[clamp(28px,4vw,56px)] bg-ink text-off">
            <div className="wrap section">
                <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
                    <div>
                        <p className="eyebrow text-glacier-3" data-reveal>{data.eyebrow}</p>
                        <h2 className="t-xl mt-8">
                            <Split text={data.line1} />
                            <br />
                            <Split text={data.line2} />
                        </h2>
                    </div>

                    <dl className="grid grid-cols-3 gap-6 md:gap-10" data-reveal>
                        <div>
                            <dt className="text-xs uppercase tracking-[0.14em] text-glacier-3">Countries</dt>
                            <dd className={statCls} style={{ fontFamily: "var(--font-display)" }}>{data.countries}</dd>
                        </div>
                        <div>
                            <dt className="text-xs uppercase tracking-[0.14em] text-glacier-3">Disciplines</dt>
                            <dd className={statCls} style={{ fontFamily: "var(--font-display)" }}>{SERVICES.length}</dd>
                        </div>
                        <div>
                            <dt className="text-xs uppercase tracking-[0.14em] text-glacier-3">Local time</dt>
                            <dd className={`${statCls} flex items-center gap-2`} style={{ fontFamily: "var(--font-display)" }}>
                                <span className="h-2.5 w-2.5 shrink-0 animate-pulse rounded-full bg-lemon" />
                                {time}
                            </dd>
                        </div>
                    </dl>
                </div>

                {/* Map */}
                <div
                    ref={wrap}
                    onPointerMove={onMove}
                    onPointerLeave={onLeave}
                    className="relative mt-[clamp(32px,5vw,72px)] w-full"
                    style={{ aspectRatio: `${W} / ${H}` }}
                >
                    <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 h-full w-full" />

                    {/* Arcs from HQ to every featured country */}
                    <svg viewBox={`0 0 ${W} ${H}`} aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full">
                        {targets.map((o, i) => {
                            const cx = (hq.x + o.x) / 2;
                            const cy = Math.min(hq.y, o.y) - Math.hypot(o.x - hq.x, o.y - hq.y) * 0.28;
                            return (
                                <path
                                    key={o.code}
                                    ref={(el) => {
                                        arcRefs.current[i] = el;
                                    }}
                                    d={`M${hq.x},${hq.y} Q${cx},${cy} ${o.x},${o.y}`}
                                    fill="none"
                                    stroke="#F5EA3B"
                                    strokeWidth="0.9"
                                    strokeLinecap="round"
                                    strokeDasharray="1"
                                    strokeDashoffset="1"
                                    pathLength={1}
                                    opacity="0.5"
                                />
                            );
                        })}
                    </svg>

                    {/* HQ label: flag + IN · HQ */}
                    <div
                        ref={(el) => {
                            markRefs.current[0] = el;
                        }}
                        className="absolute z-20"
                        style={{ left: `${(hq.x / W) * 100}%`, top: `${(hq.y / H) * 100}%`, opacity: 0, transform: "translate(-50%, -50%) scale(0.6)" }}
                    >
                        <span className="relative block h-3 w-3">
                            <span className="absolute inset-0 animate-ping rounded-full bg-lemon/70" />
                            <span className="relative block h-3 w-3 rounded-full bg-lemon" />
                        </span>
                        <span className="absolute bottom-full left-1/2 mb-2 flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full bg-lemon py-1 pl-1.5 pr-3 text-[10px] font-semibold uppercase tracking-[0.1em] text-navy md:text-xs">
                            <span className={`fi fis fi-${hq.flag} rounded-full text-[14px] md:text-[16px]`} />
                            {hq.code} · HQ
                        </span>
                    </div>

                    {/* Country labels: flag at the end of every line, code + name next to it */}
                    {targets.map((o, i) => (
                        <div
                            key={o.code}
                            ref={(el) => {
                                markRefs.current[i + 1] = el;
                            }}
                            className="group absolute hover:z-30"
                            style={{ left: `${(o.x / W) * 100}%`, top: `${(o.y / H) * 100}%`, opacity: 0, transform: "translate(-50%, -50%) scale(0.6)" }}
                        >
                            <span className="grid place-items-center rounded-full bg-off p-[2px] shadow-md transition-transform duration-300 group-hover:scale-125">
                                <span className={`fi fis fi-${o.flag} rounded-full text-[13px] md:text-[17px]`} />
                            </span>
                            <span
                                className={`pointer-events-none absolute left-full top-1/2 ml-2 -translate-y-1/2 whitespace-nowrap rounded-full border border-white/15 bg-ink/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-off backdrop-blur-sm transition-opacity duration-300 md:text-xs ${labelCls}`}
                            >
                                {o.code}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}