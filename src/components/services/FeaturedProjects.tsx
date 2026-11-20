import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Split } from "../common/ui";
import { CASES } from "../../data/home/cases";
import type { CaseStudy } from "../../data/home/cases";
import { FEATURED } from "../../data/services";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const pad = (n: number) => String(n).padStart(2, "0");

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
   CASE CARD
   Same design as the Home Work cards
========================================================= */

function CaseCard({ c, index }: { c: CaseStudy; index: number }) {
    const dark = (c.theme ?? (c.media ? "dark" : "light")) === "dark";

    return (
        <li className="fp-card h-[560px] w-[min(86vw,440px)] shrink-0 snap-center min-[821px]:w-[clamp(340px,34vw,540px)] group-data-[pin=true]/fp:h-[calc(100svh_-_88px_-_var(--pt)_-_var(--pb))] group-data-[pin=true]/fp:max-h-none">
            <a
                href={c.href}
                data-cursor="View"
                className={`fp-face group relative block h-full overflow-hidden rounded-[28px] ${dark
                    ? "bg-[radial-gradient(120%_90%_at_50%_0%,#1c3c78_0%,#0a1f44_45%,#071631_100%)] text-off"
                    : "border border-navy/10 bg-glacier text-navy"
                    }`}
            >
                {/* Background: image or video */}
                {c.media && (
                    <div className="fp-media absolute inset-0 overflow-hidden transition-transform duration-[900ms] ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover:scale-[1.04]">
                        <div className="fp-drift absolute inset-0 scale-[1.12]">
                            {c.media.type === "video" ? (
                                <video
                                    src={c.media.src}
                                    poster={c.media.poster}
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <img
                                    src={c.media.src}
                                    alt={c.media.alt ?? ""}
                                    loading="lazy"
                                    draggable={false}
                                    className="h-full w-full object-cover"
                                />
                            )}
                        </div>
                    </div>
                )}

                {/* Keeps the text readable on any image */}
                {c.media && (
                    <span
                        aria-hidden="true"
                        className={`pointer-events-none absolute inset-0 ${dark
                            ? "bg-[linear-gradient(to_top,rgba(7,22,49,0.85)_0%,rgba(7,22,49,0.3)_45%,transparent_72%)]"
                            : "bg-[linear-gradient(to_top,rgba(247,246,241,0.95)_0%,rgba(247,246,241,0.5)_40%,transparent_70%)]"
                            }`}
                    />
                )}

                {/* Number */}
                <span className="absolute left-6 top-6 grid h-10 min-w-10 place-items-center rounded-full bg-off/90 px-3 text-sm font-bold text-navy backdrop-blur-sm">
                    {pad(index + 1)}
                </span>

                {/* Text + arrow */}
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-5 p-[clamp(22px,2.2vw,34px)]">
                    <div className="min-w-0">
                        <h3 className="text-[clamp(28px,2.6vw,42px)] tracking-[-0.045em]">{c.title}</h3>
                        <p className={`mt-3 max-w-[34ch] text-[15px] leading-[1.6] ${dark ? "text-off/70" : "text-navy-2"}`}>
                            {c.text}
                        </p>
                    </div>
                    <span
                        className={`grid h-12 w-12 shrink-0 place-items-center rounded-full border transition-colors duration-300 group-hover:border-lemon group-hover:bg-lemon group-hover:text-navy ${dark ? "border-off/40 text-off" : "border-navy/25 text-navy"
                            }`}
                    >
                        <ArrowIcon />
                    </span>
                </div>
            </a>
        </li>
    );
}

/* =========================================================
   FEATURED PROJECTS SECTION
========================================================= */

export default function FeaturedProjects() {
    const sectionRef = useRef<HTMLElement>(null);
    const stageRef = useRef<HTMLDivElement>(null);
    const viewRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLUListElement>(null);

    const items = CASES.slice(0, FEATURED.count);

    useGSAP(
        () => {
            const section = sectionRef.current;
            const stage = stageRef.current;
            const view = viewRef.current;
            const track = trackRef.current;

            if (!section || !stage || !view || !track) return;

            const q = gsap.utils.selector(section);
            const mm = gsap.matchMedia();

            mm.add(
                {
                    motion: "(prefers-reduced-motion: no-preference)",
                    pinned: "(min-width: 821px) and (min-height: 600px)",
                },
                (ctx) => {
                    const { motion, pinned } = ctx.conditions as {
                        motion: boolean;
                        pinned: boolean;
                    };

                    const cards = q(".fp-face") as HTMLElement[];

                    /* -----------------------------------------
                       REVEAL SECTION
                    ----------------------------------------- */

                    if (motion) {
                        gsap.fromTo(
                            section,
                            {
                                clipPath: "inset(90px 70px 0px 70px round 48px)",
                            },
                            {
                                clipPath: "inset(0px 0px 0px 0px round 0px)",
                                ease: "none",
                                scrollTrigger: {
                                    trigger: section,
                                    start: "top 95%",
                                    end: "top 20%",
                                    scrub: true,
                                },
                                onComplete: () => {
                                    gsap.set(section, {
                                        clearProps: "clipPath",
                                    });
                                },
                            }
                        );

                        gsap.from(q(".fp-head > *"), {
                            y: 60,
                            opacity: 0,
                            duration: 1.3,
                            ease: "expo.out",
                            stagger: 0.12,
                            scrollTrigger: {
                                trigger: q(".fp-head"),
                                start: "top 85%",
                                once: true,
                            },
                        });
                    }

                    /* -----------------------------------------
                       MOBILE / TABLET
                       Native horizontal swipe
                    ----------------------------------------- */

                    if (!pinned) {
                        if (motion) {
                            gsap.from(cards, {
                                x: 70,
                                opacity: 0,
                                duration: 0.9,
                                stagger: 0.12,
                                ease: "power3.out",
                                scrollTrigger: {
                                    trigger: view,
                                    start: "top 88%",
                                    once: true,
                                },
                            });
                        }

                        return;
                    }

                    /* -----------------------------------------
                       DESKTOP PINNED SECTION
                    ----------------------------------------- */

                    section.dataset.pin = "true";

                    const dist = () =>
                        Math.max(0, track.scrollWidth - view.clientWidth);

                    /* Card Entrance */

                    if (motion) {
                        gsap.timeline({
                            scrollTrigger: {
                                trigger: stage,
                                start: "top 95%",
                                end: "top 15%",
                                scrub: 0.8,
                                invalidateOnRefresh: true,
                            },
                        }).fromTo(
                            cards,
                            {
                                y: 200,
                                rotate: (i: number) =>
                                    i % 2 === 0 ? -5 : 5,
                                scale: 0.92,
                                opacity: 0,
                                transformOrigin: "50% 100%",
                            },
                            {
                                y: 0,
                                rotate: 0,
                                scale: 1,
                                opacity: 1,
                                ease: "power3.out",
                                stagger: 0.14,
                            }
                        );
                    }

                    /* Horizontal Scroll */

                    const slide = gsap.to(track, {
                        x: () => -dist(),
                        ease: "none",
                        scrollTrigger: {
                            trigger: stage,
                            start: "top top",
                            end: () => `+=${Math.round(dist() * 1.15)}`,
                            pin: true,
                            scrub: 0.7,
                            anticipatePin: 1,
                            invalidateOnRefresh: true,
                        },
                    });

                    /* Image Parallax */

                    if (motion) {
                        (q(".fp-card") as HTMLElement[]).forEach((card) => {
                            const media = card.querySelector(".fp-drift");

                            if (!media) return;

                            gsap.fromTo(
                                media,
                                { xPercent: -4 },
                                {
                                    xPercent: 4,
                                    ease: "none",
                                    scrollTrigger: {
                                        trigger: card,
                                        containerAnimation: slide,
                                        start: "left right",
                                        end: "right left",
                                        scrub: true,
                                    },
                                }
                            );
                        });
                    }

                    return () => {
                        delete section.dataset.pin;
                    };
                }
            );

            return () => mm.revert();
        },
        {
            scope: sectionRef,
            dependencies: [],
        }
    );

    return (
        <section
            ref={sectionRef}
            id="featured"
            data-dark
            data-index="03"
            data-label="Featured Work"
            className="
                group/fp
                relative
                z-10
                overflow-hidden
                bg-ink
                text-off
            "
        >
            {/* =========================================
                HEADER
                Existing service page styling preserved
            ========================================= */}

            <div
                className="
                    fp-head
                    wrap
                    flex
                    flex-col
                    justify-between
                    gap-8
                    pb-[clamp(40px,7vh,90px)]
                    pt-[clamp(90px,13vh,150px)]
                    md:flex-row
                    md:items-end
                "
            >
                <div>
                    <p className="eyebrow text-glacier-3">
                        {FEATURED.label}
                    </p>

                    <h2 className="t-xl mt-6">
                        <Split text={FEATURED.heading} dot />
                    </h2>
                </div>

                <a
                    href={FEATURED.all.href}
                    className="
                        group
                        inline-flex
                        w-fit
                        items-center
                        gap-4
                        rounded-full
                        border
                        border-white/25
                        py-2
                        pl-6
                        pr-2
                        text-sm
                        font-medium
                        text-off
                        transition-colors
                        duration-300
                        hover:border-lemon
                        hover:text-lemon
                    "
                >
                    {FEATURED.all.label}

                    <span
                        className="
                            grid
                            h-10
                            w-10
                            place-items-center
                            rounded-full
                            bg-lemon
                            text-navy
                            transition-transform
                            duration-500
                            group-hover:rotate-45
                        "
                    >
                        <ArrowIcon />
                    </span>
                </a>
            </div>

            {/* =========================================
                PINNED STAGE
            ========================================= */}

            <div
                ref={stageRef}
                style={
                    {
                        "--pt": "clamp(8px,2vh,24px)",
                        "--pb": "clamp(28px,5vh,56px)",
                    } as React.CSSProperties
                }
                className="
                    flex
                    flex-col
                    pb-[clamp(56px,8vw,110px)]
                    group-data-[pin=true]/fp:h-[100svh]
                    group-data-[pin=true]/fp:pb-[clamp(16px,3vh,32px)]
                "
            >
                {/* Horizontal View */}

                <div
                    ref={viewRef}
                    className="
                        relative
                        min-h-0
                        flex-1
                        snap-x
                        snap-mandatory
                        overflow-x-auto
                        [scrollbar-width:none]
                        group-data-[pin=true]/fp:snap-none
                        group-data-[pin=true]/fp:overflow-hidden
                        [&::-webkit-scrollbar]:hidden
                    "
                >
                    <ul
                        ref={trackRef}
                        className="
                            flex
                            w-max
                            items-start
                            gap-4
                            pb-[clamp(36px,6vw,80px)]
                            pl-[clamp(16px,3.2vw,64px)]
                            pr-[clamp(16px,3.2vw,64px)]
                            will-change-transform
                            md:gap-5
                            group-data-[pin=true]/fp:h-full
                            group-data-[pin=true]/fp:pb-[var(--pb)]
                            group-data-[pin=true]/fp:pt-[var(--pt)]
                        "
                    >
                        {items.map((c, i) => (
                            <CaseCard key={c.slug} c={c} index={i} />
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}