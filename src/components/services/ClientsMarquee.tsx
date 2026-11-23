import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Split } from "../common/ui";
import { INDUSTRIES, LOGOS, LOGOS_TITLE } from "../../data/shared/logos";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type RowProps = {
    children: ReactNode;
    reverse?: boolean;
    duration?: number;
};

// One endless row: two identical copies, shifted by exactly one copy
function Row({ children, reverse = false, duration = 50 }: RowProps) {
    const track = useRef<HTMLDivElement>(null);
    const tween = useRef<gsap.core.Tween | null>(null);

    useGSAP(
        () => {
            const el = track.current;
            if (!el) return;
            if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

            const t = gsap.fromTo(
                el,
                { xPercent: reverse ? -50 : 0 },
                { xPercent: reverse ? 0 : -50, duration, ease: "none", repeat: -1, paused: true }
            );
            tween.current = t;

            const st = ScrollTrigger.create({
                trigger: el,
                start: "top bottom",
                end: "bottom top",
                onToggle: (self) => (self.isActive ? t.play() : t.pause()),
            });

            return () => {
                st.kill();
                t.kill();
                tween.current = null;
            };
        },
        { scope: track, dependencies: [reverse, duration] }
    );

    return (
        <div
            onPointerEnter={() => tween.current?.pause()}
            onPointerLeave={() => tween.current?.play()}
            className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]"
        >
            <div ref={track} className="flex w-max">
                {[0, 1].map((copy) => (
                    <div key={copy} aria-hidden={copy === 1} className="flex shrink-0 items-center gap-3 pr-3 md:gap-4 md:pr-4">
                        {children}
                    </div>
                ))}
            </div>
        </div>
    );
}

const TILE_NORMAL =
    "group/logo grid h-[92px] w-[170px] shrink-0 place-items-center rounded-2xl bg-off px-6 md:h-[108px] md:w-[210px]";

const TILE_LIGHT =
    "group/logo grid h-[92px] w-[170px] shrink-0 place-items-center rounded-2xl border border-white/10 bg-white/[0.05] px-6 transition-colors duration-500 hover:bg-white/[0.1] md:h-[108px] md:w-[210px]";

const IMG_NORMAL =
    "max-h-[48px] max-w-full object-contain mix-blend-multiply opacity-60 grayscale transition duration-500 group-hover/logo:opacity-100 group-hover/logo:grayscale-0";

const IMG_LIGHT =
    "max-h-[48px] max-w-full object-contain opacity-75 transition duration-500 group-hover/logo:opacity-100";

export default function ClientsMarquee() {
    const root = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            const mm = gsap.matchMedia();
            mm.add(
                {
                    desk: "(min-width: 768px)",
                    motion: "(prefers-reduced-motion: no-preference)",
                },
                (ctx) => {
                    const { desk, motion } = ctx.conditions as { desk: boolean; motion: boolean };
                    if (!motion) return;

                    const section = root.current;
                    if (!section) return;

                    // A lemon hairline draws across the top edge as the section arrives
                    gsap.fromTo(
                        ".cm-line",
                        { scaleX: 0 },
                        { scaleX: 1, ease: "none", scrollTrigger: { trigger: section, start: "top 90%", end: "top 35%", scrub: true } }
                    );

                    // Rounded top corners flatten
                    gsap.fromTo(
                        section,
                        { borderTopLeftRadius: 56, borderTopRightRadius: 56 },
                        {
                            borderTopLeftRadius: 0,
                            borderTopRightRadius: 0,
                            ease: "none",
                            scrollTrigger: { trigger: section, start: "top 95%", end: "top 20%", scrub: true },
                        }
                    );

                    // Heading rises once
                    gsap.from(".cm-head > *", {
                        y: 60,
                        opacity: 0,
                        duration: 1.3,
                        ease: "expo.out",
                        stagger: 0.1,
                        scrollTrigger: { trigger: ".cm-head", start: "top 88%", once: true },
                    });

                    // Rows slide in from opposite sides, tied to the scroll
                    gsap.utils.toArray<HTMLElement>(".cm-rows > *").forEach((row, i) => {
                        gsap.fromTo(
                            row,
                            { x: (i % 2 === 0 ? 1 : -1) * 260, opacity: 0 },
                            {
                                x: 0,
                                opacity: 1,
                                ease: "none",
                                scrollTrigger: { trigger: ".cm-rows", start: `top ${95 - i * 6}%`, end: "top 45%", scrub: true },
                            }
                        );
                    });

                    /* ---------- Desktop: the previous section stays put and sinks while this one slides over it ---------- */
                    if (!desk) return;
                    const prev = section.previousElementSibling as HTMLElement | null;
                    // Skip when the previous section pins itself: two pins would fight each other
                    if (!prev || prev.classList.contains("pin-spacer") || prev.querySelector(".pin-spacer")) return;

                    prev.style.position = "relative";
                    prev.style.zIndex = "1";

                    const shade = document.createElement("div");
                    shade.className = "pointer-events-none absolute inset-0 z-[50] bg-ink opacity-0";
                    prev.appendChild(shade);

                    const tall = () => prev.offsetHeight > window.innerHeight + 2;
                    gsap.timeline({
                        scrollTrigger: {
                            trigger: prev,
                            start: () => (tall() ? "bottom bottom" : "top top"),
                            end: () => `+=${window.innerHeight}`,
                            pin: true,
                            pinSpacing: false,
                            scrub: true,
                            invalidateOnRefresh: true,
                        },
                    })
                        .to(prev, { scale: 0.9, yPercent: tall() ? 0 : -2, transformOrigin: "50% 100%", ease: "none" }, 0)
                        .to(shade, { opacity: 0.6, ease: "none" }, 0);

                    return () => {
                        shade.remove();
                        prev.style.position = "";
                        prev.style.zIndex = "";
                    };
                }
            );
            return () => mm.revert();
        },
        { scope: root }
    );

    const half = Math.ceil(LOGOS.length / 2);
    const rowA = LOGOS.slice(0, half);
    const rowB = LOGOS.slice(half);

    const renderLogo = (l: (typeof LOGOS)[number]) => {
        const light = l.tone === "light";
        return (
            <div key={l.src} className={light ? TILE_LIGHT : TILE_NORMAL}>
                <img src={l.src} alt={l.alt} loading="lazy" draggable={false} className={light ? IMG_LIGHT : IMG_NORMAL} />
            </div>
        );
    };

    return (
        <section
            ref={root}
            id="clients"
            data-dark
            data-index="06"
            data-label="Our Clients"
            className="relative z-10 mb-[4vw] overflow-hidden rounded-t-[56px] bg-ink py-[clamp(80px,10vw,150px)] text-off"
        >
            <span aria-hidden="true" className="cm-line pointer-events-none absolute inset-x-0 top-0 h-[2px] origin-left bg-lemon" />

            <div className="wrap">
                <div className="cm-head flex flex-col justify-between gap-6 md:flex-row md:items-end">
                    <div>
                        <p className="eyebrow text-glacier-3">Our Clients</p>
                        <h2 className="t-xl mt-8 max-w-[16ch]">
                            <Split text={LOGOS_TITLE} />
                        </h2>
                    </div>
                </div>
            </div>

            <div className="cm-rows mt-[clamp(40px,6vw,88px)] flex flex-col gap-3 md:gap-4">
                <Row duration={60}>{rowA.map(renderLogo)}</Row>
                <Row reverse duration={68}>{rowB.map(renderLogo)}</Row>

                <Row duration={90}>
                    {INDUSTRIES.map((name) => (
                        <span
                            key={name}
                            className="whitespace-nowrap rounded-full border border-white/15 px-5 py-2.5 text-sm text-glacier-3 transition-colors duration-300 hover:border-lemon hover:text-lemon"
                        >
                            {name}
                        </span>
                    ))}
                </Row>
            </div>
        </section>
    );
}