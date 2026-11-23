import { useEffect, useRef, useState } from "react";
import type { MouseEvent, RefObject } from "react";
import { Link, useLocation } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { CONTACT_EMAIL, NAV, NAV_CTA, SERVICE_LINKS, SOCIALS } from "../../data/shared/navigation";
import type { IconName, NavItem, NavKey } from "../../data/shared/navigation";
import { CASES } from "../../data/home/cases";
import { SITE } from "../../data/home/site";
import { Pill } from "../common/ui";
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

// Big link text: sized by width AND height so five links always fit the screen without scrolling.
// Both flip lines share exactly the same classes so their heights match.
const BIG =
    "text-[clamp(32px,min(4.6vw,7.4vh),68px)] font-medium leading-[1.05] tracking-[-0.045em] pb-[0.08em] [font-family:var(--font-display)]";

// FLIP: the active link rolls up and a lemon copy comes in from below
const ROLL =
    "transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-data-[active=true]:-translate-y-full";

// Icon box on the right rows: on hover it turns transparent with a lemon border and lemon icon
const ROW_ICON =
    "grid shrink-0 place-items-center border border-white/10 bg-white/[0.06] text-white/70 " +
    "transition-colors duration-300 group-hover:border-lemon group-hover:bg-transparent group-hover:text-lemon";

const getSubLinks = (item: NavItem): SubLink[] => {
    if (item.kind === "services") {
        return SERVICE_LINKS.map((s) => ({ label: s.label, href: s.href, icon: s.icon }));
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
        <div className="flex h-full flex-col justify-between gap-10">
            <p className="mm-p-item max-w-[20ch] text-[clamp(28px,min(3vw,5.4vh),46px)] font-medium leading-[1.1] tracking-[-0.04em] text-off [font-family:var(--font-display)]">
                {SITE.tagline}
            </p>
            <div className="mm-p-item flex flex-wrap items-center gap-6">
                <span onClick={onClose}>
                    <Pill href="#contact" variant="lemon">
                        {NAV_CTA}
                    </Pill>
                </span>
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
            <div className="mm-p-item mb-4 flex items-end justify-between">
                <p className="text-[11px] uppercase tracking-[0.25em] text-white/45">
                    Our Services · {SERVICE_LINKS.length}
                </p>
                <Link
                    to="/services"
                    onClick={onClose}
                    className="group inline-flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-white"
                >
                    View all
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
            </div>

            <ul className="grid grid-cols-2 gap-x-10 border-b border-white/10">
                {SERVICE_LINKS.map((s) => (
                    <li key={s.slug} className="mm-p-item border-t border-white/10">
                        <Link
                            to={s.href}
                            onClick={onClose}
                            className="group flex items-center gap-4 py-[clamp(7px,1.3vh,13px)]"
                        >
                            <span className={`${ROW_ICON} h-9 w-9 rounded-xl`}>
                                <NavIcon name={s.icon} className="h-[17px] w-[17px]" />
                            </span>
                            <span className="min-w-0 flex-1">
                                <span className="block text-[16px] font-medium text-white/90 transition duration-300 group-hover:translate-x-1 group-hover:text-lemon">
                                    {s.label}
                                </span>
                                <span className="block truncate text-[12.5px] text-white/45">{s.description}</span>
                            </span>
                            <ArrowRight className="h-4 w-4 -translate-x-2 text-lemon opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

function WorkPanel({ onClose }: PanelProps) {
    return (
        <div>
            <div className="mm-p-item mb-4 flex items-end justify-between">
                <p className="text-[11px] uppercase tracking-[0.25em] text-white/45">
                    Selected work · {CASES.length}
                </p>
                <Link
                    to="/work"
                    onClick={onClose}
                    className="group inline-flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-white"
                >
                    View all
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
            </div>

            <ul className="border-b border-white/10">
                {CASES.map((c, i) => (
                    <li key={c.slug} className="mm-p-item border-t border-white/10">
                        <Link
                            to="/work"
                            onClick={onClose}
                            className="group flex items-center gap-5 py-[clamp(10px,1.9vh,18px)]"
                        >
                            <span className="w-8 shrink-0 font-mono text-sm text-white/40 transition-colors duration-300 group-hover:text-lemon">
                                {String(i + 1).padStart(2, "0")}
                            </span>
                            <span className="min-w-0 flex-1">
                                <span className="block text-[clamp(18px,1.6vw,24px)] font-medium tracking-[-0.03em] text-off transition duration-300 group-hover:translate-x-1 group-hover:text-lemon">
                                    {c.title}
                                </span>
                                <span className="block truncate text-[13px] text-white/45">{c.text}</span>
                            </span>
                            <ArrowRight className="h-5 w-5 -translate-x-2 text-lemon opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

function LinksPanel({ item, onClose }: PanelProps & { item: NavItem }) {
    return (
        <div>
            <p className="mm-p-item mb-4 text-[11px] uppercase tracking-[0.25em] text-white/45">{item.label}</p>
            <ul className="border-b border-white/10">
                {(item.children ?? []).map((c) => (
                    <li key={c.label} className="mm-p-item border-t border-white/10">
                        <Link
                            to={c.href}
                            onClick={onClose}
                            className="group flex items-center gap-5 py-[clamp(10px,2.2vh,22px)]"
                        >
                            <span className={`${ROW_ICON} h-12 w-12 rounded-2xl`}>
                                <NavIcon name={c.icon} className="h-5 w-5" />
                            </span>
                            <span className="min-w-0 flex-1">
                                <span className="block text-[clamp(20px,1.9vw,26px)] font-medium tracking-[-0.03em] text-off transition duration-300 group-hover:translate-x-1 group-hover:text-lemon">
                                    {c.label}
                                </span>
                                <span className="mt-1 block text-[14px] text-white/50">{c.description}</span>
                            </span>
                            <ArrowRight className="h-5 w-5 -translate-x-2 text-lemon opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                        </Link>
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
    const { pathname } = useLocation();

    const [active, setActive] = useState<NavKey>("services"); // desktop: section shown on the right
    const [expanded, setExpanded] = useState<NavKey | null>(null); // mobile: open submenu (closed by default so nothing scrolls)

    // Every link closes the menu. Home on the home page scrolls to the top.
    const go = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
        if (href === "/" && pathname === "/") {
            e.preventDefault();
            window.scrollTo({ top: 0 });
        }
        onClose();
    };

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
                Math.hypot(Math.max(cx, window.innerWidth - cx), Math.max(cy, window.innerHeight - cy)) + 24;

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
                    setExpanded(null);
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
            className="fixed inset-0 z-[60] overflow-y-auto bg-ink text-off"
        >
            <div className="mx-auto flex min-h-full max-w-[1600px] flex-col px-[4.4%] pb-6 pt-[clamp(88px,12vh,124px)]">
                <div className="grid flex-1 items-start gap-10 lg:grid-cols-12">
                    {/* ===== Left: primary links ===== */}
                    <nav aria-label="Menu" className="lg:col-span-5">
                        <ul className={isDesktop ? "flex flex-col" : "border-b border-white/10"}>
                            {NAV.map((item) => {
                                const hasChildren = item.kind !== "link";

                                /* Desktop: hover a link to preview its section on the right, click opens the page */
                                if (isDesktop) {
                                    const isActive = active === item.key;
                                    return (
                                        <li key={item.key}>
                                            <Link
                                                to={item.href}
                                                onClick={(e) => go(e, item.href)}
                                                onMouseEnter={() => setActive(item.key)}
                                                onFocus={() => setActive(item.key)}
                                                data-active={isActive}
                                                className="group flex items-center gap-5 py-[clamp(6px,1.2vh,14px)]"
                                            >
                                                <span className="grid w-8 shrink-0 place-items-center text-white/35 transition-colors duration-300 group-data-[active=true]:text-lemon">
                                                    <NavIcon name={item.icon} className="h-5 w-5" />
                                                </span>

                                                {/* Mask for the entrance, then the flip window */}
                                                <span className="block overflow-hidden">
                                                    <span className="mm-link-inner block">
                                                        <span className="relative block overflow-hidden">
                                                            <span className={`block text-white/35 ${BIG} ${ROLL}`}>{item.label}</span>
                                                            <span
                                                                aria-hidden="true"
                                                                className={`absolute left-0 top-full block text-lemon ${BIG} ${ROLL}`}
                                                            >
                                                                {item.label}
                                                            </span>
                                                        </span>
                                                    </span>
                                                </span>
                                            </Link>
                                        </li>
                                    );
                                }

                                /* Mobile: the label opens the page, the plus button opens the submenu */
                                const isExpanded = expanded === item.key;
                                const labelClass =
                                    "mm-link-inner block text-[clamp(30px,8vw,44px)] font-medium leading-[1.05] tracking-[-0.04em] text-off [font-family:var(--font-display)]";

                                return (
                                    <li key={item.key} className="border-t border-white/10">
                                        <div className="flex items-center gap-3">
                                            <Link
                                                to={item.href}
                                                onClick={(e) => go(e, item.href)}
                                                className="flex min-w-0 flex-1 items-center gap-4 py-3"
                                            >
                                                <span className="grid w-7 shrink-0 place-items-center text-white/40">
                                                    <NavIcon name={item.icon} className="h-5 w-5" />
                                                </span>
                                                <span className="block overflow-hidden pb-[0.08em]">
                                                    <span className={labelClass}>{item.label}</span>
                                                </span>
                                            </Link>

                                            {hasChildren && (
                                                <button
                                                    type="button"
                                                    aria-expanded={isExpanded}
                                                    aria-label={`${isExpanded ? "Hide" : "Show"} ${item.label} links`}
                                                    onClick={() => setExpanded(isExpanded ? null : item.key)}
                                                    className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/15"
                                                >
                                                    <Plus
                                                        className={`h-5 w-5 text-white/70 transition-transform duration-300 ${
                                                            isExpanded ? "rotate-45" : ""
                                                        }`}
                                                    />
                                                </button>
                                            )}
                                        </div>

                                        {hasChildren && (
                                            <div
                                                className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                                                    isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                                                }`}
                                            >
                                                <div className="overflow-hidden">
                                                    <ul className="pb-3 pl-11">
                                                        {getSubLinks(item).map((s) => (
                                                            <li key={s.label}>
                                                                <Link
                                                                    to={s.href}
                                                                    onClick={onClose}
                                                                    className="flex items-center gap-3 py-1.5 text-base text-white/70 transition-colors hover:text-lemon"
                                                                >
                                                                    <NavIcon name={s.icon} className="h-4 w-4 shrink-0 text-white/40" />
                                                                    {s.label}
                                                                </Link>
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
                            <div className="mm-fade mt-6">
                                <span onClick={onClose}>
                                    <Pill href="#contact" variant="lemon">
                                        {NAV_CTA}
                                    </Pill>
                                </span>
                            </div>
                        )}
                    </nav>

                    {/* ===== Right: section preview (desktop only) ===== */}
                    {isDesktop && (
                        <div className="mm-panel border-l border-white/10 pl-12 lg:col-span-7">
                            <div key={active} className="h-full">
                                {active === "home" && <HomePanel onClose={onClose} />}
                                {active === "services" && <ServicesPanel onClose={onClose} />}
                                {active === "work" && <WorkPanel onClose={onClose} />}
                                {(active === "about" || active === "resources") && (
                                    <LinksPanel item={activeItem} onClose={onClose} />
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* ===== Bottom bar ===== */}
                <div className="mm-fade mt-6 flex flex-col gap-3 border-t border-white/10 pt-5 text-sm text-white/55 sm:flex-row sm:items-center sm:justify-between">
                    <span>
                        © {new Date().getFullYear()} {SITE.name}
                    </span>
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