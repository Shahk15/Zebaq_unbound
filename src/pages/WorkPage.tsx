import { useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import Header from "../components/layout/Header";
import WorkCard from "../components/work/WorkCard";
import { Split } from "../components/common/ui";
import { PAGE_COPY, WORK_FILTERS, WORK_ITEMS } from "../data/work";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const INITIAL = 6; // cards shown first
const STEP = 4; // cards added per "Show more"

type View = "grid" | "list";
type Filter = (typeof WORK_FILTERS)[number];

const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function WorkPage() {
    const root = useRef<HTMLDivElement>(null);
    const fromRef = useRef(0); // first card index that should animate in
    const busy = useRef(false);

    const [filter, setFilter] = useState<Filter>("All");
    const [view, setView] = useState<View>("grid");
    const [shown, setShown] = useState(INITIAL);

    const list = useMemo(
        () => (filter === "All" ? WORK_ITEMS : WORK_ITEMS.filter((item) => item.category === filter)),
        [filter]
    );
    const visible = list.slice(0, shown);
    const remaining = Math.max(0, list.length - visible.length);

    /* ---------- Page intro (waits for the curtain when arriving via transition) ---------- */
    useGSAP(
        () => {
            const mm = gsap.matchMedia();
            mm.add("(prefers-reduced-motion: no-preference)", () => {
                const tl = gsap.timeline({ paused: true });
                tl.from(".pg-eyebrow", { y: 20, opacity: 0, duration: 0.8, ease: "expo.out" })
                    .from(".pg-title .sw > span", { yPercent: 110, duration: 1.3, ease: "expo.out", stagger: 0.07 }, "-=0.6")
                    .from(".pg-sub", { y: 24, opacity: 0, duration: 1, ease: "expo.out" }, "-=0.9")
                    .from(".pg-down", { scale: 0, opacity: 0, duration: 0.9, ease: "back.out(1.7)" }, "-=0.8")
                    .from(".pg-bar-item", { y: 20, opacity: 0, duration: 0.9, ease: "expo.out", stagger: 0.06 }, "-=0.7");

                gsap.to(".pg-down svg", { y: 4, duration: 0.9, repeat: -1, yoyo: true, ease: "sine.inOut" });

                const start = () => tl.play();
                const viaCurtain = document.documentElement.dataset.pt === "busy";
                if (viaCurtain) window.addEventListener("page:ready", start, { once: true });
                else gsap.delayedCall(0.15, start);

                return () => window.removeEventListener("page:ready", start);
            });
            return () => mm.revert();
        },
        { scope: root }
    );

    /* ---------- Cards rise in as they enter the viewport ---------- */
    useGSAP(
        () => {
            const cards = gsap.utils.toArray<HTMLElement>(".svc-card").slice(fromRef.current);
            if (!cards.length) return;

            const mm = gsap.matchMedia();
            mm.add("(prefers-reduced-motion: no-preference)", () => {
                gsap.set(cards, { y: 60, opacity: 0 });
                ScrollTrigger.batch(cards, {
                    start: "top 92%",
                    once: true,
                    onEnter: (batch) =>
                        gsap.to(batch, { y: 0, opacity: 1, duration: 1.1, ease: "expo.out", stagger: 0.08, overwrite: true }),
                });
            });
            ScrollTrigger.refresh();
            return () => mm.revert();
        },
        { scope: root, dependencies: [filter, view, shown], revertOnUpdate: true }
    );

    /* Fade the current cards out, then swap the content */
    const swap = (apply: () => void) => {
        if (busy.current) return;
        if (reduced()) {
            fromRef.current = 0;
            apply();
            return;
        }
        busy.current = true;
        gsap.to(gsap.utils.toArray(".svc-card", root.current), {
            opacity: 0,
            y: -20,
            duration: 0.3,
            ease: "power2.in",
            stagger: 0.025,
            onComplete: () => {
                fromRef.current = 0;
                apply();
                busy.current = false;
            },
        });
    };

    const changeFilter = (next: Filter) => {
        if (next === filter) return;
        swap(() => {
            setShown(INITIAL);
            setFilter(next);
        });
    };

    const changeView = (next: View) => {
        if (next === view) return;
        swap(() => setView(next));
    };

    const showMore = () => {
        fromRef.current = visible.length;
        setShown((current) => Math.min(current + STEP, list.length));
    };

    const goGrid = () =>
        document.querySelector("#work-grid")?.scrollIntoView({ behavior: "smooth", block: "start" });

    return (
        <div ref={root} className="min-h-screen bg-off text-navy">
            <Header />

            <main className="wrap pb-[clamp(80px,10vw,140px)]">
                {/* ===== Section 1: Page Hero ===== */}
                <section className="pt-[clamp(130px,17vw,230px)] text-center">
                    <p className="eyebrow pg-eyebrow text-navy-2">{PAGE_COPY.eyebrow}</p>

                    <h1 className="pg-title t-xl mx-auto mt-8 max-w-[18ch]">
                        <Split text={PAGE_COPY.titleLine1} />
                        <br />
                        <Split text={PAGE_COPY.titleLine2} dot />
                    </h1>

                    <p className="pg-sub mx-auto mt-8 max-w-[520px] text-[clamp(15px,1.2vw,18px)] leading-[1.7] text-navy-2">
                        {PAGE_COPY.sub}
                    </p>

                    <button
                        type="button"
                        onClick={goGrid}
                        aria-label="Scroll to work"
                        className="pg-down mx-auto mt-10 grid h-11 w-11 place-items-center rounded-full bg-ink text-off transition-colors duration-300 hover:bg-lemon hover:text-navy"
                    >
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M12 5v14M6 13l6 6 6-6" />
                        </svg>
                    </button>
                </section>

                {/* ===== Section 2: Toolbar (label, view toggle, filter tabs) ===== */}
                <section className="mt-[clamp(70px,9vw,130px)]">
                    <div className="flex items-center justify-between gap-4">
                        <p className="pg-bar-item flex items-center gap-3 text-sm text-navy">
                            <span className="h-1.5 w-1.5 rounded-full bg-lemon-deep" />
                            {PAGE_COPY.label}
                        </p>

                        <div className="pg-bar-item flex gap-2" role="group" aria-label="View">
                            {(["grid", "list"] as View[]).map((item) => (
                                <button
                                    key={item}
                                    type="button"
                                    onClick={() => changeView(item)}
                                    aria-pressed={view === item}
                                    aria-label={`${item} view`}
                                    className={`grid h-11 w-11 place-items-center rounded-xl border transition-colors duration-300 ${view === item ? "border-ink bg-ink text-off" : "border-navy/15 text-navy hover:border-navy/40"
                                        }`}
                                >
                                    {item === "grid" ? (
                                        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                                            <rect x="4" y="4" width="6.5" height="6.5" rx="1.5" />
                                            <rect x="13.5" y="4" width="6.5" height="6.5" rx="1.5" />
                                            <rect x="4" y="13.5" width="6.5" height="6.5" rx="1.5" />
                                            <rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.5" />
                                        </svg>
                                    ) : (
                                        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
                                            <path d="M5 7h14M5 12h14M5 17h14" />
                                        </svg>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="mt-8 flex flex-wrap gap-2" role="tablist" aria-label="Filter work">
                        {WORK_FILTERS.map((item) => (
                            <button
                                key={item}
                                type="button"
                                role="tab"
                                aria-selected={filter === item}
                                onClick={() => changeFilter(item)}
                                className={`pg-bar-item rounded-full px-5 py-2.5 text-[15px] transition-colors duration-300 ${filter === item ? "bg-glacier/30 text-navy" : "text-navy-2 hover:bg-glacier/15 hover:text-navy"
                                    }`}
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                </section>

                {/* ===== Section 3: Work Grid ===== */}
                <section id="work-grid" className="mt-[clamp(40px,5vw,72px)] scroll-mt-24">
                    <ul
                        key={`${filter}-${view}`}
                        className={
                            view === "grid"
                                ? "grid gap-x-[clamp(16px,2vw,28px)] gap-y-[clamp(36px,4vw,64px)] sm:grid-cols-2"
                                : "flex flex-col"
                        }
                    >
                        {visible.map((item) => (
                            <WorkCard key={item.slug} item={item} view={view} />
                        ))}
                    </ul>

                    {/* ===== Section 4: Show More ===== */}
                    {remaining > 0 && (
                        <div className="mt-[clamp(48px,6vw,88px)] text-center">
                            <button
                                type="button"
                                onClick={showMore}
                                className="rounded-full bg-ink px-8 py-4 text-sm font-medium text-off transition-colors duration-300 hover:bg-lemon hover:text-navy"
                            >
                                Show more
                                <span className="ml-2 opacity-60">({remaining})</span>
                            </button>
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
}