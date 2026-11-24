import { useState } from "react";
import { PRICES_CONFIRMED, SERVICE_PRICING } from "../../data/services/pricing";
import { SERVICES } from "../../data/shared/services";
import { Verify } from "../common/ui";
import { Cta, Heading, Note, Range } from "./ui";
import { setPlan } from "./store";
import { money } from "./util";

// Draft figures are shown while developing so the section can be judged; a production
// build shows the plan without a figure until PRICES_CONFIRMED is switched on.
const amount = (n: number, unit: string) => `${n} ${n === 1 ? (unit === "people" ? "person" : unit.replace(/s$/, "")) : unit}`;
const SHOW = PRICES_CONFIRMED || import.meta.env.DEV;

/** Interactive pricing: pick a level, size it, add extras. The plan travels to the booking form. */
export default function PlanBuilder({ slug }: { slug: string }) {
    const p = SERVICE_PRICING[slug];
    const service = SERVICES.find((s) => s.slug === slug)!;
    const [tier, setTier] = useState(1);
    const [vals, setVals] = useState<Record<string, number>>(() => Object.fromEntries(p.controls.map((c) => [c.id, c.def])));
    const [adds, setAdds] = useState<string[]>([]);

    const t = p.tiers[tier];
    // controls add cost only above their included amount (the default)
    const sized = p.per === "hour" ? p.controls.reduce((n, c) => n * vals[c.id], t.base) : p.controls.reduce((n, c) => n + (vals[c.id] - c.def) * c.rate, t.base);
    const total = Math.max(p.per === "hour" ? 0 : t.base * 0.6, sized) + p.addons.filter((a) => adds.includes(a.label)).reduce((n, a) => n + a.price, 0);
    const per = p.per === "project" ? "one-off" : "per month";
    const round = Math.round(total / 10) * 10;

    const choose = () =>
        setPlan({
            service: service.name,
            lines: [`Level: ${t.name}`, ...p.controls.map((c) => `${c.label}: ${amount(vals[c.id], c.unit)}`), ...adds.map((a) => `Extra: ${a}`)],
            estimate: SHOW ? `${money(round)} ${per}` : undefined,
        });

    return (
        <section id="plan" className="relative overflow-hidden bg-glacier py-[clamp(80px,10vw,150px)] text-navy">
            <div className="wrap">
                <Heading eyebrow="Interactive pricing" title="Build your own plan" text="Pick a level, size it to your business, add what you need. Nothing is charged here: the plan goes into your call." />

                <div className="mt-[clamp(36px,4.5vw,72px)] grid gap-5 lg:grid-cols-[1.5fr_1fr]">
                    <div className="space-y-5">
                        {/* levels */}
                        <div className="grid gap-3 sm:grid-cols-3" role="radiogroup" aria-label="Plan level">
                            {p.tiers.map((x, i) => (
                                <button
                                    key={x.name}
                                    type="button"
                                    role="radio"
                                    aria-checked={tier === i}
                                    onClick={() => setTier(i)}
                                    className={`flex flex-col rounded-[24px] p-6 text-left transition-all duration-500 ${tier === i ? "bg-ink text-off sm:-translate-y-2" : "bg-white text-navy hover:bg-glacier-2"}`}
                                >
                                    <span className="flex items-center justify-between gap-3">
                                        <span className="text-[26px] font-medium tracking-[-0.04em]" style={{ fontFamily: "var(--font-display)" }}>{x.name}</span>
                                        <span className={`h-4 w-4 rounded-full ${tier === i ? "bg-lemon" : "bg-navy/10"}`} />
                                    </span>
                                    <span className={`mt-2 text-sm leading-snug ${tier === i ? "text-glacier-2" : "text-navy-2"}`}>{x.for}</span>
                                    <span className="mt-6 space-y-2.5 text-[14.5px]">
                                        {x.includes.map((l) => (
                                            <span key={l} className="flex gap-2.5 leading-snug"><span className={tier === i ? "text-lemon" : "text-navy/40"} aria-hidden="true">✓</span>{l}</span>
                                        ))}
                                    </span>
                                </button>
                            ))}
                        </div>

                        {/* size */}
                        <div className="grid gap-x-10 gap-y-8 rounded-[24px] bg-white p-[clamp(22px,2.4vw,40px)] sm:grid-cols-2">
                            {p.controls.map((c) => (
                                <Range key={c.id} label={c.label} min={c.min} max={c.max} step={c.step} value={vals[c.id]} show={amount(vals[c.id], c.unit)} onChange={(v) => setVals((o) => ({ ...o, [c.id]: v }))} />
                            ))}
                            <div className="sm:col-span-2">
                                <p className="text-sm text-navy-2">Add extras</p>
                                <div className="mt-3 flex flex-wrap gap-2">
                                    {p.addons.map((a) => {
                                        const on = adds.includes(a.label);
                                        return (
                                            <button key={a.label} type="button" aria-pressed={on} onClick={() => setAdds((o) => (on ? o.filter((x) => x !== a.label) : [...o, a.label]))} className={`rounded-full px-4 py-2.5 text-sm font-medium transition-colors ${on ? "bg-lemon" : "bg-glacier hover:bg-glacier-2"}`}>
                                                {on ? "✓ " : "+ "}{a.label}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* summary */}
                    <aside className="flex flex-col justify-between rounded-[28px] bg-ink p-[clamp(24px,2.6vw,44px)] text-off lg:sticky lg:top-24 lg:self-start" aria-live="polite">
                        <div>
                            <p className="eyebrow text-glacier-3">Your plan</p>
                            {SHOW ? (
                                <>
                                    <p className="mt-6 flex flex-wrap items-baseline gap-3">
                                        <span className="text-[clamp(52px,5.4vw,92px)] font-light leading-none tracking-[-0.06em] tabular-nums" style={{ fontFamily: "var(--font-display)" }}>{money(round)}</span>
                                        <span className="text-glacier-2">{per}</span>
                                    </p>
                                    <p className="mt-2 text-sm text-glacier-3">Starting estimate, confirmed on your call<Verify on={!PRICES_CONFIRMED} /></p>
                                </>
                            ) : (
                                <p className="mt-6 text-[clamp(32px,3vw,52px)] font-light leading-[1.05] tracking-[-0.04em]" style={{ fontFamily: "var(--font-display)" }}>Your exact quote within one business day<span className="dot" /></p>
                            )}
                            <ul className="mt-7 divide-y divide-white/10 border-y border-white/10 text-[15px]">
                                <li className="flex justify-between gap-4 py-3"><span className="text-glacier-2">Level</span>{t.name}</li>
                                {p.controls.map((c) => <li key={c.id} className="flex justify-between gap-4 py-3"><span className="text-glacier-2">{c.label}</span><span className="shrink-0 tabular-nums">{amount(vals[c.id], c.unit)}</span></li>)}
                                {adds.map((a) => <li key={a} className="svc-pop flex justify-between gap-4 py-3"><span className="text-glacier-2">Extra</span><span className="text-right">{a}</span></li>)}
                            </ul>
                        </div>
                        <div className="mt-8 space-y-4">
                            <Cta className="w-full justify-between" onClick={choose}>Book a call with this plan</Cta>
                            <Note dark>No payment now. Scope and price are agreed with you before any work starts.</Note>
                        </div>
                    </aside>
                </div>
            </div>
        </section>
    );
}
