import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { SITE } from "../../data/home/site";
import { SERVICES } from "../../data/shared/services";
import { BookingCard } from "./Booking";

// Every "Book a call" / "Contact" link on the site uses one of these
const BOOKING_LINKS = ["#contact", "/#contact", "/contact"];

/**
 * Makes booking links work on every page. Where the page has its own booking section
 * (marked data-booking) the link glides to it; everywhere else the calendar opens in a window.
 */
export default function BookingDialog() {
    const ref = useRef<HTMLDialogElement>(null);
    const [open, setOpen] = useState(false);
    const { pathname } = useLocation();

    useEffect(() => {
        const onClick = (e: MouseEvent) => {
            if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
            const a = (e.target as HTMLElement).closest?.("a");
            const href = a?.getAttribute("href") ?? "";
            if (!a || !BOOKING_LINKS.includes(href)) return;

            const target = document.querySelector("[data-booking]");
            if (target) {
                // "#contact" on a page with a booking section already works; the other two forms would leave the page
                if (href === "#contact") return;
                e.preventDefault();
                const jump = document.createElement("a");
                jump.href = "#contact";
                document.body.append(jump);
                jump.click();
                jump.remove();
                return;
            }
            // a page may have its own "#contact" chapter (Privacy): links inside its text keep going there
            if (href === "#contact" && document.getElementById("contact") && a.closest("main")) return;

            e.preventDefault();
            setOpen(true);
            ref.current?.showModal();
        };
        // window + capture: runs before the page-transition handler, which skips handled clicks
        window.addEventListener("click", onClick, true);
        return () => window.removeEventListener("click", onClick, true);
    }, []);

    // the page behind stays put while the window is open
    useEffect(() => {
        document.documentElement.style.overflow = open ? "hidden" : "";
        return () => {
            document.documentElement.style.overflow = "";
        };
    }, [open]);

    // moving to another page closes it
    useEffect(() => {
        ref.current?.close();
    }, [pathname]);

    return (
        <dialog
            ref={ref}
            data-lenis-prevent
            aria-labelledby="booking-title"
            onClose={() => setOpen(false)}
            onClick={(e) => e.target === e.currentTarget && e.currentTarget.close()}
            className="book-dialog fixed inset-0 m-auto max-h-[94svh] w-[min(760px,calc(100vw-20px))] overflow-y-auto overscroll-contain rounded-[32px] bg-off p-0 text-navy shadow-[0_60px_140px_-40px_rgba(7,22,49,.9)]"
        >
            {open && (
                <div>
                    <div className="sticky top-0 z-10 flex items-start justify-between gap-6 bg-off px-[clamp(22px,3vw,40px)] pb-4 pt-[clamp(20px,2.4vw,32px)]">
                        <div>
                            <p className="eyebrow text-navy-2">Schedule a call or meeting</p>
                            <h2 id="booking-title" className="mt-4 text-[clamp(30px,3.4vw,50px)] leading-[1.02]">Let&apos;s talk about your growth<span className="dot" /></h2>
                        </div>
                        <button type="button" onClick={() => ref.current?.close()} aria-label="Close booking" className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-navy text-2xl font-light text-off transition-colors hover:bg-lemon hover:text-navy">×</button>
                    </div>
                    <div className="px-[clamp(22px,3vw,40px)] pb-[clamp(24px,3vw,40px)]">
                        <BookingCard slug={SERVICES.find((s) => pathname === `/services/${s.slug}`)?.slug} openCalendar />
                        <p className="mt-5 text-[15px] text-navy-2">Prefer email? <a className="font-semibold underline decoration-lemon-deep decoration-2 underline-offset-4" href={`mailto:${SITE.email}`}>{SITE.email}</a></p>
                    </div>
                </div>
            )}
        </dialog>
    );
}
