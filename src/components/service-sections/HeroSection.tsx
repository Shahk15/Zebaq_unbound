import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import DotWave from "../common/DotWave";
import { Arrow, Split } from "../common/ui";
import type { HeroContent } from "../../data/services/types";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function HeroSection({ data }: { data: HeroContent }) {
    const root = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            const mm = gsap.matchMedia();
            mm.add(
                {
                    motion: "(prefers-reduced-motion: no-preference)",
                    pin: "(min-width: 768px) and (min-height: 700px)",
                },
                (ctx) => {
                    const { motion, pin } = ctx.conditions as { motion: boolean; pin: boolean };
                    if (!motion) return;

                    // Hidden start state is set up front so nothing flashes before the intro plays
                    gsap.set([".dh-eyebrow", ".dh-sub"], { y: 24, opacity: 0 });
                    gsap.set([".dh-cta > *", ".dh-stat"], { y: 24, opacity: 0 });
                    gsap.set(".dh-title .sw > span", { yPercent: 110 });
                    gsap.set(".dh-wave", { opacity: 0 });

                    const tl = gsap.timeline({ paused: true });
                    tl.to(".dh-eyebrow", { y: 0, opacity: 1, duration: 0.8, ease: "expo.out" })
                        .to(".dh-title .sw > span", { yPercent: 0, duration: 1.4, ease: "expo.out", stagger: 0.07 }, "-=0.55")
                        .to(".dh-sub", { y: 0, opacity: 1, duration: 1, ease: "expo.out" }, "-=0.9")
                        .to(".dh-cta > *", { y: 0, opacity: 1, duration: 1, ease: "expo.out", stagger: 0.08 }, "-=0.9")
                        .to(".dh-stat", { y: 0, opacity: 1, duration: 1, ease: "expo.out", stagger: 0.08 }, "-=0.8")
                        .to(".dh-wave", { opacity: 1, duration: 1.6, ease: "power3.out" }, "-=1.2");

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
                            .to(".dh-inner", { scale: 0.92, y: -40, transformOrigin: "50% 100%", ease: "none" }, 0)
                            .to(".dh-shade", { opacity: 0.6, ease: "none" }, 0);
                    }

                    return () => window.removeEventListener("page:ready", start);
                }
            );
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
            className="relative flex min-h-[100svh] flex-col overflow-hidden bg-ink text-off"
        >
            <DotWave className="dh-wave pointer-events-none absolute inset-x-0 bottom-0 h-[55%] [mask-image:linear-gradient(to_bottom,transparent,#000_55%)] [-webkit-mask-image:linear-gradient(to_bottom,transparent,#000_55%)]" />
            <div className="dh-shade pointer-events-none absolute inset-0 z-20 bg-black opacity-0" />

            <div className="dh-inner wrap relative z-10 flex flex-1 flex-col justify-end pb-[clamp(8px,2vh,24px)] pt-[clamp(110px,14vh,160px)]">
                <p className="eyebrow dh-eyebrow mb-8 text-glacier-3">{data.eyebrow}</p>

                <h1
                    className="dh-title text-[clamp(44px,7.6vw,138px)] font-light leading-[0.98] tracking-[-0.045em]"
                    style={{ fontFamily: "var(--font-display)" }}
                >
                    <Split text={data.line1} />
                    <br />
                    <Split text={data.line2} dot />
                </h1>

                <div className="mt-[clamp(28px,4vw,56px)] flex flex-col justify-between gap-8 md:flex-row md:items-end">
                    <p className="dh-sub max-w-[520px] text-[clamp(14px,1.1vw,17px)] leading-[1.7] text-glacier-3">{data.text}</p>

                    <div className="dh-cta flex flex-wrap gap-3">
                        <a
                            href={data.primary.href}
                            className="group inline-flex items-center gap-4 rounded-full bg-off py-2 pl-6 pr-2 text-sm font-medium text-navy transition-colors duration-300 hover:bg-lemon"
                        >
                            {data.primary.label}
                            <span className="grid h-10 w-10 place-items-center rounded-full bg-ink text-off transition-transform duration-500 group-hover:rotate-45">
                                <Arrow size={16} />
                            </span>
                        </a>
                        <a
                            href={data.secondary.href}
                            className="group inline-flex items-center gap-4 rounded-full border border-white/25 py-2 pl-6 pr-2 text-sm font-medium text-off transition-colors duration-300 hover:border-lemon hover:text-lemon"
                        >
                            {data.secondary.label}
                            <span className="grid h-10 w-10 place-items-center rounded-full bg-off text-navy transition-transform duration-500 group-hover:rotate-45">
                                <Arrow size={16} />
                            </span>
                        </a>
                    </div>
                </div>

                <dl className="mt-[clamp(36px,6vh,72px)] grid grid-cols-2 border-t border-white/10 md:grid-cols-4">
                    {data.stats.map((s) => (
                        <div key={s.label} className="dh-stat py-7 pr-6">
                            <dt className="text-sm uppercase tracking-[0.14em] text-glacier-3">{s.label}</dt>
                            <dd
                                className="mt-3 text-[clamp(30px,3.4vw,56px)] font-light leading-none tracking-[-0.04em]"
                                style={{ fontFamily: "var(--font-display)" }}
                            >
                                {s.value}
                            </dd>
                            <p className="mt-3 max-w-[26ch] text-sm leading-snug text-glacier-3/80">{s.note}</p>
                        </div>
                    ))}
                </dl>
            </div>
        </section>
    );
}