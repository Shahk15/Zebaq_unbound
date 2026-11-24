import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import DotWave from "../common/DotWave";
import { Split } from "../common/ui";
import { AutoCarousel } from "../common/fx";
import { PAGE_COPY, FEATURED } from "../../data/work";

gsap.registerPlugin(useGSAP, ScrollTrigger);

function ArrowIcon() {
    return (
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M7 17L17 7M9 7h8v8" />
        </svg>
    );
}

// 04 — Closing CTA. Follows the index in normal flow (no pin, no overlap): the navy
// panel opens from a rounded, inset card to full width as it scrolls into view.
export default function WorkCta() {
    const root = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            const mm = gsap.matchMedia();
            mm.add("(prefers-reduced-motion: no-preference)", () => {
                gsap.fromTo(
                    root.current,
                    { clipPath: "inset(0% 4% 0% 4% round 56px 56px 0px 0px)" },
                    {
                        clipPath: "inset(0% 0% 0% 0% round 0px 0px 0px 0px)",
                        ease: "none",
                        scrollTrigger: { trigger: root.current, start: "top bottom", end: "top 25%", scrub: true },
                    }
                );
                gsap.fromTo(".wc-glow", { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "center center", scrub: true } });
            });
            return () => mm.revert();
        },
        { scope: root }
    );

    const names = FEATURED.map((w) => (
        <span key={w.slug} className="flex items-center gap-[0.5em] pr-[0.5em] text-transparent [-webkit-text-stroke:1.2px_rgba(247,246,241,.35)]">
            {w.title}
            <span className="inline-block h-[0.14em] w-[0.14em] rounded-full bg-lemon" />
        </span>
    ));

    return (
        <section ref={root} data-dark data-index="04" data-label="Next project" className="relative overflow-hidden bg-ink text-off">
            <div className="wc-glow pointer-events-none absolute left-1/2 top-[38%] h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(245,234,59,.18),transparent_65%)]" />
            <DotWave className="pointer-events-none absolute inset-x-0 bottom-0 h-[45%] opacity-60 [mask-image:linear-gradient(to_bottom,transparent,#000_45%)] [-webkit-mask-image:linear-gradient(to_bottom,transparent,#000_45%)]" />

            <div className="wrap relative pb-[clamp(60px,8vw,110px)] pt-[clamp(110px,14vw,200px)] text-center">
                <p className="eyebrow mx-auto text-glacier-3" data-reveal>{PAGE_COPY.ctaEyebrow}</p>
                <h2 className="mx-auto mt-8 max-w-[14ch] text-[clamp(48px,8vw,150px)] font-light leading-[0.92] tracking-[-0.055em]" style={{ fontFamily: "var(--font-display)" }}>
                    <Split text={PAGE_COPY.ctaTitle} dot />
                </h2>
                <p className="mx-auto mt-8 max-w-xl text-[clamp(15px,1.2vw,19px)] leading-relaxed text-glacier-2" data-reveal>{PAGE_COPY.ctaSub}</p>
                <div className="mt-10 flex flex-wrap justify-center gap-3" data-reveal>
                    <a href="/#contact" className="group inline-flex items-center gap-4 rounded-full bg-lemon py-2 pl-7 pr-2 text-base font-medium text-navy transition-colors hover:bg-off">
                        Book a strategy call
                        <span className="grid h-11 w-11 place-items-center rounded-full bg-navy text-lemon transition-transform duration-500 group-hover:rotate-45"><ArrowIcon /></span>
                    </a>
                    <a href="/services" className="group inline-flex items-center gap-4 rounded-full border border-white/25 py-2 pl-7 pr-2 text-base font-medium text-off transition-colors hover:border-lemon hover:text-lemon">
                        Explore services
                        <span className="grid h-11 w-11 place-items-center rounded-full bg-off text-navy transition-transform duration-500 group-hover:rotate-45"><ArrowIcon /></span>
                    </a>
                </div>
            </div>

            <div className="relative pb-[clamp(60px,8vw,110px)] text-[clamp(44px,7vw,120px)] font-medium leading-none tracking-[-0.05em]" style={{ fontFamily: "var(--font-display)" }}>
                <AutoCarousel items={names} speed={40} gap={0} slowOnHover={0.2} />
            </div>
        </section>
    );
}
