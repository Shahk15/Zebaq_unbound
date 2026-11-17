import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const WORDS = [
    { text: "Innovate", style: "text-white" },
    { text: "Build", style: "text-transparent [-webkit-text-stroke:2px_#ffffff]" },
    { text: "Grow", style: "text-[#4da3ff]" },
];

function Star() {
    return (
        <svg
            viewBox="0 0 24 24"
            className="h-[clamp(28px,4.5vw,64px)] w-[clamp(28px,4.5vw,64px)] shrink-0 animate-spin text-[#4da3ff] [animation-duration:14s]"
            fill="currentColor"
            aria-hidden="true"
        >
            <path d="M12 0l2.2 7.8L22 5.5l-5.2 6.5L22 18.5l-7.8-2.3L12 24l-2.2-7.8L2 18.5l5.2-6.5L2 5.5l7.8 2.3L12 0z" />
        </svg>
    );
}

// One copy of the line: the words twice so a single copy is always wider than the screen
function Line() {
    return (
        <div className="flex shrink-0 items-center gap-[clamp(24px,4vw,64px)] pr-[clamp(24px,4vw,64px)]">
            {[0, 1].map((round) =>
                WORDS.map((w) => (
                    <div key={`${round}-${w.text}`} className="flex items-center gap-[clamp(24px,4vw,64px)]">
                        <span
                            className={`text-[clamp(56px,11vw,180px)] font-bold leading-none tracking-[-0.04em] ${w.style}`}
                        >
                            {w.text}
                        </span>
                        <Star />
                    </div>
                ))
            )}
        </div>
    );
}

export default function MarqueeBand() {
    const sectionRef = useRef<HTMLElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const track = trackRef.current;
            const section = sectionRef.current;
            if (!track || !section) return;

            if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

            const loop = gsap.fromTo(
                track,
                { xPercent: 0 },
                { xPercent: -50, duration: 34, ease: "none", repeat: -1 }
            );
            const skewTo = gsap.quickTo(track, "skewX", { duration: 0.5, ease: "power3" });

            // Scrolling speeds the band up, scrolling up reverses it, and it skews with the speed
            let lastY = window.scrollY;
            let dir = 1;
            let speed = 1;
            const tick = () => {
                const y = window.scrollY;
                const d = y - lastY;
                lastY = y;
                if (d !== 0) dir = d > 0 ? 1 : -1;
                const target = d === 0 ? 1 : dir * (1 + Math.min(Math.abs(d) / 8, 7));
                speed += (target - speed) * 0.08;
                loop.timeScale(speed);
                skewTo(gsap.utils.clamp(-8, 8, -d * 0.2));
            };
            gsap.ticker.add(tick);

            // Only run while the band is on screen
            const trigger = ScrollTrigger.create({
                trigger: section,
                start: "top bottom",
                end: "bottom top",
                onToggle: (self) => (self.isActive ? loop.resume() : loop.pause()),
            });

            return () => {
                gsap.ticker.remove(tick);
                trigger.kill();
                loop.kill();
            };
        },
        { scope: sectionRef, dependencies: [] }
    );

    return (
        <section
            ref={sectionRef}
            aria-label="Innovate. Build. Grow."
            className="relative overflow-hidden bg-[#0b1b3a] py-[clamp(28px,4vw,56px)]"
        >
            <div className="[mask-image:linear-gradient(to_right,transparent,#000_6%,#000_94%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,#000_6%,#000_94%,transparent)]">
                <div ref={trackRef} aria-hidden="true" className="flex w-max items-center will-change-transform">
                    <Line />
                    <Line />
                </div>
            </div>
        </section>
    );
}