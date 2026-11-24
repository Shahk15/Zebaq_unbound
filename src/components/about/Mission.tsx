import { Fragment, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Split } from "../common/ui";
import { useSectionReveal } from "../../hooks/useSectionReveal";
import type { MissionContent } from "../../data/about";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Mission({ data }: { data: MissionContent }) {
    const root = useRef<HTMLElement>(null);

    useSectionReveal(root);

    useGSAP(
        () => {
            const mm = gsap.matchMedia();
            mm.add("(prefers-reduced-motion: no-preference)", () => {
                // Words light up one by one as the statement scrolls through the viewport
                gsap.fromTo(
                    ".ms-word",
                    { opacity: 0.14 },
                    {
                        opacity: 1,
                        ease: "none",
                        stagger: 0.2,
                        scrollTrigger: { trigger: ".ms-text", start: "top 80%", end: "bottom 50%", scrub: true },
                    }
                );
            });
            return () => mm.revert();
        },
        { scope: root }
    );

    // Flatten the segments into words, keeping the emphasis flag
    const words = data.segments.flatMap((seg) =>
        seg.t
            .split(" ")
            .filter(Boolean)
            .map((w) => ({ w, em: Boolean(seg.em) }))
    );

    return (
        <section ref={root} className="relative z-10 overflow-hidden rounded-t-[clamp(28px,4vw,56px)] bg-off text-navy">
            <div className="wrap section">
                <p className="eyebrow text-navy-2" data-reveal>{data.eyebrow}</p>

                <p
                    className="ms-text mt-10 max-w-[22ch] text-[clamp(36px,6.2vw,108px)] font-medium leading-[1.06] tracking-[-0.05em] md:max-w-[26ch]"
                    style={{ fontFamily: "var(--font-display)" }}
                >
                    {words.map((x, i) => (
                        <Fragment key={i}>
                            <span
                                className={`ms-word inline-block cursor-default transition-transform duration-300 hover:-translate-y-1 ${x.em ? "underline decoration-lemon-deep decoration-[0.07em] underline-offset-[0.14em]" : ""
                                    }`}
                            >
                                {x.w}
                            </span>{" "}
                        </Fragment>
                    ))}
                </p>

                <p className="mt-[clamp(40px,6vw,88px)] text-[clamp(20px,2vw,32px)] tracking-[-0.03em] text-navy-2" style={{ fontFamily: "var(--font-display)" }}>
                    <Split text={data.tagline} />
                </p>
            </div>
        </section>
    );
}