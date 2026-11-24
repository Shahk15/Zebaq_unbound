import type { RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// Home-style section arrival: lemon hairline, flattening corners and, on desktop,
// the previous section stays put and sinks while this one slides over it.
export function useSectionReveal(ref: RefObject<HTMLElement | null>, radius = 56) {
    useGSAP(
        () => {
            const section = ref.current;
            if (!section) return;

            const mm = gsap.matchMedia();
            mm.add(
                {
                    desk: "(min-width: 768px)",
                    motion: "(prefers-reduced-motion: no-preference)",
                },
                (ctx) => {
                    const { desk, motion } = ctx.conditions as { desk: boolean; motion: boolean };
                    if (!motion) return;

                    // 1) Hairline across the top edge, drawn as the section arrives
                    const line = document.createElement("span");
                    line.setAttribute("aria-hidden", "true");
                    line.className = section.hasAttribute("data-dark")
                        ? "pointer-events-none absolute inset-x-0 top-0 z-[5] h-[2px] origin-left bg-lemon"
                        : "pointer-events-none absolute inset-x-0 top-0 z-[5] h-[2px] origin-left bg-lemon-deep";
                    section.prepend(line);

                    gsap.fromTo(
                        line,
                        { scaleX: 0 },
                        { scaleX: 1, ease: "none", scrollTrigger: { trigger: section, start: "top 90%", end: "top 35%", scrub: true } }
                    );

                    // 2) Rounded top corners flatten
                    gsap.fromTo(
                        section,
                        { borderTopLeftRadius: radius, borderTopRightRadius: radius },
                        {
                            borderTopLeftRadius: 0,
                            borderTopRightRadius: 0,
                            ease: "none",
                            scrollTrigger: { trigger: section, start: "top 95%", end: "top 20%", scrub: true },
                        }
                    );

                    if (!desk) return () => line.remove();

                    // 3) Previous section stays put and sinks while this one slides over it
                    const prev = section.previousElementSibling as HTMLElement | null;
                    // Skip when the previous section pins itself (or sits behind a pin): two pins would fight
                    if (!prev || prev.classList.contains("pin-spacer") || prev.querySelector(".pin-spacer")) {
                        return () => line.remove();
                    }

                    prev.style.position = "relative";
                    prev.style.zIndex = "1";

                    const shade = document.createElement("div");
                    shade.className = "pointer-events-none absolute inset-0 z-[50] bg-ink opacity-0";
                    prev.appendChild(shade);

                    const tall = () => prev.offsetHeight > window.innerHeight + 2;
                    gsap.timeline({
                        scrollTrigger: {
                            trigger: prev,
                            start: () => (tall() ? "bottom bottom" : "top top"),
                            end: () => `+=${window.innerHeight}`,
                            pin: true,
                            pinSpacing: false,
                            scrub: true,
                            invalidateOnRefresh: true,
                        },
                    })
                        .to(prev, { scale: 0.92, yPercent: tall() ? 0 : -2, transformOrigin: "50% 100%", ease: "none" }, 0)
                        .to(shade, { opacity: 0.6, ease: "none" }, 0);

                    return () => {
                        line.remove();
                        shade.remove();
                        prev.style.position = "";
                        prev.style.zIndex = "";
                    };
                }
            );

            return () => mm.revert();
        },
        { scope: ref }
    );
}   