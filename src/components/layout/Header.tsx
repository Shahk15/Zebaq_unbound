import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Button from "../common/Button";
import Navigation from "./Navigation";
import MegaMenu from "./MegaMenu";
import Magnetic from "../common/Magnetic";

gsap.registerPlugin(useGSAP);

type HeaderProps = {
    // Becomes true when the page loader reveals the site
    play?: boolean;
};

export default function Header({ play = true }: HeaderProps) {
    const rootRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLElement>(null);
    const btnRef = useRef<HTMLButtonElement>(null);
    const menuOpenRef = useRef(false);
    const prevMenuOpen = useRef(false);

    const [menuOpen, setMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        menuOpenRef.current = menuOpen;
    }, [menuOpen]);

    /* ---------- Hide header items until the loader reveals ---------- */
    useGSAP(
        () => {
            gsap.set(".hm-item", { opacity: 0, y: -18 });
        },
        { scope: rootRef, dependencies: [] }
    );

    /* ---------- Entrance ---------- */
    useGSAP(
        () => {
            if (!play) return;
            gsap.to(".hm-item", {
                opacity: 1,
                y: 0,
                duration: 0.9,
                stagger: 0.08,
                ease: "power3.out",
                delay: 0.3,
                // Remove the leftover transform: it blurs thin lines and breaks dropdown positioning
                onComplete: () => {
                    gsap.set(".hm-item", { clearProps: "transform,opacity" });
                },
            });
        },
        { scope: rootRef, dependencies: [play] }
    );

    /* ---------- Hamburger <-> cross, logo color ---------- */
    useGSAP(
        () => {
            if (prevMenuOpen.current === menuOpen) return;
            prevMenuOpen.current = menuOpen;

            const tl = gsap.timeline();
            if (menuOpen) {
                tl.to(".hm-nav-fade", { autoAlpha: 0, duration: 0.3 }, 0)
                    .to(".hm-logo", { filter: "brightness(0) invert(1)", duration: 0.5 }, 0.1)
                    .to(".hm-line", { backgroundColor: "#ffffff", duration: 0.4 }, 0.1)
                    .to(".hm-line-top", { y: 8, rotate: 45, duration: 0.6, ease: "power3.inOut" }, 0.2)
                    .to(".hm-line-bot", { y: -8, rotate: -45, duration: 0.6, ease: "power3.inOut" }, 0.2)
                    .to(".hm-line-mid", { scaleX: 0, autoAlpha: 0, duration: 0.3 }, 0.2);
            } else {
                tl.to(".hm-line-top", { y: 0, rotate: 0, duration: 0.5, ease: "power3.inOut" }, 0.3)
                    .to(".hm-line-bot", { y: 0, rotate: 0, duration: 0.5, ease: "power3.inOut" }, 0.3)
                    .to(".hm-line-mid", { scaleX: 1, autoAlpha: 1, duration: 0.4 }, 0.5)
                    .to(".hm-line", { backgroundColor: "#0b1b3a", duration: 0.4 }, 0.4)
                    .to(".hm-logo", { filter: "brightness(1) invert(0)", duration: 0.5 }, 0.4)
                    .to(".hm-nav-fade", { autoAlpha: 1, duration: 0.4 }, 0.6);
            }
        },
        { scope: rootRef, dependencies: [menuOpen] }
    );

    /* ---------- Scroll: blur bar, hide on scroll down, show on scroll up ---------- */
    useEffect(() => {
        let last = window.scrollY;
        let hidden = false;
        const onScroll = () => {
            const y = window.scrollY;
            setScrolled(y > 40);
            if (!menuOpenRef.current && headerRef.current) {
                const shouldHide = y > last && y > 160;
                if (shouldHide !== hidden) {
                    hidden = shouldHide;
                    gsap.to(headerRef.current, {
                        yPercent: hidden ? -110 : 0,
                        duration: 0.5,
                        ease: "power3.out",
                        overwrite: true,
                    });
                }
            }
            last = y;
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const closeMenu = () => setMenuOpen(false);

    // Bar background: solid while a dropdown is open, soft blur after scrolling
    const barBg = menuOpen
        ? ""
        : dropdownOpen
            ? "bg-[#f6f7fb]"
            : scrolled
                ? "bg-[#f6f7fb]/75 shadow-[0_1px_0_rgba(11,27,58,0.06)] backdrop-blur-md"
                : "";

    return (
        <div ref={rootRef}>
            <header ref={headerRef} className="fixed inset-x-0 top-0 z-[70]">
                {/* relative: dropdown panels are positioned against this bar */}
                <div
                    className={`relative flex items-center justify-between px-[4.4%] py-4 transition-[background-color,box-shadow] duration-500 md:grid md:grid-cols-[1fr_auto_1fr] ${barBg}`}
                >
                    {/* Logo */}
                    <a href="#" onClick={closeMenu} aria-label="Zebaq home" className="hm-item flex items-center justify-self-start">
                        <img
                            src="/images/logo/full-logo.png"
                            alt="Zebaq"
                            className="hm-logo h-11 w-auto md:h-[52px]"
                        />
                    </a>

                    {/* Center: desktop navigation with dropdowns */}
                    <div className="hm-item hidden md:block">
                        <div className="hm-nav-fade">
                            <Navigation disabled={menuOpen} onOpenChange={setDropdownOpen} />
                        </div>
                    </div>

                    {/* Right: CTA + hamburger */}
                    <div className="flex items-center gap-3 justify-self-end md:gap-4">
                        <div className="hm-item hidden sm:block">
                            <Magnetic>
                            <Button href="#contact" size="sm" arrow="up-right">
                                Let&apos;s talk
                            </Button>
                            </Magnetic>
                        </div>

                        <button
                            ref={btnRef}
                            type="button"
                            onClick={() => setMenuOpen((v) => !v)}
                            aria-label={menuOpen ? "Close menu" : "Open menu"}
                            aria-expanded={menuOpen}
                            aria-controls="site-menu"
                            className={`hm-item group grid h-11 w-11 place-items-center rounded-full border transition-colors duration-300 ${menuOpen
                                ? "border-white/25 hover:bg-white/10"
                                : "border-[#0b1b3a]/15"
                                }`}
                        >
                            {/* 3 equal lines, 8px pitch (4px multiples stay crisp on 125% / 150% screens) */}
                            <span className="relative block h-[18px] w-[26px]">
                                <span className="hm-line hm-line-top absolute left-0 top-0 block h-[2px] w-full origin-center rounded-full bg-[#0b1b3a]" />
                                {/* Short middle line grows to full width on hover */}
                                <span className="hm-line hm-line-mid absolute right-0 top-[8px] block h-[2px] w-[58%] origin-right rounded-full bg-[#0b1b3a] transition-[width] duration-300 ease-out group-hover:w-full" />
                                <span className="hm-line hm-line-bot absolute left-0 top-[16px] block h-[2px] w-full origin-center rounded-full bg-[#0b1b3a]" />
                            </span>
                        </button>
                    </div>
                </div>
            </header>

            <MegaMenu open={menuOpen} originRef={btnRef} onClose={closeMenu} />
        </div>
    );
}