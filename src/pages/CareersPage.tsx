import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Header from "../components/layout/Header";
import DotWave from "../components/common/DotWave";
import { Arrow, Split } from "../components/common/ui";
import { useSiteMotion } from "../hooks/useSiteMotion";
import { CAREERS_EMAIL, CAREERS_FAQ, CAREERS_HERO, CAREER_VALUES, OPEN_ROLES } from "../data/careers";
import { TEAM } from "../data/shared/team";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function CareersPage() {
    const root = useRef<HTMLDivElement>(null);
    const [openRole, setOpenRole] = useState(0);
    const [openFaq, setOpenFaq] = useState(0);

    useSiteMotion(root);

    useEffect(() => {
        const prev = document.body.style.backgroundColor;
        document.body.style.backgroundColor = "var(--color-off, #f7f6f1)";
        const previousTitle = document.title;
        let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
        const previousDescription = meta?.content;
        document.title = "Careers at ZEBAQ | Marketing, Creative & Technology";
        if (!meta) {
            meta = document.createElement("meta");
            meta.name = "description";
            document.head.appendChild(meta);
        }
        meta.content = "Explore careers at ZEBAQ across digital marketing, creative, web development and client delivery.";
        return () => {
            document.body.style.backgroundColor = prev;
            document.title = previousTitle;
            if (meta && previousDescription !== undefined) meta.content = previousDescription;
        };
    }, []);

    useGSAP(
        () => {
            const mm = gsap.matchMedia();
            mm.add("(prefers-reduced-motion: no-preference)", () => {
                gsap.set([".ca-eyebrow", ".ca-sub"], { y: 24, opacity: 0 });
                gsap.set(".ca-cta > *", { y: 24, opacity: 0 });
                gsap.set(".ca-title .sw > span", { yPercent: 110 });
                gsap.set(".ca-wave", { opacity: 0, y: 40 });

                const tl = gsap.timeline({ paused: true });
                tl.to(".ca-eyebrow", { y: 0, opacity: 1, duration: 0.8, ease: "expo.out" })
                    .to(".ca-title .sw > span", { yPercent: 0, duration: 1.4, ease: "expo.out", stagger: 0.07 }, "-=0.55")
                    .to(".ca-sub", { y: 0, opacity: 1, duration: 1, ease: "expo.out" }, "-=0.9")
                    .to(".ca-cta > *", { y: 0, opacity: 1, duration: 1, ease: "expo.out", stagger: 0.08 }, "-=0.9")
                    .to(".ca-wave", { opacity: 1, y: 0, duration: 1.6, ease: "power3.out" }, "-=1.2");

                const start = () => tl.play();
                if (document.documentElement.dataset.pt === "busy") window.addEventListener("page:ready", start, { once: true });
                else gsap.delayedCall(0.15, start);

                gsap.timeline({
                    scrollTrigger: {
                        trigger: ".ca-hero",
                        start: "top top",
                        end: "bottom top",
                        pin: true,
                        pinSpacing: false,
                        scrub: true,
                        invalidateOnRefresh: true,
                    },
                })
                    .to(".ca-inner", { scale: 0.92, y: -40, transformOrigin: "50% 100%", ease: "none" }, 0)
                    .to(".ca-shade", { opacity: 0.6, ease: "none" }, 0);

                return () => window.removeEventListener("page:ready", start);
            });
            return () => mm.revert();
        },
        { scope: root }
    );

    return (
        <div ref={root} className="bg-off">
            <Header />
            <main>
                <section
                    data-hero
                    data-dark
                    data-header-solid
                    className="ca-hero relative flex min-h-[100svh] flex-col overflow-hidden bg-ink text-off"
                >
                    <div className="ca-shade pointer-events-none absolute inset-0 z-20 bg-black opacity-0" />
                    <DotWave className="ca-wave pointer-events-none absolute inset-x-0 bottom-0 h-[42%] [mask-image:linear-gradient(to_bottom,transparent,#000_45%)] [-webkit-mask-image:linear-gradient(to_bottom,transparent,#000_45%)]" />

                    <div className="ca-inner wrap relative z-10 flex flex-1 flex-col justify-end pb-[clamp(56px,8vh,96px)] pt-[clamp(96px,11vh,130px)]">
                        <p className="eyebrow ca-eyebrow mb-8 text-glacier-3">{CAREERS_HERO.eyebrow}</p>
                        <h1
                            className="ca-title text-[clamp(46px,8.4vw,150px)] font-light leading-[0.96] tracking-[-0.045em]"
                            style={{ fontFamily: "var(--font-display)" }}
                        >
                            <Split text={CAREERS_HERO.line1} />
                            <br />
                            <Split text={CAREERS_HERO.line2} dot />
                        </h1>

                        <div className="mt-[clamp(28px,4vw,56px)] flex flex-col justify-between gap-8 md:flex-row md:items-end">
                            <p className="ca-sub max-w-[460px] text-[clamp(14px,1.1vw,17px)] leading-[1.7] text-glacier-3">{CAREERS_HERO.text}</p>
                            <div className="ca-cta flex flex-wrap gap-3">
                                <a href={CAREERS_HERO.primary.href} className="group inline-flex items-center gap-4 rounded-full bg-off py-2 pl-6 pr-2 text-sm font-medium text-navy transition-colors duration-300 hover:bg-lemon">
                                    {CAREERS_HERO.primary.label}
                                    <span className="grid h-10 w-10 place-items-center rounded-full bg-ink text-off transition-transform duration-500 group-hover:rotate-45"><Arrow size={16} /></span>
                                </a>
                                <a href={CAREERS_HERO.secondary.href} className="group inline-flex items-center gap-4 rounded-full border border-white/25 py-2 pl-6 pr-2 text-sm font-medium text-off transition-colors duration-300 hover:border-lemon hover:text-lemon">
                                    {CAREERS_HERO.secondary.label}
                                    <span className="grid h-10 w-10 place-items-center rounded-full bg-off text-navy transition-transform duration-500 group-hover:rotate-45"><Arrow size={16} /></span>
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="relative z-10 overflow-hidden rounded-t-[clamp(28px,4vw,56px)] bg-glacier text-navy">
                    <div className="wrap section">
                        <p className="eyebrow text-navy-2" data-reveal>Life at Zebaq</p>
                        <h2 className="t-xl mt-8 max-w-[13ch]">
                            <Split text="Built by people who care about good work" dot />
                        </h2>

                        <div className="mt-[clamp(40px,6vw,88px)] grid gap-5 lg:grid-cols-[1.45fr_0.55fr]">
                            <div className="grid grid-cols-2 gap-3 md:grid-cols-3" data-cascade>
                                {TEAM.slice(0, 6).map((member) => (
                                    <div key={member.name} className="group aspect-square overflow-hidden rounded-[22px] bg-off">
                                        {member.photo ? (
                                            <img src={member.photo} alt={member.name} loading="lazy" className="h-full w-full object-cover grayscale transition duration-700 group-hover:scale-[1.03] group-hover:grayscale-0" />
                                        ) : (
                                            <div className="grid h-full place-items-center text-4xl text-navy/30">{member.name.split(" ").map((word) => word[0]).slice(0, 2).join("")}</div>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <aside className="flex flex-col justify-between rounded-[28px] bg-ink p-[clamp(24px,3vw,44px)] text-off" data-reveal>
                                <p className="text-[clamp(56px,7vw,112px)] font-light leading-none tracking-[-0.06em]" style={{ fontFamily: "var(--font-display)" }}>1 team</p>
                                <div className="mt-16">
                                    <p className="text-xl leading-relaxed text-glacier-2">Strategy, design and technology work together from the first idea through the final result.</p>
                                    <a href="/team" className="mt-8 inline-flex items-center gap-3 text-sm font-medium uppercase tracking-[0.12em] text-lemon">
                                        Meet the team <Arrow size={16} />
                                    </a>
                                </div>
                            </aside>
                        </div>
                    </div>
                </section>

                <section className="relative z-10 overflow-hidden rounded-t-[clamp(28px,4vw,56px)] bg-off text-navy">
                    <div className="wrap section">
                        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
                            <div>
                                <p className="eyebrow text-navy-2" data-reveal>How we work</p>
                                <h2 className="t-xl mt-8"><Split text="Make progress feel shared" dot /></h2>
                            </div>
                            <p className="max-w-sm text-lg leading-relaxed text-navy-2" data-reveal>Good people do their best work with clear goals, honest communication and room to grow.</p>
                        </div>

                        <div className="mt-[clamp(40px,6vw,88px)] grid gap-4 md:grid-cols-3" data-flip>
                            {CAREER_VALUES.map((value) => (
                                <article key={value.n} className="min-h-[280px] rounded-[28px] border border-navy/10 bg-glacier p-[clamp(24px,2.4vw,36px)]">
                                    <span className="text-sm text-navy-2">{value.n}</span>
                                    <div className="mt-12 h-px w-12 bg-lemon-deep" />
                                    <h3 className="mt-7 text-[clamp(24px,2.2vw,34px)] font-medium leading-tight tracking-[-0.04em]">{value.title}</h3>
                                    <p className="mt-4 max-w-[32ch] leading-relaxed text-navy-2">{value.text}</p>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                <section id="open-roles" className="relative z-10 overflow-hidden rounded-t-[clamp(28px,4vw,56px)] bg-ink text-off">
                    <div className="wrap section">
                        <p className="eyebrow text-glacier-3" data-reveal>Open roles</p>
                        <h2 className="t-xl mt-8 max-w-[12ch]"><Split text="Find your place at Zebaq" dot /></h2>

                        <div className="mt-[clamp(40px,6vw,88px)] border-b border-white/15" data-rise>
                            {OPEN_ROLES.map((role, i) => {
                                const on = openRole === i;
                                return (
                                    <article key={role.title} className="border-t border-white/15">
                                        <button
                                            type="button"
                                            onClick={() => setOpenRole(on ? -1 : i)}
                                            aria-expanded={on}
                                            className="grid w-full gap-5 py-7 text-left md:grid-cols-[1fr_auto] md:items-center md:py-9"
                                        >
                                            <div>
                                                <p className="mb-3 text-xs uppercase tracking-[0.16em] text-glacier-3">{role.department} · {role.location}</p>
                                                <h3 className="text-[clamp(24px,3vw,44px)] leading-tight tracking-[-0.04em]">{role.title}</h3>
                                            </div>
                                            <span className={`grid h-12 w-12 place-items-center rounded-full transition duration-500 ${on ? "rotate-45 bg-lemon text-navy" : "border border-white/20"}`}>
                                                <Arrow size={17} />
                                            </span>
                                        </button>
                                        <div className={`grid transition-all duration-500 ${on ? "grid-rows-[1fr] pb-8" : "grid-rows-[0fr]"}`}>
                                            <div className="overflow-hidden">
                                                <div className="flex max-w-3xl flex-col items-start justify-between gap-6 border-t border-white/10 pt-6 md:flex-row md:items-end">
                                                    <div>
                                                        <p className="max-w-xl leading-relaxed text-glacier-2">{role.summary}</p>
                                                        <p className="mt-3 text-sm text-glacier-3">{role.type}</p>
                                                        {role.responsibilities && (
                                                            <div className="mt-5 grid gap-5 sm:grid-cols-2">
                                                                <div>
                                                                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-lemon">Responsibilities</p>
                                                                    <ul className="mt-3 space-y-2 text-sm leading-relaxed text-glacier-2">
                                                                        {role.responsibilities.map((item) => <li key={item}>• {item}</li>)}
                                                                    </ul>
                                                                </div>
                                                                <div>
                                                                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-lemon">Qualifications</p>
                                                                    <ul className="mt-3 space-y-2 text-sm leading-relaxed text-glacier-2">
                                                                        {role.qualifications.map((item) => <li key={item}>• {item}</li>)}
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <a href={CAREERS_EMAIL} className="group inline-flex shrink-0 items-center gap-3 rounded-full bg-lemon py-3 pl-5 pr-3 text-sm font-medium text-navy">
                                                        Apply now
                                                        <span className="grid h-9 w-9 place-items-center rounded-full bg-ink text-off transition-transform duration-500 group-hover:rotate-45"><Arrow size={15} /></span>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </article>
                                );
                            })}
                        </div>
                    </div>
                </section>

                <section className="relative z-10 overflow-hidden rounded-t-[clamp(28px,4vw,56px)] bg-off text-navy">
                    <div className="wrap section grid gap-16 lg:grid-cols-[0.8fr_1.2fr]">
                        <div className="lg:sticky lg:top-32 lg:self-start">
                            <p className="eyebrow" data-reveal>Career questions</p>
                            <h2 className="t-xl mt-8"><Split text="Straight answers" dot /></h2>
                        </div>
                        <div className="border-b border-navy/10" data-rise>
                            {CAREERS_FAQ.map((faq, i) => {
                                const on = openFaq === i;
                                return (
                                    <div key={faq.q} className="border-t border-navy/10">
                                        <h3>
                                            <button type="button" onClick={() => setOpenFaq(on ? -1 : i)} aria-expanded={on} className="flex w-full items-center justify-between gap-6 py-7 text-left text-xl font-medium tracking-tight md:text-2xl" style={{ fontFamily: "var(--font-display)" }}>
                                                <span className="flex gap-5"><span className="pt-1.5 text-sm text-navy-2">0{i + 1}</span>{faq.q}</span>
                                                <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-full transition duration-500 ${on ? "rotate-45 bg-lemon" : "shadow-[inset_0_0_0_1px_rgba(10,31,68,.2)]"}`}><span className="text-xl leading-none">+</span></span>
                                            </button>
                                        </h3>
                                        <div className={`grid transition-all duration-500 ${on ? "grid-rows-[1fr] pb-8" : "grid-rows-[0fr]"}`}>
                                            <p className="overflow-hidden pl-10 pr-14 text-lg leading-relaxed text-navy-2">{faq.a}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                <section className="relative z-10 overflow-hidden bg-glacier text-navy">
                    <div className="wrap section flex flex-col items-start justify-between gap-10 md:flex-row md:items-end">
                        <div>
                            <p className="eyebrow text-navy-2" data-reveal>Don&apos;t see your role?</p>
                            <h2 className="t-xl mt-8 max-w-[12ch]"><Split text="Send us your story" dot /></h2>
                        </div>
                        <a href={CAREERS_EMAIL} className="group inline-flex shrink-0 items-center gap-4 rounded-full bg-ink py-2 pl-6 pr-2 text-sm font-medium text-off transition-colors duration-300 hover:bg-lemon hover:text-navy">
                            Apply by email
                            <span className="grid h-10 w-10 place-items-center rounded-full bg-lemon text-navy transition-transform duration-500 group-hover:rotate-45 group-hover:bg-ink group-hover:text-off"><Arrow size={16} /></span>
                        </a>
                    </div>
                </section>
            </main>
        </div>
    );
}