import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Split } from "../common/ui";
import { PAGE_COPY, WORK_FILTERS, WORK_ITEMS } from "../../data/work";
import type { WorkItem } from "../../data/work";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Filter = (typeof WORK_FILTERS)[number];
const pad = (n: number) => String(n).padStart(2, "0");

function ArrowIcon() {
    return (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M7 17L17 7M9 7h8v8" />
        </svg>
    );
}

// 03 — Project index. Filter chips with live counts; each row is a project. On desktop a
// floating preview follows the cursor and plays the hovered project's video.
export default function WorkIndex() {
    const root = useRef<HTMLElement>(null);
    const list = useRef<HTMLUListElement>(null);
    const preview = useRef<HTMLDivElement>(null);
    const pvideo = useRef<HTMLVideoElement>(null);
    const [filter, setFilter] = useState<Filter>("All");
    const [hover, setHover] = useState<WorkItem | null>(null);
    const fine = useMemo(() => window.matchMedia("(pointer: fine)").matches, []);

    const items = filter === "All" ? WORK_ITEMS : WORK_ITEMS.filter((w) => w.category === filter || w.tags.includes(filter));
    const count = (f: Filter) => (f === "All" ? WORK_ITEMS.length : WORK_ITEMS.filter((w) => w.category === f || w.tags.includes(f)).length);

    // rows rise in when the section arrives
    useGSAP(
        () => {
            gsap.from(".wi-row", {
                yPercent: 40, opacity: 0, duration: 1, ease: "expo.out", stagger: 0.05,
                scrollTrigger: { trigger: list.current, start: "top 85%", once: true },
            });
        },
        { scope: root }
    );

    // re-play the row entrance whenever the filter changes (not on first mount: the scroll entrance handles that)
    const firstFilter = useRef(true);
    useEffect(() => {
        if (firstFilter.current) { firstFilter.current = false; return; }
        if (!list.current) return;
        gsap.fromTo(list.current.querySelectorAll(".wi-row"), { y: 26, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: "expo.out", stagger: 0.04 });
    }, [filter]);

    // floating preview follows the cursor
    useEffect(() => {
        if (!fine || !preview.current || !root.current) return;
        const xTo = gsap.quickTo(preview.current, "x", { duration: 0.6, ease: "power3" });
        const yTo = gsap.quickTo(preview.current, "y", { duration: 0.6, ease: "power3" });
        const rTo = gsap.quickTo(preview.current, "rotation", { duration: 0.8, ease: "power3" });
        let lastX = 0;
        let rest = 0;
        const move = (e: PointerEvent) => {
            const r = root.current!.getBoundingClientRect();
            xTo(e.clientX - r.left);
            yTo(e.clientY - r.top);
            rTo(gsap.utils.clamp(-8, 8, (e.clientX - lastX) * 0.6));
            lastX = e.clientX;
            // settle upright once the cursor rests
            window.clearTimeout(rest);
            rest = window.setTimeout(() => rTo(0), 90);
        };
        const sec = root.current;
        sec.addEventListener("pointermove", move);
        return () => {
            window.clearTimeout(rest);
            sec.removeEventListener("pointermove", move);
        };
    }, [fine]);

    // swap the preview media when the hovered row changes
    useEffect(() => {
        if (!preview.current) return;
        gsap.to(preview.current, { scale: hover ? 1 : 0.6, opacity: hover ? 1 : 0, duration: 0.45, ease: "power3.out" });
        const v = pvideo.current;
        if (!v) return;
        if (hover?.video) {
            if (v.getAttribute("src") !== hover.video) { v.src = hover.video; v.load(); }
            v.play().catch(() => {});
        } else v.pause();
    }, [hover]);

    return (
        <section ref={root} id="index" data-index="03" data-label="Project index" className="relative overflow-hidden bg-off py-[clamp(90px,12vw,170px)] text-navy">
            <div className="wrap">
                <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
                    <div>
                        <p className="eyebrow" data-reveal>{PAGE_COPY.indexEyebrow}</p>
                        <h2 className="mt-6 text-[clamp(44px,6vw,108px)] font-light leading-[0.95] tracking-[-0.05em]" style={{ fontFamily: "var(--font-display)" }}>
                            <Split text={PAGE_COPY.indexTitle} dot />
                        </h2>
                    </div>
                    <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter projects" data-reveal>
                        {WORK_FILTERS.map((f) => {
                            const on = filter === f;
                            return (
                                <button
                                    key={f}
                                    role="tab"
                                    aria-selected={on}
                                    onClick={() => setFilter(f)}
                                    className={`group inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition-colors duration-300 ${on ? "bg-navy text-off" : "bg-white text-navy shadow-[inset_0_0_0_1px_rgba(10,31,68,.12)] hover:bg-glacier"}`}
                                >
                                    {f}
                                    <span className={`text-[11px] tabular-nums ${on ? "text-lemon" : "text-navy/45"}`}>{pad(count(f))}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* column labels */}
                <div className="mt-16 hidden grid-cols-[72px_1fr_260px_90px_56px] gap-6 border-b border-navy/10 pb-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-navy/45 md:grid">
                    <span>No.</span><span>Project</span><span>Discipline</span><span>Year</span><span />
                </div>

                <ul ref={list} className="border-b border-navy/10 md:mt-0 mt-10" onPointerLeave={() => setHover(null)}>
                    {items.map((w) => {
                        const n = WORK_ITEMS.indexOf(w) + 1;
                        return (
                            <li key={w.slug} className="wi-row border-t border-navy/10 first:border-t-0 md:first:border-t-0">
                                <a
                                    href={w.href}
                                    data-cursor="View"
                                    onPointerEnter={() => setHover(w)}
                                    className="group relative grid grid-cols-[1fr_auto] items-center gap-4 py-6 md:grid-cols-[72px_1fr_260px_90px_56px] md:gap-6 md:py-8"
                                >
                                    {/* hover wash in the project's own colour */}
                                    <span className="pointer-events-none absolute inset-y-0 -left-[3vw] -right-[3vw] origin-bottom scale-y-0 rounded-2xl transition-transform duration-500 ease-[cubic-bezier(.2,.8,.2,1)] group-hover:scale-y-100" style={{ backgroundColor: w.surface }} />
                                    <span className="relative hidden text-sm tabular-nums text-navy/45 md:block">{pad(n)}</span>
                                    <span className="relative">
                                        <span className="block text-[clamp(28px,3.6vw,60px)] font-medium leading-[1] tracking-[-0.045em] transition-transform duration-500 group-hover:translate-x-3" style={{ fontFamily: "var(--font-display)" }}>{w.title}</span>
                                        {w.sector && <span className="mt-2 block text-sm text-navy/55">{w.sector}</span>}
                                    </span>
                                    {/* mobile: inline thumbnail */}
                                    <img src={w.image} alt="" loading="lazy" className="relative h-16 w-28 rounded-xl object-cover object-top md:hidden" />
                                    <span className="relative hidden flex-wrap gap-2 md:flex">
                                        {w.tags.slice(0, 2).map((t) => <span key={t} className="chip bg-white/70">{t}</span>)}
                                    </span>
                                    <span className="relative hidden text-sm tabular-nums text-navy/60 md:block">{w.year}</span>
                                    <span className="relative hidden h-12 w-12 place-items-center rounded-full shadow-[inset_0_0_0_1px_rgba(10,31,68,.18)] transition-all duration-500 group-hover:rotate-45 group-hover:bg-navy group-hover:text-off group-hover:shadow-none md:grid">
                                        <ArrowIcon />
                                    </span>
                                </a>
                            </li>
                        );
                    })}
                </ul>
            </div>

            {/* cursor-following preview (desktop) */}
            {fine && (
                <div ref={preview} className="pointer-events-none absolute left-0 top-0 z-20 -ml-[180px] -mt-[110px] w-[360px] scale-[.6] overflow-hidden rounded-[18px] opacity-0 shadow-[0_40px_80px_-30px_rgba(10,31,68,.5)]" aria-hidden="true">
                    <div className="relative aspect-[2.09]" style={{ backgroundColor: hover?.surface ?? "#e4eef5" }}>
                        {hover && <img src={hover.image} alt="" className="absolute inset-0 h-full w-full object-cover object-top" />}
                        <video ref={pvideo} muted loop playsInline preload="none" className={`absolute inset-0 h-full w-full object-cover object-top ${hover?.video ? "" : "opacity-0"}`} />
                    </div>
                </div>
            )}
        </section>
    );
}
