import { Fragment, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SectionReveal from "../common/SectionReveal";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// Replace these filenames with the exact files in public/images/clientslogo/
const LOGOS = [
    { name: "Client 01", src: "/images/clientslogo/abest.png" },
    { name: "Client 02", src: "/images/clientslogo/americancups.png" },
    { name: "Client 03", src: "/images/clientslogo/artistryrecords.png" },
    { name: "Client 04", src: "/images/clientslogo/bigmadre.png" },
    { name: "Client 05", src: "/images/clientslogo/bubbletail.png" },
    { name: "Client 06", src: "/images/clientslogo/chicoschoice.png" },
    { name: "Client 07", src: "/images/clientslogo/Chikopokopo.png" },
    { name: "Client 08", src: "/images/clientslogo/cogleus.png" },
    { name: "Client 09", src: "/images/clientslogo/collibet.png" },
    { name: "Client 10", src: "/images/clientslogo/destination 360.png" },
    { name: "Client 11", src: "/images/clientslogo/DFWLImO.png" },
    { name: "Client 12", src: "/images/clientslogo/gladwyns.png" },
    { name: "Client 13", src: "/images/clientslogo/homedecor.png" },
    { name: "Client 14", src: "/images/clientslogo/honeylemonginger.png" },
    { name: "Client 15", src: "/images/clientslogo/insomnia.png" },
    { name: "Client 16", src: "/images/clientslogo/kashatraining.png" },
    { name: "Client 17", src: "/images/clientslogo/lunarlighting.png" },
    { name: "Client 18", src: "/images/clientslogo/nexusrolls.png" },
    { name: "Client 19", src: "/images/clientslogo/nirvanix.png" },
    { name: "Client 20", src: "/images/clientslogo/palmresidential.png" },
    { name: "Client 21", src: "/images/clientslogo/queensdesign.png" },
    { name: "Client 22", src: "/images/clientslogo/royalblessings.png" },
    { name: "Client 23", src: "/images/clientslogo/tarmind.png" },
    { name: "Client 24", src: "/images/clientslogo/utopia.png" },
    { name: "Client 25", src: "/images/clientslogo/velocitality.png" },
    { name: "Client 26", src: "/images/clientslogo/Zamasama.png" },
];

/* ---------- One row of the logo wall ---------- */

function LogoRow({
    reverse = false,
    className = "",
}: {
    reverse?: boolean;
    className?: string;
}) {
    const trackRef = useRef<HTMLDivElement>(null);
    const tweenRef = useRef<gsap.core.Tween | null>(null);

    useGSAP(
        () => {
            const track = trackRef.current;
            if (!track) return;

            if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

            const tween = gsap.fromTo(
                track,
                { xPercent: reverse ? -50 : 0 },
                {
                    xPercent: reverse ? 0 : -50,
                    duration: reverse ? 48 : 55,
                    ease: "none",
                    repeat: -1,
                    paused: true,
                }
            );
            tweenRef.current = tween;

            // Only run while the row is on screen
            const trigger = ScrollTrigger.create({
                trigger: track,
                start: "top bottom",
                end: "bottom top",
                onEnter: () => tween.play(),
                onEnterBack: () => tween.play(),
                onLeave: () => tween.pause(),
                onLeaveBack: () => tween.pause(),
            });

            // The wall speeds up while the page scrolls fast, then eases back to normal
            let lastY = window.scrollY;
            let boost = 1;
            const tick = () => {
                const y = window.scrollY;
                const delta = Math.abs(y - lastY);
                lastY = y;
                if (tween.paused()) return;
                const target = 1 + Math.min(delta / 12, 5);
                boost += (target - boost) * 0.07;
                tween.timeScale(boost);
            };
            gsap.ticker.add(tick);

            return () => {
                gsap.ticker.remove(tick);
                trigger.kill();
                tween.kill();
                tweenRef.current = null;
            };
        },
        { scope: trackRef, dependencies: [reverse] }
    );

    const pause = () => tweenRef.current?.pause();
    const resume = () => tweenRef.current?.resume();

    return (
        <div
            className={`client-marquee client-row relative ${className}`}
            onMouseEnter={pause}
            onMouseLeave={resume}
        >
            <div ref={trackRef} className="client-track flex w-max items-center gap-5 md:gap-7">
                {[0, 1].map((copy) => (
                    <div
                        key={copy}
                        aria-hidden={copy === 1}
                        className="flex shrink-0 items-center gap-5 md:gap-7"
                    >
                        {LOGOS.map((logo, index) => (
                            // The card never moves. Only the logo goes from grey to its real colors.
                            <div
                                key={`${copy}-${logo.name}-${index}`}
                                className="client-logo group flex h-[100px] w-[180px] shrink-0 items-center justify-center rounded-2xl border border-[#0b1b3a]/[0.07] bg-white px-7 py-6 md:h-[116px] md:w-[220px]"
                            >
                                <img
                                    src={logo.src}
                                    alt={copy === 0 ? logo.name : ""}
                                    loading="lazy"
                                    draggable={false}
                                    className="max-h-[54px] max-w-full object-contain opacity-60 grayscale transition-[filter,opacity] duration-500 ease-out group-hover:opacity-100 group-hover:grayscale-0"
                                />
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

/* ---------- Heading text split into characters (for the typing effect) ---------- */

function TypedLine({ text, className = "" }: { text: string; className?: string }) {
    return (
        <>
            {Array.from(text).map((ch, i) =>
                ch === " " ? (
                    <Fragment key={i}>{" "}</Fragment>
                ) : (
                    <span key={i} className={`type-char ${className}`}>
                        {ch}
                    </span>
                )
            )}
        </>
    );
}

/* ---------- Section ---------- */

export default function Clients() {
    const scopeRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const caretRef = useRef<HTMLSpanElement>(null);
    const rowsRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const heading = headingRef.current;
            const caret = caretRef.current;
            const rowsWrap = rowsRef.current;
            if (!heading || !caret || !rowsWrap) return;

            if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
                gsap.set(caret, { display: "none" });
                return;
            }

            const chars = gsap.utils.toArray<HTMLElement>(".type-char", heading);
            const rows = gsap.utils.toArray<HTMLElement>(".client-row", rowsWrap);

            // Starting states (set before the first paint)
            gsap.set(chars, { opacity: 0 });
            gsap.set(".client-fade", { opacity: 0, y: 30 });
            gsap.set(rows, { opacity: 0, x: (i: number) => (i % 2 === 0 ? 140 : -140) });
            gsap.set(".client-line", { scaleX: 0 });
            gsap.set(".client-foot-item", { opacity: 0, y: 14 });

            // Put the caret right after the character that was just typed
            const moveCaret = (el: HTMLElement) => {
                gsap.set(caret, {
                    opacity: 1,
                    x: el.offsetLeft + el.offsetWidth + 3,
                    y: el.offsetTop + (el.offsetHeight - caret.offsetHeight) / 2,
                });
            };

            /* ----- Heading: typed character by character ----- */
            const typing = gsap.timeline({
                scrollTrigger: { trigger: heading, start: "top 70%", once: true },
            });

            let t = 0.15;
            chars.forEach((ch) => {
                typing.set(ch, { opacity: 1 }, t);
                typing.call(() => moveCaret(ch), undefined, t);
                // Slightly uneven rhythm, with a longer pause after a full stop
                t += 0.045 + Math.random() * 0.04 + (ch.textContent === "." ? 0.3 : 0);
            });

            // Caret blinks a few times and disappears
            typing
                .to(caret, { opacity: 0, duration: 0.45, repeat: 3, yoyo: true, ease: "steps(1)" }, t + 0.05)
                .set(caret, { display: "none" })
                // Supporting paragraph rises in while the heading is still being typed
                .to(".client-fade", { opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: "power3.out" }, 0.6);

            /* ----- Logo rows slide in from opposite sides ----- */
            gsap.to(rows, {
                opacity: 1,
                x: 0,
                duration: 1.3,
                stagger: 0.18,
                ease: "power3.out",
                scrollTrigger: { trigger: rowsWrap, start: "top 88%", once: true },
            });

            /* ----- Bottom line draws itself, details fade in ----- */
            gsap.timeline({
                scrollTrigger: { trigger: ".client-foot", start: "top 95%", once: true },
            })
                .to(".client-line", { scaleX: 1, duration: 1.4, ease: "power3.inOut" }, 0)
                .to(".client-foot-item", { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" }, 0.5);
        },
        { scope: scopeRef, dependencies: [] }
    );

    return (
        <SectionReveal
            id="clients"
            variant="frame"
            panelClassName="bg-[linear-gradient(180deg,#e3ebf8_0%,#f6f7fb_100%)]"
            className="pt-[clamp(75px,9vw,120px)] pb-[clamp(35px,4vw,60px)]"
        >
            <div ref={scopeRef} className="mx-auto max-w-[1600px]">
                {/* Section introduction */}
                <div className="mb-14 px-[4.4vw] md:mb-20">
                    <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
                        <h2
                            ref={headingRef}
                            className="relative max-w-[850px] text-[clamp(38px,6.2vw,84px)] font-bold leading-[0.98] tracking-[-0.055em] text-[#0b1b3a]"
                        >
                            <span className="sr-only">Good work. Lasting partnerships.</span>
                            <span aria-hidden="true">
                                <TypedLine text="Good work." />
                                <br />
                                <TypedLine text="Lasting partnerships." className="gradient-heading" />
                            </span>
                            <span
                                ref={caretRef}
                                aria-hidden="true"
                                className="pointer-events-none absolute left-0 top-0 block h-[0.8em] w-[3px] rounded-full bg-[#0b57d0] opacity-0"
                            />
                        </h2>

                        <p className="client-fade max-w-[310px] text-[15px] leading-[1.7] text-[#5d6987] md:pb-2">
                            Working alongside ambitious businesses to build, strengthen and grow what comes next.
                        </p>
                    </div>
                </div>

                {/* Moving logo wall */}
                <div ref={rowsRef} className="flex flex-col gap-5 md:gap-7">
                    <LogoRow />
                    <LogoRow reverse className="md:translate-x-[-5%]" />
                </div>

                {/* Bottom detail */}
                <div className="client-foot mt-10 px-[4.4vw]">
                    <div className="client-line h-px origin-left bg-[#0b1b3a]/10" />
                    <div className="flex items-center justify-between pt-5">
                        <span className="client-foot-item text-[10px] uppercase tracking-[0.2em] text-[#5d6987]">
                            Built on collaboration
                        </span>
                        <span className="client-foot-item font-mono text-xs text-[#0b57d0]">
                            ZEBAQ / PARTNERS
                        </span>
                    </div>
                </div>
            </div>
        </SectionReveal>
    );
}