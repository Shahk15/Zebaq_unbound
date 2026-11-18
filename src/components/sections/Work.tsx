import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { CASES } from "../../data/cases";
import type { CaseStudy } from "../../data/cases";

gsap.registerPlugin(useGSAP, ScrollTrigger);

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

/* ---------- One card: media fills the background, your text sits on top ---------- */

function CaseCard({ c }: { c: CaseStudy }) {
    const dark = (c.theme ?? (c.media ? "dark" : "light")) === "dark";
    return (
        <li className="work-card h-[680px] w-[min(86vw,440px)] shrink-0 snap-center min-[821px]:w-[clamp(340px,34vw,540px)] group-data-[pin=true]/work:h-full group-data-[pin=true]/work:max-h-[900px]">
            <a
                href={c.href}
                data-cursor="View"
                className={`work-face group relative block h-full overflow-hidden rounded-[32px] ${dark
                    ? "bg-[linear-gradient(160deg,#16305f,#0b1b3a)] text-white"
                    : "border border-[#0b1b3a]/[0.08] bg-[#f4f7fc] text-[#0b1b3a]"
                    }`}
            >
                {/* Background: image or video */}
                {c.media && (
                    <div className="work-media absolute inset-0 transition-transform duration-[900ms] ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover:scale-[1.04]">
                        {c.media.type === "video" ? (
                            <video
                                src={c.media.src}
                                poster={c.media.poster}
                                autoPlay
                                muted
                                loop
                                playsInline
                                className="h-full w-full scale-[1.12] object-cover"
                            />
                        ) : (
                            <img
                                src={c.media.src}
                                alt={c.media.alt ?? ""}
                                loading="lazy"
                                draggable={false}
                                className="h-full w-full scale-[1.12] object-cover"
                            />
                        )}
                    </div>
                )}

                {/* Keeps the text readable: dark shade for dark cards, white fade for light cards */}
                {c.media && (
                    <span
                        aria-hidden="true"
                        className={`pointer-events-none absolute inset-0 ${dark
                            ? "bg-[linear-gradient(to_top,rgba(6,16,38,0.8)_0%,rgba(6,16,38,0.28)_45%,transparent_72%)]"
                            : "bg-[linear-gradient(to_top,rgba(255,255,255,0.92)_0%,rgba(255,255,255,0.5)_40%,transparent_70%)]"
                            }`}
                    />
                )}

                {/* Text */}
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-5 p-[clamp(22px,2.2vw,34px)]">
                    <div className="min-w-0">
                        <h3 className="text-[clamp(26px,2.5vw,40px)] font-medium leading-[1.1] tracking-[-0.03em] [font-family:var(--font-heading)]">
                            {c.title}
                        </h3>
                        <p className={`mt-3 max-w-[34ch] text-[15px] leading-[1.6] ${dark ? "text-white/70" : "text-[#5d6987]"}`}>
                            {c.text}
                        </p>
                    </div>
                    <span
                        className={`grid h-12 w-12 shrink-0 place-items-center rounded-full border transition-colors duration-300 group-hover:border-[#0b57d0] group-hover:bg-[#0b57d0] group-hover:text-white ${dark ? "border-white/40 text-white" : "border-[#0b1b3a]/25 text-[#0b1b3a]"
                            }`}
                    >
                        <ArrowIcon />
                    </span>
                </div>
            </a>
        </li>
    );
}

/* ---------- Section ---------- */

export default function Work() {
    const sectionRef = useRef<HTMLElement>(null);
    const viewRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLOListElement>(null);

    useGSAP(
        () => {
            const section = sectionRef.current;
            const view = viewRef.current;
            const track = trackRef.current;
            if (!section || !view || !track) return;

            const q = gsap.utils.selector(section);
            const mm = gsap.matchMedia();

            mm.add(
                {
                    motion: "(prefers-reduced-motion: no-preference)",
                    pinned: "(min-width: 821px) and (min-height: 600px)",
                },
                (ctx) => {
                    const { motion, pinned } = ctx.conditions as { motion: boolean; pinned: boolean };
                    if (!motion) return;

                    const faces = q(".work-face") as HTMLElement[];

                    /* Heading: each line rises out of its mask */
                    gsap.set(q(".work-line"), { yPercent: 110 });
                    gsap.to(q(".work-line"), {
                        yPercent: 0,
                        duration: 1.1,
                        ease: "expo.out",
                        scrollTrigger: { trigger: q(".work-head")[0], start: "top 85%", once: true },
                    });

                    /* Small screens: normal sideways swipe, no pin. Cards slide in once. */
                    if (!pinned) {
                        gsap.from(faces, {
                            x: 70,
                            opacity: 0,
                            duration: 0.9,
                            stagger: 0.12,
                            ease: "power3.out",
                            scrollTrigger: { trigger: view, start: "top 88%", once: true },
                        });
                        return;
                    }

                    section.dataset.pin = "true";

                    /* ENTRANCE: as the section scrolls up, the cards rise from behind the bottom edge,
                       tilt into place and settle one after another. Finishes right before the pin starts. */
                    gsap.timeline({
                        scrollTrigger: {
                            trigger: section,
                            start: "top 92%",
                            end: "top 8%",
                            scrub: 0.8,
                            invalidateOnRefresh: true,
                        },
                    }).fromTo(
                        faces,
                        {
                            y: 220,
                            rotate: (i: number) => (i % 2 === 0 ? -5 : 5),
                            scale: 0.9,
                            opacity: 0,
                            transformOrigin: "50% 100%",
                        },
                        { y: 0, rotate: 0, scale: 1, opacity: 1, ease: "power3.out", stagger: 0.14 }
                    );

                    /* Scrolling down slides the cards sideways */
                    const dist = () => Math.max(0, track.offsetWidth - view.clientWidth);

                    const slide = gsap.to(track, {
                        x: () => -dist(),
                        ease: "none",
                        scrollTrigger: {
                            trigger: section,
                            start: "top top",
                            end: () => `+=${Math.round(dist() * 1.15)}`,
                            pin: true,
                            scrub: 0.7,
                            anticipatePin: 1,
                            invalidateOnRefresh: true,
                        },
                    });

                    // The image or video inside each card drifts a little against the slide
                    (q(".work-card") as HTMLElement[]).forEach((card) => {
                        const media = card.querySelector(".work-media");
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

                    return () => {
                        delete section.dataset.pin;
                    };
                }
            );

            return () => mm.revert();
        },
        { scope: sectionRef, dependencies: [] }
    );

    return (
        <>
            <section
                ref={sectionRef}
                id="work"
                className="group/work relative z-10 flex flex-col bg-white text-[#0b1b3a] data-[pin=true]:h-[100svh] data-[pin=true]:overflow-hidden"
            >
                <div className="work-head px-[4.4vw] pb-[clamp(12px,2vh,24px)] pt-[clamp(80px,12vw,140px)] group-data-[pin=true]/work:pt-[clamp(88px,12vh,120px)]">
                    <h2 className="text-[clamp(38px,4.8vw,76px)] font-bold leading-[1.02] tracking-[-0.04em]">
                        <span className="block overflow-hidden pb-[0.1em]">
                            <span className="work-line block">
                                Featured <span className="gradient-heading">Work.</span>
                            </span>
                        </span>
                    </h2>
                </div>

                <div
                    ref={viewRef}
                    className="relative min-h-0 flex-1 snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] group-data-[pin=true]/work:snap-none group-data-[pin=true]/work:overflow-hidden"
                >
                    <ol
                        ref={trackRef}
                        className="flex w-max items-center gap-4 pb-[clamp(36px,6vw,80px)] pl-[4.4vw] pr-[4.4vw] will-change-transform group-data-[pin=true]/work:h-full group-data-[pin=true]/work:pb-[clamp(16px,3vh,32px)] md:gap-5"
                    >
                        {CASES.map((c) => (
                            <CaseCard key={c.slug} c={c} />
                        ))}
                    </ol>
                </div>
            </section>
        </>
    );
}