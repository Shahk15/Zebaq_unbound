import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// Words wrapped in *stars* turn blue. Edit this sentence freely.
const TEXT =
    "We design, build and grow digital experiences, from *AI search* and *web development* to *automation* and *performance marketing*, so your business can focus on what comes next.";

const WORDS = TEXT.split(" ").map((raw) => ({
    text: raw.replace(/\*/g, ""),
    accent: raw.includes("*"),
}));

// Marks words that belong to the same starred phrase ("AI search"), so the whole phrase stays blue
function withAccent(text: string) {
    const out: { text: string; accent: boolean }[] = [];
    let on = false;
    text.split(" ").forEach((raw) => {
        const starts = raw.startsWith("*");
        const ends = /\*[,.]?$/.test(raw);
        if (starts) on = true;
        out.push({ text: raw.replace(/\*/g, ""), accent: on });
        if (ends) on = false;
    });
    return out;
}

const TOKENS = withAccent(TEXT);

export default function Manifesto() {
    const sectionRef = useRef<HTMLElement>(null);
    const innerRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const section = sectionRef.current;
            const inner = innerRef.current;
            if (!section || !inner) return;

            const words = gsap.utils.toArray<HTMLElement>(".mf-word", section);
            const mm = gsap.matchMedia();

            mm.add("(prefers-reduced-motion: no-preference)", () => {
                // Words light up one by one while the section stays on screen (sticky)
                gsap.fromTo(
                    words,
                    { opacity: 0.14, y: 14 },
                    {
                        opacity: 1,
                        y: 0,
                        ease: "none",
                        stagger: 0.12,
                        scrollTrigger: { trigger: section, start: "top top", end: "bottom bottom", scrub: 0.6 },
                    }
                );

                // Soft glows drift at a different speed than the text
                gsap.fromTo(
                    ".mf-glow-a",
                    { yPercent: 30 },
                    { yPercent: -40, ease: "none", scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: true } }
                );
                gsap.fromTo(
                    ".mf-glow-b",
                    { yPercent: -30 },
                    { yPercent: 40, ease: "none", scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: true } }
                );
            });

            mm.add("(prefers-reduced-motion: reduce)", () => {
                gsap.set(words, { opacity: 1, y: 0 });
                section.style.height = "auto";
                inner.style.position = "static";
                inner.style.height = "auto";
                inner.style.padding = "clamp(90px,12vw,160px) 4.4vw";
                return () => {
                    section.style.height = "";
                    inner.style.position = "";
                    inner.style.height = "";
                    inner.style.padding = "";
                };
            });

            return () => mm.revert();
        },
        { scope: sectionRef, dependencies: [] }
    );

    return (
        <section ref={sectionRef} id="about" className="relative h-[240vh] overflow-x-clip bg-[#f6f7fb] max-[820px]:h-[200vh]">
            {/* Soft glows */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-0">
                <div className="mf-glow-a absolute -right-[10%] top-[10%] h-[520px] w-[520px] rounded-full bg-[#0b57d0]/10 blur-3xl" />
                <div className="mf-glow-b absolute -left-[12%] top-[45%] h-[460px] w-[460px] rounded-full bg-[#4da3ff]/15 blur-3xl" />
            </div>

            {/* Sticky frame: stays on screen while the words light up */}
            <div ref={innerRef} className="sticky top-0 flex h-[100svh] items-center px-[4.4vw]">
                <p className="mx-auto max-w-[1250px] text-[clamp(30px,5vw,78px)] font-medium leading-[1.12] tracking-[-0.035em] text-[#0b1b3a]">
                    {TOKENS.map((t, i) => (
                        <span
                            key={i}
                            className={`mf-word mr-[0.26em] inline-block opacity-[0.14] ${t.accent ? "text-[#0b57d0]" : ""}`}
                        >
                            {t.text}
                        </span>
                    ))}
                </p>
            </div>
        </section>
    );
}