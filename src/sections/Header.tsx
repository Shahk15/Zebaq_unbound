import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { NAV, NAV_CTA, SERVICES, SITE } from "../content";
import { Arrow, Dot, Pill } from "../components/ui";

export default function Header() {
  const [hidden, setHidden] = useState(false);
  const [dark, setDark] = useState(false);
  const [open, setOpen] = useState(false);
  const menu = useRef<HTMLDivElement>(null);

  // hide on scroll down, and flip colours over [data-dark] sections
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > last && y > 300);
      last = y;
      const under = document.elementsFromPoint(window.innerWidth / 2, 44).find((el) => !el.closest("header"));
      // the hero fades to navy while pinned — treat it as dark once the fade is mostly in
      const veil = document.querySelector<HTMLElement>(".hz-veil");
      const veilOn = !!veil && Number(getComputedStyle(veil).opacity) > 0.5 && veil.getBoundingClientRect().top <= 44 && veil.getBoundingClientRect().bottom > 44;
      setDark(veilOn || !!under?.closest("[data-dark]"));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menu.current) return;
    document.body.style.overflow = open ? "hidden" : "";
    if (open) {
      gsap.fromTo(menu.current, { clipPath: "circle(0% at 96% 4%)" }, { clipPath: "circle(150% at 96% 4%)", duration: 0.9, ease: "expo.inOut" });
      gsap.from(menu.current.querySelectorAll(".mi > span"), { yPercent: 110, duration: 1, ease: "expo.out", stagger: 0.05, delay: 0.3 });
    }
  }, [open]);

  const tone = dark && !open ? "text-off" : "text-navy";

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-[60] transition-transform duration-700 ${hidden && !open ? "-translate-y-full" : ""}`}>
        <div className={`wrap flex h-[84px] items-center justify-between transition-colors duration-500 ${open ? "text-off" : tone}`}>
          <div className="flex items-center gap-5">
            <a href="#top" aria-label="ZEBAQ home" className="flex items-center" onClick={() => setOpen(false)}>
              <img src="/images/logo/full-logo.png" alt="ZEBAQ" className={`h-8 w-auto transition md:h-9 ${dark || open ? "brightness-0 invert" : ""}`} />
            </a>
            <span className="hidden items-center gap-2 rounded-full px-3.5 py-2 text-[13px] font-medium shadow-[inset_0_0_0_1px_currentColor] xl:inline-flex" style={{ opacity: 0.85 }}>
              <span className="h-2 w-2 rounded-full bg-[#34c759]" style={{ animation: "pulse-dot 2s infinite" }} />
              Booking strategy calls
            </span>
          </div>

          <nav className="hidden items-center gap-8 whitespace-nowrap xl:flex" aria-label="Primary">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} className="group relative text-[15px] font-medium">
                {n.label}
                <span className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-current transition-transform duration-500 group-hover:origin-left group-hover:scale-x-100" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex">
              <Pill href="#contact" variant={dark || open ? "lemon" : "navy"} className="!py-1.5 !pl-5">
                {NAV_CTA}
              </Pill>
            </span>
            <button onClick={() => setOpen((v) => !v)} aria-expanded={open} aria-label="Menu" className="grid h-12 w-12 place-items-center" data-cursor="hover">
              <span className="relative block h-3 w-7">
                <span className={`absolute right-0 h-[1.5px] bg-current transition-all duration-500 ${open ? "top-1.5 w-7 rotate-45" : "top-0 w-7"}`} />
                <span className={`absolute right-0 h-[1.5px] bg-current transition-all duration-500 ${open ? "top-1.5 w-7 -rotate-45" : "top-3 w-4"}`} />
              </span>
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div ref={menu} className="fixed inset-0 z-[55] overflow-y-auto bg-ink text-off" data-dark>
          <div className="wrap grid min-h-full gap-16 pb-12 pt-32 lg:grid-cols-[1.3fr_1fr]">
            <nav className="flex flex-col" aria-label="Menu">
              {[...NAV, { label: NAV_CTA, href: "#contact" }].map((n, i) => (
                <a key={n.href} href={n.href} onClick={() => setOpen(false)} className="mi group flex items-baseline gap-6 overflow-hidden py-1">
                  <span className="inline-block text-[clamp(44px,7vw,104px)] font-medium leading-[1.02] tracking-[-0.05em] transition-colors group-hover:text-lemon" style={{ fontFamily: "var(--font-display)" }}>
                    <span className="mr-5 align-top text-sm tracking-normal text-glacier-3">0{i + 1}</span>
                    {n.label}
                  </span>
                </a>
              ))}
            </nav>
            <div className="flex flex-col justify-between gap-12 lg:pt-6">
              <div>
                <p className="eyebrow text-glacier-3">Services</p>
                <ul className="mt-6 grid gap-2 text-glacier-2">
                  {SERVICES.map((s) => (
                    <li key={s.slug}><a href="#services" onClick={() => setOpen(false)} className="hover:text-lemon">{s.short}</a></li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-3xl font-medium tracking-tight" style={{ fontFamily: "var(--font-display)" }}>Let's build what fits your business<Dot /></p>
                <a href={`mailto:${SITE.email}`} className="mt-4 inline-flex items-center gap-2 text-glacier-2 hover:text-lemon">{SITE.email} <Arrow size={14} /></a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
