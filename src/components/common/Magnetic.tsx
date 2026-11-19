import { useRef } from "react";
import type { ReactNode } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

type MagneticProps = {
    children: ReactNode;
    strength?: number; // how far it follows the mouse (0.2 = subtle, 0.5 = strong)
    className?: string;
};

// Wrap a button: it gets pulled slightly toward the mouse and springs back on leave
export default function Magnetic({ children, strength = 0.3, className = "" }: MagneticProps) {
    const ref = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const el = ref.current;
            if (!el) return;

            const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
            const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
            if (!fine || reduce) return;

            const xTo = gsap.quickTo(el, "x", { duration: 0.8, ease: "elastic.out(1, 0.4)" });
            const yTo = gsap.quickTo(el, "y", { duration: 0.8, ease: "elastic.out(1, 0.4)" });

            let cx = 0;
            let cy = 0;
            const onEnter = () => {
                // Measure the resting center once, so the pull does not feed back on itself
                const r = el.getBoundingClientRect();
                cx = r.left + r.width / 2 - (Number(gsap.getProperty(el, "x")) || 0);
                cy = r.top + r.height / 2 - (Number(gsap.getProperty(el, "y")) || 0);
            };
            const onMove = (e: PointerEvent) => {
                xTo((e.clientX - cx) * strength);
                yTo((e.clientY - cy) * strength);
            };
            const onLeave = () => {
                xTo(0);
                yTo(0);
            };

            el.addEventListener("pointerenter", onEnter);
            el.addEventListener("pointermove", onMove);
            el.addEventListener("pointerleave", onLeave);

            return () => {
                el.removeEventListener("pointerenter", onEnter);
                el.removeEventListener("pointermove", onMove);
                el.removeEventListener("pointerleave", onLeave);
            };
        },
        { scope: ref, dependencies: [strength] }
    );

    return (
        <div ref={ref} className={`inline-block ${className}`}>
            {children}
        </div>
    );
}