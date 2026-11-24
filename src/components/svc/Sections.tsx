import { useRef, useState, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { AutoCarousel } from "../common/fx";
import { Arrow } from "../common/ui";
import { SERVICES } from "../../data/shared/services";
import { WORK_ITEMS } from "../../data/work";
import { PLATFORM_NAMES } from "../../data/services/platforms";
import type { ServicePageContent } from "../../data/services/page-types";
import { Cta, Heading, Logo, NameField, Note, Photo } from "./ui";
import { useBiz } from "./store";
import { photo } from "./util";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const PAD = "py-[clamp(80px,10vw,150px)]";

/* ── Platforms we work with ─────────────────────────────────────────── */
export function Platforms({ items }: { items: string[] }) {
    const cards = items.map((s) => (
        <span key={s} className="flex items-center gap-4 rounded-2xl bg-white px-6 py-4 shadow-[inset_0_0_0_1px_rgba(10,31,68,.07)]">
            <Logo slug={s} size={30} />
            <span className="whitespace-nowrap text-lg font-medium tracking-[-0.02em]">{PLATFORM_NAMES[s]?.name ?? s}</span>
        </span>
    ));
    return (
        <section className="relative overflow-hidden bg-off py-[clamp(40px,5vw,72px)] text-navy" aria-label="Platforms we work with">
            <div className="wrap mb-7 flex flex-wrap items-center justify-between gap-4">
                <p className="eyebrow text-navy-2">Platforms we work with</p>
                <a href="#book" className="text-sm font-semibold underline decoration-lemon-deep decoration-2 underline-offset-4">Use something else? Ask us</a>
            </div>
            <AutoCarousel items={[...cards, ...cards].map((c, i) => <div key={i}>{c}</div>)} speed={38} gap={14} />
        </section>
    );
}

/* ── Frame around each service's interactive demo ───────────────────── */
export function DemoFrame({ copy, children }: { copy: ServicePageContent["demoCopy"]; children: ReactNode }) {
    return (
        <section id="demo" className="relative overflow-hidden bg-glacier py-[clamp(64px,7vw,110px)] text-navy">
            <div className="wrap">
                <Heading eyebrow={copy.eyebrow} title={copy.title} text={copy.text} action={<NameField />} />
                <div className="mt-[clamp(28px,3vw,48px)]" data-reveal>{children}</div>
                <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
                    <Cta tone="navy">{copy.cta}</Cta>
                    <a href="#plan" className="text-[15px] font-semibold underline decoration-lemon-deep decoration-2 underline-offset-4">Build my plan first</a>
                    <Note>An illustration of how the service works. Real results depend on your market, offer and budget.</Note>
                </div>
            </div>
        </section>
    );
}

function BenefitText({ it, n }: { it: { t: string; d: string }; n: string }) {
    return (
        <>
            <span className="text-sm tabular-nums opacity-60">{n}</span>
            <div className="mt-10">
                <h3 className="text-[clamp(26px,2.2vw,40px)] leading-[1.04]">{it.t}</h3>
                <p className="mt-4 max-w-[42ch] text-[16px] leading-relaxed opacity-80">{it.d}</p>
            </div>
        </>
    );
}

/* ── Benefits ───────────────────────────────────────────────────────── */
export function Benefits({ data }: { data: ServicePageContent["benefits"] }) {
    const root = useRef<HTMLElement>(null);
    useGSAP(
        () => {
            const mm = gsap.matchMedia();
            mm.add("(prefers-reduced-motion: no-preference)", () => {
                gsap.from(".bn-card", { y: 70, opacity: 0, duration: 1.1, ease: "expo.out", stagger: 0.1, scrollTrigger: { trigger: ".bn-grid", start: "top 82%", once: true } });
                gsap.fromTo(".bn-photo img", { scale: 1.2 }, { scale: 1, ease: "none", scrollTrigger: { trigger: ".bn-photo", start: "top bottom", end: "bottom top", scrub: true } });
            });
            return () => mm.revert();
        },
        { scope: root }
    );
    const [a, b, c, d] = data.items;
    const card = "bn-card flex flex-col justify-between rounded-[28px] p-[clamp(24px,2.4vw,40px)] min-h-[250px]";
    return (
        <section ref={root} className={`relative overflow-hidden bg-off text-navy ${PAD}`}>
            <div className="wrap">
                <Heading eyebrow="What it does for your business" title={data.title} action={<Cta tone="navy">{data.cta}</Cta>} />
                <div className="bn-grid mt-[clamp(36px,4.5vw,72px)] grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <div className={`${card} bg-white`}><BenefitText it={a} n="01" /></div>
                    <div className="bn-card bn-photo relative min-h-[300px] overflow-hidden rounded-[28px] lg:row-span-2"><Photo name={data.photo} className="absolute inset-0" /></div>
                    <div className={`${card} bg-lemon`}><BenefitText it={b} n="02" /></div>
                    <div className={`${card} bg-ink text-off`}><BenefitText it={c} n="03" /></div>
                    <div className={`${card} bg-glacier-2`}><BenefitText it={d} n="04" /></div>
                </div>
            </div>
        </section>
    );
}

/* ── In your world: tap a business, see the change ──────────────────── */
export function Scenes({ data }: { data: ServicePageContent["scenes"] }) {
    const [on, setOn] = useState(0);
    return (
        <section className={`relative overflow-hidden bg-off pt-0 text-navy ${PAD} !pt-0`}>
            <div className="wrap">
                <Heading eyebrow="In your world" title={data.title} text="Choose the one closest to you." />
                <div className="mt-[clamp(36px,4.5vw,72px)] flex flex-col gap-3 lg:h-[min(72svh,640px)] lg:flex-row">
                    {data.items.map((s, i) => (
                        <div
                            key={s.who}
                            onPointerEnter={(e) => e.pointerType === "mouse" && setOn(i)}
                            className={`relative min-w-0 overflow-hidden rounded-[28px] text-off transition-[flex-grow,min-height] duration-700 ease-[cubic-bezier(.2,.8,.2,1)] lg:basis-0 ${on === i ? "min-h-[430px] lg:grow-[3.2]" : "min-h-[110px] lg:grow"}`}
                        >
                            <img src={photo(s.photo)} alt="" loading="lazy" className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ${on === i ? "scale-100" : "scale-105 saturate-[.35]"}`} />
                            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,22,49,.1),rgba(7,22,49,.88))]" />
                            <button type="button" aria-expanded={on === i} onClick={() => setOn(i)} className="absolute inset-0 z-10 text-left">
                                <span className="sr-only">{s.who}</span>
                            </button>
                            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 p-[clamp(20px,2.2vw,36px)]">
                                <h3 className="text-[clamp(24px,2.3vw,42px)] leading-[1.02]">{s.who}</h3>
                                <div className={`grid transition-[grid-template-rows,opacity] duration-500 ${on === i ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                                    <div className="overflow-hidden lg:min-w-[380px]">
                                        <p className="mt-4 max-w-[44ch] text-[15px] leading-relaxed text-glacier-2"><span className="font-semibold text-white">Today: </span>{s.before}</p>
                                        <p className="mt-2 max-w-[44ch] text-[17px] leading-relaxed"><span className="font-semibold text-lemon">With us: </span>{s.after}</p>
                                        <a href="#book" tabIndex={on === i ? 0 : -1} className={`pill pill-lemon mt-6 ${on === i ? "pointer-events-auto" : ""}`}>That&apos;s my business<span className="pill-ic"><Arrow size={16} /></span></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ── Work we have delivered ─────────────────────────────────────────── */
export function Proof({ data }: { data: ServicePageContent["proof"] }) {
    const items = data.slugs.map((s) => WORK_ITEMS.find((w) => w.slug === s)).filter((w) => !!w);
    return (
        <section className={`relative overflow-hidden bg-off text-navy ${PAD}`}>
            <div className="wrap">
                <Heading eyebrow="Real projects" title={data.title} action={<Cta href="/work" tone="navy">See all our work</Cta>} />
                <div className="mt-[clamp(36px,4.5vw,72px)] grid gap-5 md:grid-cols-3" data-cascade>
                    {items.map((w) => (
                        <div key={w.slug}><a href="/work" data-cursor="View" className="group block h-full rounded-[28px] p-5 transition-transform duration-500 hover:-translate-y-2" style={{ backgroundColor: w.surface }}>
                            <span className="block overflow-hidden rounded-[16px] bg-white shadow-[0_30px_50px_-30px_rgba(10,31,68,.6)]">
                                <span className="flex gap-1.5 px-3 py-2"><i className="h-2 w-2 rounded-full bg-navy/15" /><i className="h-2 w-2 rounded-full bg-navy/15" /><i className="h-2 w-2 rounded-full bg-navy/15" /></span>
                                <img src={w.image} alt={`${w.title} website`} loading="lazy" className="aspect-[2.09] w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]" />
                            </span>
                            <span className="mt-6 flex items-end justify-between gap-4 px-1 pb-1">
                                <span>
                                    <span className="block text-[clamp(24px,2vw,34px)] font-medium leading-none tracking-[-0.04em]" style={{ fontFamily: "var(--font-display)" }}>{w.title}</span>
                                    {w.sector && <span className="mt-2 block text-sm text-navy/70">{w.sector}</span>}
                                </span>
                                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-navy text-off transition-transform duration-500 group-hover:rotate-45"><Arrow size={16} /></span>
                            </span>
                        </a></div>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ── Slim call-to-action band between sections ──────────────────────── */
export function CtaBand({ text, label }: { text: string; label: string }) {
    const biz = useBiz("your business");
    return (
        <section className="relative z-10 bg-lemon py-[clamp(28px,3vw,44px)] text-navy">
            <div className="wrap flex flex-col items-start justify-between gap-5 md:flex-row md:items-center">
                <p className="max-w-[24ch] text-[clamp(26px,2.6vw,44px)] font-medium leading-[1.04] tracking-[-0.04em]" style={{ fontFamily: "var(--font-display)" }}>{text.replace("{biz}", biz)}</p>
                <Cta tone="navy">{label}</Cta>
            </div>
        </section>
    );
}

/* ── Questions ──────────────────────────────────────────────────────── */
export function SvcFaq({ items }: { items: ServicePageContent["faq"] }) {
    const [open, setOpen] = useState(0);
    return (
        <section className={`relative overflow-hidden bg-off text-navy ${PAD}`}>
            <div className="wrap grid gap-12 lg:grid-cols-[1fr_1.4fr]">
                <div>
                    <p className="eyebrow text-navy-2" data-reveal>Good to know</p>
                    <h2 className="t-m mt-6 max-w-[12ch]">Questions, answered<span className="dot" /></h2>
                    <p className="mt-6 max-w-sm text-lg text-navy-2">Something else on your mind? Ask it on the call.</p>
                    <div className="mt-7"><Cta tone="navy">Ask us directly</Cta></div>
                </div>
                <ul className="border-b border-navy/10">
                    {items.map((f, i) => (
                        <li key={f.q} className="border-t border-navy/10">
                            <button type="button" aria-expanded={open === i} onClick={() => setOpen(open === i ? -1 : i)} className="flex w-full items-center justify-between gap-6 py-6 text-left text-[clamp(19px,1.5vw,25px)] font-medium tracking-[-0.02em]">
                                {f.q}
                                <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full text-xl font-light transition-all duration-500 ${open === i ? "rotate-45 bg-lemon" : "bg-glacier"}`}>+</span>
                            </button>
                            <div className={`grid transition-[grid-template-rows] duration-500 ${open === i ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                                <div className="overflow-hidden"><p className="max-w-2xl pb-7 text-[17px] leading-relaxed text-navy-2">{f.a}</p></div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}

/* ── Onward to the other services ───────────────────────────────────── */
export function NextServices({ slug }: { slug: string }) {
    const i = SERVICES.findIndex((s) => s.slug === slug);
    const next = [1, 2, 3].map((k) => SERVICES[(i + k) % SERVICES.length]);
    return (
        <section className="relative overflow-hidden bg-off pb-[clamp(80px,9vw,140px)] text-navy">
            <div className="wrap">
                <div className="flex flex-wrap items-end justify-between gap-4">
                    <p className="eyebrow text-navy-2">Works well with</p>
                    <a href="/services" className="text-sm font-semibold underline decoration-lemon-deep decoration-2 underline-offset-4">All ten services</a>
                </div>
                <div className="mt-7 grid gap-4 md:grid-cols-3">
                    {next.map((s) => (
                        <a key={s.slug} href={`/services/${s.slug}`} data-transition-title={s.short} className="group flex min-h-[220px] flex-col justify-between rounded-[28px] bg-white p-7 transition-colors duration-500 hover:bg-navy hover:text-off">
                            <span className="text-sm tabular-nums opacity-60">{s.n}</span>
                            <span className="flex items-end justify-between gap-4">
                                <span>
                                    <span className="block text-[clamp(24px,2.1vw,36px)] font-medium leading-[1.02] tracking-[-0.04em]" style={{ fontFamily: "var(--font-display)" }}>{s.short}</span>
                                    <span className="mt-3 block max-w-[30ch] text-[15px] opacity-75">{s.outcome}</span>
                                </span>
                                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-lemon text-navy transition-transform duration-500 group-hover:rotate-45"><Arrow size={16} /></span>
                            </span>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}
