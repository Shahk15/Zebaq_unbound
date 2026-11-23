import {
    useEffect,
    useLayoutEffect,
    useMemo,
    useRef,
    useState,
} from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import type { WorkItem } from "../../data/work";
import { PAGE_COPY, WORK_FILTERS, WORK_ITEMS } from "../../data/work";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const INITIAL = 6;
const STEP = 4;

type View = "grid" | "list";
type Filter = (typeof WORK_FILTERS)[number];

const reduced = () =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const pad = (n: number) => String(n).padStart(2, "0");

/* =========================================================
   SHARED ARROW ICON
========================================================= */

function ArrowIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            width="18"
            height="18"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            <path d="M7 17L17 7M9 7h8v8" />
        </svg>
    );
}

/* =========================================================
   GRID ICON
========================================================= */

function GridIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            width="18"
            height="18"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            <rect x="4" y="4" width="6.5" height="6.5" rx="1.5" />
            <rect x="13.5" y="4" width="6.5" height="6.5" rx="1.5" />
            <rect x="4" y="13.5" width="6.5" height="6.5" rx="1.5" />
            <rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.5" />
        </svg>
    );
}

/* =========================================================
   LIST ICON
========================================================= */

function ListIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            width="18"
            height="18"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            <path d="M5 7h14M5 12h14M5 17h14" />
        </svg>
    );
}

/* =========================================================
   WORK CARD
========================================================= */

type WorkCardProps = {
    item: WorkItem;
    view: View;
    index?: number;
};

function WorkCard({ item, view }: WorkCardProps) {
    const videoRef = useRef<HTMLVideoElement>(null);

    /* ---------- Video controls ---------- */

    const playVideo = () => {
        const video = videoRef.current;
        if (!video) return;
        video.play().catch(() => { });
    };

    const stopVideo = () => {
        const video = videoRef.current;
        if (!video) return;
        video.pause();
        video.currentTime = 0;
    };

    const videoElement = item.video ? (
        <video
            ref={videoRef}
            src={item.video}
            poster={item.image}
            muted
            loop
            playsInline
            preload="none"
            className="pointer-events-none absolute inset-0 h-full w-full object-cover object-top opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
        />
    ) : null;

    const hoverEvents = {
        onPointerEnter: playVideo,
        onPointerLeave: stopVideo,
        onFocus: playVideo,
        onBlur: stopVideo,
    };

    /* =====================================================
       LIST VIEW
    ===================================================== */

    if (view === "list") {
        return (
            <li className="svc-card border-t border-navy/10 last:border-b">
                <a
                    href={item.href}
                    data-cursor="View"
                    {...hoverEvents}
                    className="group grid grid-cols-[96px_1fr_auto] items-center gap-4 py-5 md:grid-cols-[176px_1fr_auto_48px] md:gap-8"
                >
                    {/* Project thumbnail */}
                    <span
                        className="relative block aspect-video w-full overflow-hidden rounded-xl"
                        style={{ backgroundColor: item.surface }}
                    >
                        <img
                            src={item.image}
                            alt=""
                            loading="lazy"
                            draggable={false}
                            className="wp-img absolute inset-0 h-full w-full object-cover object-top"
                        />

                        {videoElement}
                    </span>

                    {/* Project information */}
                    <span className="min-w-0">
                        <span className="block text-[clamp(21px,2.4vw,36px)] font-medium leading-[1.1] tracking-[-0.03em]">
                            {item.title}
                        </span>

                        <span className="mt-2 block text-sm text-navy-2">
                            {item.year}
                        </span>
                    </span>

                    {/* Project tags */}
                    <span className="hidden flex-wrap justify-end gap-2 md:flex">
                        {item.tags.slice(0, 2).map((tag) => (
                            <span
                                key={tag}
                                className="whitespace-nowrap rounded-full border border-navy/15 px-3.5 py-1.5 text-[13px] text-navy-2"
                            >
                                {tag}
                            </span>
                        ))}
                    </span>

                    {/* Arrow */}
                    <span className="grid h-11 w-11 place-items-center justify-self-end rounded-full border border-navy/20 transition-colors duration-300 group-hover:border-lemon group-hover:bg-lemon">
                        <ArrowIcon />
                    </span>
                </a>
            </li>
        );
    }

    /* =====================================================
       GRID VIEW
    ===================================================== */

    return (
        <li className="svc-card">
            <a
                href={item.href}
                data-cursor="View"
                {...hoverEvents}
                className="group block"
            >
                {/* Full-bleed 16:9 (aspect-video) Image / Video frame */}
                <div
                    className="relative aspect-video w-full overflow-hidden rounded-2xl shadow-[0_18px_45px_-25px_rgba(10,31,68,0.35)]"
                    style={{ backgroundColor: item.surface }}
                >
                    <img
                        src={item.image}
                        alt={item.title}
                        loading="lazy"
                        draggable={false}
                        className="wp-img absolute inset-0 h-full w-full object-cover object-top"
                    />

                    {videoElement}

                    {/* Small yellow view indicator */}
                    <span className="absolute bottom-5 right-5 z-10 grid h-10 w-10 place-items-center rounded-full bg-lemon text-navy opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                        <ArrowIcon />
                    </span>
                </div>

                {/* Card information */}
                <div className="mt-5 flex items-center justify-between gap-4">
                    <h3 className="min-w-0 text-[clamp(21px,2vw,30px)] font-medium leading-[1.1] tracking-[-0.03em]">
                        {item.title}

                        <span className="text-navy-2/60">
                            {" "}— {item.year}
                        </span>
                    </h3>

                    {/* Project tags */}
                    <span className="hidden shrink-0 flex-wrap justify-end gap-2 sm:flex">
                        {item.tags.slice(0, 2).map((tag) => (
                            <span
                                key={tag}
                                className="whitespace-nowrap rounded-full border border-navy/15 px-3.5 py-1.5 text-[13px] text-navy-2"
                            >
                                {tag}
                            </span>
                        ))}
                    </span>
                </div>
            </a>
        </li>
    );
}

/* =========================================================
   WORK PROJECTS
   Main projects section
========================================================= */

export default function WorkProjects() {
    const root = useRef<HTMLElement>(null);

    const pillRef = useRef<HTMLSpanElement>(null);
    const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);
    const countRef = useRef<HTMLSpanElement>(null);

    const firstPill = useRef(true);
    const fromRef = useRef(0);
    const busy = useRef(false);

    /* ---------- States ---------- */

    const [filter, setFilter] = useState<Filter>("All");
    const [view, setView] = useState<View>("grid");
    const [shown, setShown] = useState(INITIAL);

    /* ---------- Filtered projects ---------- */

    const list = useMemo(
        () =>
            filter === "All"
                ? WORK_ITEMS
                : WORK_ITEMS.filter((item) => item.category === filter),
        [filter]
    );

    const visible = list.slice(0, shown);

    const remaining = Math.max(0, list.length - visible.length);

    /* =====================================================
       SLIDING FILTER PILL
    ===================================================== */

    const placePill = (instant: boolean) => {
        const btn = btnRefs.current[WORK_FILTERS.indexOf(filter)];
        const pill = pillRef.current;

        if (!btn || !pill) return;

        gsap.to(pill, {
            x: btn.offsetLeft,
            width: btn.offsetWidth,
            duration: instant ? 0 : 0.6,
            ease: "power4.out",
            overwrite: "auto",
        });
    };

    useLayoutEffect(() => {
        placePill(firstPill.current);
        firstPill.current = false;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filter]);

    /* ---------- Resize handling ---------- */

    useEffect(() => {
        const onResize = () => placePill(true);

        window.addEventListener("resize", onResize);
        document.fonts?.ready.then(onResize);

        return () => {
            window.removeEventListener("resize", onResize);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filter]);

    /* =====================================================
       TOOLBAR ENTRANCE ANIMATION
    ===================================================== */

    useGSAP(
        () => {
            const mm = gsap.matchMedia();

            mm.add("(prefers-reduced-motion: no-preference)", () => {
                gsap.from(".pg-bar-item", {
                    y: -18,
                    opacity: 0,
                    duration: 0.9,
                    ease: "expo.out",
                    stagger: 0.08,
                    scrollTrigger: {
                        trigger: root.current,
                        start: "top 80%",
                        once: true,
                    },
                });
            });

            return () => mm.revert();
        },
        { scope: root }
    );

    /* =====================================================
       LIVE COUNTER ANIMATION
    ===================================================== */

    useGSAP(
        () => {
            if (!countRef.current || reduced()) return;

            gsap.fromTo(
                countRef.current,
                {
                    yPercent: 80,
                    opacity: 0,
                },
                {
                    yPercent: 0,
                    opacity: 1,
                    duration: 0.6,
                    ease: "power3.out",
                }
            );
        },
        {
            scope: root,
            dependencies: [filter],
        }
    );

    /* =====================================================
       CARD SCROLL ANIMATIONS (No revertOnUpdate so "Show more" never glitches)
    ===================================================== */

    useGSAP(
        () => {
            const allCards = gsap.utils.toArray<HTMLElement>(
                ".svc-card",
                root.current
            );
            const newCards = allCards.slice(fromRef.current);

            if (!newCards.length) return;

            if (reduced()) {
                gsap.set(newCards, { y: 0, opacity: 1 });
                return;
            }

            gsap.set(newCards, {
                y: 44,
                opacity: 0,
            });

            ScrollTrigger.batch(newCards, {
                start: "top 95%",
                once: true,

                onEnter: (batch) => {
                    gsap.to(batch, {
                        y: 0,
                        opacity: 1,
                        duration: 0.95,
                        ease: "expo.out",
                        stagger: 0.07,
                        overwrite: true,
                    });

                    // Subtle settle without cropping left/right edges
                    const imgs = batch
                        .map((b) => b.querySelector(".wp-img"))
                        .filter(Boolean) as Element[];

                    if (imgs.length) {
                        gsap.fromTo(
                            imgs,
                            {
                                scale: 1.04,
                                transformOrigin: "50% 0%",
                            },
                            {
                                scale: 1,
                                duration: 1.3,
                                ease: "power3.out",
                                stagger: 0.07,
                                overwrite: true,
                            }
                        );
                    }
                },
            });

            ScrollTrigger.refresh();
        },
        {
            scope: root,
            dependencies: [filter, view, shown],
        }
    );

    /* =====================================================
       FILTER / VIEW TRANSITION
    ===================================================== */

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
            y: -16,
            duration: 0.25,
            ease: "power2.in",
            stagger: 0.02,

            onComplete: () => {
                fromRef.current = 0;
                apply();
                busy.current = false;
            },
        });
    };

    /* ---------- Change category ---------- */

    const changeFilter = (next: Filter) => {
        if (next === filter) return;

        swap(() => {
            setShown(INITIAL);
            setFilter(next);
        });
    };

    /* ---------- Change layout ---------- */

    const changeView = (next: View) => {
        if (next === view) return;

        swap(() => setView(next));
    };

    /* ---------- Show more ---------- */

    const showMore = () => {
        fromRef.current = visible.length;
        setShown((current) => Math.min(current + STEP, list.length));
    };

    /* =====================================================
       RENDER
    ===================================================== */

    return (
        <section
            ref={root}
            id="projects"
            data-over
            data-index="02"
            data-label={PAGE_COPY.label}
            className="on-light stack-card relative z-10 bg-off pb-[clamp(80px,10vw,140px)] pt-[clamp(36px,5vw,64px)]"
        >
            {/* =============================================
                TOOLBAR (Static / Non-sticky)
            ============================================= */}

            <div className="border-b border-navy/[0.07] bg-off">
                <div className="wrap flex flex-wrap items-center justify-between gap-x-6 gap-y-4 py-5">
                    {/* Eyebrow matched to WorkHero + live count */}
                    <div className="pg-bar-item flex items-center gap-3">
                        <p className="eyebrow text-navy-2">
                            {PAGE_COPY.eyebrow ?? PAGE_COPY.label}
                        </p>

                        <span className="overflow-hidden rounded-full bg-glacier px-2.5 py-0.5 font-mono text-[11px] tabular-nums text-navy-2">
                            <span ref={countRef} className="inline-block">
                                {pad(list.length)}
                            </span>
                        </span>
                    </div>

                    {/* =====================================
                        CATEGORY FILTERS
                    ===================================== */}

                    <div className="pg-bar-item order-last w-full overflow-x-auto [scrollbar-width:none] md:order-none md:w-auto">
                        <div
                            role="tablist"
                            aria-label="Filter work"
                            className="relative inline-flex rounded-full bg-glacier/70 p-1 ring-1 ring-navy/[0.06]"
                        >
                            {/* Sliding active pill */}
                            <span
                                ref={pillRef}
                                aria-hidden="true"
                                className="absolute bottom-1 left-0 top-1 w-0 rounded-full bg-navy shadow-[0_8px_20px_-8px_rgba(10,31,68,0.6)]"
                            />

                            {WORK_FILTERS.map((item, i) => {
                                const count =
                                    item === "All"
                                        ? WORK_ITEMS.length
                                        : WORK_ITEMS.filter(
                                            (p) => p.category === item
                                        ).length;

                                return (
                                    <button
                                        key={item}
                                        ref={(el) => {
                                            btnRefs.current[i] = el;
                                        }}
                                        type="button"
                                        role="tab"
                                        aria-selected={filter === item}
                                        onClick={() => changeFilter(item)}
                                        className={`relative z-10 whitespace-nowrap rounded-full px-4 py-2 text-[13.5px] font-medium transition-colors duration-300 ${filter === item
                                                ? "text-off"
                                                : "text-navy-2 hover:text-navy"
                                            }`}
                                    >
                                        {item}

                                        <span className="ml-1.5 font-mono text-[10px] opacity-60">
                                            {pad(count)}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* =====================================
                        GRID / LIST TOGGLE
                    ===================================== */}

                    <div
                        role="group"
                        aria-label="View"
                        className="pg-bar-item relative inline-flex rounded-full bg-glacier/70 p-1 ring-1 ring-navy/[0.06]"
                    >
                        {/* Sliding indicator */}
                        <span
                            aria-hidden="true"
                            className={`absolute bottom-1 left-1 top-1 w-10 rounded-full bg-navy transition-[translate] duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] ${view === "list"
                                    ? "translate-x-full"
                                    : "translate-x-0"
                                }`}
                        />

                        {(["grid", "list"] as View[]).map((item) => (
                            <button
                                key={item}
                                type="button"
                                onClick={() => changeView(item)}
                                aria-pressed={view === item}
                                aria-label={`${item} view`}
                                className={`relative z-10 grid h-10 w-10 place-items-center rounded-full transition-colors duration-300 ${view === item
                                        ? "text-off"
                                        : "text-navy-2 hover:text-navy"
                                    }`}
                            >
                                {item === "grid" ? <GridIcon /> : <ListIcon />}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* =============================================
                WORK GRID / LIST
            ============================================= */}

            <div className="wrap pt-[clamp(28px,4vw,56px)]">
                <ul
                    key={`${filter}-${view}`}
                    className={
                        view === "grid"
                            ? "grid gap-x-[clamp(16px,2vw,28px)] gap-y-[clamp(36px,4vw,64px)] sm:grid-cols-2"
                            : "flex flex-col"
                    }
                >
                    {visible.map((item, i) => (
                        <WorkCard
                            key={item.slug}
                            item={item}
                            view={view}
                            index={i}
                        />
                    ))}
                </ul>

                {/* =========================================
                    SHOW MORE
                ========================================= */}

                {remaining > 0 && (
                    <div className="mt-[clamp(48px,6vw,88px)] text-center">
                        <button
                            type="button"
                            onClick={showMore}
                            className="rounded-full bg-ink px-8 py-4 text-sm font-medium text-off transition-colors duration-300 hover:bg-lemon hover:text-navy"
                        >
                            Show more
                            <span className="ml-2 opacity-60">
                                ({remaining})
                            </span>
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}