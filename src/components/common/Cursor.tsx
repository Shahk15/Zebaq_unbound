import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

/*
  Custom cursor: a small dot plus a ring that follows with a delay.
  - Hover a link or button: the ring grows and gets a soft fill.
  - Add data-cursor="View" to any element: the ring grows more and shows that label.
  Only active on devices with a mouse (not on touch screens).
*/
export default function Cursor() {
    const rootRef = useRef<HTMLDivElement>(null);
    const dotRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);
    const labelRef = useRef<HTMLSpanElement>(null);

    useGSAP(
        () => {
            const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
            const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
            const root = rootRef.current;
            const dot = dotRef.current;
            const ring = ringRef.current;
            const label = labelRef.current;
            if (!fine || reduce || !root || !dot || !ring || !label) return;

            document.documentElement.classList.add("has-custom-cursor");

            gsap.set([dot, ring], { xPercent: -50, yPercent: -50, x: -100, y: -100 });
            gsap.set(root, { opacity: 0 });

            const dotX = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power3" });
            const dotY = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power3" });
            const ringX = gsap.quickTo(ring, "x", { duration: 0.55, ease: "power3" });
            const ringY = gsap.quickTo(ring, "y", { duration: 0.55, ease: "power3" });

            let visible = false;
            const show = () => {
                if (visible) return;
                visible = true;
                gsap.to(root, { opacity: 1, duration: 0.3 });
            };
            const hide = () => {
                visible = false;
                gsap.to(root, { opacity: 0, duration: 0.3 });
            };

            const setState = (size: number, bg: string, text: string, dotScale: number) => {
                label.textContent = text;
                gsap.to(ring, { width: size, height: size, backgroundColor: bg, duration: 0.4, ease: "power3.out", overwrite: "auto" });
                gsap.to(label, { opacity: text ? 1 : 0, duration: 0.2 });
                gsap.to(dot, { scale: dotScale, duration: 0.25 });
            };

            const onMove = (e: PointerEvent) => {
                show();
                dotX(e.clientX);
                dotY(e.clientY);
                ringX(e.clientX);
                ringY(e.clientY);
            };

            const onOver = (e: PointerEvent) => {
                const target = e.target as Element | null;
                const labelled = target?.closest<HTMLElement>("[data-cursor]");
                if (labelled) {
                    setState(88, "#0b57d0", labelled.dataset.cursor ?? "", 0);
                } else if (target?.closest("a, button")) {
                    setState(56, "rgba(77,163,255,0.16)", "", 0.6);
                } else {
                    setState(36, "rgba(77,163,255,0)", "", 1);
                }
            };

            window.addEventListener("pointermove", onMove, { passive: true });
            document.addEventListener("pointerover", onOver);
            document.documentElement.addEventListener("pointerleave", hide);

            return () => {
                window.removeEventListener("pointermove", onMove);
                document.removeEventListener("pointerover", onOver);
                document.documentElement.removeEventListener("pointerleave", hide);
                document.documentElement.classList.remove("has-custom-cursor");
            };
        },
        { scope: rootRef, dependencies: [] }
    );

    return (
        <div ref={rootRef} aria-hidden="true" className="pointer-events-none fixed left-0 top-0 z-[10000]">
            {/* Ring (follows slowly) */}
            <div
                ref={ringRef}
                className="fixed left-0 top-0 grid h-9 w-9 place-items-center rounded-full border border-[#4da3ff]"
            >
                <span
                    ref={labelRef}
                    className="text-[11px] font-medium uppercase tracking-[0.14em] text-white opacity-0"
                />
            </div>
            {/* Dot (follows fast) */}
            <div ref={dotRef} className="fixed left-0 top-0 h-2 w-2 rounded-full bg-[#4da3ff]" />
        </div>
    );
}