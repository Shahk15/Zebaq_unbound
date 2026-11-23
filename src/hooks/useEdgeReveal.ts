import type { RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// Rounded top corners flatten as the section arrives
export function useEdgeReveal(ref: RefObject<HTMLElement | null>, radius = 56) {
    useGSAP(
        () => {
            const el = ref.current;
            if (!el) return;
            const mm = gsap.matchMedia();
            mm.add("(prefers-reduced-motion: no-preference)", () => {
                gsap.fromTo(
                    el,
                    { borderTopLeftRadius: radius, borderTopRightRadius: radius },
                    {
                        borderTopLeftRadius: 0,
                        borderTopRightRadius: 0,
                        ease: "none",
                        scrollTrigger: { trigger: el, start: "top 95%", end: "top 20%", scrub: true },
                    }
                );
            });
            return () => mm.revert();
        },
        { scope: ref }
    );
}