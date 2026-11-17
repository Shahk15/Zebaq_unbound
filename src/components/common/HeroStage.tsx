import { useRef } from "react";
import type { ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type HeroStageProps = {
    children: ReactNode;
};

/*
  Wraps the hero. While the next section slides up over it, the hero stays in place
  and slowly recedes (scales down, drifts up, fades out).
*/
export default function HeroStage({ children }: HeroStageProps) {
    const stageRef = useRef<HTMLDivElement>(null);
    const innerRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const stage = stageRef.current;
            const inner = innerRef.current;
            if (!stage || !inner) return;

            const mm = gsap.matchMedia();

            mm.add("(min-width: 821px) and (prefers-reduced-motion: no-preference)", () => {
                // Hero stays pinned; no extra spacing so the next section scrolls over it
                ScrollTrigger.create({
                    trigger: stage,
                    start: "top top",
                    end: "bottom top",
                    pin: true,
                    pinSpacing: false,
                    anticipatePin: 1,
                    refreshPriority: 2,
                });

                gsap.to(inner, {
                    scale: 0.92,
                    yPercent: -5,
                    opacity: 0.2,
                    transformOrigin: "50% 0%",
                    ease: "none",
                    scrollTrigger: {
                        trigger: stage,
                        start: "top top",
                        end: "bottom top",
                        scrub: true,
                    },
                });
            });

            return () => mm.revert();
        },
        { scope: stageRef, dependencies: [] }
    );

    return (
        <div ref={stageRef}>
            <div ref={innerRef} className="will-change-transform">
                {children}
            </div>
        </div>
    );
}