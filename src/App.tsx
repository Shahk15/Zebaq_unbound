import { useCallback, useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { Cursor, Loader, ScrollProgress, SectionIndex } from "./components/fx";
// Homepage order follows the approved brief, 01–16
import Header from "./sections/Header"; //            01
import Hero from "./sections/Hero"; //                02
import Logos from "./sections/Logos"; //              03
import Impact from "./sections/Impact"; //            04
import Services from "./sections/Services"; //        05
import Audiences from "./sections/Audiences"; //      06
import Work from "./sections/Work"; //                07
import Testimonials from "./sections/Testimonials"; // 08
import Videos from "./sections/Videos"; //            09
import Tech from "./sections/Tech"; //                10
import Why from "./sections/Why"; //                  11
import Models from "./sections/Models"; //            12
import Process from "./sections/Process"; //          13
import Faq from "./sections/Faq"; //                  14
import WhiteLabel from "./sections/WhiteLabel"; //    15
import Closing from "./sections/Closing"; //          16

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function App() {
  const root = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const done = useCallback(() => setReady(true), []);

  // Once the curtain lifts, re-measure every trigger in page order
  useEffect(() => {
    if (!ready) return;
    ScrollTrigger.sort();
    ScrollTrigger.refresh();
  }, [ready]);

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

  // Overlap transitions — used sparingly, only where a section marked
  // [data-over] should slide up over the one before it (which pins, scales
  // back and dims underneath). Everything else uses its own choreography.
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
      {!ready && <Loader onDone={done} />}
      <Cursor />
      <ScrollProgress />
      <SectionIndex />
      <Header />
      <main>
        <Hero play={ready} />
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
