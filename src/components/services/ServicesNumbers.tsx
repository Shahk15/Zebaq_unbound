import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Arrow, Split } from "../common/ui";
import { NUMBERS } from "../../data/services";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Stat = (typeof NUMBERS.stats)[number];

function StatCard({ s }: { s: Stat }) {
    const videoRef = useRef<HTMLVideoElement>(null);

    const play = () => {
        videoRef.current?.play().catch(() => { });
    };
    const stop = () => {
        videoRef.current?.pause();
    };

    return (
        <li className="sn-card">
            <div
                tabIndex={0}
                onPointerEnter={play}
                onPointerLeave={stop}
                onFocus={play}
                onBlur={stop}
                className="group aspect-[4/5] outline-none [perspective:1400px] lg:aspect-[3/4]"
            >
                <div className="relative h-full w-full transition-transform duration-[900ms] ease-[cubic-bezier(0.2,0.7,0.2,1)] [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] group-focus-visible:[transform:rotateY(180deg)]">
                    {/* ---------- Front: the number ---------- */}
                    <div className="absolute inset-0 flex flex-col justify-between overflow-hidden rounded-[24px] bg-glacier p-[clamp(18px,2vw,28px)] [backface-visibility:hidden]">
                        <div className="flex items-start justify-between">
                            <span className="h-2 w-2 rounded-full bg-lemon-deep" />
                            <span className="grid h-9 w-9 place-items-center rounded-full border border-navy/25 text-navy">
                                <Arrow />
                            </span>
                        </div>

                        <div>
                            <p
                                className="text-[clamp(44px,5.2vw,92px)] font-medium leading-none tracking-[-0.05em] text-navy"
                                style={{ fontFamily: "var(--font-display)" }}
                            >
                                <span className="sn-num" data-to={s.value}>{s.value}</span>
                                {s.suffix}
                            </p>
                            <p className="mt-3 text-[clamp(14px,1.1vw,17px)] leading-[1.35] text-navy">{s.label}</p>
                        </div>
                    </div>

                    {/* ---------- Back: photo or video with a short note ---------- */}
                    <div className="absolute inset-0 overflow-hidden rounded-[24px] bg-ink [backface-visibility:hidden] [transform:rotateY(180deg)]">
                        {s.video ? (
                            <video
                                ref={videoRef}
                                src={s.video}
                                poster={s.image}
                                muted
                                loop
                                playsInline
                                preload="none"
                                className="absolute inset-0 h-full w-full object-cover"
                            />
                        ) : (
                            s.image && <img src={s.image} alt="" loading="lazy" draggable={false} className="absolute inset-0 h-full w-full object-cover" />
                        )}
                        <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(6,16,38,0.88)_0%,rgba(6,16,38,0.25)_55%,transparent_80%)]" />

                        <div className="absolute inset-x-0 bottom-0 p-[clamp(18px,2vw,28px)]">
                            <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-lemon">
                                <span className="h-1.5 w-1.5 rounded-full bg-lemon" />
                                {s.value}
                                {s.suffix} {s.label}
                            </p>
                            <p className="mt-3 max-w-[28ch] text-[clamp(14px,1.1vw,16px)] leading-[1.55] text-off">{s.note}</p>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    );
}

export default function ServicesNumbers() {
    const root = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            const mm = gsap.matchMedia();
            mm.add("(prefers-reduced-motion: no-preference)", () => {
                // Heading row rises once
                gsap.from(".sn-head > *", {
                    y: 60,
                    opacity: 0,
                    duration: 1.3,
                    ease: "expo.out",
                    stagger: 0.12,
                    scrollTrigger: { trigger: ".sn-head", start: "top 88%", once: true },
                });

                // Cards fan up from below with a slight tilt, tied to the scroll
                const cards = gsap.utils.toArray<HTMLElement>(".sn-card");
                gsap.timeline({
                    scrollTrigger: { trigger: ".sn-grid", start: "top 95%", end: "top 40%", scrub: true },
                }).fromTo(
                    cards,
                    { y: 150, rotate: (i: number) => (i - 1.5) * 5, opacity: 0 },
                    { y: 0, rotate: 0, opacity: 1, ease: "none", stagger: 0.18 }
                );

                // Counters run once when the cards are in view
                gsap.utils.toArray<HTMLElement>(".sn-num").forEach((el) => {
                    const to = Number(el.dataset.to) || 0;
                    const o = { v: 0 };
                    el.textContent = "0";
                    gsap.to(o, {
                        v: to,
                        duration: 1.8,
                        ease: "power3.out",
                        onUpdate: () => {
                            el.textContent = String(Math.round(o.v));
                        },
                        scrollTrigger: { trigger: ".sn-grid", start: "top 75%", once: true },
                    });
                });
            });
            return () => mm.revert();
        },
        { scope: root }
    );

    return (
        <section ref={root} id="numbers" data-index="04" data-label="In Numbers" className="relative z-10 bg-off py-[clamp(80px,10vw,150px)] text-navy">
            <div className="wrap">
                {/* Heading left, text and button right */}
                <div className="sn-head flex flex-col justify-between gap-8 md:flex-row md:items-end">
                    <div>
                        <p className="eyebrow text-navy-2">{NUMBERS.label}</p>
                        <h2 className="t-xl mt-6">
                            <Split text={NUMBERS.heading} dot />
                        </h2>
                    </div>

                    <div className="flex flex-col items-start gap-6 md:items-end md:text-right">
                        <p className="max-w-[340px] text-[15px] leading-[1.65] text-navy-2">{NUMBERS.text}</p>
                        <a
                            href={NUMBERS.cta.href}
                            className="group inline-flex w-fit items-center gap-4 rounded-full bg-ink py-2 pl-6 pr-2 text-sm font-medium text-off transition-colors duration-300 hover:bg-lemon hover:text-navy"
                        >
                            {NUMBERS.cta.label}
                            <span className="grid h-10 w-10 place-items-center rounded-full bg-lemon text-navy transition-transform duration-500 group-hover:rotate-45">
                                <Arrow />
                            </span>
                        </a>
                    </div>
                </div>

                {/* Stat cards */}
                <ul className="sn-grid mt-[clamp(40px,6vw,88px)] grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4">
                    {NUMBERS.stats.map((s) => (
                        <StatCard key={s.label} s={s} />
                    ))}
                </ul>
            </div>
        </section>
    );
}