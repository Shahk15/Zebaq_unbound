import { useRef } from "react";
import type { CSSProperties } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const ICON = "/images/logo/z.png";
const WORD = "/images/logo/ebaq.png";

type LoaderProps = {
    onReveal?: () => void; // fires when the curtain starts opening (start the hero animation here)
    onDone?: () => void;   // fires when the loader can be unmounted
};

export default function Loader({ onReveal, onDone }: LoaderProps) {
    const root = useRef<HTMLDivElement>(null);
    const numRef = useRef<HTMLSpanElement>(null);
    const barRef = useRef<HTMLSpanElement>(null);

    useGSAP(
        (_ctx, contextSafe) => {
            const safe = contextSafe!;
            const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
            if (reduce) {
                onReveal?.();
                onDone?.();
                return;
            }

            document.body.style.overflow = "hidden";
            let introDone = false;
            let exited = false;
            let pageReady = document.readyState === "complete";

            const exit = () => {
                const out = gsap.timeline({ onComplete: () => onDone?.() });

                // Content leaves first
                out
                    .to(".zl-ui", { opacity: 0, duration: 0.35, ease: "power1.in" }, 0)
                    .to(".zl-lockup", { y: -12, opacity: 0, duration: 0.5, ease: "power2.in" }, 0.1)
                    // Curtain splits open
                    .to(".zl-panel-top", { yPercent: -100, duration: 1.1, ease: "power4.inOut" }, 0.5)
                    .to(".zl-panel-bot", { yPercent: 100, duration: 1.1, ease: "power4.inOut" }, 0.5)
                    .add(() => {
                        document.body.style.overflow = "";
                        onReveal?.();
                    }, 0.9);
            };

            const tryExit = safe(() => {
                if (!introDone || !pageReady || exited) return;
                exited = true;
                exit();
            });

            const onLoad = safe(() => {
                pageReady = true;
                tryExit();
            });
            if (!pageReady) window.addEventListener("load", onLoad, { once: true });

            // ----- Intro -----
            const counter = { v: 0 };
            if (numRef.current) numRef.current.textContent = "000";

            const intro = gsap.timeline({
                onComplete: () => {
                    introDone = true;
                    tryExit();
                },
            });

            intro
                // 1) Z mark settles in
                .fromTo(
                    ".zl-icon",
                    { y: 24, opacity: 0, scale: 0.9 },
                    { y: 0, opacity: 1, scale: 1, duration: 1, ease: "expo.out" },
                    0.1
                )
                // 2) EBAQ wipes out from behind the Z
                .fromTo(
                    ".zl-word",
                    { clipPath: "inset(0% 100% 0% 0%)", x: -40, opacity: 0 },
                    { clipPath: "inset(0% 0% 0% 0%)", x: 0, opacity: 1, duration: 1.1, ease: "power3.inOut" },
                    0.6
                )
                // 3) One soft light sweep across the finished logo
                .fromTo(
                    ".zl-shine",
                    { backgroundPosition: "100% 0%" },
                    { backgroundPosition: "0% 0%", duration: 1.1, ease: "power2.inOut", stagger: 0.25 },
                    1.6
                )
                // Counter + progress
                .to(
                    counter,
                    {
                        v: 100,
                        duration: 2.6,
                        ease: "power2.inOut",
                        onUpdate: () => {
                            if (numRef.current) {
                                numRef.current.textContent = String(Math.round(counter.v)).padStart(3, "0");
                            }
                            if (barRef.current) {
                                barRef.current.style.transform = `scaleX(${counter.v / 100})`;
                            }
                        },
                    },
                    0
                );

            return () => {
                window.removeEventListener("load", onLoad);
                document.body.style.overflow = "";
            };
        },
        { scope: root, dependencies: [] }
    );

    // Passes the PNG to CSS so the light sweep is masked to the logo shape
    const mask = (src: string) => ({ "--mask": `url(${src})` } as CSSProperties);

    const shineClass =
        "zl-shine pointer-events-none absolute inset-0 bg-no-repeat " +
        "bg-[linear-gradient(105deg,transparent_35%,rgba(255,255,255,0.9)_50%,transparent_65%)] " +
        "[background-size:300%_100%] [background-position:100%_0%] " +
        "[-webkit-mask:var(--mask)_center/100%_100%_no-repeat] " +
        "[mask:var(--mask)_center/100%_100%_no-repeat]";

    return (
        <div ref={root} aria-hidden="true" className="zl fixed inset-0 z-[9999]">
            {/* Curtain panels */}
            <div className="zl-panel-top absolute inset-x-0 top-0 h-[50.3%] bg-[#f6f7fb] will-change-transform" />
            <div className="zl-panel-bot absolute inset-x-0 bottom-0 h-[50.3%] bg-[#f6f7fb] will-change-transform" />

            {/* Logo + tagline */}
            <div className="absolute inset-0 grid place-items-center">
                <div className="flex flex-col items-center gap-[26px]">
                    {/* Lockup: --h (icon height) drives all sizes */}
                    <div className="zl-lockup flex items-center gap-[calc(var(--h)*0.09)] [--h:clamp(80px,15vw,170px)]">
                        <div className="relative">
                            <div className="zl-icon relative">
                                <img src={ICON} alt="" className="block h-[var(--h)] w-auto" />
                                <span className={shineClass} style={mask(ICON)} />
                            </div>
                        </div>

                        <div className="zl-word relative top-[calc(var(--h)*0.047)]">
                            <img src={WORD} alt="" className="block h-[calc(var(--h)*0.417)] w-auto" />
                            <span className={shineClass} style={mask(WORD)} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Small counter */}
            <div className="zl-ui absolute bottom-[4vh] left-[4.4vw] text-sm font-medium tabular-nums tracking-[0.12em] text-[#0b1b3a]/70">
                <span ref={numRef}>000</span>
                <span className="ml-0.5">%</span>
            </div>

            {/* Progress hairline (navy) */}
            <div className="zl-ui absolute inset-x-0 bottom-0 h-[2px] bg-[#0b1b3a]/10">
                <span ref={barRef} className="block h-full origin-left scale-x-0 bg-[#0b1b3a]" />
            </div>
        </div>
    );
}