import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type ScrollCueProps = {
    // Becomes true when the loader reveals the site
    play: boolean;
};

// "Scroll" hint at the bottom-left of the hero. It fades away as soon as the page starts scrolling.
export default function ScrollCue({ play }: ScrollCueProps) {
    const outerRef = useRef<HTMLDivElement>(null);
    const innerRef = useRef<HTMLDivElement>(null);
    const barRef = useRef<HTMLSpanElement>(null);

    useGSAP(
        () => {
            gsap.set(innerRef.current, { opacity: 0, y: 24 });
        },
        { dependencies: [] }
    );

    useGSAP(
        () => {
            if (!play) return;
            const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

            gsap.to(innerRef.current, { opacity: 1, y: 0, duration: 1, delay: reduce ? 0 : 1.6, ease: "power3.out" });

            if (!reduce) {
                // A short bar keeps travelling down the line
                gsap.fromTo(
                    barRef.current,
                    { y: -24 },
                    { y: 56, duration: 1.5, ease: "power2.inOut", repeat: -1, repeatDelay: 0.3 }
                );
            }

            // Fade out as soon as the user scrolls
            gsap.to(outerRef.current, {
                opacity: 0,
                y: -12,
                ease: "none",
                scrollTrigger: { start: 0, end: 240, scrub: true },
            });
        },
        { dependencies: [play] }
    );

    return (
        <div
            ref={outerRef}
            aria-hidden="true"
            className="pointer-events-none fixed bottom-[clamp(16px,4vh,48px)] left-[4.4%] z-40 hidden md:block"
        >
            <div ref={innerRef} className="flex flex-col items-start gap-3">
                <span className="text-[11px] font-medium uppercase tracking-[0.24em] text-[#5d6987]">Scroll</span>
                <span className="relative block h-14 w-px overflow-hidden bg-[#0b1b3a]/15">
                    <span ref={barRef} className="absolute left-0 top-0 block h-6 w-px bg-[#0b57d0]" />
                </span>
            </div>
        </div>
    );
}