import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Split } from "../common/ui";
import type { ServiceDetail } from "../../data/services/detail.types";
import { useSectionReveal } from "../../hooks/useSectionReveal";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function DetailAbout({ data }: { data: ServiceDetail["about"] }) {
    const root = useRef<HTMLElement>(null);
    useSectionReveal(root);

    useGSAP(
        () => {
            const mm = gsap.matchMedia();
            mm.add("(prefers-reduced-motion: no-preference)", () => {
                gsap.from(".da-card", {
                    y: 60,
                    opacity: 0,
                    duration: 1.1,
                    ease: "expo.out",
                    stagger: 0.12,
                    scrollTrigger: { trigger: ".da-grid", start: "top 85%", once: true },
                });
            });
            return () => mm.revert();
        },
        { scope: root }
    );

    return (
        <section ref={root} className="relative z-10 overflow-hidden rounded-t-[clamp(28px,4vw,56px)] bg-off text-navy">
            <div className="wrap section">
                <div className="flex flex-col justify-between gap-12 md:flex-row md:items-start">
                    <div>
                        <p className="eyebrow text-navy-2" data-reveal>{data.eyebrow}</p>
                        <h2 className="t-xl mt-8 max-w-[12ch]">
                            <Split text={data.title} dot />
                        </h2>
                    </div>

                    <div className="max-w-xl space-y-5 text-lg leading-relaxed text-navy-2">
                        {data.text.map((t, i) => (
                            <p key={i} data-reveal className={i === data.text.length - 1 ? "font-medium text-navy" : ""}>
                                {t}
                            </p>
                        ))}
                    </div>
                </div>

                <div className="da-grid mt-[clamp(56px,8vw,120px)] grid border-t border-navy/10 md:grid-cols-2 lg:grid-cols-4">
                    {data.cards.map((c) => (
                        <article
                            key={c.n}
                            className="da-card group border-b border-navy/10 p-7 transition-colors duration-500 hover:bg-glacier md:border-r md:last:border-r-0 lg:min-h-[260px]"
                        >
                            <span className="text-sm text-navy-2 transition-colors group-hover:text-lemon-deep">{c.n}</span>
                            <h3 className="mt-10 text-[clamp(20px,1.6vw,26px)] font-medium tracking-[-0.03em]">{c.title}</h3>
                            <p className="mt-4 text-[15px] leading-relaxed text-navy-2">{c.text}</p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}