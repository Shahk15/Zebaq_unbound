import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { FOOTER, FOOTER_LINKS } from "../../data/home/closing";
import { SERVICES } from "../../data/shared/services";
import { SITE } from "../../data/home/site";
import { Pill } from "../common/ui";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Footer() {
    const root = useRef<HTMLElement>(null);
    const { pathname } = useLocation();

    // On the home page hash links stay as they are; on other pages they point back to Home
    const link = (h: string) => (h.startsWith("#") && pathname !== "/" ? `/${h}` : h);

    // The page height changes on every route, so re-measure after the new page has rendered
    useEffect(() => {
        const t = window.setTimeout(() => ScrollTrigger.refresh(), 400);
        return () => window.clearTimeout(t);
    }, [pathname]);

    useGSAP(
        () => {
            const q = gsap.utils.selector(root);
            const mm = gsap.matchMedia();

            mm.add("(prefers-reduced-motion: no-preference)", () => {
                gsap.from(q(".wm > span"), {
                    yPercent: 100,
                    ease: "expo.out",
                    duration: 1.6,
                    stagger: 0.06,
                    scrollTrigger: { trigger: q(".wm")[0], start: "top 95%", once: true },
                });
            });

            return () => mm.revert();
        },
        { scope: root },
    );

    return (
        <footer ref={root} data-dark className="grain relative border-t border-white/10 bg-ink text-off">
            <div className="wrap grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
                <div>
                    <img src="/images/logo/full-logo.png" alt="ZEBAQ" className="h-9 w-auto brightness-0 invert" />
                    <p className="mt-6 text-xl tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
                        {FOOTER.title}
                    </p>
                    <p className="mt-3 text-sm text-glacier-3">{FOOTER.sub}</p>
                    <Pill href={link(FOOTER.cta.href)} variant="lemon" className="mt-5">
                        {FOOTER.cta.label}
                    </Pill>
                    <div className="mt-8 space-y-3 text-sm text-glacier-3">
                        {SITE.offices.map((o) => (
                            <p key={o.entity}>
                                <span className="font-semibold text-off">{o.entity}</span> — {o.address}
                            </p>
                        ))}
                    </div>
                </div>

                <div>
                    <p className="eyebrow text-glacier-3">Services</p>
                    <ul className="mt-6 space-y-2.5 text-sm">
                        {SERVICES.map((s) => (
                            <li key={s.slug}>
                                <a href={`/services/${s.slug}`} data-transition-title={s.short} className="text-glacier-2 hover:text-lemon">
                                    {s.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <p className="eyebrow text-glacier-3">Company</p>
                    <ul className="mt-6 space-y-2.5 text-sm">
                        {FOOTER_LINKS.map((n) => (
                            <li key={n.label}>
                                <a href={link(n.href)} className="text-glacier-2 hover:text-lemon">
                                    {n.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="wrap overflow-hidden">
                <p
                    className="wm flex justify-between text-[24vw] font-semibold leading-[0.78] tracking-[-0.07em] text-glacier/10"
                    style={{ fontFamily: "var(--font-display)" }}
                    aria-hidden="true"
                >
                    {"ZEBAQ".split("").map((c, k) => (
                        <span key={k} className="inline-block transition-colors duration-300 hover:text-lemon">
                            {c}
                        </span>
                    ))}
                </p>
            </div>

            <div className="wrap flex flex-col justify-between gap-4 border-t border-white/10 py-8 text-sm text-glacier-3 md:flex-row">
                <p>© {new Date().getFullYear()} ZEBAQ. All rights reserved.</p>
                <p>Sculpture photography via Unsplash · USA · UK · India</p>
            </div>
        </footer>
    );
}