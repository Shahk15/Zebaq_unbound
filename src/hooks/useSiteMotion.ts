import type { RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Same motion vocabulary Home.tsx declares, reusable on inner pages
export function useSiteMotion(root: RefObject<HTMLElement | null>) {
    useGSAP(
        () => {
            const mm = gsap.matchMedia();
            mm.add("(prefers-reduced-motion: no-preference)", () => {
                gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
                    gsap.from(el, { y: 40, opacity: 0, duration: 1.3, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 90%", once: true } });
                });
                gsap.utils.toArray<HTMLElement>("[data-split]").forEach((el) => {
                    if (el.closest("[data-hero]")) return; // hero runs its own intro
                    gsap.from(el.querySelectorAll(".sw > span"), {
                        yPercent: 110, duration: 1.3, ease: "expo.out", stagger: 0.06,
                        scrollTrigger: { trigger: el, start: "top 88%", once: true },
                    });
                });
                gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
                    const amt = Number(el.dataset.parallax) || 12;
                    gsap.fromTo(el, { yPercent: -amt }, { yPercent: amt, ease: "none", scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true } });
                });
                gsap.utils.toArray<HTMLElement>("[data-cascade]").forEach((box) => {
                    gsap.from(box.children, { x: 80, opacity: 0, duration: 1.1, ease: "expo.out", stagger: 0.06, scrollTrigger: { trigger: box, start: "top 88%", once: true } });
                });
                gsap.utils.toArray<HTMLElement>("[data-flip]").forEach((box) => {
                    gsap.set(box, { perspective: 1200 });
                    gsap.from(box.children, { rotateY: -75, transformOrigin: "0% 50%", opacity: 0, duration: 1.4, ease: "expo.out", stagger: 0.1, scrollTrigger: { trigger: box, start: "top 85%", once: true } });
                });
                gsap.utils.toArray<HTMLElement>("[data-rise]").forEach((box) => {
                    gsap.from(box.children, { yPercent: 60, opacity: 0, clipPath: "inset(0 0 100% 0)", duration: 1.1, ease: "expo.out", stagger: 0.07, scrollTrigger: { trigger: box, start: "top 88%", once: true } });
                });
                gsap.utils.toArray<HTMLElement>("[data-zoom]").forEach((el) => {
                    gsap.fromTo(el, { clipPath: "inset(8% 10% 8% 10% round 40px)" }, { clipPath: "inset(0% 0% 0% 0% round 32px)", ease: "none", scrollTrigger: { trigger: el, start: "top 95%", end: "top 35%", scrub: 1 } });
                });
            });

            const refresh = () => ScrollTrigger.refresh();
            document.fonts?.ready.then(refresh);
            window.addEventListener("load", refresh);
            return () => {
                window.removeEventListener("load", refresh);
                mm.revert();
            };
        },
        { scope: root }
    );
}