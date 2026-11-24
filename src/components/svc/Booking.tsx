import { useState, type FormEvent } from "react";
import { Arrow, Split } from "../common/ui";
import { SITE } from "../../data/home/site";
import { SERVICES } from "../../data/shared/services";
import { Chips, Logo, Note } from "./ui";
import { setPlan, useVisitor } from "./store";

const ENDPOINT: string = import.meta.env.VITE_LEAD_ENDPOINT || SITE.leadEndpoint;
const CALENDLY = "https://calendly.com/zebaq/30min";
const MODES = ["Pick a time", "Request a callback"] as const;
const MEET = ["Video meeting", "Phone call"] as const;
const WHEN = ["Morning", "Afternoon", "Evening"] as const;

/** The booking card: live calendar, or leave details and a preferred time. Used in the section and in the site-wide window. */
export function BookingCard({ slug, openCalendar = false }: { slug?: string; openCalendar?: boolean }) {
    const { name, plan } = useVisitor();
    const service = SERVICES.find((s) => s.slug === slug);
    const [mode, setMode] = useState<(typeof MODES)[number]>("Pick a time");
    const [meet, setMeet] = useState<(typeof MEET)[number]>("Video meeting");
    const [when, setWhen] = useState<(typeof WHEN)[number]>("Morning");
    const [showCal, setShowCal] = useState(openCalendar);
    const [stage, setStage] = useState<"form" | "sending" | "done" | "error">("form");

    const embed = `${CALENDLY}?embed_type=Inline&embed_domain=${encodeURIComponent(window.location.hostname)}&utm_source=website&utm_content=${slug ?? "site"}`;

    const submit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const f = new FormData(e.currentTarget);
        if (f.get("company_url_hp")) return; // honeypot
        const lead = {
            name: String(f.get("name") || ""),
            email: String(f.get("email") || ""),
            phone: String(f.get("phone") || ""),
            business: String(f.get("business") || ""),
            service: service?.name ?? "General enquiry",
            meeting: meet,
            preferredTime: `${when} (${Intl.DateTimeFormat().resolvedOptions().timeZone})`,
            plan: plan ? [...plan.lines, plan.estimate].filter(Boolean).join(" | ") : "",
            page: window.location.href,
            submittedAt: new Date().toISOString(),
        };
        if (!ENDPOINT) {
            const body = Object.entries(lead).filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`).join("\n");
            window.location.assign(`mailto:${SITE.email}?subject=${encodeURIComponent(`Call request: ${service?.short ?? "General enquiry"}`)}&body=${encodeURIComponent(body)}`);
            setStage("done");
            return;
        }
        setStage("sending");
        try {
            const res = await fetch(ENDPOINT, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(lead) });
            if (!res.ok) throw new Error(String(res.status));
            setStage("done");
        } catch {
            setStage("error");
        }
    };

    const field = "mt-2 w-full rounded-2xl border border-navy/10 bg-white px-5 py-3.5 text-base outline-none transition focus:border-navy";

    return (
        <div>
            {plan && (
                <div className="svc-pop mb-6 flex items-start justify-between gap-4 rounded-2xl bg-lemon-soft p-5">
                    <p className="text-[15px] leading-relaxed"><strong>Your plan for {plan.service}</strong><br />{plan.lines.join(" · ")}{plan.estimate ? ` · ${plan.estimate}` : ""}</p>
                    <button type="button" onClick={() => setPlan(null)} className="shrink-0 text-sm font-semibold underline underline-offset-4">Remove</button>
                </div>
            )}

            <Chips items={MODES} value={mode} onChange={setMode} label="How would you like to book" />

            {mode === "Pick a time" ? (
                <div className="mt-6">
                    {showCal ? (
                        <iframe src={embed} title="Choose a time for your call" className="h-[660px] w-full rounded-2xl border-0 bg-white" />
                    ) : (
                        <div className="grid min-h-[clamp(340px,32vw,500px)] place-items-center rounded-2xl bg-white p-8 text-center">
                            <div>
                                <div className="flex justify-center gap-3"><Logo slug="googlemeet" size={34} /><Logo slug="zoom" size={34} /><Logo slug="calendly" size={34} /></div>
                                <p className="mx-auto mt-6 max-w-[18ch] text-[clamp(26px,2.2vw,36px)] font-medium leading-[1.06] tracking-[-0.04em]" style={{ fontFamily: "var(--font-display)" }}>See our live calendar and choose your slot</p>
                                <button type="button" onClick={() => setShowCal(true)} className="pill pill-navy mt-7">Show available times<span className="pill-ic"><Arrow size={16} /></span></button>
                                <Note className="mx-auto mt-5 max-w-sm">30 minutes, in your own time zone. Opens our Calendly page here.</Note>
                            </div>
                        </div>
                    )}
                    <Note className="mt-4">Calendar not loading? <a className="font-semibold underline underline-offset-4" href={CALENDLY} target="_blank" rel="noreferrer">Open it in a new tab</a>.{plan ? " Mention your plan in the notes and we will have it ready." : ""}</Note>
                </div>
            ) : stage === "done" ? (
                <div className="svc-pop mt-8">
                    <h3 className="text-[clamp(28px,2.6vw,42px)] leading-[1.04]">{ENDPOINT ? "Thank you. We have your request." : "Almost there: press send in your email app."}</h3>
                    <p className="mt-4 text-lg text-navy-2">{ENDPOINT ? "A strategist replies within one business day to confirm the time." : `Your request is ready in a new email to ${SITE.email}.`}</p>
                </div>
            ) : (
                <form onSubmit={submit} className="mt-7">
                    <div className="grid gap-5 sm:grid-cols-2">
                        <div><p className="mb-2 text-sm font-medium text-navy-2">How should we meet?</p><Chips items={MEET} value={meet} onChange={setMeet} label="Meeting type" /></div>
                        <div><p className="mb-2 text-sm font-medium text-navy-2">Best time of day</p><Chips items={WHEN} value={when} onChange={setWhen} label="Best time of day" /></div>
                    </div>
                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                        <label className="block"><span className="text-sm font-medium text-navy-2">Your name</span><input name="name" required autoComplete="name" className={field} /></label>
                        <label className="block"><span className="text-sm font-medium text-navy-2">Work email</span><input name="email" type="email" required autoComplete="email" className={field} /></label>
                        <label className="block"><span className="text-sm font-medium text-navy-2">Business</span><input key={name} name="business" defaultValue={name} autoComplete="organization" className={field} /></label>
                        <label className="block"><span className="text-sm font-medium text-navy-2">Phone{meet === "Phone call" ? "" : " (optional)"}</span><input name="phone" type="tel" required={meet === "Phone call"} autoComplete="tel" className={field} /></label>
                    </div>
                    <input type="text" name="company_url_hp" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
                    {stage === "error" && <p className="mt-4 text-sm text-red-700" role="alert">Something went wrong. Email us at {SITE.email} and we will reply within one business day.</p>}
                    <button disabled={stage === "sending"} className="pill pill-navy mt-7 w-full justify-between disabled:opacity-60">{stage === "sending" ? "Sending…" : "Request my call"}<span className="pill-ic"><Arrow size={16} /></span></button>
                    <Note className="mt-4 text-center">No spam. Reply within one business day.</Note>
                </form>
            )}
        </div>
    );
}

/** Booking section at the end of every service page */
export default function Booking({ slug }: { slug: string }) {
    return (
        <section id="book" data-booking data-dark className="relative overflow-hidden bg-ink py-[clamp(80px,10vw,150px)] text-off">
            {/* the header's "Book a call" button points at #contact */}
            <span id="contact" className="absolute top-0" />
            <div className="pointer-events-none absolute -left-[10%] bottom-[-30%] h-[80%] w-[60%] rounded-full bg-[radial-gradient(circle,rgba(245,234,59,.14),transparent_65%)]" />
            <div className="wrap relative grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-[5vw]">
                <div>
                    <p className="eyebrow text-glacier-3" data-reveal>Schedule a call or meeting</p>
                    <h2 className="t-l mt-6 max-w-[11ch]"><Split text="Thirty minutes. A clear next step" dot /></h2>
                    <ol className="mt-10 max-w-md">
                        {["You tell us the goal.", "We show what we would do first.", "You get a scope and price to decide on."].map((t, i) => (
                            <li key={t} className="flex gap-5 border-t border-white/10 py-5 text-lg"><span className="text-lemon tabular-nums">0{i + 1}</span>{t}</li>
                        ))}
                    </ol>
                    <p className="mt-4 text-glacier-2">No pressure to commit. Prefer email? <a className="underline decoration-lemon underline-offset-4" href={`mailto:${SITE.email}`}>{SITE.email}</a></p>
                </div>

                <div className="rounded-[32px] bg-off p-[clamp(22px,2.6vw,44px)] text-navy"><BookingCard slug={slug} /></div>
            </div>
        </section>
    );
}
