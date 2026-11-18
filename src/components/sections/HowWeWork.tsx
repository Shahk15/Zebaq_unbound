import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { PROCESS_STEPS } from "../../data/process";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const pad = (n: number) => String(n).padStart(2, "0");

export default function HowWeWork() {
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

                    // Heading line rises out of its mask
                    gsap.set(q(".hw-line"), { yPercent: 110 });
                    gsap.to(q(".hw-line"), {
                        yPercent: 0,
                        duration: 1.1,
                        ease: "expo.out",
                        scrollTrigger: { trigger: q(".hw-head")[0], start: "top 85%", once: true },
                    });

                    // Start state: every step is switched off
                    gsap.set(q(".hw-dot"), { scale: 0 });
                    gsap.set(q(".hw-text"), { opacity: 0.35 });

                    if (desktop) {
                        // The line fills while scrolling and switches each step on when it reaches it
                        gsap.set(q(".hw-fill"), { scaleX: 0 });
                        const tl = gsap.timeline({
                            defaults: { ease: "none" },
                            scrollTrigger: {
                                trigger: stepsEl,
                                start: "top 78%",
                                end: "top 32%",
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
                }
            );

            return () => mm.revert();
        },
        { scope: sectionRef, dependencies: [] }
    );

    return (
        <section
            ref={sectionRef}
            id="how-we-work"
            className="relative z-10 bg-white px-[4.4vw] py-[clamp(70px,8vw,130px)] text-[#0b1b3a]"
        >
            <div className="mx-auto max-w-[1600px]">
                <h2 className="hw-head text-[clamp(38px,4.8vw,76px)] font-bold leading-[1.02] tracking-[-0.04em]">
                    <span className="block overflow-hidden pb-[0.1em]">
                        <span className="hw-line block">
                            How we <span className="gradient-heading">work.</span>
                        </span>
                    </span>
                </h2>

                <div className="hw-steps relative mt-[clamp(40px,6vw,90px)] grid grid-cols-1 gap-12 min-[821px]:grid-cols-4 min-[821px]:gap-x-8">
                    {/* Base line and the blue line that fills */}
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
                            <span className="absolute left-0 top-1 block h-[15px] w-[15px] rounded-full border border-[#0b1b3a]/25 bg-white min-[821px]:top-0">
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
            </div>
        </section>
    );
}