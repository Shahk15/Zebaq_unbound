import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import Header from "../components/layout/Header";
import Hero from "../components/home/Hero";
import Logos from "../components/home/Logos";
import Impact from "../components/home/Impact";
import Services from "../components/home/Services";
import Audiences from "../components/home/Audiences";
import Work from "../components/home/Work";
import Testimonials from "../components/home/Testimonials";
import Videos from "../components/home/Videos";
import Tech from "../components/home/Tech";
import Why from "../components/home/Why";
import Models from "../components/home/Models";
import Process from "../components/home/Process";
import Faq from "../components/home/Faq";
import WhiteLabel from "../components/home/WhiteLabel";
import Closing from "../components/home/Closing";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type HomeProps = {
    play: boolean;
};

export default function Home({ play }: HomeProps) {
    const root = useRef<HTMLDivElement>(null);

    // Once the curtain lifts, re-measure every trigger in page order
    useEffect(() => {
        if (!play) return;
        ScrollTrigger.sort();
        ScrollTrigger.refresh();
    }, [play]);

    // Site-wide motion vocabulary
    useGSAP(
        () => {
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
            const refresh = () => ScrollTrigger.refresh();
            document.fonts?.ready.then(refresh);
            window.addEventListener("load", refresh);
            return () => window.removeEventListener("load", refresh);
        },
        { scope: root },
    );

    // Overlap transitions: a section marked [data-over] slides up over the one before it
    useGSAP(
        () => {
            const kids = [...document.querySelectorAll<HTMLElement>("main > *")];
            kids.forEach((el, i) => {
                el.style.position = "relative";
                el.style.zIndex = String(i + 1);
            });
            const mm = gsap.matchMedia();
            mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
                const added: HTMLElement[] = [];
                const faces: HTMLElement[] = [];
                kids.forEach((over, i) => {
                    if (i === 0 || !over.hasAttribute("data-over")) return;
                    const el = kids[i - 1];
                    if (el.querySelector(".pin-spacer")) return;
                    over.classList.add("stack-card");
                    faces.push(over);
                    const shade = document.createElement("div");
                    shade.className = "pointer-events-none absolute inset-0 z-[50] bg-ink opacity-0";
                    el.appendChild(shade);
                    added.push(shade);
                    const tall = () => el.offsetHeight > window.innerHeight + 2;
                    gsap.timeline({
                        scrollTrigger: {
                            trigger: el,
                            start: () => (tall() ? "bottom bottom" : "top top"),
                            end: () => `+=${window.innerHeight}`,
                            pin: true,
                            pinSpacing: false,
                            scrub: true,
                            invalidateOnRefresh: true,
                        },
                    })
                        .to(el, { scale: 0.9, yPercent: tall() ? 0 : -2, transformOrigin: "50% 100%", ease: "none" }, 0)
                        .to(shade, { opacity: 0.6, ease: "none" }, 0);
                });
                return () => {
                    added.forEach((n) => n.remove());
                    faces.forEach((f) => f.classList.remove("stack-card"));
                };
            });
        },
        { scope: root },
    );

    // Section-specific choreography (declared with data attributes)
    useGSAP(
        () => {
            const mm = gsap.matchMedia();
            mm.add("(prefers-reduced-motion: no-preference)", () => {
                // [data-cascade]: children fly in from the right, one after another
                gsap.utils.toArray<HTMLElement>("[data-cascade]").forEach((box) => {
                    gsap.from(box.children, { x: 80, opacity: 0, duration: 1.1, ease: "expo.out", stagger: 0.06, scrollTrigger: { trigger: box, start: "top 88%", once: true } });
                });
                // [data-flip]: cards swing open on a hinge
                gsap.utils.toArray<HTMLElement>("[data-flip]").forEach((box) => {
                    gsap.set(box, { perspective: 1200 });
                    gsap.from(box.children, { rotateY: -75, transformOrigin: "0% 50%", opacity: 0, duration: 1.4, ease: "expo.out", stagger: 0.1, scrollTrigger: { trigger: box, start: "top 85%", once: true } });
                });
                // [data-rise]: list rows rise and unmask from a hairline
                gsap.utils.toArray<HTMLElement>("[data-rise]").forEach((box) => {
                    gsap.from(box.children, { yPercent: 60, opacity: 0, clipPath: "inset(0 0 100% 0)", duration: 1.1, ease: "expo.out", stagger: 0.07, scrollTrigger: { trigger: box, start: "top 88%", once: true } });
                });
                // [data-zoom]: a block grows from a small window as it scrolls through
                gsap.utils.toArray<HTMLElement>("[data-zoom]").forEach((el) => {
                    gsap.fromTo(el, { clipPath: "inset(8% 10% 8% 10% round 40px)" }, { clipPath: "inset(0% 0% 0% 0% round 32px)", ease: "none", scrollTrigger: { trigger: el, start: "top 95%", end: "top 35%", scrub: 1 } });
                });
            });
        },
        { scope: root },
    );

    return (
        <div ref={root}>
            <Header />
            <main>
                <Hero play={play} />
                <Logos />
                <Impact />
                <Services />
                <Audiences />
                <Work />
                <Testimonials />
                <Videos />
                <Tech />
                <Why />
                <Models />
                <Process />
                <Faq />
                <WhiteLabel />
                <Closing />
            </main>
        </div>
    );
}