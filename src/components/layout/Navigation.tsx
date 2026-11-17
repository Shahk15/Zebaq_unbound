import { useCallback, useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { NAV } from "../../data/navigation";
import type { NavItem, NavKey } from "../../data/navigation";
import { SERVICES } from "../../data/services";
import Button from "../common/Button";
import NavIcon, { ArrowRight } from "../common/NavIcon";

type NavigationProps = {
    // Closes any open dropdown (used while the full-screen menu is open)
    disabled?: boolean;
    // Tells the header when a dropdown is open
    onOpenChange?: (open: boolean) => void;
};

// Width of each dropdown card
const PANEL_WIDTH: Partial<Record<NavKey, string>> = {
    services: "max-w-[1120px]",
    about: "max-w-[860px]",
    resources: "max-w-[620px]",
};

const LINK_CLASS =
    "group flex items-center rounded-full px-4 py-3 text-[15px] font-medium text-[#0b1b3a]";

// SHUTTER: the card is revealed from top to bottom when the dropdown opens.
// Negative insets keep the shadow and the rounded corners from being clipped.
const SHUTTER_OPEN = "[clip-path:inset(0px_-120px_-140px_-120px)]";
const SHUTTER_CLOSED = "[clip-path:inset(0px_-120px_100%_-120px)]";

// Icon box: on hover it turns transparent with a blue border and blue icon (no dark fill)
const ICON_BOX =
    "grid shrink-0 place-items-center border border-transparent bg-white text-[#0b1b3a] " +
    "transition-colors duration-300 group-hover:border-[#0b57d0] group-hover:bg-transparent group-hover:text-[#0b57d0]";

// Cards fade and rise one after another once the shutter starts coming down
const itemClass = (open: boolean) =>
    `transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
    }`;

const stagger = (i: number, open: boolean): CSSProperties => ({
    transitionDelay: open ? `${200 + i * 40}ms` : "0ms",
});

/* FLIP: text rolls up on hover (or while its dropdown is open) and a blue copy comes in */
function NavLabel({ label }: { label: string }) {
    const move =
        "transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full group-data-[open=true]:-translate-y-full";
    return (
        <span className="relative block h-[1.4em] overflow-hidden leading-[1.4em]">
            <span className={`block ${move}`}>{label}</span>
            <span className={`absolute left-0 top-full block text-[#0b57d0] ${move}`}>{label}</span>
        </span>
    );
}

type PanelProps = {
    open: boolean;
    onNavigate: () => void;
};

function ServicesPanel({ open, onNavigate }: PanelProps) {
    return (
        <div className="p-3">
            <div className="flex items-center justify-between px-3 pb-3 pt-2">
                <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-[#5d6987]">
                    Our Capabilities
                </p>
                <a
                    href="/services"
                    onClick={onNavigate}
                    className="group inline-flex items-center gap-2 text-sm font-medium text-[#0b57d0]"
                >
                    View all services
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
            </div>

            <ul className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
                {SERVICES.map((s, i) => (
                    <li key={s.slug} className={itemClass(open)} style={stagger(i, open)}>
                        <a
                            href={s.href}
                            onClick={onNavigate}
                            className="group flex items-start gap-4 rounded-2xl p-3"
                        >
                            <span className={`${ICON_BOX} h-12 w-12 rounded-xl`}>
                                <NavIcon name={s.icon} className="h-5 w-5" />
                            </span>
                            <span className="block pt-0.5">
                                <span className="block text-[17px] font-medium leading-tight text-[#0b1b3a] transition-colors duration-300 group-hover:text-[#0b57d0]">
                                    {s.short}
                                </span>
                                <span className="mt-1 block text-sm leading-snug text-[#5d6987]">
                                    {s.description}
                                </span>
                            </span>
                        </a>
                    </li>
                ))}

                {/* CTA tile fills the last two slots */}
                <li
                    className={`md:col-span-2 ${itemClass(open)}`}
                    style={stagger(SERVICES.length, open)}
                >
                    <div className="flex h-full flex-wrap items-center justify-between gap-4 rounded-2xl bg-[#0b1b3a] p-5 text-white">
                        <div>
                            <p className="text-lg font-medium">Not sure where to start?</p>
                            <p className="mt-1 text-sm text-white/60">
                                Tell us your goal and we will map the right services.
                            </p>
                        </div>
                        <Button href="#contact" variant="light" size="sm" arrow="up-right" onClick={onNavigate}>
                            Book a call
                        </Button>
                    </div>
                </li>
            </ul>
        </div>
    );
}

function LinksPanel({ item, open, onNavigate }: PanelProps & { item: NavItem }) {
    const children = item.children ?? [];
    const cols = children.length === 2 ? "md:grid-cols-2" : "md:grid-cols-3";

    return (
        <ul className={`grid grid-cols-1 gap-2 p-3 ${cols}`}>
            {children.map((c, i) => (
                <li key={c.label} className={itemClass(open)} style={stagger(i, open)}>
                    <a
                        href={c.href}
                        onClick={onNavigate}
                        className="group flex items-start gap-4 rounded-2xl p-4"
                    >
                        <span className={`${ICON_BOX} h-14 w-14 rounded-2xl`}>
                            <NavIcon name={c.icon} className="h-6 w-6" />
                        </span>
                        <span className="block pt-1">
                            <span className="block text-lg font-medium leading-tight text-[#0b1b3a] transition-colors duration-300 group-hover:text-[#0b57d0]">
                                {c.label}
                            </span>
                            <span className="mt-1 block text-sm leading-snug text-[#5d6987]">
                                {c.description}
                            </span>
                        </span>
                    </a>
                </li>
            ))}
        </ul>
    );
}

export default function Navigation({ disabled = false, onOpenChange }: NavigationProps) {
    const [active, setActive] = useState<NavKey | null>(null);
    const navRef = useRef<HTMLElement>(null);
    const timer = useRef<number | null>(null);

    const cancelClose = useCallback(() => {
        if (timer.current !== null) {
            window.clearTimeout(timer.current);
            timer.current = null;
        }
    }, []);

    const openPanel = useCallback(
        (key: NavKey) => {
            cancelClose();
            setActive(key);
        },
        [cancelClose]
    );

    // Small delay so the pointer can cross the gap between the link and the panel
    const closeSoon = useCallback(() => {
        cancelClose();
        timer.current = window.setTimeout(() => setActive(null), 160);
    }, [cancelClose]);

    const closeNow = useCallback(() => {
        cancelClose();
        setActive(null);
    }, [cancelClose]);

    useEffect(() => {
        onOpenChange?.(active !== null);
    }, [active, onOpenChange]);

    useEffect(() => {
        if (disabled) closeNow();
    }, [disabled, closeNow]);

    // Close on outside click or Escape
    useEffect(() => {
        if (active === null) return;
        const onDown = (e: PointerEvent) => {
            if (!navRef.current?.contains(e.target as Node)) closeNow();
        };
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") closeNow();
        };
        document.addEventListener("pointerdown", onDown);
        document.addEventListener("keydown", onKey);
        return () => {
            document.removeEventListener("pointerdown", onDown);
            document.removeEventListener("keydown", onKey);
        };
    }, [active, closeNow]);

    useEffect(() => cancelClose, [cancelClose]);

    return (
        <nav ref={navRef} aria-label="Main" className="flex items-center">
            <ul className="flex items-center gap-1">
                {NAV.map((item) => {
                    const isOpen = active === item.key;

                    // Plain link (Home)
                    if (item.kind === "link") {
                        return (
                            <li
                                key={item.key}
                                onPointerEnter={(e) => {
                                    if (e.pointerType === "mouse") closeSoon();
                                }}
                            >
                                <a href={item.href} className={LINK_CLASS}>
                                    <NavLabel label={item.label} />
                                </a>
                            </li>
                        );
                    }

                    // Link with a dropdown panel
                    return (
                        <li
                            key={item.key}
                            onPointerEnter={(e) => {
                                if (e.pointerType === "mouse") openPanel(item.key);
                            }}
                            onPointerLeave={(e) => {
                                if (e.pointerType === "mouse") closeSoon();
                            }}
                        >
                            <button
                                type="button"
                                data-open={isOpen}
                                aria-expanded={isOpen}
                                aria-controls={`dd-${item.key}`}
                                onClick={() => openPanel(item.key)}
                                className={LINK_CLASS}
                            >
                                <NavLabel label={item.label} />
                            </button>

                            {/* Panel is positioned against the header bar (absolute, top-full).
                                The wrapper only toggles visibility; the shutter is on the card. */}
                            <div
                                id={`dd-${item.key}`}
                                className={`absolute inset-x-[4.4%] top-full pt-2 transition-[visibility] duration-[650ms] ${isOpen ? "visible" : "pointer-events-none invisible"
                                    }`}
                            >
                                <div
                                    className={`mx-auto w-full ${PANEL_WIDTH[item.key] ?? "max-w-[860px]"} rounded-[28px] border border-[#0b1b3a]/10 bg-[#eef3fb] shadow-[0_40px_90px_-24px_rgba(11,27,58,0.28)] transition-[clip-path] duration-[650ms] mt-2 ease-[cubic-bezier(0.76,0,0.24,1)] ${isOpen ? SHUTTER_OPEN : SHUTTER_CLOSED
                                        }`}
                                >
                                    {item.kind === "services" ? (
                                        <ServicesPanel open={isOpen} onNavigate={closeNow} />
                                    ) : (
                                        <LinksPanel item={item} open={isOpen} onNavigate={closeNow} />
                                    )}
                                </div>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}