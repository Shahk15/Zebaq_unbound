import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import DotWave from "../common/DotWave";
import { Split } from "../common/ui";
import { PAGE_COPY } from "../../data/work";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// CTA text and links for this hero (change here)
const CTA = {
    primary: { label: "Book a strategy call", href: "/contact" },
    secondary: { label: "See the projects", href: "#projects" },
};

function ArrowIcon() {
    return (
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M7 17L17 7M9 7h8v8" />
        </svg>
    );
}

export default function WorkHero() {
    const root = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            const mm = gsap.matchMedia();
            mm.add("(prefers-reduced-motion: no-preference)", () => {
                // Hidden start state is set up front so nothing flashes before the intro plays
                gsap.set([".wh-eyebrow", ".wh-sub"], { y: 24, opacity: 0 });
                gsap.set(".wh-cta > *", { y: 24, opacity: 0 });
                gsap.set(".wh-title .sw > span", { yPercent: 110 });
                gsap.set(".wh-wave", { opacity: 0, y: 40 });

                const tl = gsap.timeline({ paused: true });
                tl.to(".wh-eyebrow", { y: 0, opacity: 1, duration: 0.8, ease: "expo.out" })
                    .to(".wh-title .sw > span", { yPercent: 0, duration: 1.4, ease: "expo.out", stagger: 0.07 }, "-=0.55")
                    .to(".wh-sub", { y: 0, opacity: 1, duration: 1, ease: "expo.out" }, "-=0.9")
                    .to(".wh-cta > *", { y: 0, opacity: 1, duration: 1, ease: "expo.out", stagger: 0.08 }, "-=0.9")
                    .to(".wh-wave", { opacity: 1, y: 0, duration: 1.6, ease: "power3.out" }, "-=1.2");

                const start = () => tl.play();
                if (document.documentElement.dataset.pt === "busy") window.addEventListener("page:ready", start, { once: true });
                else gsap.delayedCall(0.15, start);

                // Hero stays pinned while the projects slide over it; it sinks back and dims as that happens
                gsap.timeline({
                    scrollTrigger: {
                        trigger: root.current,
                        start: "top top",
                        end: "bottom top",
                        pin: true,
                        pinSpacing: false,
                        scrub: true,
                        invalidateOnRefresh: true,
                    },
                })
                    .to(".wh-inner", { scale: 0.92, y: -40, transformOrigin: "50% 100%", ease: "none" }, 0)
                    .to(".wh-shade", { opacity: 0.6, ease: "none" }, 0);

                return () => window.removeEventListener("page:ready", start);
            });
            return () => mm.revert();
        },
        { scope: root }
    );

    return (
        <section
            ref={root}
            data-dark
            data-hero
            data-header-solid
            data-index="01"
            data-label="Work"
            className="relative flex min-h-[100svh] flex-col overflow-hidden bg-ink text-off"
        >
            <div className="wh-shade pointer-events-none absolute inset-0 z-20 bg-black opacity-0" />
            <DotWave className="wh-wave pointer-events-none absolute inset-x-0 bottom-0 h-[42%] [mask-image:linear-gradient(to_bottom,transparent,#000_45%)] [-webkit-mask-image:linear-gradient(to_bottom,transparent,#000_45%)]" />

            <div className="wh-inner wrap relative z-10 flex flex-1 flex-col justify-end pb-[clamp(56px,8vh,96px)] pt-[clamp(96px,11vh,130px)]">
                <p className="eyebrow wh-eyebrow mb-8 text-glacier-3">{PAGE_COPY.eyebrow}</p>

                <h1
                    className="wh-title text-[clamp(46px,8.4vw,150px)] font-light leading-[0.96] tracking-[-0.045em]"
                    style={{ fontFamily: "var(--font-display)" }}
                >
                    <Split text={PAGE_COPY.titleLine1} />
                    <br />
                    <Split text={PAGE_COPY.titleLine2} dot />
                </h1>

                <div className="mt-[clamp(28px,4vw,56px)] flex flex-col justify-between gap-8 md:flex-row md:items-end">
                    <p className="wh-sub max-w-[460px] text-[clamp(14px,1.1vw,17px)] leading-[1.7] text-glacier-3">{PAGE_COPY.sub}</p>

                    <div className="wh-cta flex flex-wrap gap-3">
                        <a
                            href={CTA.primary.href}
                            className="group inline-flex items-center gap-4 rounded-full bg-off py-2 pl-6 pr-2 text-sm font-medium text-navy transition-colors duration-300 hover:bg-lemon"
                        >
                            {CTA.primary.label}
                            <span className="grid h-10 w-10 place-items-center rounded-full bg-ink text-off transition-transform duration-500 group-hover:rotate-45">
                                <ArrowIcon />
                            </span>
                        </a>
                        <a
                            href={CTA.secondary.href}
                            className="group inline-flex items-center gap-4 rounded-full border border-white/25 py-2 pl-6 pr-2 text-sm font-medium text-off transition-colors duration-300 hover:border-lemon hover:text-lemon"
                        >
                            {CTA.secondary.label}
                            <span className="grid h-10 w-10 place-items-center rounded-full bg-off text-navy transition-transform duration-500 group-hover:rotate-45">
                                <ArrowIcon />
                            </span>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}