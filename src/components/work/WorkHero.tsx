import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Split } from "../common/ui";
import { AutoCarousel } from "../common/fx";
import { FEATURED, PAGE_COPY, WORK_FILTERS, WORK_ITEMS, YEARS } from "../../data/work";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// CTA text and links for this hero (change here)
const CTA = {
    primary: { label: "Book a strategy call", href: "/#contact" },
    secondary: { label: "See the projects", href: "#reel" },
};

function ArrowIcon() {
    return (
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M7 17L17 7M9 7h8v8" />
        </svg>
    );
}

/** Small browser-framed thumbnail for the drifting ribbon */
function Thumb({ src, title }: { src: string; title: string }) {
    return (
        <figure className="w-[clamp(240px,min(26vw,46svh),460px)] overflow-hidden rounded-[18px] bg-white shadow-[0_30px_60px_-30px_rgba(10,31,68,.45)]">
            <div className="flex items-center gap-1.5 bg-white px-3 py-2">
                <span className="h-2 w-2 rounded-full bg-navy/15" />
                <span className="h-2 w-2 rounded-full bg-navy/15" />
                <span className="h-2 w-2 rounded-full bg-navy/15" />
                <span className="ml-2 truncate text-[10px] font-medium text-navy/50">{title}</span>
            </div>
            <img src={src} alt="" draggable={false} loading="lazy" className="aspect-[2.09] w-full object-cover object-top" />
        </figure>
    );
}

// 01 — Work hero. Light and airy: headline left, project facts right, and a tilted
// ribbon of real project screens drifting along the bottom. Pinned on scroll: the copy
// lifts away while the ribbon straightens and pushes toward the viewer.
export default function WorkHero() {
    const root = useRef<HTMLElement>(null);
    const disciplines = WORK_FILTERS.filter((f) => f !== "All");

    useGSAP(
        () => {
            const mm = gsap.matchMedia();
            mm.add("(prefers-reduced-motion: no-preference)", () => {
                // hidden start state so nothing flashes before the intro
                gsap.set([".wh-eyebrow", ".wh-sub", ".wh-meta > *", ".wh-cta > *"], { y: 24, opacity: 0 });
                gsap.set(".wh-title .sw > span", { yPercent: 110 });
                gsap.set(".wh-ribbon", { opacity: 0, yPercent: 30 });

                const tl = gsap.timeline({ paused: true });
                tl.to(".wh-eyebrow", { y: 0, opacity: 1, duration: 0.8, ease: "expo.out" })
                    .to(".wh-title .sw > span", { yPercent: 0, duration: 1.4, ease: "expo.out", stagger: 0.07 }, "-=0.55")
                    .to(".wh-sub", { y: 0, opacity: 1, duration: 1, ease: "expo.out" }, "-=0.95")
                    .to(".wh-meta > *", { y: 0, opacity: 1, duration: 1, ease: "expo.out", stagger: 0.06 }, "-=0.9")
                    .to(".wh-cta > *", { y: 0, opacity: 1, duration: 1, ease: "expo.out", stagger: 0.08 }, "-=0.85")
                    .to(".wh-ribbon", { opacity: 1, yPercent: 0, duration: 1.8, ease: "expo.out" }, "-=1.3");

                const start = () => tl.play();
                if (document.documentElement.dataset.pt === "busy") window.addEventListener("page:ready", start, { once: true });
                else gsap.delayedCall(0.15, start);

                // pinned scroll scene
                const desk = window.matchMedia("(min-width: 768px)").matches;
                if (desk) {
                    gsap.set(".wh-tilt", { rotateX: 24, rotateZ: -2.5, transformOrigin: "50% 50%" });
                    // layout distance from the ribbon's resting centre to the middle of the screen
                    const toCentre = () => {
                        const ribbon = root.current!.querySelector<HTMLElement>(".wh-ribbon")!;
                        const tilt = root.current!.querySelector<HTMLElement>(".wh-tilt")!;
                        return window.innerHeight / 2 - (ribbon.offsetTop + tilt.offsetTop + tilt.offsetHeight / 2);
                    };
                    gsap.timeline({ scrollTrigger: { trigger: root.current, start: "top top", end: "+=90%", scrub: 0.7, pin: true, invalidateOnRefresh: true } })
                        // the copy clears early so the rising cards never cross the text
                        .to(".wh-copy", { y: -90, opacity: 0, duration: 0.45, ease: "none" }, 0)
                        // the ribbon flattens, grows and comes to rest in the middle of the screen
                        .to(".wh-tilt", { rotateX: 0, rotateZ: 0, scale: 1.5, y: toCentre, duration: 1, ease: "none" }, 0);
                }
                return () => window.removeEventListener("page:ready", start);
            });
            return () => mm.revert();
        },
        { scope: root }
    );

    const thumbs = [...FEATURED, ...FEATURED].map((w, i) => <Thumb key={`${w.slug}-${i}`} src={w.image} title={w.title} />);

    return (
        <section
            ref={root}
            data-hero
            data-index="01"
            data-label="Work"
            className="relative flex min-h-[100svh] flex-col overflow-hidden lg:h-[100svh] lg:min-h-[600px] bg-[radial-gradient(120%_80%_at_80%_0%,#ffffff_0%,#f7f6f1_45%,#e4eef5_100%)] text-navy"
        >
            <div className="wh-copy wrap relative z-10 grid gap-10 pt-[clamp(96px,13svh,150px)] lg:grid-cols-[1.35fr_1fr] lg:items-end">
                <div>
                    <p className="eyebrow wh-eyebrow mb-[clamp(14px,2.6svh,32px)]">{PAGE_COPY.eyebrow}</p>
                    <h1 className="wh-title text-[clamp(46px,min(8vw,14.5svh),140px)] font-light leading-[0.94] tracking-[-0.05em]" style={{ fontFamily: "var(--font-display)" }}>
                        <Split text={PAGE_COPY.titleLine1} />
                        <br />
                        <Split text={PAGE_COPY.titleLine2} dot />
                    </h1>
                    <p className="wh-sub mt-[clamp(14px,2.4svh,32px)] max-w-[460px] text-[clamp(15px,1.1vw,18px)] leading-[1.7] text-navy-2">{PAGE_COPY.sub}</p>
                </div>

                <div className="flex flex-col gap-[clamp(18px,3svh,32px)] lg:items-end lg:text-right">
                    <dl className="wh-meta grid grid-cols-3 gap-6 border-t border-navy/10 pt-6 lg:w-full lg:max-w-[440px]">
                        <div>
                            <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-navy-2">Projects</dt>
                            <dd className="mt-2 text-[clamp(30px,3vw,46px)] font-medium leading-none tracking-[-0.05em]" style={{ fontFamily: "var(--font-display)" }}>
                                {String(WORK_ITEMS.length).padStart(2, "0")}
                            </dd>
                        </div>
                        <div>
                            <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-navy-2">Years</dt>
                            <dd className="mt-2 text-[clamp(18px,1.6vw,24px)] font-medium leading-tight tracking-[-0.03em]" style={{ fontFamily: "var(--font-display)" }}>{YEARS}</dd>
                        </div>
                        <div>
                            <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-navy-2">Disciplines</dt>
                            <dd className="mt-2 text-[13px] leading-snug text-navy-2">{disciplines.join(" · ")}</dd>
                        </div>
                    </dl>
                    <div className="wh-cta flex flex-wrap gap-3 lg:justify-end">
                        <a href={CTA.primary.href} className="group inline-flex items-center gap-4 rounded-full bg-navy py-2 pl-6 pr-2 text-sm font-medium text-off transition-colors duration-300 hover:bg-ink">
                            {CTA.primary.label}
                            <span className="grid h-10 w-10 place-items-center rounded-full bg-lemon text-navy transition-transform duration-500 group-hover:rotate-45"><ArrowIcon /></span>
                        </a>
                        <a href={CTA.secondary.href} className="group inline-flex items-center gap-4 rounded-full border border-navy/20 py-2 pl-6 pr-2 text-sm font-medium text-navy transition-colors duration-300 hover:border-navy">
                            {CTA.secondary.label}
                            <span className="grid h-10 w-10 place-items-center rounded-full bg-navy text-off transition-transform duration-500 group-hover:rotate-45"><ArrowIcon /></span>
                        </a>
                    </div>
                </div>
            </div>

            {/* the ribbon of real project screens */}
            <div
                className="wh-ribbon relative mt-auto pb-[clamp(20px,6svh,64px)] pt-10 lg:pt-0"
                style={{ perspective: "1600px" }}
            >
                <div className="wh-tilt origin-[50%_100%] [transform:rotateX(24deg)_rotateZ(-2.5deg)]">
                    {/* The edge fade sits on the carousel itself, so it travels and scales with the cards.
                        On the outer box it would clip them once the scroll lifts and enlarges the ribbon.
                        The vertical padding leaves room for the card shadows. */}
                    <AutoCarousel
                        items={thumbs}
                        speed={42}
                        gap={18}
                        className="-my-16 py-20 [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)] [-webkit-mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]"
                    />
                </div>
            </div>
        </section>
    );
}
