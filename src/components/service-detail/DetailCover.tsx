import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import type { ServiceDetail } from "../../data/services/detail.types";
import { useSectionReveal } from "../../hooks/useSectionReveal";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function DetailCover({ data }: { data: ServiceDetail["cover"] }) {
    const root = useRef<HTMLElement>(null);
    useSectionReveal(root);

    useGSAP(
        () => {
            const mm = gsap.matchMedia();
            mm.add("(prefers-reduced-motion: no-preference)", () => {
                // Words light up one by one as the block scrolls through the viewport
                gsap.fromTo(
                    ".dcv-word",
                    { opacity: 0.15 },
                    {
                        opacity: 1,
                        ease: "none",
                        stagger: 0.25,
                        scrollTrigger: { trigger: ".dcv-text", start: "top 80%", end: "bottom 45%", scrub: true },
                    }
                );
            });
            return () => mm.revert();
        },
        { scope: root }
    );

    return (
        <section ref={root} className="relative z-10 overflow-hidden rounded-t-[clamp(28px,4vw,56px)] bg-off text-navy">
            <div className="wrap section">
                <p className="eyebrow text-navy-2" data-reveal>{data.eyebrow}</p>
                <p
                    className="dcv-text mt-10 text-[clamp(40px,7vw,124px)] font-medium leading-[1.06] tracking-[-0.05em]"
                    style={{ fontFamily: "var(--font-display)" }}
                >
                    {data.items.map((t, i) => (
                        <span key={t} className="dcv-word">
                            {t}
                            {i < data.items.length - 1 && <span className="mx-[0.25em] text-lemon-deep">·</span>}{" "}
                        </span>
                    ))}
                </p>
            </div>
        </section>
    );
}