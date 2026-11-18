import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll() {
    // Smooth scroll, synced with ScrollTrigger; anchor links glide
    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        const lenis = new Lenis({ duration: 1.2, smoothWheel: true });
        lenis.on("scroll", ScrollTrigger.update);
        const tick = (t: number) => lenis.raf(t * 1000);
        gsap.ticker.add(tick);
        gsap.ticker.lagSmoothing(0);
        const sync = () => (document.body.style.overflow === "hidden" ? lenis.stop() : lenis.start());
        const mo = new MutationObserver(sync);
        mo.observe(document.body, { attributes: true, attributeFilter: ["style"] });
        const onClick = (e: MouseEvent) => {
            const a = (e.target as HTMLElement).closest('a[href^="#"]') as HTMLAnchorElement | null;
            const sel = a?.getAttribute("href");
            if (!sel || sel === "#") return;
            const target = document.querySelector(sel);
            if (!target) return;
            e.preventDefault();
            lenis.scrollTo(target as HTMLElement, { offset: 0, duration: 1.6 });
        };
        document.addEventListener("click", onClick);
        return () => {
            mo.disconnect();
            document.removeEventListener("click", onClick);
            gsap.ticker.remove(tick);
            lenis.destroy();
        };
    }, []);

    return null;
}