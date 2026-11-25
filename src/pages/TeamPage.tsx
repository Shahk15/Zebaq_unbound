import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Header from "../components/layout/Header";
import { Split } from "../components/common/ui";
import { DotField } from "../components/common/fx";
import { LEADERS, LEADER_GROUP, TEAM, TEAM_GROUP, TEAM_HERO } from "../data/shared/team";
import type { Member } from "../data/shared/team";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const initials = (name: string) =>
    name
        .split(/\s+/)
        .slice(0, 2)
        .map((w) => w[0])
        .join("")
        .toUpperCase();

// Real LinkedIn logo. A link when a profile URL exists, plain logo otherwise.
function LinkedInLogo({ href, name, size = 34 }: { href?: string; name: string; size?: number }) {
    const logo = (
        <svg viewBox="0 0 24 24" width={size} height={size} fill="#0A66C2" aria-hidden="true" className="block rounded-[4px]">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
    );

    if (!href) return <span className="tm-in shrink-0">{logo}</span>;
    return (
        <a
            href={href}
            target="_blank"
            rel="noreferrer"
            aria-label={`${name} on LinkedIn`}
            className="tm-in shrink-0 transition-transform duration-300 hover:-translate-y-0.5"
        >
            {logo}
        </a>
    );
}

// Square photo, or a soft tile with initials until a photo is added
function Portrait({ m, className = "", imgClass = "" }: { m: Member; className?: string; imgClass?: string }) {
    return (
        <div className={`relative aspect-square overflow-hidden bg-[linear-gradient(160deg,#cfe1ee,#e4eef5)] ${className}`}>
            {m.photo ? (
                <img
                    src={m.photo}
                    alt={m.name}
                    loading="lazy"
                    draggable={false}
                    className={`tm-img absolute inset-0 h-full w-full object-cover ${imgClass}`}
                />
            ) : (
                <span
                    aria-hidden="true"
                    className="absolute inset-0 grid place-items-center text-[clamp(44px,5vw,88px)] font-medium tracking-[-0.05em] text-navy/25"
                    style={{ fontFamily: "var(--font-display)" }}
                >
                    {initials(m.name)}
                </span>
            )}
        </div>
    );
}

function GroupHead({ label, title }: { label: string; title: string }) {
    return (
        <div className="tm-gh">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
                <p className="tm-gh-eyebrow eyebrow">{label}</p>
                <h2 className="t-m max-w-[20ch] md:text-right">
                    <Split text={title} />
                </h2>
            </div>
            <div className="tm-hair hair mt-6 origin-left" />
        </div>
    );
}

// Photos always show in black and white. No zoom, so nothing gets cropped.
const IMG_HOVER = "grayscale contrast-[1.05]";

// CEO card: wide, square photo, larger than a team card
function LeaderCard({ m }: { m: Member }) {
    return (
        <li className="tm-lead group" data-cursor="hover">
            <div className="rounded-[32px] border border-navy/10 bg-white p-3 md:p-3.5">
                <Portrait m={m} className="rounded-[24px]" imgClass={IMG_HOVER} />
                <div className="flex items-center justify-between gap-4 px-2.5 pb-2 pt-5">
                    <div className="min-w-0">
                        <h3 className="text-[clamp(22px,2.1vw,32px)] leading-tight">{m.name}</h3>
                        <p className="mt-2 text-[14px] leading-snug text-navy-2">{m.role}</p>
                        {m.bio && <p className="mt-3 max-w-[38ch] text-[13px] leading-relaxed text-navy-2">{m.bio}</p>}
                    </div>
                    <LinkedInLogo href={m.linkedin} name={m.name} size={38} />
                </div>
            </div>
        </li>
    );
}

// Team member card: compact so five fit in one row
function MemberCard({ m }: { m: Member }) {
    return (
        <li className="tm-card group" data-cursor="hover">
            <div className="h-full rounded-[24px] border border-navy/10 bg-white p-2 md:p-2.5">
                <Portrait m={m} className="tm-photo rounded-[18px]" imgClass={IMG_HOVER} />
                <div className="flex items-center justify-between gap-2 px-1.5 pb-1.5 pt-3.5">
                    <div className="min-w-0">
                        <h3 className="text-[clamp(16px,1.25vw,20px)] leading-tight">{m.name}</h3>
                        <p className="mt-1 text-[12.5px] leading-snug text-navy-2">{m.role}</p>
                        {m.bio && <p className="mt-2 hidden max-w-[28ch] text-[11.5px] leading-snug text-navy-2 lg:block">{m.bio}</p>}
                    </div>
                    <LinkedInLogo href={m.linkedin} name={m.name} size={30} />
                </div>
            </div>
        </li>
    );
}

export default function TeamPage() {
    const rootRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const previousTitle = document.title;
        let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
        const previousDescription = meta?.content;
        document.title = "Meet the ZEBAQ Team | Strategy, Marketing & Technology";
        if (!meta) {
            meta = document.createElement("meta");
            meta.name = "description";
            document.head.appendChild(meta);
        }
        meta.content = "Meet the people behind ZEBAQ’s digital strategy, SEO, lead generation, creative and technology delivery.";
        return () => {
            document.title = previousTitle;
            if (meta && previousDescription !== undefined) meta.content = previousDescription;
        };
    }, []);

    useGSAP(
        () => {
            const root = rootRef.current;
            if (!root) return;

            const q = gsap.utils.selector(root);
            const mm = gsap.matchMedia();

            mm.add(
                {
                    motion: "(prefers-reduced-motion: no-preference)",
                    desktop: "(min-width: 821px)",
                },
                (ctx) => {
                    const { motion, desktop } = ctx.conditions as { motion: boolean; desktop: boolean };
                    if (!motion) return;

                    const hero = q(".tm-hero")[0] as HTMLElement;
                    const heroInner = q(".tm-hero-inner")[0] as HTMLElement;
                    const leads = q(".tm-lead") as HTMLElement[];
                    const cards = q(".tm-card") as HTMLElement[];

                    /* ===== Start states ===== */
                    gsap.set(q(".tm-hero .sw > span"), { yPercent: 110 });
                    gsap.set(q(".tm-fade"), { opacity: 0, y: 24 });
                    gsap.set(q(".tm-gh .sw > span"), { yPercent: 110 });
                    gsap.set(q(".tm-gh-eyebrow"), { opacity: 0, y: 16 });
                    gsap.set(q(".tm-hair"), { scaleX: 0 });
                    gsap.set(cards, { opacity: 0, y: 70 });
                    gsap.set(q(".tm-photo"), { clipPath: "inset(100% 0% 0% 0% round 18px)" });
                    gsap.set(q(".tm-in"), { scale: 0 });

                    /* ===== Hero intro: waits until the page curtain has lifted ===== */
                    const intro = () => {
                        gsap
                            .timeline()
                            .to(q(".tm-hero .sw > span"), { yPercent: 0, duration: 1.3, ease: "expo.out", stagger: 0.07 }, 0)
                            .to(q(".tm-fade"), { opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: "power3.out" }, 0.45);

                        // CEO LinkedIn logos pop once their cards are in view
                        gsap.to(q(".tm-lead .tm-in"), {
                            scale: 1,
                            duration: 0.6,
                            stagger: 0.12,
                            ease: "back.out(2.4)",
                            scrollTrigger: { trigger: leads[0], start: "top 65%", once: true },
                        });
                    };

                    let stopWaiting = () => { };
                    if (document.documentElement.dataset.pt === "busy") {
                        const go = () => {
                            stopWaiting();
                            intro();
                        };
                        const fallback = window.setTimeout(go, 3500);
                        window.addEventListener("page:ready", go);
                        stopWaiting = () => {
                            window.clearTimeout(fallback);
                            window.removeEventListener("page:ready", go);
                        };
                    } else {
                        intro();
                    }

                    /* ===== Hero stays pinned and recedes while the team sheet slides over it ===== */
                    if (desktop) {
                        ScrollTrigger.create({
                            trigger: hero,
                            start: "top top",
                            end: "bottom top",
                            pin: true,
                            pinSpacing: false,
                            anticipatePin: 1,
                            invalidateOnRefresh: true,
                        });
                        gsap.to(heroInner, {
                            scale: 0.92,
                            yPercent: -6,
                            opacity: 0.25,
                            transformOrigin: "50% 0%",
                            ease: "none",
                            scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true },
                        });
                    }

                    /* ===== Group headings: eyebrow fades, words rise, hairline draws ===== */
                    (q(".tm-gh") as HTMLElement[]).forEach((gh) => {
                        gsap
                            .timeline({ scrollTrigger: { trigger: gh, start: "top 88%", once: true } })
                            .to(gh.querySelector(".tm-gh-eyebrow"), { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, 0)
                            .to(gh.querySelectorAll(".sw > span"), { yPercent: 0, duration: 1.2, ease: "expo.out", stagger: 0.06 }, 0.05)
                            .to(gh.querySelector(".tm-hair"), { scaleX: 1, duration: 1.4, ease: "power3.inOut" }, 0.2);
                    });

                    /* ===== CEOs: desktop = the two cards fly in from both sides and meet in the middle (scrubbed) ===== */
                    if (desktop) {
                        gsap.fromTo(
                            leads,
                            {
                                x: (i: number) => (i === 0 ? -170 : 170),
                                rotate: (i: number) => (i === 0 ? -6 : 6),
                                y: 90,
                                opacity: 0,
                            },
                            {
                                x: 0,
                                rotate: 0,
                                y: 0,
                                opacity: 1,
                                ease: "power3.out",
                                scrollTrigger: { trigger: leads[0], start: "top 98%", end: "top 52%", scrub: 0.8 },
                            }
                        );
                    } else {
                        gsap.set(leads, { opacity: 0, y: 70 });
                        ScrollTrigger.batch(leads, {
                            start: "top 92%",
                            once: true,
                            onEnter: (batch) =>
                                gsap.to(batch, { opacity: 1, y: 0, duration: 1.2, stagger: 0.15, ease: "expo.out" }),
                        });
                    }

                    /* ===== Team cards: rise in rows, photo unmasks from the bottom, LinkedIn logo pops ===== */
                    ScrollTrigger.batch(cards, {
                        start: "top 92%",
                        once: true,
                        onEnter: (batch) => {
                            const els = batch as HTMLElement[];
                            const photos = els.map((c) => c.querySelector(".tm-photo")).filter(Boolean);
                            const logos = els.map((c) => c.querySelector(".tm-in")).filter(Boolean);
                            gsap
                                .timeline()
                                .to(els, { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: "expo.out" }, 0)
                                .to(
                                    photos,
                                    { clipPath: "inset(0% 0% 0% 0% round 18px)", duration: 1.2, stagger: 0.1, ease: "power4.inOut" },
                                    0.1
                                )
                                .to(logos, { scale: 1, duration: 0.6, stagger: 0.1, ease: "back.out(2.4)" }, 0.8);
                        },
                    });

                    // Layout can shift after fonts and images; re-measure once everything has been created
                    document.fonts?.ready.then(() => ScrollTrigger.refresh());
                    requestAnimationFrame(() => requestAnimationFrame(() => ScrollTrigger.refresh()));

                    return () => stopWaiting();
                }
            );

            return () => mm.revert();
        },
        { scope: rootRef }
    );

    return (
        <div ref={rootRef}>
            <Header />

            <main>
                {/* ===== Hero ===== */}
                <section className="tm-hero relative flex min-h-[78svh] flex-col items-center justify-center overflow-hidden bg-glacier px-[clamp(16px,3.2vw,64px)] pb-[clamp(110px,14vw,190px)] pt-[clamp(130px,18vh,200px)] text-center">
                    {/* Same dot field as the other sections, in navy on this light hero */}
                    <DotField
                        color="70,89,122"
                        accent="227,212,0"
                        interactive
                        top={0.1}
                        className="absolute inset-x-0 top-0 h-full w-full opacity-40"
                    />

                    <div className="tm-hero-inner relative z-10 flex flex-col items-center">
                        <p className="eyebrow tm-fade">{TEAM_HERO.eyebrow}</p>
                        <h1 className="t-xl mt-8">
                            <span className="block">
                                <Split text={TEAM_HERO.line1} />
                            </span>
                            <span className="block">
                                <Split text={TEAM_HERO.line2} dot />
                            </span>
                        </h1>
                        <p className="tm-fade mt-8 max-w-xl text-lg leading-relaxed text-navy-2">{TEAM_HERO.text}</p>
                    </div>

                    <a
                        href="#leadership"
                        aria-label="Scroll to the team"
                        className="tm-fade tm-cue absolute bottom-[clamp(60px,8vw,100px)] left-1/2 z-10 grid h-12 w-12 -translate-x-1/2 place-items-center rounded-full bg-navy text-lemon"
                    >
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M12 5v14M6 13l6 6 6-6" />
                        </svg>
                    </a>
                </section>

                {/* ===== Team sheet: slides up over the hero ===== */}
                <section
                    id="leadership"
                    className="relative z-10 -mt-[clamp(28px,3.4vw,48px)] rounded-t-[clamp(28px,3.4vw,48px)] bg-off pb-[clamp(90px,11vw,170px)] pt-[clamp(70px,8vw,130px)] shadow-[0_-30px_60px_-30px_rgba(7,22,49,0.35)]"
                >
                    <div className="wrap">
                        {/* Two CEOs: wide, square photos, centered */}
                        <GroupHead label={LEADER_GROUP.label} title={LEADER_GROUP.title} />
                        <ul className="mx-auto mt-10 grid max-w-[1040px] grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
                            {LEADERS.map((m, i) => (
                                <LeaderCard key={`${m.role}-${i}`} m={m} />
                            ))}
                        </ul>

                        {/* Team members: five per row from 1280px up */}
                        <div className="mt-[clamp(70px,9vw,140px)]">
                            <GroupHead label={TEAM_GROUP.label} title={TEAM_GROUP.title} />
                            <ul className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 xl:grid-cols-5">
                                {TEAM.map((m, i) => (
                                    <MemberCard key={`${m.role}-${i}`} m={m} />
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}