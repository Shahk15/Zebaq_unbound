import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Arrow, Split } from "../common/ui";
import { useSectionReveal } from "../../hooks/useSectionReveal";
import type { JoinContent } from "../../data/about";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function JoinCards({ data }: { data: JoinContent }) {
    const root = useRef<HTMLElement>(null);

    useSectionReveal(root);

    useGSAP(
        () => {
            const mm = gsap.matchMedia();
            mm.add("(prefers-reduced-motion: no-preference)", () => {
                gsap.from(".jn-card", {
                    y: 90,
                    opacity: 0,
                    rotate: (i: number) => (i % 2 === 0 ? -2 : 2),
                    transformOrigin: "50% 100%",
                    duration: 1.3,
                    ease: "expo.out",
                    stagger: 0.15,
                    scrollTrigger: { trigger: ".jn-grid", start: "top 85%", once: true },
                });
            });
            return () => mm.revert();
        },
        { scope: root }
    );

    return (
        <section ref={root} className="relative z-10 overflow-hidden rounded-t-[clamp(28px,4vw,56px)] bg-off text-navy">
            <div className="wrap section">
                <p className="eyebrow text-navy-2" data-reveal>{data.eyebrow}</p>
                <h2 className="t-xl mt-8 max-w-[14ch]">
                    <Split text={data.title} dot />
                </h2>

                <div className="jn-grid mt-[clamp(40px,6vw,88px)] grid gap-5 md:grid-cols-2">
                    {data.cards.map((c) => {
                        const dark = c.tone === "dark";
                        return (
                            <a
                                key={c.href}
                                href={c.href}
                                data-transition-title={c.title}
                                data-cursor="View"
                                className={`jn-card group relative flex min-h-[clamp(320px,36vw,480px)] flex-col justify-between overflow-hidden rounded-[32px] p-[clamp(24px,3vw,44px)] transition-transform duration-500 hover:-translate-y-1.5 ${dark ? "bg-ink text-off group-hover:text-navy" : "border border-navy/10 bg-glacier text-navy"
                                    }`}
                            >
                                {/* Dot pattern */}
                                <span
                                    aria-hidden="true"
                                    className={`pointer-events-none absolute inset-0 [background-size:18px_18px] ${dark
                                            ? "bg-[radial-gradient(rgba(255,255,255,0.14)_1px,transparent_1px)]"
                                            : "bg-[radial-gradient(rgba(10,31,68,0.14)_1px,transparent_1px)]"
                                        }`}
                                />

                                {/* Lemon wash grows out of the arrow on hover */}
                                <span
                                    aria-hidden="true"
                                    className="pointer-events-none absolute inset-0 bg-lemon transition-[clip-path] duration-700 ease-[cubic-bezier(0.2,0.7,0.2,1)] [clip-path:circle(0%_at_calc(100%_-_56px)_calc(100%_-_56px))] group-hover:[clip-path:circle(150%_at_calc(100%_-_56px)_calc(100%_-_56px))]"
                                />

                                <span
                                    className={`relative text-[clamp(96px,13vw,200px)] font-light leading-none tracking-[-0.06em] opacity-15 transition-colors duration-500 ${dark ? "group-hover:text-navy" : ""
                                        }`}
                                    style={{ fontFamily: "var(--font-display)" }}
                                >
                                    {c.n}
                                </span>

                                <div className={`relative max-w-[30ch] transition-colors duration-500 ${dark ? "group-hover:text-navy" : ""}`}>
                                    <h3 className="text-[clamp(32px,3.6vw,56px)] font-medium leading-none tracking-[-0.05em]">{c.title}</h3>
                                    <p className="mt-4 text-[15px] leading-relaxed opacity-80">{c.text}</p>
                                    <p className="mt-6 text-sm font-medium uppercase tracking-[0.14em]">{c.cta}</p>
                                </div>

                                <span
                                    className={`absolute bottom-7 right-7 grid h-14 w-14 place-items-center rounded-full transition-all duration-500 group-hover:rotate-45 group-hover:bg-ink group-hover:text-lemon ${dark ? "bg-lemon text-navy" : "bg-ink text-off"
                                        }`}
                                >
                                    <Arrow />
                                </span>
                            </a>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}