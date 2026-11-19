import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Page names shown in the curtain. Anything missing falls back to the last URL segment.
const TITLES: Record<string, string> = {
    "/about": "About",
    "/services": "Services",
    "/work": "Work",
    "/contact": "Contact",
    "/careers": "Careers",
    "/team": "Our Team",
    "/blog": "Blog",
    "/blogs": "Blogs",
    "/case-studies": "Case Studies",
};

const prettify = (s: string) =>
    decodeURIComponent(s)
        .replace(/[-_]+/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());

const titleFor = (path: string, custom?: string | null) => {
    if (custom) return custom;
    const clean = path.replace(/\/+$/, "") || "/";
    if (TITLES[clean]) return TITLES[clean];
    const last = clean.split("/").filter(Boolean).pop() ?? "";
    return prettify(last);
};

const isHome = (path: string) => (path.replace(/\/+$/, "") || "/") === "/";

export default function PageTransition() {
    const navigate = useNavigate();
    const location = useLocation();

    const rootRef = useRef<HTMLDivElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const busy = useRef(false);
    const pathRef = useRef(location.pathname);

    useEffect(() => {
        pathRef.current = location.pathname;
    }, [location.pathname]);

    useEffect(() => {
        const root = rootRef.current!;
        const panel = panelRef.current!;
        const title = titleRef.current!;

        gsap.set(panel, { yPercent: -100 });
        root.style.visibility = "hidden";

        const reduce = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        const swap = (to: string) => {
            navigate(to);
            window.scrollTo(0, 0);
        };

        const run = (to: string, custom?: string | null) => {
            // Home gets no curtain, and neither does reduced motion
            if (isHome(to) || reduce()) {
                swap(to);
                return;
            }
            if (busy.current) return;
            busy.current = true;

            const label = titleFor(to, custom);
            title.innerHTML = "";
            const line = document.createElement("span");
            line.className = "pt-line";
            [...label].forEach((ch) => {
                const w = document.createElement("span");
                w.className = "pt-ch";
                w.textContent = ch === " " ? "\u00A0" : ch;
                line.appendChild(w);
            });
            const dot = document.createElement("span");
            dot.className = "pt-ch pt-dot";
            dot.textContent = ".";
            line.appendChild(dot);
            title.appendChild(line);

            const chars = title.querySelectorAll<HTMLElement>(".pt-ch");
            root.style.visibility = "visible";
            root.style.pointerEvents = "auto";
            gsap.set(panel, { yPercent: -100 });
            gsap.set(chars, { yPercent: 115 });

            const tl = gsap.timeline({
                onComplete: () => {
                    root.style.visibility = "hidden";
                    root.style.pointerEvents = "none";
                    busy.current = false;
                },
            });

            // 1) Curtain drops from the top, lemon edge leading
            tl.to(panel, { yPercent: 0, duration: 0.85, ease: "power4.inOut" })
                // 2) Page name rises in letter by letter
                .to(chars, { yPercent: 0, duration: 0.9, ease: "expo.out", stagger: 0.04 }, "-=0.25")
                // 3) Swap the route while the screen is fully covered
                .add(() => {
                    swap(to);
                    requestAnimationFrame(() => requestAnimationFrame(() => ScrollTrigger.refresh()));
                }, "+=0.35")
                // 4) Name leaves upward, curtain lifts and reveals the new page
                .to(chars, { yPercent: -115, duration: 0.5, ease: "power3.in", stagger: 0.02 }, "+=0.25")
                .to(panel, { yPercent: -100, duration: 0.95, ease: "power4.inOut" }, "-=0.2")
                .add(() => window.dispatchEvent(new Event("page:ready")), "-=0.55");
        };

        // Catch every internal link click
        const onClick = (e: MouseEvent) => {
            if (e.defaultPrevented || e.button !== 0) return;
            if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
            const a = (e.target as HTMLElement).closest("a");
            if (!a) return;
            if (a.target && a.target !== "_self") return;
            if (a.hasAttribute("download") || a.dataset.noTransition !== undefined) return;

            const url = new URL(a.href, window.location.href);
            if (url.origin !== window.location.origin) return;
            if (url.pathname === pathRef.current && !url.hash) return; // same page
            if (url.hash && url.pathname === pathRef.current) return; // in-page anchor

            e.preventDefault();
            run(url.pathname + url.search + url.hash, a.dataset.transitionTitle);
        };

        document.addEventListener("click", onClick);
        return () => document.removeEventListener("click", onClick);
    }, [navigate]);

    return (
        <div
            ref={rootRef}
            aria-hidden="true"
            className="pointer-events-none fixed inset-0 z-[200] overflow-hidden"
            style={{ visibility: "hidden" }}
        >
            <div ref={panelRef} className="absolute inset-0 grid place-items-center bg-ink will-change-transform">
                {/* Lemon edge that trails the bottom of the curtain */}
                <div className="absolute left-0 right-0 top-full h-[clamp(36px,7vh,72px)] bg-lemon" />

                <div ref={titleRef} className="text-off" />
            </div>

            <style>{`
                .pt-line { display: inline-flex; overflow: hidden; padding: 0.08em 0.04em 0.16em;
                    font-family: var(--font-display, inherit); font-weight: 500;
                    font-size: clamp(56px, 11vw, 190px); line-height: 1; letter-spacing: -0.05em; color: #fff; }
                .pt-ch { display: inline-block; will-change: transform; }
                .pt-dot { color: var(--color-lemon, #F2EA1E); }
            `}</style>
        </div>
    );
}