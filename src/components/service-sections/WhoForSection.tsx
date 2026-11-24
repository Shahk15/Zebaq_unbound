import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Split } from "../common/ui";
import type { WhoForContent } from "../../data/services/types";
import { useSectionReveal } from "../../hooks/useSectionReveal";

gsap.registerPlugin(useGSAP, ScrollTrigger);

function Check() {
    return (
        <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12.5l4.5 4.5L19 7.5" />
        </svg>
    );
}

function Cross() {
    return (
        <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" />
        </svg>
    );
}

export default function WhoForSection({ data }: { data: WhoForContent }) {
    const root = useRef<HTMLElement>(null);
    useSectionReveal(root);

    useGSAP(
        () => {
            const mm = gsap.matchMedia();
            mm.add("(prefers-reduced-motion: no-preference)", () => {
                gsap.from(".df-card", {
                    y: 80,
                    opacity: 0,
                    duration: 1.2,
                    ease: "expo.out",
                    stagger: 0.15,
                    scrollTrigger: { trigger: ".df-grid", start: "top 85%", once: true },
                });
                gsap.from(".df-item", {
                    x: -24,
                    opacity: 0,
                    duration: 0.9,
                    ease: "expo.out",
                    stagger: 0.07,
                    scrollTrigger: { trigger: ".df-grid", start: "top 75%", once: true },
                });
            });
            return () => mm.revert();
        },
        { scope: root }
    );

    return (
        <section ref={root} className="relative z-10 -mt-[clamp(28px,4vw,56px)] overflow-hidden rounded-t-[clamp(28px,4vw,56px)] bg-off text-navy">
            <div className="wrap section">
                <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">
                    <div>
                        <p className="eyebrow text-navy-2" data-reveal>{data.eyebrow}</p>
                        <h2 className="t-xl mt-8 max-w-[14ch]">
                            <Split text={data.title} dot />
                        </h2>
                    </div>
                    <p className="max-w-sm text-lg leading-relaxed text-navy-2" data-reveal>{data.text}</p>
                </div>

                <div className="df-grid mt-[clamp(48px,7vw,96px)] grid gap-5 lg:grid-cols-2">
                    {/* Yes */}
                    <div className="df-card rounded-[28px] bg-ink p-[clamp(24px,3vw,44px)] text-off">
                        <p className="eyebrow text-glacier-3">{data.yes.label}</p>
                        <ul className="mt-6">
                            {data.yes.items.map((t) => (
                                <li key={t} className="df-item flex gap-4 border-t border-white/10 py-5 text-lg leading-snug first:border-t-0">
                                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-lemon text-navy">
                                        <Check />
                                    </span>
                                    {t}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* No */}
                    <div className="df-card rounded-[28px] border border-navy/10 bg-glacier p-[clamp(24px,3vw,44px)] text-navy">
                        <p className="eyebrow text-navy-2">{data.no.label}</p>
                        <ul className="mt-6">
                            {data.no.items.map((t) => (
                                <li key={t} className="df-item flex gap-4 border-t border-navy/10 py-5 text-lg leading-snug text-navy-2 first:border-t-0">
                                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-navy/10 text-navy-2">
                                        <Cross />
                                    </span>
                                    {t}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}