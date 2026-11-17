import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const HEADING = "From first idea to lasting growth.";

// Edit these freely
const STEPS = [
    {
        title: "Discover",
        text: "We study your business, your audience and your competition to find where the real opportunity is.",
        tags: ["Research", "Audit", "Roadmap"],
    },
    {
        title: "Design",
        text: "Strategy turns into a clear brand, interface and message that people remember.",
        tags: ["Brand", "UI / UX", "Messaging"],
    },
    {
        title: "Build",
        text: "Fast, clean and scalable websites, systems and campaigns, built and tested with care.",
        tags: ["Development", "Automation", "Testing"],
    },
    {
        title: "Grow",
        text: "We launch, measure and keep improving, so results compound over time.",
        tags: ["Launch", "Analytics", "Optimization"],
    },
];

export default function Process() {
    const sectionRef = useRef<HTMLElement>(null);
    const listRef = useRef<HTMLOListElement>(null);

    useGSAP(
        () => {
            const section = sectionRef.current;
            const list = listRef.current;
            if (!section || !list) return;

            if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

            // Heading words rise out of their masks
            gsap.from(".pr-word", {
                yPercent: 110,
                duration: 1.1,
                stagger: 0.08,
                ease: "expo.out",
                scrollTrigger: { trigger: ".pr-heading", start: "top 80%", once: true },
            });
            gsap.from(".pr-intro", {
                opacity: 0,
                y: 24,
                duration: 0.9,
                delay: 0.3,
                ease: "power3.out",
                scrollTrigger: { trigger: ".pr-heading", start: "top 80%", once: true },
            });

            // The rail fills as you scroll through the steps
            gsap.fromTo(
                ".pr-line",
                { scaleY: 0, transformOrigin: "50% 0%" },
                {
                    scaleY: 1,
                    ease: "none",
                    scrollTrigger: { trigger: list, start: "top 65%", end: "bottom 60%", scrub: true },
                }
            );

            // Each step fades up, and its number turns blue when it reaches the middle
            gsap.utils.toArray<HTMLElement>(".pr-step", list).forEach((step) => {
                const body = step.querySelector(".pr-body");
                const node = step.querySelector(".pr-node");

                gsap.fromTo(
                    body,
                    { opacity: 0.25, y: 40 },
                    {
                        opacity: 1,
                        y: 0,
                        ease: "none",
                        scrollTrigger: { trigger: step, start: "top 82%", end: "top 52%", scrub: true },
                    }
                );

                gsap.to(node, {
                    backgroundColor: "#0b57d0",
                    borderColor: "#0b57d0",
                    color: "#ffffff",
                    scale: 1.12,
                    duration: 0.4,
                    ease: "power2.out",
                    scrollTrigger: { trigger: step, start: "top 60%", toggleActions: "play none none reverse" },
                });
            });
        },
        { scope: sectionRef, dependencies: [] }
    );

    return (
        <section ref={sectionRef} id="process" className="relative bg-[#f6f7fb] py-[clamp(90px,12vw,160px)]">
            <div className="mx-auto grid max-w-[1600px] gap-14 px-[4.4vw] lg:grid-cols-12 lg:gap-10">
                {/* Left: heading stays in place while the steps scroll */}
                <div className="lg:col-span-5">
                    <div className="lg:sticky lg:top-[20vh]">
                        <h2 className="pr-heading max-w-[11ch] text-[clamp(38px,5.4vw,84px)] font-bold leading-[1] tracking-[-0.05em] text-[#0b1b3a]">
                            <span className="sr-only">{HEADING}</span>
                            <span aria-hidden="true">
                                {HEADING.split(" ").map((w, i) => (
                                    <span
                                        key={i}
                                        className="-mb-[0.12em] mr-[0.22em] inline-block overflow-hidden pb-[0.12em] align-top"
                                    >
                                        <span className="pr-word inline-block">{w}</span>
                                    </span>
                                ))}
                            </span>
                        </h2>
                        <p className="pr-intro mt-6 max-w-[34ch] text-[15px] leading-[1.7] text-[#5d6987]">
                            A clear, repeatable process, so you always know what is happening and what comes next.
                        </p>
                    </div>
                </div>

                {/* Right: steps on a rail */}
                <ol ref={listRef} className="relative lg:col-span-7">
                    <span aria-hidden="true" className="absolute left-5 top-2 h-[calc(100%-1rem)] w-px bg-[#0b1b3a]/10" />
                    <span aria-hidden="true" className="pr-line absolute left-5 top-2 h-[calc(100%-1rem)] w-px bg-[#0b57d0]" />

                    {STEPS.map((s, i) => (
                        <li key={s.title} className="pr-step relative pb-[clamp(56px,9vw,130px)] pl-16 last:pb-0">
                            <span className="pr-node absolute left-0 top-0 grid h-10 w-10 place-items-center rounded-full border border-[#0b1b3a]/20 bg-white font-mono text-xs text-[#0b1b3a]/60">
                                {String(i + 1).padStart(2, "0")}
                            </span>

                            <div className="pr-body">
                                <h3 className="text-[clamp(30px,3.6vw,56px)] font-medium leading-[1.05] tracking-[-0.035em] text-[#0b1b3a]">
                                    {s.title}
                                </h3>
                                <p className="mt-4 max-w-[46ch] text-[16px] leading-[1.7] text-[#5d6987]">{s.text}</p>
                                <ul className="mt-6 flex flex-wrap gap-2.5">
                                    {s.tags.map((t) => (
                                        <li
                                            key={t}
                                            className="whitespace-nowrap rounded-full border border-[#0b1b3a]/20 px-3.5 py-[7px] text-[13px] leading-none"
                                        >
                                            {t}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    );
}