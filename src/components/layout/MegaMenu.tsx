import { useEffect, useRef, useState } from "react";
import type { RefObject } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { CONTACT_EMAIL, NAV, SOCIALS } from "../../data/navigation";
import type { IconName, NavItem, NavKey } from "../../data/navigation";
import { SERVICES } from "../../data/services";
import Button from "../common/Button";
import NavIcon, { ArrowRight, Plus } from "../common/NavIcon";

gsap.registerPlugin(useGSAP);

type MegaMenuProps = {
    open: boolean;
    // The hamburger button: the menu grows out of it and shrinks back into it
    originRef: RefObject<HTMLElement | null>;
    onClose: () => void;
};

type PanelProps = { onClose: () => void };

type SubLink = { label: string; href: string; icon: IconName };

// Big link text (both flip lines share exactly the same classes so their heights match)
const BIG =
    "text-[clamp(40px,5.2vw,80px)] font-medium leading-[1.05] tracking-[-0.035em] pb-[0.08em] [font-family:var(--font-heading)]";

// FLIP: the active link rolls up and a blue copy comes in from below
const ROLL =
    "transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-data-[active=true]:-translate-y-full";

// Icon box on the right rows: on hover it turns transparent with a blue border and blue icon
const ROW_ICON =
    "grid shrink-0 place-items-center border border-white/10 bg-white/[0.06] text-white/70 " +
    "transition-colors duration-300 group-hover:border-[#4da3ff] group-hover:bg-transparent group-hover:text-[#4da3ff]";

const getSubLinks = (item: NavItem): SubLink[] => {
    if (item.kind === "services") {
        return SERVICES.map((s) => ({ label: s.short, href: s.href, icon: s.icon }));
    }
    return (item.children ?? []).map((c) => ({ label: c.label, href: c.href, icon: c.icon }));
};

function useIsDesktop() {
    const query = "(min-width: 1024px)";
    const [isDesktop, setIsDesktop] = useState(
        () => typeof window !== "undefined" && window.matchMedia(query).matches
    );
    useEffect(() => {
        const mq = window.matchMedia(query);
        const onChange = () => setIsDesktop(mq.matches);
        mq.addEventListener("change", onChange);
        return () => mq.removeEventListener("change", onChange);
    }, []);
    return isDesktop;
}

/* ---------- Right-hand panels (desktop) ---------- */

function HomePanel({ onClose }: PanelProps) {
    return (
        <div className="flex h-full flex-col justify-between gap-12">
            <p className="mm-p-item max-w-[20ch] text-[clamp(30px,3.2vw,48px)] font-medium leading-[1.1] tracking-[-0.03em] text-white [font-family:var(--font-heading)]">
                We blend strategy, creativity and technology to grow your business.
            </p>
            <div className="mm-p-item flex flex-wrap items-center gap-6">
                <Button href="#contact" variant="light" arrow="up-right" onClick={onClose}>
                    Book a consultation
                </Button>
                <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="text-lg text-white/70 transition-colors hover:text-white"
                >
                    {CONTACT_EMAIL}
                </a>
            </div>
        </div>
    );
}

function ServicesPanel({ onClose }: PanelProps) {
    return (
        <div>
            <div className="mm-p-item mb-5 flex items-end justify-between">
                <p className="text-[11px] uppercase tracking-[0.25em] text-white/45">
                    Our Capabilities · {SERVICES.length} services
                </p>
                <a
                    href="/services"
                    onClick={onClose}
                    className="group inline-flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-white"
                >
                    View all
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
            </div>

            <ul className="grid grid-cols-2 gap-x-10 border-b border-white/10">
                {SERVICES.map((s) => (
                    <li key={s.slug} className="mm-p-item border-t border-white/10">
                        <a href={s.href} onClick={onClose} className="group flex items-center gap-4 py-3.5">
                            <span className={`${ROW_ICON} h-10 w-10 rounded-xl`}>
                                <NavIcon name={s.icon} className="h-[18px] w-[18px]" />
                            </span>
                            <span className="min-w-0 flex-1">
                                <span className="block text-[17px] font-medium text-white/90 transition duration-300 group-hover:translate-x-1 group-hover:text-[#4da3ff]">
                                    {s.short}
                                </span>
                                <span className="block text-[13px] text-white/45">{s.caption}</span>
                            </span>
                            <ArrowRight className="h-4 w-4 -translate-x-2 text-[#4da3ff] opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

function LinksPanel({ item, onClose }: PanelProps & { item: NavItem }) {
    return (
        <div>
            <p className="mm-p-item mb-5 text-[11px] uppercase tracking-[0.25em] text-white/45">
                {item.label}
            </p>
            <ul className="border-b border-white/10">
                {(item.children ?? []).map((c) => (
                    <li key={c.label} className="mm-p-item border-t border-white/10">
                        <a href={c.href} onClick={onClose} className="group flex items-center gap-5 py-6">
                            <span className={`${ROW_ICON} h-14 w-14 rounded-2xl`}>
                                <NavIcon name={c.icon} className="h-6 w-6" />
                            </span>
                            <span className="min-w-0 flex-1">
                                <span className="block text-2xl font-medium tracking-[-0.02em] text-white transition duration-300 group-hover:translate-x-1 group-hover:text-[#4da3ff]">
                                    {c.label}
                                </span>
                                <span className="mt-1 block text-[15px] text-white/50">{c.description}</span>
                            </span>
                            <ArrowRight className="h-5 w-5 -translate-x-2 text-[#4da3ff] opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

/* ---------- Main component ---------- */

export default function MegaMenu({ open, originRef, onClose }: MegaMenuProps) {
    const rootRef = useRef<HTMLDivElement>(null);
    const tlRef = useRef<gsap.core.Timeline | null>(null);
    const wasOpen = useRef(false);
    const justOpened = useRef(false);
    const isDesktop = useIsDesktop();

    const [active, setActive] = useState<NavKey>("services"); // desktop: section shown on the right
    const [expanded, setExpanded] = useState<NavKey | null>("services"); // mobile: open accordion

    /* ----- Open / close: circle grows out of the hamburger button ----- */
    useGSAP(
        () => {
            const ov = rootRef.current;
            const origin = originRef.current;
            if (!ov || !origin) return;

            const r = origin.getBoundingClientRect();
            const cx = r.left + r.width / 2;
            const cy = r.top + r.height / 2;
            const R =
                Math.hypot(
                    Math.max(cx, window.innerWidth - cx),
                    Math.max(cy, window.innerHeight - cy)
                ) + 24;

            tlRef.current?.kill();

            if (open) {
                wasOpen.current = true;
                justOpened.current = true;
                document.body.style.overflow = "hidden";

                const tl = gsap.timeline();
                tlRef.current = tl;
                tl.set(ov, { autoAlpha: 1, clipPath: `circle(0px at ${cx}px ${cy}px)` })
                    .set(".mm-panel", { opacity: 1 })
                    .to(ov, { clipPath: `circle(${R}px at ${cx}px ${cy}px)`, duration: 1.1, ease: "power4.inOut" }, 0)
                    // Big links rise out of their masks
                    .fromTo(".mm-link-inner", { yPercent: 110 }, { yPercent: 0, duration: 1, stagger: 0.07, ease: "expo.out" }, 0.45)
                    .fromTo(".mm-fade", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.06, ease: "power3.out" }, 0.65)
                    .set(ov, { clearProps: "clipPath" });
                return;
            }

            // Skip the very first render (menu has never been opened yet)
            if (!wasOpen.current) return;
            wasOpen.current = false;
            document.body.style.overflow = "";

            const tl = gsap.timeline({
                onComplete: () => {
                    gsap.set(ov, { autoAlpha: 0 });
                    setActive("services");
                    setExpanded("services");
                },
            });
            tlRef.current = tl;
            tl.to(".mm-link-inner", { yPercent: -110, duration: 0.45, stagger: { each: 0.03, from: "end" }, ease: "power3.in" }, 0)
                .to([".mm-fade", ".mm-panel"], { opacity: 0, duration: 0.25 }, 0)
                .fromTo(
                    ov,
                    { clipPath: `circle(${R}px at ${cx}px ${cy}px)` },
                    { clipPath: `circle(0px at ${cx}px ${cy}px)`, duration: 0.85, ease: "power4.inOut" },
                    0.25
                );
        },
        { scope: rootRef, dependencies: [open] }
    );

    /* ----- Panel items rise in whenever the active section changes (desktop) ----- */
    useGSAP(
        () => {
            if (!open || !isDesktop) return;
            const delay = justOpened.current ? 0.7 : 0;
            justOpened.current = false;
            gsap.fromTo(
                ".mm-p-item",
                { opacity: 0, y: 18 },
                { opacity: 1, y: 0, duration: 0.55, stagger: 0.035, ease: "power3.out", delay, overwrite: "auto" }
            );
        },
        { scope: rootRef, dependencies: [active, open, isDesktop] }
    );

    /* ----- Escape closes ----- */
    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open, onClose]);

    /* ----- Never leave the page scroll locked ----- */
    useEffect(() => {
        return () => {
            tlRef.current?.kill();
            document.body.style.overflow = "";
        };
    }, []);

    const activeItem = NAV.find((n) => n.key === active) ?? NAV[0];

    return (
        <div
            ref={rootRef}
            id="site-menu"
            data-lenis-prevent
            aria-hidden={!open}
            style={{ visibility: "hidden" }}
            className="fixed inset-0 z-[60] overflow-y-auto bg-[#0b1b3a] bg-[radial-gradient(70%_50%_at_90%_0%,rgba(41,123,196,0.14),transparent_70%)] text-white"
        >
            <div className="mx-auto flex min-h-full max-w-[1600px] flex-col px-[4.4%] pb-8 pt-[120px] lg:pt-[132px]">
                <div className="grid flex-1 items-start gap-12 lg:grid-cols-12">
                    {/* ===== Left: primary links ===== */}
                    <nav aria-label="Menu" className="lg:col-span-5">
                        <ul className={isDesktop ? "flex flex-col" : "border-b border-white/10"}>
                            {NAV.map((item) => {
                                const hasChildren = item.kind !== "link";

                                /* Desktop: hover a link to preview its section on the right */
                                if (isDesktop) {
                                    const isActive = active === item.key;
                                    return (
                                        <li key={item.key}>
                                            <a
                                                href={item.href}
                                                onClick={onClose}
                                                onMouseEnter={() => setActive(item.key)}
                                                onFocus={() => setActive(item.key)}
                                                data-active={isActive}
                                                className="group flex items-center gap-5 py-[clamp(8px,1.5vh,18px)]"
                                            >
                                                <span className="grid w-8 shrink-0 place-items-center text-white/35 transition-colors duration-300 group-data-[active=true]:text-[#4da3ff]">
                                                    <NavIcon name={item.icon} className="h-5 w-5" />
                                                </span>

                                                {/* Mask for the entrance, then the flip window */}
                                                <span className="block overflow-hidden">
                                                    <span className="mm-link-inner block">
                                                        <span className="relative block overflow-hidden">
                                                            <span className={`block text-white/35 ${BIG} ${ROLL}`}>
                                                                {item.label}
                                                            </span>
                                                            <span
                                                                aria-hidden="true"
                                                                className={`absolute left-0 top-full block text-[#4da3ff] ${BIG} ${ROLL}`}
                                                            >
                                                                {item.label}
                                                            </span>
                                                        </span>
                                                    </span>
                                                </span>
                                            </a>
                                        </li>
                                    );
                                }

                                /* Mobile: accordion */
                                const isExpanded = expanded === item.key;
                                const labelClass =
                                    "mm-link-inner block text-[clamp(34px,9vw,52px)] font-medium leading-[1.05] tracking-[-0.03em] text-white [font-family:var(--font-heading)]";

                                return (
                                    <li key={item.key} className="border-t border-white/10">
                                        {hasChildren ? (
                                            <button
                                                type="button"
                                                aria-expanded={isExpanded}
                                                onClick={() => setExpanded(isExpanded ? null : item.key)}
                                                className="flex w-full items-center gap-4 py-4 text-left"
                                            >
                                                <span className="grid w-7 shrink-0 place-items-center text-white/40">
                                                    <NavIcon name={item.icon} className="h-5 w-5" />
                                                </span>
                                                <span className="block overflow-hidden pb-[0.08em]">
                                                    <span className={labelClass}>{item.label}</span>
                                                </span>
                                                <Plus
                                                    className={`ml-auto h-5 w-5 text-white/70 transition-transform duration-300 ${isExpanded ? "rotate-45" : ""
                                                        }`}
                                                />
                                            </button>
                                        ) : (
                                            <a href={item.href} onClick={onClose} className="flex items-center gap-4 py-4">
                                                <span className="grid w-7 shrink-0 place-items-center text-white/40">
                                                    <NavIcon name={item.icon} className="h-5 w-5" />
                                                </span>
                                                <span className="block overflow-hidden pb-[0.08em]">
                                                    <span className={labelClass}>{item.label}</span>
                                                </span>
                                            </a>
                                        )}

                                        {hasChildren && (
                                            <div
                                                className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                                                    }`}
                                            >
                                                <div className="overflow-hidden">
                                                    <ul className="pb-4 pl-11">
                                                        {getSubLinks(item).map((s) => (
                                                            <li key={s.label}>
                                                                <a
                                                                    href={s.href}
                                                                    onClick={onClose}
                                                                    className="flex items-center gap-3 py-2 text-lg text-white/70 transition-colors hover:text-[#4da3ff]"
                                                                >
                                                                    <NavIcon name={s.icon} className="h-4 w-4 shrink-0 text-white/40" />
                                                                    {s.label}
                                                                </a>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        )}
                                    </li>
                                );
                            })}
                        </ul>

                        {/* Mobile CTA */}
                        {!isDesktop && (
                            <div className="mm-fade mt-8">
                                <Button href="#contact" variant="light" arrow="up-right" onClick={onClose}>
                                    Start a project
                                </Button>
                            </div>
                        )}
                    </nav>

                    {/* ===== Right: section preview (desktop only) ===== */}
                    {isDesktop && (
                        <div className="mm-panel min-h-[420px] border-l border-white/10 pl-12 lg:col-span-7">
                            <div key={active} className="h-full">
                                {active === "home" && <HomePanel onClose={onClose} />}
                                {active === "services" && <ServicesPanel onClose={onClose} />}
                                {(active === "about" || active === "resources") && (
                                    <LinksPanel item={activeItem} onClose={onClose} />
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* ===== Bottom bar ===== */}
                <div className="mm-fade mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-white/55 sm:flex-row sm:items-center sm:justify-between">
                    <span>© {new Date().getFullYear()} Zebaq Pvt Ltd · Bhubaneswar, India</span>
                    <a href={`mailto:${CONTACT_EMAIL}`} className="transition-colors hover:text-white">
                        {CONTACT_EMAIL}
                    </a>
                    <ul className="flex items-center gap-6">
                        {SOCIALS.map((s) => (
                            <li key={s.label}>
                                <a href={s.href} className="transition-colors hover:text-white">
                                    {s.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}