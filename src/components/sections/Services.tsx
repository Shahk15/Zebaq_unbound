import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { SERVICES } from "../../data/services";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const VISIBLE = 3;         // rows shown in the window at once
const SCROLL_RATIO = 1.25; // scroll distance per pixel of list movement (higher = slower)

const pad = (n: number) => String(n).padStart(2, "0");
const clamp01 = (x: number) => Math.min(1, Math.max(0, x));
const smooth = (a: number, b: number, x: number) => {
    const t = clamp01((x - a) / (b - a));
    return t * t * (3 - 2 * t);
};

type ServicesProps = {
    // Becomes true when the loader reveals the site (used to re-measure scroll positions)
    play?: boolean;
};

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

const MASK =
    "linear-gradient(to_bottom,transparent_0,#000_7%,#000_93%,transparent_100%)";

export default function Services({ play = true }: ServicesProps) {
    const sectionRef = useRef<HTMLElement>(null);
    const windowRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLOListElement>(null);
    const countRef = useRef<HTMLSpanElement>(null);
    const barRef = useRef<HTMLSpanElement>(null);

    useGSAP(
        () => {
            const section = sectionRef.current;
            const win = windowRef.current;
            const track = trackRef.current;
            if (!section || !win || !track) return;

            const rows = gsap.utils.toArray<HTMLElement>(".svc-row", track);
            const links = gsap.utils.toArray<HTMLElement>(".svc-link", track);
            const n = rows.length;

            /* ---------- Card rising over the hero: rounded corners flatten, heading drifts ---------- */
            gsap.fromTo(
                section,
                { borderTopLeftRadius: 36, borderTopRightRadius: 36 },
                {
                    borderTopLeftRadius: 0,
                    borderTopRightRadius: 0,
                    ease: "none",
                    scrollTrigger: { trigger: section, start: "top 75%", end: "top top", scrub: true },
                }
            );
            gsap.fromTo(
                ".svc-head",
                { y: 90 },
                {
                    y: 0,
                    ease: "none",
                    scrollTrigger: { trigger: section, start: "top bottom", end: "top 20%", scrub: true },
                }
            );

            const mm = gsap.matchMedia();

            /* ---------- Desktop: pinned, list scrolls inside a window ---------- */
            mm.add("(min-width: 821px) and (prefers-reduced-motion: no-preference)", () => {
                section.dataset.pin = "true";

                let winH = 0;
                let dist = 0;
                let centers: number[] = [];
                let lastIdx = -1;

                // Rows are at least 1/3 of the window; taller content simply makes the row taller
                const measure = () => {
                    winH = win.clientHeight;
                    track.style.setProperty("--row-min", `${Math.floor(winH / VISIBLE)}px`);
                    centers = rows.map((r) => r.offsetTop + r.offsetHeight / 2);
                    dist = Math.max(0, track.offsetHeight - winH);
                };
                measure();

                // Every frame: fade, drift and scale each row by where it sits in the window
                const apply = () => {
                    const y = Number(gsap.getProperty(track, "y")) || 0;
                    for (let i = 0; i < n; i++) {
                        const t = (centers[i] + y) / winH; // 0 = window top, 1 = window bottom
                        const top = smooth(-0.05, 0.14, t);
                        const bottom = 1 - smooth(0.86, 1.05, t);
                        const edge = top * bottom;
                        // Rows near the middle stay brightest
                        const focus = 1 - 0.38 * smooth(0.18, 0.5, Math.abs(t - 0.5));
                        const drift = (1 - edge) * 34 * (t < 0.5 ? -1 : 1);
                        links[i].style.opacity = String(edge * focus);
                        links[i].style.transform = `translate3d(0, ${drift}px, 0) scale(${0.94 + 0.06 * edge})`;
                    }

                    const progress = dist ? clamp01(-y / dist) : 0;
                    const idx = Math.round(progress * (n - 1));
                    if (idx !== lastIdx) {
                        lastIdx = idx;
                        if (countRef.current) countRef.current.textContent = pad(idx + 1);
                    }
                    if (barRef.current) barRef.current.style.transform = `scaleX(${progress})`;
                };

                gsap.timeline({
                    defaults: { ease: "none" },
                    scrollTrigger: {
                        trigger: section,
                        start: "top top",
                        end: () => `+=${Math.round(dist * SCROLL_RATIO)}`,
                        pin: true,
                        scrub: 0.5,
                        anticipatePin: 1,
                        invalidateOnRefresh: true,
                        refreshPriority: 1,
                    },
                    onUpdate: apply,
                }).to(track, { y: () => -dist });

                apply();

                const onRefreshInit = () => measure();
                const onRefresh = () => apply();
                ScrollTrigger.addEventListener("refreshInit", onRefreshInit);
                ScrollTrigger.addEventListener("refresh", onRefresh);

                return () => {
                    ScrollTrigger.removeEventListener("refreshInit", onRefreshInit);
                    ScrollTrigger.removeEventListener("refresh", onRefresh);
                    delete section.dataset.pin;
                    track.style.removeProperty("--row-min");
                    links.forEach((l) => {
                        l.style.opacity = "";
                        l.style.transform = "";
                    });
                };
            });

            /* ---------- Mobile / reduced motion: normal list ---------- */
            mm.add("(max-width: 820px), (prefers-reduced-motion: reduce)", () => {
                if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

                gsap.set(rows, { opacity: 0, y: 28 });
                ScrollTrigger.batch(rows, {
                    start: "top 92%",
                    once: true,
                    onEnter: (batch) =>
                        gsap.to(batch, { opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: "power3.out", overwrite: true }),
                });
            });

            return () => mm.revert();
        },
        { scope: sectionRef, dependencies: [] }
    );

    // Re-measure once the loader is gone (scrollbar appears) and once fonts are ready
    useEffect(() => {
        if (!play) return;
        const t = window.setTimeout(() => ScrollTrigger.refresh(), 1600);
        return () => window.clearTimeout(t);
    }, [play]);

    useEffect(() => {
        document.fonts?.ready.then(() => ScrollTrigger.refresh());
    }, []);

    return (
        <section
            ref={sectionRef}
            id="services"
            className="group/svc relative z-10 flex flex-col overflow-hidden rounded-t-[36px] bg-[#f6f7fb] text-[#0b1b3a] shadow-[0_-30px_80px_-30px_rgba(11,27,58,0.2)] data-[pin=true]:h-[100svh] data-[pin=true]:pb-[clamp(16px,3vh,32px)]"
        >
            {/* ===== Heading + counter ===== */}
            <div className="svc-head flex items-end justify-between gap-6 px-[4.4vw] pb-[clamp(20px,3.5vh,40px)] pt-[clamp(96px,14vh,140px)]">
                <h2 className="text-[clamp(38px,4.8vw,76px)] font-bold leading-[1.02] tracking-[-0.04em]">
                    Our <span className="gradient-heading">Capabilities.</span>
                </h2>

                <div className="hidden text-right group-data-[pin=true]/svc:block">
                    <p className="font-mono text-sm tracking-[0.08em] text-[#5d6987]">
                        <span ref={countRef} className="text-[#0b1b3a]">01</span> / {pad(SERVICES.length)}
                    </p>
                    <div className="ml-auto mt-3 h-[2px] w-40 overflow-hidden rounded-full bg-[#0b1b3a]/10">
                        <span
                            ref={barRef}
                            className="block h-full origin-left bg-[#0b57d0]"
                            style={{ transform: "scaleX(0)" }}
                        />
                    </div>
                </div>
            </div>

            {/* ===== List: in pinned mode this is a window and the list slides inside it ===== */}
            <div
                ref={windowRef}
                className={`svc-window relative border-b border-[#0b1b3a]/10 group-data-[pin=true]/svc:min-h-0 group-data-[pin=true]/svc:flex-1 group-data-[pin=true]/svc:overflow-hidden group-data-[pin=true]/svc:border-b-0 group-data-[pin=true]/svc:[mask-image:${MASK}] group-data-[pin=true]/svc:[-webkit-mask-image:${MASK}]`}
            >
                <ol ref={trackRef} className="relative will-change-transform">
                    {SERVICES.map((s, i) => (
                        <li
                            key={s.slug}
                            className="svc-row flex min-h-[var(--row-min,0px)] border-t border-[#0b1b3a]/10"
                        >
                            <a
                                href={s.href}
                                data-cursor="View"
                                className="svc-link group relative grid w-full origin-left grid-cols-[clamp(44px,6vw,90px)_minmax(0,1.15fr)_minmax(0,1fr)_48px] items-center gap-x-[clamp(16px,3vw,56px)] px-[4.4vw] py-[clamp(22px,3.4vh,40px)] will-change-[transform,opacity] max-[820px]:grid-cols-[36px_1fr_40px] max-[820px]:gap-x-3 max-[820px]:gap-y-4"
                            >
                                {/* Full-bleed highlight on hover */}
                                <span
                                    aria-hidden="true"
                                    className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(11,87,208,0.07),transparent_85%)] opacity-0 transition-opacity duration-[350ms] group-hover:opacity-100 group-focus-visible:opacity-100"
                                />

                                <span className="font-mono text-[13px] tracking-[0.05em] text-[#5d6987]">
                                    {pad(i + 1)}
                                </span>

                                <div>
                                    <h3 className="relative text-[clamp(22px,2.4vw,40px)] font-medium leading-[1.1] tracking-[-0.03em] transition-transform duration-[400ms] ease-[cubic-bezier(0.2,0.7,0.2,1)] before:absolute before:-left-[0.55em] before:top-[0.5em] before:h-[0.2em] before:w-[0.2em] before:rounded-full before:bg-[#0b57d0] before:opacity-0 before:transition-opacity before:duration-300 before:content-[''] group-hover:translate-x-[0.6em] group-hover:before:opacity-100">
                                        {s.title}
                                    </h3>
                                    <span className="mt-[0.9em] block text-xs uppercase tracking-[0.14em] text-[#5d6987]">
                                        {s.caption}
                                    </span>
                                </div>

                                <ul className="flex flex-wrap gap-2.5 max-[820px]:col-start-2 max-[820px]:col-end-4 max-[820px]:row-start-2">
                                    {s.tags.map((t) => (
                                        <li
                                            key={t}
                                            className="whitespace-nowrap rounded-full border border-[#0b1b3a]/20 px-3.5 py-[7px] text-[13px] leading-none"
                                        >
                                            {t}
                                        </li>
                                    ))}
                                </ul>

                                <span className="grid h-12 w-12 place-items-center justify-self-end rounded-full border border-[#0b1b3a]/20 text-[#0b1b3a] transition-colors duration-300 group-hover:border-[#0b57d0] group-hover:bg-[#0b57d0] group-hover:text-white max-[820px]:col-start-3 max-[820px]:row-start-1 max-[820px]:h-10 max-[820px]:w-10">
                                    <ArrowIcon />
                                </span>
                            </a>
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    );
}