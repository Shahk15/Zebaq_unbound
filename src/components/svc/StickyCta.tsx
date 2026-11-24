import { useEffect, useState } from "react";

/** Slim bar that follows the visitor after the hero, and steps aside wherever a section has its own buttons */
export default function StickyCta({ label }: { label: string }) {
    const [show, setShow] = useState(false);
    useEffect(() => {
        const on = () => {
            // the demo, pricing and booking have their own buttons, so the bar never covers a control
            const demo = document.getElementById("demo")?.getBoundingClientRect();
            const inDemo = !!demo && demo.top < window.innerHeight * 0.8 && demo.bottom > window.innerHeight * 0.5;
            const plan = document.getElementById("plan")?.getBoundingClientRect();
            setShow(window.scrollY > window.innerHeight * 0.9 && !inDemo && !(plan && plan.top < window.innerHeight * 0.85));
        };
        on();
        window.addEventListener("scroll", on, { passive: true });
        return () => window.removeEventListener("scroll", on);
    }, []);
    return (
        <div className={`fixed bottom-4 left-1/2 z-[60] flex w-max max-w-[calc(100vw-24px)] -translate-x-1/2 md:bottom-6 md:left-auto md:right-6 md:translate-x-0 items-center gap-1.5 rounded-full bg-ink/95 p-1.5 text-off shadow-[0_24px_60px_-20px_rgba(7,22,49,.8)] transition-all duration-500 ${show ? "translate-y-0 opacity-100" : "pointer-events-none invisible translate-y-16 opacity-0"}`}>
            <span className="hidden pl-5 pr-2 text-sm text-glacier-2 xl:block">{label}</span>
            <a href="#plan" className="rounded-full px-4 py-3 text-sm font-semibold transition-colors hover:bg-white/10">See pricing</a>
            <a href="#book" className="rounded-full bg-lemon px-5 py-3 text-sm font-semibold text-navy transition-colors hover:bg-off">Book a call</a>
        </div>
    );
}
