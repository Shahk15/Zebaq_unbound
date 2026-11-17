import { useRef } from "react";
import type { ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Variant = "frame" | "iris";

type SectionRevealProps = {
    id?: string;
    variant?: Variant;
    // Background of the section (color or gradient), as Tailwind classes
    panelClassName?: string;
    // Classes for the content wrapper (padding etc.)
    className?: string;
    children: ReactNode;
};

/*
  Scroll-driven section entrance.
  - frame: the section starts as a small rounded card and expands to full-bleed
  - iris : the section opens like a dome from the top center
  Both the background and the content are clipped by the same shape, and the content
  rises a little slower than the frame for depth.
*/
const CLIPS: Record<Variant, { from: string; to: string }> = {
    frame: { from: "inset(9% 6% 0% 6% round 56px)", to: "inset(0% 0% 0% 0% round 0px)" },
    iris: { from: "circle(0% at 50% 0%)", to: "circle(150% at 50% 0%)" },
};

export default function SectionReveal({
    id,
    variant = "frame",
    panelClassName = "bg-[#f6f7fb]",
    className = "",
    children,
}: SectionRevealProps) {
    const rootRef = useRef<HTMLElement>(null);
    const frameRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const root = rootRef.current;
            const frame = frameRef.current;
            const content = contentRef.current;
            if (!root || !frame || !content) return;

            const { from, to } = CLIPS[variant];
            const mm = gsap.matchMedia();

            mm.add("(prefers-reduced-motion: no-preference)", () => {
                // The shape opens while the section travels up the screen
                gsap.fromTo(
                    frame,
                    { clipPath: from },
                    {
                        clipPath: to,
                        ease: "none",
                        scrollTrigger: { trigger: root, start: "top 92%", end: "top 6%", scrub: true },
                    }
                );

                // Content lags behind the frame, then settles
                gsap.fromTo(
                    content,
                    { y: 90 },
                    {
                        y: 0,
                        ease: "none",
                        scrollTrigger: { trigger: root, start: "top bottom", end: "top 25%", scrub: true },
                    }
                );
            });

            mm.add("(prefers-reduced-motion: reduce)", () => {
                gsap.set(frame, { clipPath: to });
            });

            return () => mm.revert();
        },
        { scope: rootRef, dependencies: [variant] }
    );

    return (
        <section ref={rootRef} id={id} className="relative">
            <div ref={frameRef} className="relative will-change-[clip-path]">
                <div aria-hidden="true" className={`absolute inset-0 ${panelClassName}`} />
                <div ref={contentRef} className={`relative will-change-transform ${className}`}>
                    {children}
                </div>
            </div>
        </section>
    );
}