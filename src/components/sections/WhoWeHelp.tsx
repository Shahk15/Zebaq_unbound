import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* ------------------------------------------------------------------ */
/*  Content (short and clear, everything shows inside the card)         */
/* ------------------------------------------------------------------ */

const AUDIENCES = [
    {
        number: "01",
        eyebrow: "For growing organisations",
        title: "B2B Companies",
        subtitle: "Build a digital foundation for sustainable growth.",
        points: ["Digital Strategy & Web", "Lead Generation", "SEO, GEO, AEO & AI"],
        outcome: "Build credibility. Generate opportunities. Scale confidently.",
        from: "#004c94",
        to: "#0b57d0",
    },
    {
        number: "02",
        eyebrow: "For customer-focused brands",
        title: "Service Businesses",
        subtitle: "Turn visibility into meaningful customer enquiries.",
        points: ["Local SEO & Visibility", "Social & Performance Marketing", "Websites & Lead Systems"],
        outcome: "Get discovered. Win customer trust. Grow consistently.",
        from: "#0b57d0",
        to: "#4d94e6",
    },
    {
        number: "03",
        eyebrow: "For experts and specialists",
        title: "Consultants & Professional Firms",
        subtitle: "Turn your expertise into a stronger digital reputation.",
        points: ["Brand Positioning", "Authority & Search", "AI-Ready Websites"],
        outcome: "Establish authority. Earn trust. Attract better clients.",
        from: "#0f6bbf",
        to: "#7fb6ee",
    },
];

const TOTAL = AUDIENCES.length;

// Arrival: a soft circle of colour opens from the top edge and fills the section
const REVEAL_FROM = "circle(22% at 50% 0%)";
const REVEAL_TO = "circle(150% at 50% 0%)";

const clamp = (x: number, a: number, b: number) => Math.min(b, Math.max(a, x));

function Arrow({ direction = "right" }: { direction?: "left" | "right" }) {
    return (
        <svg viewBox="0 0 24 24" fill="none" className="h-[18px] w-[18px]" aria-hidden="true">
            <path
                d={direction === "right" ? "M5 12h14m-7-7 7 7-7 7" : "M19 12H5m7 7-7-7 7-7"}
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

/* ------------------------------------------------------------------ */
/*  Card: quiet, typographic, everything lives inside                   */
/* ------------------------------------------------------------------ */

function Check({ color }: { color: string }) {
    return (
        <svg
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
            className="h-[max(13px,4cqw)] w-[max(13px,4cqw)] shrink-0"
        >
            <circle cx="8" cy="8" r="7.25" stroke={color} strokeOpacity="0.35" strokeWidth="1" />
            <path d="M5 8.2l2 2 4-4.4" stroke={color} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

function Card({ item, active }: { item: (typeof AUDIENCES)[number]; active: boolean }) {
    return (
        <div className="relative h-full rounded-[28px] bg-[#0b1b3a]/10 p-[1.5px] shadow-[0_30px_70px_-40px_rgba(11,27,58,0.35)]">
            {/* Blue ring: always on when not pinned, only on the active card when pinned */}
            <span
                aria-hidden="true"
                data-on={active}
                className="absolute inset-0 rounded-[28px] opacity-100 transition-opacity duration-500 group-data-[pin=true]/wwh:opacity-0 group-data-[pin=true]/wwh:data-[on=true]:opacity-100"
                style={{ backgroundImage: `linear-gradient(160deg, ${item.from}, ${item.to})` }}
            />

            <article className="relative flex h-full w-full flex-col justify-between rounded-[26.5px] bg-white p-[7.5cqw]">
                {/* Title block */}
                <div>
                    <div className="flex items-center justify-between gap-3 text-[max(11px,3.3cqw)] text-[#8792a9]">
                        <span>{item.eyebrow}</span>
                        <span className="font-medium tabular-nums" style={{ color: item.from }}>
                            {item.number}
                        </span>
                    </div>

                    <h3 className="mt-[7cqw] text-[max(24px,8.6cqw)] font-semibold leading-[1.04] tracking-[-0.045em] text-[#0b1b3a] [font-family:var(--font-heading)]">
                        {item.title}
                    </h3>

                    <p className="mt-[3cqw] text-[max(13px,3.9cqw)] leading-[1.45] text-[#5d6987]">
                        {item.subtitle}
                    </p>
                </div>

                {/* Three points, hairline rows */}
                <ul className="border-t border-[#0b1b3a]/10">
                    {item.points.map((point) => (
                        <li
                            key={point}
                            className="flex items-center gap-[3cqw] border-b border-[#0b1b3a]/10 py-[2.6cqw] text-[max(12px,3.7cqw)] font-medium text-[#0b1b3a]"
                        >
                            <Check color={item.from} />
                            {point}
                        </li>
                    ))}
                </ul>

                {/* Outcome + action */}
                <div className="flex items-end justify-between gap-[4cqw]">
                    <p className="max-w-[26ch] text-[max(12px,3.5cqw)] font-semibold leading-[1.4] text-[#0b1b3a]">
                        {item.outcome}
                    </p>
                    <a
                        href="#contact"
                        aria-label="Let's grow together"
                        title="Let's grow together"
                        onClick={(e) => e.stopPropagation()}
                        className="grid h-[max(38px,10cqw)] w-[max(38px,10cqw)] shrink-0 place-items-center rounded-full border border-[#0b1b3a]/20 text-[#0b1b3a] transition-colors duration-300 hover:border-[#0b57d0] hover:bg-[#0b57d0] hover:text-white"
                    >
                        <Arrow />
                    </a>
                </div>
            </article>
        </div>
    );
}

/* ------------------------------------------------------------------ */
/*  Section                                                            */
/* ------------------------------------------------------------------ */

export default function WhoWeHelp() {
    const sectionRef = useRef<HTMLElement>(null);
    const stageRef = useRef<HTMLDivElement>(null);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
    const triggerRef = useRef<ScrollTrigger | null>(null);
    const activeRef = useRef(0);

    const [activeIndex, setActiveIndex] = useState(0);

    const updateActive = (index: number) => {
        const next = clamp(index, 0, TOTAL - 1);
        if (activeRef.current === next) return;
        activeRef.current = next;
        setActiveIndex(next);
    };

    useGSAP(
        () => {
            const section = sectionRef.current;
            const stage = stageRef.current;
            if (!section || !stage) return;

            const cards = cardRefs.current.filter((c): c is HTMLDivElement => c !== null);
            if (cards.length !== TOTAL) return;

            const q = gsap.utils.selector(section);
            const mm = gsap.matchMedia();

            /* ---------- Arrival: a soft circle of colour opens across the section ---------- */
            mm.add("(prefers-reduced-motion: no-preference)", () => {
                gsap.fromTo(
                    q(".wwh-panel"),
                    { clipPath: REVEAL_FROM },
                    {
                        clipPath: REVEAL_TO,
                        ease: "none",
                        scrollTrigger: { trigger: section, start: "top 95%", end: "top 15%", scrub: 1 },
                    }
                );
            });

            /* ---------- Desktop: pinned, scroll moves the active card to the centre ---------- */
            mm.add("(min-width: 821px) and (prefers-reduced-motion: no-preference)", () => {
                section.dataset.pin = "true";

                const proxy = { position: 0 };
                const intro = { value: 0 }; // 0 = all cards stacked and hidden, 1 = fanned out

                const getStep = () => Math.min(cards[0].offsetWidth * 1.04, window.innerWidth * 0.36);

                const renderCards = (position: number) => {
                    const step = getStep();

                    cards.forEach((card, index) => {
                        // Circular distance, so there is always a card on both sides of the active one
                        const d = gsap.utils.wrap(-TOTAL / 2, TOTAL / 2, index - position);
                        const a = Math.abs(d);

                        const scale = a <= 1 ? 1 - 0.28 * a : 0.72 - (0.12 * (a - 1)) / 0.5;
                        const opacity = a <= 1 ? 1 - 0.45 * a : (0.55 * (TOTAL / 2 - a)) / 0.5;

                        gsap.set(card, {
                            xPercent: -50,
                            yPercent: -50,
                            x: d * step * intro.value,
                            y: (1 - intro.value) * 70,
                            scale: scale * (0.8 + 0.2 * intro.value),
                            opacity: clamp(opacity, 0, 1) * intro.value,
                            rotateY: clamp(d, -1.5, 1.5) * -9,
                            zIndex: Math.round(10 - a * 5),
                        });
                    });
                };

                renderCards(0);

                const progressTween = gsap.to(proxy, {
                    position: TOTAL - 1,
                    ease: "none",
                    scrollTrigger: {
                        trigger: stage,
                        start: "top 96px",
                        end: () => `+=${window.innerHeight * 1.8}`,
                        pin: true,
                        scrub: 0.8,
                        anticipatePin: 1,
                        invalidateOnRefresh: true,
                        snap: {
                            snapTo: 1 / (TOTAL - 1),
                            duration: { min: 0.25, max: 0.55 },
                            ease: "power2.out",
                        },
                    },
                    onUpdate: () => {
                        renderCards(proxy.position);
                        updateActive(Math.round(proxy.position));
                    },
                });

                triggerRef.current = progressTween.scrollTrigger as ScrollTrigger;

                /* Entrance, tied to scroll (not "once"), so the state is always right
                   even after a refresh or a resize: heading rises, then cards fan out */
                gsap.fromTo(
                    q(".wwh-line"),
                    { yPercent: 110 },
                    {
                        yPercent: 0,
                        ease: "power3.out",
                        stagger: 0.2,
                        scrollTrigger: { trigger: section, start: "top 85%", end: "top 35%", scrub: 0.6 },
                    }
                );

                gsap.fromTo(
                    intro,
                    { value: 0 },
                    {
                        value: 1,
                        ease: "power2.out",
                        onUpdate: () => renderCards(proxy.position),
                        scrollTrigger: { trigger: stage, start: "top 100%", end: "top 55%", scrub: 0.6 },
                    }
                );

                requestAnimationFrame(() => ScrollTrigger.refresh());

                return () => {
                    progressTween.scrollTrigger?.kill();
                    progressTween.kill();
                    triggerRef.current = null;
                    gsap.set(cards, { clearProps: "all" });
                    delete section.dataset.pin;
                };
            });

            /* ---------- Mobile: normal flow, things rise in as you scroll ---------- */
            mm.add("(max-width: 820px) and (prefers-reduced-motion: no-preference)", () => {
                const els = q(".wwh-card");
                gsap.set(els, { opacity: 0, y: 28 });
                ScrollTrigger.batch(els, {
                    start: "top 92%",
                    once: true,
                    onEnter: (batch) =>
                        gsap.to(batch, { opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: "power3.out", overwrite: true }),
                });
            });

            return () => mm.revert();
        },
        { scope: sectionRef }
    );

    const goToSlide = (index: number) => {
        const next = clamp(index, 0, TOTAL - 1);
        const trigger = triggerRef.current;
        const pinned = sectionRef.current?.dataset.pin === "true";

        if (trigger && pinned) {
            const progress = next / (TOTAL - 1);
            window.scrollTo({
                top: trigger.start + progress * (trigger.end - trigger.start),
                behavior: "smooth",
            });
        } else {
            cardRefs.current[next]?.scrollIntoView({ behavior: "smooth", block: "center" });
            updateActive(next);
        }
    };

    return (
        <section
            ref={sectionRef}
            id="who-we-help"
            className="group/wwh relative z-10 overflow-hidden pb-[clamp(50px,6vw,90px)] text-[#0b1b3a]"
        >
            {/* Plain, quiet background that opens as a circle on arrival */}
            <div
                aria-hidden="true"
                className="wwh-panel pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#e9effa_0%,#f6f7fb_100%)] will-change-[clip-path]"
            />

            <div className="relative mx-auto max-w-[1600px]">
                {/* Heading: same system as Impact and Clients */}
                <div className="mb-10 px-[4.4vw] pt-[clamp(75px,9vw,120px)] md:mb-14">
                    <h2 className="max-w-[850px] text-[clamp(42px,6.2vw,84px)] font-bold leading-[0.98] tracking-[-0.055em] text-[#0b1b3a]">
                        <span className="block overflow-hidden pb-[0.1em]">
                            <span className="wwh-line block">Different businesses.</span>
                        </span>
                        <span className="block overflow-hidden pb-[0.1em]">
                            <span className="wwh-line gradient-heading block">One growth partner.</span>
                        </span>
                    </h2>
                </div>

                {/* Stage: this block is what pins while the cards change */}
                <div
                    ref={stageRef}
                    className="relative [--cw:clamp(280px,min(31vw,calc((100svh_-_190px)_*_0.8333)),480px)]"
                >
                    <div className="relative grid gap-5 px-[4.4vw] [perspective:1600px] group-data-[pin=true]/wwh:block group-data-[pin=true]/wwh:h-[calc(var(--cw)_*_1.2)] group-data-[pin=true]/wwh:px-0">
                        {AUDIENCES.map((item, index) => (
                            <div
                                key={item.number}
                                ref={(el) => {
                                    cardRefs.current[index] = el;
                                }}
                                onClick={() => {
                                    if (sectionRef.current?.dataset.pin === "true") goToSlide(index);
                                }}
                                className="wwh-card relative mx-auto aspect-[5/6] w-full max-w-[400px] [container-type:inline-size] will-change-transform group-data-[pin=true]/wwh:absolute group-data-[pin=true]/wwh:left-1/2 group-data-[pin=true]/wwh:top-1/2 group-data-[pin=true]/wwh:mx-0 group-data-[pin=true]/wwh:h-[calc(var(--cw)_*_1.2)] group-data-[pin=true]/wwh:w-[var(--cw)] group-data-[pin=true]/wwh:max-w-none group-data-[pin=true]/wwh:cursor-pointer"
                            >
                                <Card item={item} active={activeIndex === index} />
                            </div>
                        ))}

                        {/* Arrows (pinned mode only) */}
                        <button
                            type="button"
                            onClick={() => goToSlide(activeIndex - 1)}
                            disabled={activeIndex === 0}
                            aria-label="Previous"
                            className="absolute left-[4.4vw] top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-[#0b1b3a]/15 bg-white text-[#0b1b3a] transition-all duration-300 hover:border-[#0b57d0] hover:bg-[#0b57d0] hover:text-white disabled:pointer-events-none disabled:opacity-30 group-data-[pin=true]/wwh:grid"
                        >
                            <Arrow direction="left" />
                        </button>
                        <button
                            type="button"
                            onClick={() => goToSlide(activeIndex + 1)}
                            disabled={activeIndex === TOTAL - 1}
                            aria-label="Next"
                            className="absolute right-[4.4vw] top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-[#0b1b3a]/15 bg-white text-[#0b1b3a] transition-all duration-300 hover:border-[#0b57d0] hover:bg-[#0b57d0] hover:text-white disabled:pointer-events-none disabled:opacity-30 group-data-[pin=true]/wwh:grid"
                        >
                            <Arrow />
                        </button>
                    </div>

                    {/* Dots */}
                    <div className="mt-6 hidden items-center justify-center gap-2 group-data-[pin=true]/wwh:flex">
                        {AUDIENCES.map((item, index) => (
                            <button
                                key={item.number}
                                type="button"
                                onClick={() => goToSlide(index)}
                                aria-label={`Go to ${item.title}`}
                                aria-current={activeIndex === index ? "step" : undefined}
                                className={`h-[5px] rounded-full transition-all duration-300 ${activeIndex === index ? "w-8 bg-[#0b57d0]" : "w-2 bg-[#0b1b3a]/20 hover:bg-[#0b57d0]/50"
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}