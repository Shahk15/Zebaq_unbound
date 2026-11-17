import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// Thin line at the top of the screen that fills as the page scrolls
export default function ScrollProgress() {
    const barRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const bar = barRef.current;
            if (!bar) return;

            gsap.set(bar, { scaleX: 0, transformOrigin: "0% 50%" });
            gsap.to(bar, {
                scaleX: 1,
                ease: "none",
                scrollTrigger: { start: 0, end: "max", scrub: 0.3 },
            });
        },
        { dependencies: [] }
    );

    return (
        <div aria-hidden="true" className="pointer-events-none fixed inset-x-0 top-0 z-[80] h-[3px]">
            <div ref={barRef} className="h-full bg-[#0b57d0]" />
        </div>
    );
}