import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import DotWave from "../common/DotWave";
import { Arrow, Split } from "../common/ui";
import type { AboutHeroContent } from "../../data/about";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function AboutHero({ data }: { data: AboutHeroContent }) {
    const root = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            const mm = gsap.matchMedia();
            mm.add(
                {
                    motion: "(prefers-reduced-motion: no-preference)",
                    pin: "(min-width: 768px) and (min-height: 600px)",
                },
                (ctx) => {
                    const { motion, pin } = ctx.conditions as { motion: boolean; pin: boolean };
                    if (!motion) return;

                    // Hidden start state is set up front so nothing flashes before the intro plays
                    gsap.set([".ah-eyebrow", ".ah-sub"], { y: 24, opacity: 0 });
                    gsap.set(".ah-cta > *", { y: 24, opacity: 0 });
                    gsap.set(".ah-title .sw > span", { yPercent: 110 });
                    gsap.set(".ah-wave", { opacity: 0, y: 40 });

                    const tl = gsap.timeline({ paused: true });
                    tl.to(".ah-title .sw > span", { yPercent: 0, duration: 1.4, ease: "expo.out", stagger: 0.07 })
                        .to(".ah-eyebrow", { y: 0, opacity: 1, duration: 0.8, ease: "expo.out" }, 0.1)
                        .to(".ah-sub", { y: 0, opacity: 1, duration: 1, ease: "expo.out" }, "-=0.9")
                        .to(".ah-cta > *", { y: 0, opacity: 1, duration: 1, ease: "expo.out", stagger: 0.08 }, "-=0.9")
                        .to(".ah-wave", { opacity: 1, y: 0, duration: 1.6, ease: "power3.out" }, "-=1.1");

                    const start = () => tl.play();
                    if (document.documentElement.dataset.pt === "busy") window.addEventListener("page:ready", start, { once: true });
                    else gsap.delayedCall(0.15, start);

                    // Hero stays pinned while the next section slides over it; it sinks back and dims
                    if (pin) {
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
                            .to(".ah-inner", { scale: 0.92, y: -40, transformOrigin: "50% 100%", ease: "none" }, 0)
                            .to(".ah-shade", { opacity: 0.55, ease: "none" }, 0);
                    }

                    return () => window.removeEventListener("page:ready", start);
                }
            );
            return () => mm.revert();
        },
        { scope: root }
    );

    return (
        <section ref={root} data-hero className="relative flex min-h-[100svh] flex-col overflow-hidden bg-off text-navy">
            {/* Same wave as the Services hero. The filter turns its light dots dark and a touch heavier for this light surface */}
            <DotWave className="ah-wave pointer-events-none absolute inset-x-0 bottom-0 h-[46%] [filter:brightness(0)_drop-shadow(0_0_0.6px_#0a1f44)] [mask-image:linear-gradient(to_bottom,transparent,#000_40%)] [-webkit-mask-image:linear-gradient(to_bottom,transparent,#000_40%)]" />
            <div className="ah-shade pointer-events-none absolute inset-0 z-20 bg-ink opacity-0" />

            <div className="ah-inner wrap relative z-10 flex flex-1 flex-col pb-[clamp(32px,5vh,64px)] pt-[clamp(96px,11vh,130px)]">
                {/* Heading stays around the middle, a little above centre. The bottom padding (pb-11) equals the eyebrow's
                    height + margin, so adding the eyebrow does not move the heading */}
                <div className="flex flex-1 flex-col justify-center pb-11">
                    <p className="eyebrow ah-eyebrow mb-8 text-navy-2">{data.eyebrow}</p>

                    <h1
                        className="ah-title text-[clamp(44px,8vw,150px)] font-normal leading-[1] tracking-[-0.05em]"
                        style={{ fontFamily: "var(--font-display)" }}
                    >
                        <Split text={data.line1} />
                        <br />
                        <Split text={data.line2} />
                    </h1>
                </div>

                {/* Sub text on the left, buttons on the right (same arrangement as the Services hero) */}
                <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
                    <p className="ah-sub max-w-[460px] text-[clamp(14px,1.1vw,17px)] leading-[1.7] text-navy-2">{data.text}</p>

                    <div className="ah-cta flex flex-wrap gap-3">
                        {/* primary: ink pill, lemon icon. On hover the pill turns lemon and the icon flips to ink */}
                        <a
                            href={data.primary.href}
                            className="group inline-flex items-center gap-4 rounded-full bg-ink py-2 pl-6 pr-2 text-sm font-medium text-off outline-none transition-colors duration-300 hover:bg-lemon hover:text-navy focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-navy"
                        >
                            {data.primary.label}
                            <span className="grid h-10 w-10 place-items-center rounded-full bg-lemon text-navy transition-[transform,background-color,color] duration-500 group-hover:rotate-45 group-hover:bg-ink group-hover:text-off">
                                <Arrow size={16} />
                            </span>
                        </a>

                        {/* secondary: outline pill, ink icon. On hover the border goes lemon and the icon turns lemon */}
                        <a
                            href={data.secondary.href}
                            className="group inline-flex items-center gap-4 rounded-full border border-navy/20 py-2 pl-6 pr-2 text-sm font-medium text-navy outline-none transition-colors duration-300 hover:border-lemon-deep focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-navy"
                        >
                            {data.secondary.label}
                            <span className="grid h-10 w-10 place-items-center rounded-full bg-ink text-off transition-[transform,background-color,color] duration-500 group-hover:rotate-45 group-hover:bg-lemon group-hover:text-navy">
                                <Arrow size={16} />
                            </span>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}