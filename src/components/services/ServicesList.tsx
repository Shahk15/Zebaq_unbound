import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Split } from "../common/ui";
import { GRID, SERVICE_CARDS } from "../../data/services";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const VISIBLE = 3; // rows shown in the window at once
const SCROLL_RATIO = 1.25; // scroll distance per pixel of list movement (higher = slower)

const clamp01 = (x: number) => Math.min(1, Math.max(0, x));
const smooth = (a: number, b: number, x: number) => {
    const t = clamp01((x - a) / (b - a));
    return t * t * (3 - 2 * t);
};

type Row = {
    key: string;
    n: string;
    title: string;
    caption: string;
    tags: string[];
    href: string;
    cta?: boolean;
};

// Ten services, then one closing call-to-action row
const ROWS: Row[] = [
    ...SERVICE_CARDS.map((s) => ({
        key: s.slug,
        n: s.n,
        title: s.title,
        caption: s.caption,
        tags: s.tags,
        href: s.href,
    })),
    {
        key: "cta",
        n: "+",
        title: GRID.cta.title,
        caption: GRID.cta.text,
        tags: [],
        href: GRID.cta.href,
        cta: true,
    },
];

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

export default function ServicesList() {
    const sectionRef = useRef<HTMLElement>(null);
    const stageRef = useRef<HTMLDivElement>(null);
    const windowRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLOListElement>(null);

    useGSAP(
        () => {
            const section = sectionRef.current;
            const stage = stageRef.current;
            const win = windowRef.current;
            const track = trackRef.current;
            if (!section || !stage || !win || !track) return;

            const rows = gsap.utils.toArray<HTMLElement>(".svc-row", track);
            const links = gsap.utils.toArray<HTMLElement>(".svc-link", track);
            const n = rows.length;

            const mm = gsap.matchMedia();
            mm.add(
                {
                    desk: "(min-width: 821px)",
                    motion: "(prefers-reduced-motion: no-preference)",
                },
                (ctx) => {
                    const { desk, motion } = ctx.conditions as {
                        desk: boolean;
                        motion: boolean;
                    };
                    if (!motion) return;

                    /* ---------- Reveal: corners flatten and the heading drifts up as the section arrives ---------- */
                    gsap.fromTo(
                        section,
                        { borderTopLeftRadius: 36, borderTopRightRadius: 36 },
                        {
                            borderTopLeftRadius: 0,
                            borderTopRightRadius: 0,
                            ease: "none",
                            scrollTrigger: {
                                trigger: section,
                                start: "top 80%",
                                end: "top top",
                                scrub: true,
                            },
                        }
                    );
                    gsap.fromTo(
                        ".svc-head",
                        { y: 90, opacity: 0.2 },
                        {
                            y: 0,
                            opacity: 1,
                            ease: "none",
                            scrollTrigger: {
                                trigger: section,
                                start: "top bottom",
                                end: "top 25%",
                                scrub: true,
                            },
                        }
                    );

                    /* ---------- Mobile: normal list, rows rise in ---------- */
                    if (!desk) {
                        gsap.set(rows, { opacity: 0, y: 28 });
                        ScrollTrigger.batch(rows, {
                            start: "top 92%",
                            once: true,
                            onEnter: (batch) =>
                                gsap.to(batch, {
                                    opacity: 1,
                                    y: 0,
                                    duration: 0.7,
                                    stagger: 0.08,
                                    ease: "power3.out",
                                    overwrite: true,
                                }),
                        });
                        return;
                    }

                    /* ---------- Desktop 1: the hero stays put and sinks while this section slides over it ---------- */
                    const hero = document.querySelector<HTMLElement>("[data-hero]");
                    let shade: HTMLElement | null = null;
                    if (hero) {
                        shade = document.createElement("div");
                        shade.className =
                            "pointer-events-none absolute inset-0 z-[50] bg-black opacity-0";
                        hero.appendChild(shade);
                        gsap.timeline({
                            scrollTrigger: {
                                trigger: hero,
                                start: "top top",
                                end: () => `+=${window.innerHeight}`,
                                pin: true,
                                pinSpacing: false,
                                scrub: true,
                                invalidateOnRefresh: true,
                            },
                        })
                            .to(
                                hero,
                                {
                                    scale: 0.92,
                                    yPercent: -2,
                                    transformOrigin: "50% 100%",
                                    ease: "none",
                                },
                                0
                            )
                            .to(shade, { opacity: 0.55, ease: "none" }, 0);
                    }

                    /* ---------- Desktop 2: heading scrolls away, then only the list stage pins ---------- */
                    section.dataset.pin = "true";

                    let winH = 0;
                    let dist = 0;
                    let centers: number[] = [];
                    let activeIdx = -1;

                    const measure = () => {
                        winH = win.clientHeight;
                        track.style.setProperty(
                            "--row-min",
                            `${Math.floor(winH / VISIBLE)}px`
                        );
                        centers = rows.map(
                            (r) => r.offsetTop + r.offsetHeight / 2
                        );
                        dist = Math.max(0, track.offsetHeight - winH);
                    };
                    measure();

                    const apply = () => {
                        const y = Number(gsap.getProperty(track, "y")) || 0;
                        let closestIdx = 0;
                        let minDiff = Infinity;

                        for (let i = 0; i < n; i++) {
                            const t = (centers[i] + y) / winH; // 0 = window top, 1 = window bottom
                            const diff = Math.abs(t - 0.5);
                            if (diff < minDiff) {
                                minDiff = diff;
                                closestIdx = i;
                            }

                            const top = smooth(-0.05, 0.14, t);
                            const bottom = 1 - smooth(0.86, 1.05, t);
                            const edge = top * bottom;
                            const focus =
                                1 - 0.38 * smooth(0.18, 0.5, diff);
                            const drift = (1 - edge) * 34 * (t < 0.5 ? -1 : 1);
                            links[i].style.opacity = String(edge * focus);
                            links[i].style.transform = `translate3d(0, ${drift}px, 0) scale(${0.94 + 0.06 * edge})`;
                        }

                        // Highlight whichever row is closest to the center on scroll
                        if (closestIdx !== activeIdx) {
                            if (activeIdx >= 0 && rows[activeIdx]) {
                                delete rows[activeIdx].dataset.active;
                            }
                            if (rows[closestIdx]) {
                                rows[closestIdx].dataset.active = "true";
                            }
                            activeIdx = closestIdx;
                        }
                    };

                    gsap.timeline({
                        defaults: { ease: "none" },
                        scrollTrigger: {
                            trigger: stage,
                            start: "top top",
                            end: () => `+=${Math.round(dist * SCROLL_RATIO)}`,
                            pin: true,
                            scrub: 0.5,
                            anticipatePin: 1,
                            invalidateOnRefresh: true,
                        },
                        onUpdate: apply,
                    }).to(track, { y: () => -dist });

                    apply();

                    const onRefreshInit = () => measure();
                    const onRefresh = () => apply();
                    ScrollTrigger.addEventListener("refreshInit", onRefreshInit);
                    ScrollTrigger.addEventListener("refresh", onRefresh);

                    return () => {
                        ScrollTrigger.removeEventListener(
                            "refreshInit",
                            onRefreshInit
                        );
                        ScrollTrigger.removeEventListener("refresh", onRefresh);
                        delete section.dataset.pin;
                        track.style.removeProperty("--row-min");
                        rows.forEach((r) => delete r.dataset.active);
                        links.forEach((l) => {
                            l.style.opacity = "";
                            l.style.transform = "";
                        });
                        shade?.remove();
                    };
                }
            );

            return () => mm.revert();
        },
        { scope: sectionRef, dependencies: [] }
    );

    useEffect(() => {
        const refresh = () => ScrollTrigger.refresh();
        document.fonts?.ready.then(refresh);
        window.addEventListener("page:ready", refresh);
        return () => window.removeEventListener("page:ready", refresh);
    }, []);

    return (
        <section
            ref={sectionRef}
            id="services-list"
            data-index="02"
            data-label="Core Services"
            className="group/svc relative z-10 overflow-hidden rounded-t-[36px] bg-glacier text-navy shadow-[0_-30px_80px_-30px_rgba(10,31,68,0.3)]"
        >
            {/* ===== Heading: normal flow, scrolls away before the list pins ===== */}
            <div className="svc-head px-[4.4vw] pb-[clamp(48px,9vh,110px)] pt-[clamp(96px,14vh,150px)]">
                <p className="eyebrow text-navy-2">{GRID.label}</p>
                <h2 className="t-xl mt-6">
                    <Split text={GRID.line1} />
                    <br />
                    <Split text={GRID.line2} dot />
                </h2>
            </div>

            {/* ===== Stage: bottom padding keeps breathing room below the last row ===== */}
            <div
                ref={stageRef}
                className="svc-stage flex flex-col pb-[clamp(64px,10vh,120px)] group-data-[pin=true]/svc:h-[100svh] group-data-[pin=true]/svc:pb-[clamp(48px,8vh,96px)] group-data-[pin=true]/svc:pt-[clamp(80px,11vh,104px)]"
            >
                <div
                    ref={windowRef}
                    className="svc-window relative group-data-[pin=true]/svc:min-h-0 group-data-[pin=true]/svc:flex-1 group-data-[pin=true]/svc:overflow-hidden"
                >
                    <ol
                        ref={trackRef}
                        className="group/track relative border-b border-navy/15 will-change-transform"
                    >
                        {ROWS.map((r) => (
                            <li
                                key={r.key}
                                className="svc-row group/row relative flex min-h-[var(--row-min,0px)] overflow-hidden border-t border-navy/15"
                            >
                                {/* Clean warm off-white fill + left lemon accent bar on hover / active */}
                                <span
                                    aria-hidden="true"
                                    className="pointer-events-none absolute inset-0 origin-bottom scale-y-0 bg-off shadow-[inset_4px_0_0_0_var(--color-lemon-deep)] transition-transform duration-[420ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover/row:scale-y-100 group-focus-within/row:scale-y-100 group-[:not(:hover)]/track:group-data-[active=true]/row:scale-y-100"
                                />

                                <a
                                    href={r.href}
                                    data-cursor="View"
                                    className="svc-link relative z-10 grid w-full origin-left grid-cols-[clamp(44px,6vw,90px)_minmax(0,1.15fr)_minmax(0,1fr)_48px] items-center gap-x-[clamp(16px,3vw,56px)] px-[4.4vw] py-[clamp(22px,3.4vh,40px)] text-navy-2 transition-[color,opacity] duration-300 will-change-[transform,opacity] group-hover/row:!opacity-100 group-hover/row:text-ink group-focus-visible:!opacity-100 group-focus-visible:text-ink group-[:not(:hover)]/track:group-data-[active=true]/row:!opacity-100 group-[:not(:hover)]/track:group-data-[active=true]/row:text-ink max-[820px]:grid-cols-[36px_1fr_40px] max-[820px]:gap-x-3 max-[820px]:gap-y-4"
                                >
                                    {/* Number */}
                                    <span className="font-mono text-[13px] font-medium tracking-[0.05em] text-navy-2/70 transition-colors duration-300 group-hover/row:font-semibold group-hover/row:text-ink group-focus-visible:font-semibold group-focus-visible:text-ink group-[:not(:hover)]/track:group-data-[active=true]/row:font-semibold group-[:not(:hover)]/track:group-data-[active=true]/row:text-ink">
                                        {r.n}
                                    </span>

                                    {/* Title & Caption */}
                                    <div>
                                        <h3 className="relative text-[clamp(22px,2.4vw,40px)] font-medium leading-[1.1] tracking-[-0.03em] text-navy/85 transition-all duration-[400ms] ease-[cubic-bezier(0.2,0.7,0.2,1)] before:absolute before:-left-[0.55em] before:top-[0.46em] before:h-[0.22em] before:w-[0.22em] before:rounded-full before:bg-lemon-deep before:opacity-0 before:transition-opacity before:duration-300 before:content-[''] group-hover/row:translate-x-[0.6em] group-hover/row:text-ink group-hover/row:before:opacity-100 group-focus-visible:translate-x-[0.6em] group-focus-visible:text-ink group-focus-visible:before:opacity-100 group-[:not(:hover)]/track:group-data-[active=true]/row:translate-x-[0.6em] group-[:not(:hover)]/track:group-data-[active=true]/row:text-ink group-[:not(:hover)]/track:group-data-[active=true]/row:before:opacity-100">
                                            {r.title}
                                        </h3>
                                        <span className="mt-[0.9em] block text-xs uppercase tracking-[0.14em] text-navy-2/80 transition-colors duration-300 group-hover/row:text-navy group-focus-visible:text-navy group-[:not(:hover)]/track:group-data-[active=true]/row:text-navy">
                                            {r.caption}
                                        </span>
                                    </div>

                                    {/* Tags */}
                                    <ul className="flex flex-wrap gap-2.5 max-[820px]:col-start-2 max-[820px]:col-end-4 max-[820px]:row-start-2">
                                        {r.tags.map((t) => (
                                            <li
                                                key={t}
                                                className="whitespace-nowrap rounded-full border border-navy/20 px-3.5 py-[7px] text-[13px] leading-none text-navy-2 transition-colors duration-300 group-hover/row:border-navy/35 group-hover/row:bg-glacier group-hover/row:font-medium group-hover/row:text-ink group-focus-visible:border-navy/35 group-focus-visible:bg-glacier group-focus-visible:font-medium group-focus-visible:text-ink group-[:not(:hover)]/track:group-data-[active=true]/row:border-navy/35 group-[:not(:hover)]/track:group-data-[active=true]/row:bg-glacier group-[:not(:hover)]/track:group-data-[active=true]/row:font-medium group-[:not(:hover)]/track:group-data-[active=true]/row:text-ink"
                                            >
                                                {t}
                                            </li>
                                        ))}
                                    </ul>

                                    {/* Action Arrow */}
                                    <span
                                        className={`grid h-12 w-12 place-items-center justify-self-end rounded-full border transition-all duration-300 group-hover/row:scale-105 group-hover/row:border-lemon group-hover/row:bg-lemon group-hover/row:text-ink group-focus-visible:scale-105 group-focus-visible:border-lemon group-focus-visible:bg-lemon group-focus-visible:text-ink group-[:not(:hover)]/track:group-data-[active=true]/row:scale-105 group-[:not(:hover)]/track:group-data-[active=true]/row:border-lemon group-[:not(:hover)]/track:group-data-[active=true]/row:bg-lemon group-[:not(:hover)]/track:group-data-[active=true]/row:text-ink max-[820px]:col-start-3 max-[820px]:row-start-1 max-[820px]:h-10 max-[820px]:w-10 ${r.cta
                                                ? "border-lemon bg-lemon text-ink"
                                                : "border-navy/25 text-navy-2"
                                            }`}
                                    >
                                        <span className="transition-transform duration-300 group-hover/row:translate-x-0.5 group-hover/row:-translate-y-0.5 group-[:not(:hover)]/track:group-data-[active=true]/row:translate-x-0.5 group-[:not(:hover)]/track:group-data-[active=true]/row:-translate-y-0.5">
                                            <ArrowIcon />
                                        </span>
                                    </span>
                                </a>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        </section>
    );
}