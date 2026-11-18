import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { PROCESS_STEPS } from "../../data/process";
import { TECH_GROUPS, TECH_NOTE } from "../../data/technology";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const pad = (n: number) => String(n).padStart(2, "0");

export default function Technology() {
    const sectionRef = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            const section = sectionRef.current;
            if (!section) return;

            const q = gsap.utils.selector(section);
            const steps = q(".hw-step") as HTMLElement[];
            const stepsEl = q(".hw-steps")[0] as HTMLElement;
            const mm = gsap.matchMedia();

            mm.add(
                {
                    desktop: "(min-width: 821px)",
                    mobile: "(max-width: 820px)",
                    reduce: "(prefers-reduced-motion: reduce)",
                },
                (ctx) => {
                    const { desktop, reduce } = ctx.conditions as { desktop: boolean; reduce: boolean };
                    if (reduce) return;

                    /* ===== Arrival: the sheet widens into place, content lags behind ===== */
                    gsap.fromTo(
                        q(".tw-panel"),
                        { scale: 0.94, transformOrigin: "50% 0%" },
                        {
                            scale: 1,
                            ease: "none",
                            scrollTrigger: { trigger: section, start: "top 100%", end: "top 30%", scrub: true },
                        }
                    );
                    gsap.fromTo(
                        q(".tw-inner"),
                        { y: 70 },
                        {
                            y: 0,
                            ease: "none",
                            scrollTrigger: { trigger: section, start: "top 100%", end: "top 30%", scrub: true },
                        }
                    );

                    /* ===== How we work ===== */
                    gsap.set(q(".hw-line"), { yPercent: 110 });
                    gsap.to(q(".hw-line"), {
                        yPercent: 0,
                        duration: 1.1,
                        ease: "expo.out",
                        scrollTrigger: { trigger: q(".hw-head")[0], start: "top 92%", once: true },
                    });

                    gsap.set(q(".hw-dot"), { scale: 0 });
                    gsap.set(q(".hw-text"), { opacity: 0.35 });

                    if (desktop) {
                        // The line fills while scrolling and switches each step on when it reaches it
                        gsap.set(q(".hw-fill"), { scaleX: 0 });
                        const tl = gsap.timeline({
                            defaults: { ease: "none" },
                            scrollTrigger: {
                                trigger: stepsEl,
                                start: "top 80%",
                                end: "top 35%",
                                scrub: 0.5,
                                invalidateOnRefresh: true,
                            },
                        });
                        tl.to(q(".hw-fill"), { scaleX: 1, duration: 4 }, 0);
                        steps.forEach((s, i) => {
                            const dot = s.querySelector(".hw-dot");
                            if (!dot) return;
                            tl.to(dot, { scale: 1, duration: 0.3, ease: "back.out(2)" }, i).to(
                                s.querySelectorAll(".hw-text"),
                                { opacity: 1, duration: 0.3 },
                                i
                            );
                        });
                    } else {
                        // Mobile: vertical line, each step switches on when it reaches the screen
                        gsap.set(q(".hw-fill"), { scaleY: 0 });
                        gsap.to(q(".hw-fill"), {
                            scaleY: 1,
                            ease: "none",
                            scrollTrigger: { trigger: stepsEl, start: "top 70%", end: "bottom 70%", scrub: 0.4 },
                        });
                        steps.forEach((s) => {
                            const dot = s.querySelector(".hw-dot");
                            if (!dot) return;
                            const on = gsap.timeline({ paused: true });
                            on.to(dot, { scale: 1, duration: 0.4, ease: "back.out(2)" }, 0).to(
                                s.querySelectorAll(".hw-text"),
                                { opacity: 1, duration: 0.4 },
                                0
                            );
                            ScrollTrigger.create({
                                trigger: s,
                                start: "top 70%",
                                onEnter: () => on.play(),
                                onLeaveBack: () => on.reverse(),
                            });
                        });
                    }

                    /* ===== Divider draws itself ===== */
                    gsap.set(q(".tw-divider"), { scaleX: 0 });
                    gsap.to(q(".tw-divider"), {
                        scaleX: 1,
                        duration: 1.4,
                        ease: "power3.inOut",
                        scrollTrigger: { trigger: q(".tw-divider")[0], start: "top 92%", once: true },
                    });

                    /* ===== Technology ===== */
                    gsap.set(q(".tech-line"), { yPercent: 110 });
                    gsap.to(q(".tech-line"), {
                        yPercent: 0,
                        duration: 1,
                        stagger: 0.1,
                        ease: "expo.out",
                        scrollTrigger: { trigger: q(".tech-head")[0], start: "top 92%", once: true },
                    });

                    gsap.set(q(".tech-card"), { opacity: 0, y: 44 });
                    gsap.set(q(".tech-pill"), { opacity: 0, y: 10, scale: 0.92 });
                    gsap.set(q(".tech-note"), { opacity: 0 });

                    (q(".tech-card") as HTMLElement[]).forEach((card) => {
                        gsap.timeline({ scrollTrigger: { trigger: card, start: "top 90%", once: true } })
                            .to(card, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" }, 0)
                            .to(
                                card.querySelectorAll(".tech-pill"),
                                { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.05, ease: "power3.out" },
                                0.25
                            );
                    });

                    gsap.to(q(".tech-note"), {
                        opacity: 1,
                        duration: 0.8,
                        scrollTrigger: { trigger: q(".tech-note")[0], start: "top 98%", once: true },
                    });

                    return () => {};
                }
            );

            return () => mm.revert();
        },
        { scope: sectionRef, dependencies: [] }
    );

    return (
        <section
            ref={sectionRef}
            id="technology"
            className="relative z-20 -mt-[clamp(24px,4vw,64px)] text-[#0b1b3a]"
        >
            {/* Sheet: rounded top, soft glacier tint that fades into the page color */}
            <div
                aria-hidden="true"
                className="tw-panel pointer-events-none absolute inset-0 rounded-t-[clamp(28px,3.4vw,48px)] bg-[linear-gradient(180deg,#e8f0fb_0%,#f6f7fb_340px)] shadow-[0_-24px_60px_-30px_rgba(11,27,58,0.18)] will-change-transform"
            />

            <div className="tw-inner relative px-[4.4vw] pb-[clamp(70px,8vw,130px)] pt-[clamp(80px,9vw,140px)]">
                <div className="mx-auto max-w-[1600px]">
                    {/* ===== How we work ===== */}
                    <h2 className="hw-head text-[clamp(38px,4.8vw,76px)] font-bold leading-[1.02] tracking-[-0.04em]">
                        <span className="block overflow-hidden pb-[0.1em]">
                            <span className="hw-line block">
                                How we <span className="gradient-heading">work.</span>
                            </span>
                        </span>
                    </h2>

                    <div className="hw-steps relative mt-[clamp(40px,5vw,80px)] grid grid-cols-1 gap-12 min-[821px]:grid-cols-4 min-[821px]:gap-x-8">
                        <span
                            aria-hidden="true"
                            className="absolute bottom-0 left-[7px] top-0 w-px bg-[#0b1b3a]/10 min-[821px]:bottom-auto min-[821px]:left-0 min-[821px]:right-0 min-[821px]:top-[7px] min-[821px]:h-px min-[821px]:w-auto"
                        />
                        <span
                            aria-hidden="true"
                            className="hw-fill absolute bottom-0 left-[7px] top-0 w-px origin-top bg-[#0b57d0] min-[821px]:bottom-auto min-[821px]:left-0 min-[821px]:right-0 min-[821px]:top-[7px] min-[821px]:h-px min-[821px]:w-auto min-[821px]:origin-left"
                        />

                        {PROCESS_STEPS.map((s, i) => (
                            <div key={s.title} className="hw-step relative pl-10 min-[821px]:pl-0 min-[821px]:pt-10">
                                <span className="absolute left-0 top-1 block h-[15px] w-[15px] rounded-full border border-[#0b1b3a]/25 bg-[#eef3fb] min-[821px]:top-0">
                                    <span className="hw-dot absolute inset-[-1px] rounded-full bg-[#0b57d0]" />
                                </span>

                                <p className="hw-text font-mono text-[13px] tracking-[0.05em] text-[#5d6987]">
                                    {pad(i + 1)}
                                </p>
                                <h3 className="hw-text mt-3 text-[clamp(24px,2.3vw,36px)] font-medium leading-[1.1] tracking-[-0.03em]">
                                    {s.title}
                                </h3>
                                <p className="hw-text mt-3 max-w-[28ch] text-[15px] leading-[1.6] text-[#5d6987]">
                                    {s.text}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div aria-hidden="true" className="tw-divider my-[clamp(56px,7vw,110px)] h-px origin-left bg-[#0b1b3a]/10" />

                    {/* ===== Technology ===== */}
                    <h2 className="tech-head max-w-[900px] text-[clamp(28px,3.2vw,52px)] font-bold leading-[1.05] tracking-[-0.035em]">
                        <span className="block overflow-hidden pb-[0.1em]">
                            <span className="tech-line block">Technology that</span>
                        </span>
                        <span className="block overflow-hidden pb-[0.1em]">
                            <span className="tech-line gradient-heading block">adapts to your business.</span>
                        </span>
                    </h2>

                    <ul className="mt-[clamp(28px,3.5vw,52px)] grid gap-3.5 md:grid-cols-2 md:gap-4">
                        {TECH_GROUPS.map((g) => (
                            <li
                                key={g.title}
                                className="tech-card rounded-[24px] border border-[#0b1b3a]/10 bg-white/60 p-[clamp(20px,2.2vw,32px)]"
                            >
                                <h3 className="text-[clamp(19px,1.6vw,24px)] font-medium tracking-[-0.02em]">{g.title}</h3>
                                <ul className="mt-5 flex flex-wrap gap-2.5">
                                    {g.tools.map((t) => (
                                        <li
                                            key={t}
                                            className="tech-pill whitespace-nowrap rounded-full border border-[#0b1b3a]/20 bg-white/70 px-4 py-2.5 text-[14px] leading-none transition-colors duration-300 hover:border-[#0b57d0] hover:text-[#0b57d0]"
                                        >
                                            {t}
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ul>

                    <p className="tech-note mt-8 text-[13px] text-[#5d6987]">{TECH_NOTE}</p>
                </div>
            </div>
        </section>
    );
}