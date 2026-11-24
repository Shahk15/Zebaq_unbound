import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Split } from "../common/ui";
import { PAGE_COPY, WORK_ITEMS } from "../../data/work";
import type { WorkItem } from "../../data/work";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const pad = (n: number) => String(n).padStart(2, "0");

function ArrowIcon() {
    return (
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M7 17L17 7M9 7h8v8" />
        </svg>
    );
}

/** Browser-framed screen: still image, with the project video layered on top when active */
function Screen({ item, active, videoRef }: { item: WorkItem; active: boolean; videoRef?: (v: HTMLVideoElement | null) => void }) {
    return (
        <div className="rl-screen overflow-hidden rounded-[20px] bg-white shadow-[0_60px_120px_-50px_rgba(10,31,68,.55)] ring-1 ring-navy/5">
            <div className="flex items-center gap-2 border-b border-navy/5 bg-white px-4 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff6159]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#28c941]" />
                <span className="mx-auto w-[46%] truncate rounded-full bg-navy/[0.05] px-4 py-1 text-center text-[11px] text-navy/50">{item.title}</span>
            </div>
            <div className="relative aspect-[2.09] overflow-hidden lg:aspect-video bg-navy/5">
                <img src={item.image} alt={`${item.title} website`} draggable={false} loading="lazy" className="rl-img absolute inset-0 h-full w-full object-cover object-top" />
                {item.video && (
                    <video
                        ref={videoRef}
                        src={item.video}
                        poster={item.image}
                        muted
                        loop
                        playsInline
                        preload="none"
                        className={`absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-700 ${active ? "opacity-100" : "opacity-0"}`}
                    />
                )}
            </div>
        </div>
    );
}

/** Title whose lemon full-stop never wraps away from the last word */
function DottedTitle({ text }: { text: string }) {
    const cut = Math.max(text.lastIndexOf(" "), text.lastIndexOf("-")) + 1;
    return (
        <>
            {text.slice(0, cut)}
            <span className="whitespace-nowrap">{text.slice(cut)}<span className="dot !bg-navy" /></span>
        </>
    );
}

function SlideCopy({ item, index, total }: { item: WorkItem; index: number; total: number }) {
    return (
        <div className="rl-copy flex flex-col">
            <p className="flex items-baseline gap-3 text-sm text-navy/60">
                <span className="text-[clamp(40px,4.6vw,76px)] font-light leading-none tracking-[-0.06em] text-navy" style={{ fontFamily: "var(--font-display)" }}>{pad(index + 1)}</span>
                <span>/ {pad(total)}</span>
            </p>
            <p className="mt-[clamp(16px,3svh,32px)] text-[11px] font-semibold uppercase tracking-[0.16em] text-navy/60">{item.sector}</p>
            <h3 className="mt-3 text-[clamp(36px,min(4.2vw,8.4svh),78px)] font-medium leading-[0.98] tracking-[-0.05em]" style={{ fontFamily: "var(--font-display)" }}>
                <DottedTitle text={item.title} />
            </h3>
            <p className="mt-5 max-w-[34ch] text-[clamp(15px,1.1vw,18px)] leading-relaxed text-navy/75">{item.summary}</p>
            <div className="mt-6 flex flex-wrap gap-2">
                {item.tags.slice(0, 2).map((t) => <span key={t} className="chip bg-white/60 backdrop-blur">{t}</span>)}
                <span className="chip bg-white/60 backdrop-blur">{item.year}</span>
            </div>
            <a href={item.href} data-cursor="View" className="group mt-[clamp(22px,4svh,40px)] inline-flex w-fit items-center gap-4 rounded-full bg-navy py-2 pl-6 pr-2 text-sm font-medium text-off transition-colors hover:bg-ink">
                View project
                <span className="grid h-10 w-10 place-items-center rounded-full bg-lemon text-navy transition-transform duration-500 group-hover:rotate-45"><ArrowIcon /></span>
            </a>
        </div>
    );
}

// 02 — The reel. Desktop: pinned, the projects glide past sideways; the room takes on
// each project's brand colour, the slide in focus plays its video, and a counter +
// progress bar keep you oriented. Mobile / reduced motion: a vertical stack of cards.
export default function WorkReel() {
    const root = useRef<HTMLElement>(null);
    const track = useRef<HTMLDivElement>(null);
    const videos = useRef<(HTMLVideoElement | null)[]>([]);
    const [active, setActive] = useState(0);
    const [desk, setDesk] = useState(() => window.matchMedia("(min-width: 1024px) and (prefers-reduced-motion: no-preference)").matches);
    const total = WORK_ITEMS.length;

    useEffect(() => {
        const mq = window.matchMedia("(min-width: 1024px) and (prefers-reduced-motion: no-preference)");
        const on = () => setDesk(mq.matches);
        mq.addEventListener("change", on);
        return () => mq.removeEventListener("change", on);
    }, []);

    // play only the slide in focus
    useEffect(() => {
        if (!desk) return;
        videos.current.forEach((v, i) => {
            if (!v) return;
            if (i === active) {
                if (v.preload === "none") { v.preload = "auto"; v.load(); }
                v.play().catch(() => {});
            } else v.pause();
        });
    }, [active, desk]);

    useGSAP(
        () => {
            if (!desk || !track.current || !root.current) return;
            const el = track.current;
            const sec = root.current;
            const slides = gsap.utils.toArray<HTMLElement>(".rl-slide", el);
            const parts = slides.map((sl) => ({ screen: sl.querySelector(".rl-screen"), copy: sl.querySelector(".rl-copy") }));
            const n = slides.length;

            // track position that puts each stop in the middle of the screen: intro first, then every project
            let stops: number[] = [];
            const measure = () => {
                stops = [0, ...slides.map((sl) => sl.offsetLeft + sl.offsetWidth / 2 - window.innerWidth / 2)];
            };
            measure();

            gsap.set(sec, { backgroundColor: WORK_ITEMS[0].surface });
            let last = -1;
            const state = { p: 0 };

            // Everything on screen is drawn from the same smoothed value, so the counter, colour and
            // video always belong to the project you are looking at.
            const draw = () => {
                const step = Math.min(n - 1e-6, Math.max(0, state.p) * n);
                const k = Math.floor(step);
                // each step glides, then rests on the project before moving on
                const f = gsap.utils.clamp(0, 1, (step - k - 0.08) / 0.6);
                const eased = f * f * f * (f * (f * 6 - 15) + 10);
                const x = stops[k] + (stops[k + 1] - stops[k]) * eased;
                gsap.set(el, { x: -x });
                gsap.set(".rl-progress", { scaleX: state.p });

                const vw = window.innerWidth;
                let best = 0, bestD = Infinity;
                slides.forEach((_, i) => {
                    const d = (stops[i + 1] - x) / vw; // 0 = centred, 1 = one screen to the right
                    if (Math.abs(d) < bestD) { bestD = Math.abs(d); best = i; }
                    if (Math.abs(d) > 1.3) return;
                    const dc = gsap.utils.clamp(-1, 1, d);
                    gsap.set(parts[i].screen, { xPercent: dc * 7, rotateY: dc * -9, transformPerspective: 1600 });
                    gsap.set(parts[i].copy, { x: dc * 120, opacity: 1 - Math.min(1, Math.abs(dc) * 1.4) });
                });
                if (best !== last) {
                    last = best;
                    setActive(best);
                    gsap.to(sec, { backgroundColor: WORK_ITEMS[best].surface, duration: 0.9, ease: "power2.out", overwrite: "auto" });
                }
            };

            const tween = gsap.to(state, {
                p: 1,
                ease: "none",
                onUpdate: draw,
                scrollTrigger: {
                    trigger: sec,
                    start: "top top",
                    end: () => `+=${window.innerHeight * 1.05 * n}`,
                    pin: true,
                    scrub: 0.6,
                    onRefresh: () => { measure(); draw(); },
                },
            });
            draw();

            // keyboard: tabbing to a project brings it to the middle
            const onFocus = (e: FocusEvent) => {
                const t = e.target as HTMLElement;
                sec.scrollLeft = 0;
                const i = slides.findIndex((sl) => sl.contains(t));
                const st = tween.scrollTrigger;
                if (i < 0 || !st || !t.matches(":focus-visible")) return;
                window.scrollTo(0, st.start + ((i + 0.85) / n) * (st.end - st.start));
            };
            sec.addEventListener("focusin", onFocus);
            return () => sec.removeEventListener("focusin", onFocus);
        },
        { scope: root, dependencies: [desk], revertOnUpdate: true }
    );

    if (!desk) {
        return (
            <section id="reel" data-index="02" data-label="Selected work" className="bg-off py-[clamp(72px,12vw,140px)] text-navy">
                <div className="wrap">
                    <p className="eyebrow" data-reveal>{PAGE_COPY.reelEyebrow}</p>
                    <h2 className="t-l mt-6"><Split text={PAGE_COPY.reelTitle} dot /></h2>
                    <div className="mt-12 space-y-5">
                        {WORK_ITEMS.map((w, i) => (
                            <article key={w.slug} className="rounded-[28px] p-5 sm:p-8" style={{ backgroundColor: w.surface }} data-reveal>
                                <Screen item={w} active={false} />
                                <div className="mt-7"><SlideCopy item={w} index={i} total={total} /></div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section ref={root} id="reel" data-index="02" data-label="Selected work" className="relative h-[100svh] overflow-hidden text-navy">
            <div ref={track} className="flex h-full w-max items-center pl-[clamp(16px,3.2vw,64px)]">
                {/* intro panel; the first project waits at its right edge */}
                <div className="flex w-[50vw] shrink-0 flex-col justify-center pr-[4vw]">
                    <p className="eyebrow">{PAGE_COPY.reelEyebrow}</p>
                    <h2 className="mt-6 text-[clamp(48px,5.6vw,100px)] font-light leading-[0.98] tracking-[-0.05em]" style={{ fontFamily: "var(--font-display)" }}>
                        <DottedTitle text={PAGE_COPY.reelTitle} />
                    </h2>
                    <p className="mt-8 flex items-center gap-3 text-sm text-navy/70">
                        <span className="inline-block h-px w-16 bg-navy/40" /> Keep scrolling · {total} projects
                    </p>
                </div>

                {WORK_ITEMS.map((w, i) => (
                    <article
                        key={w.slug}
                        className={`rl-slide flex w-screen shrink-0 justify-center px-[clamp(40px,5vw,110px)] transition-[opacity,filter] duration-700 ${i === active ? "opacity-100" : "opacity-35 saturate-50"}`}
                    >
                        <div className="grid w-full max-w-[min(1700px,172svh)] grid-cols-[1.6fr_0.8fr] items-center gap-[clamp(32px,3.6vw,72px)]">
                            <a href={w.href} data-cursor="View" tabIndex={-1} className="block">
                                <Screen item={w} active={i === active} videoRef={(v) => { videos.current[i] = v; }} />
                            </a>
                            <SlideCopy item={w} index={i} total={total} />
                        </div>
                    </article>
                ))}
            </div>

            {/* HUD: counter + progress */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10">
                <div className="wrap flex items-end justify-between pb-7 text-sm">
                    <p className="flex items-baseline gap-3">
                        <span key={active} className="animate-[fadein_.4s_ease] font-medium tabular-nums">{pad(active + 1)}</span>
                        <span className="text-navy/50">/ {pad(total)}</span>
                        <span key={`t${active}`} className="ml-3 animate-[fadein_.4s_ease] text-navy/70">{WORK_ITEMS[active].title}</span>
                    </p>
                    <p className="text-navy/50">Scroll</p>
                </div>
                <div className="h-[3px] w-full bg-navy/10">
                    <div className="rl-progress h-full origin-left scale-x-0 bg-navy" />
                </div>
            </div>
        </section>
    );
}
