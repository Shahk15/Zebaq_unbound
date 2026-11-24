import { useState } from "react";
import { Range } from "../ui";
import { useBiz } from "../store";
import { money, num } from "../util";

// Share of people who continue at each step: leaky, and patched. Illustrative values.
const STEPS = [
    { id: "land", l: "Land on the page", leak: 0.45, fixed: 0.6, fix: "Clear message and faster page" },
    { id: "offer", l: "Look at the offer", leak: 0.4, fixed: 0.52, fix: "Proof where doubt appears" },
    { id: "start", l: "Start to buy or enquire", leak: 0.35, fixed: 0.48, fix: "Shorter form and checkout" },
    { id: "done", l: "Finish", leak: 0.5, fixed: 0.62, fix: "Follow-up that brings them back" },
];

/** A leaking funnel: tap a leak to plug it and see what stays in the business */
export default function FunnelDemo() {
    const biz = useBiz();
    const [visitors, setVisitors] = useState(5000);
    const [value, setValue] = useState(80);
    const [on, setOn] = useState<string[]>([]);
    const has = (id: string) => on.includes(id);
    const flow = (fixed: (id: string) => boolean) => STEPS.map((_, i) => STEPS.slice(0, i + 1).reduce((n, s) => n * (fixed(s.id) ? s.fixed : s.leak), visitors));
    const now = flow(() => false).at(-1)!;
    const counts = flow(has);
    const after = counts.at(-1)!;
    const all = [visitors, ...counts];

    return (
        <div className="grid gap-5 lg:grid-cols-[1fr_340px]">
            <div className="rounded-[32px] bg-ink p-[clamp(18px,2.4vw,40px)] text-off">
                <p className="flex flex-wrap items-baseline justify-between gap-3 text-sm text-glacier-2"><span>{biz}: from visitor to customer</span><span>Tap a leak to fix it</span></p>
                <div className="mt-6 space-y-3">
                    <div className="flex h-[68px] items-center justify-between rounded-2xl bg-white/15 px-5"><span>Visitors</span><span className="text-[28px] font-light tabular-nums" style={{ fontFamily: "var(--font-display)" }}>{num(visitors)}</span></div>
                    {STEPS.map((s, i) => {
                        const fixed = has(s.id);
                        const w = Math.max(26, 34 + 62 * Math.pow(all[i + 1] / visitors, 0.42));
                        const lost = all[i] - all[i + 1];
                        return (
                            <div key={s.id} className="grid items-center gap-x-4 gap-y-2 sm:grid-cols-[1fr_230px]">
                                <div className="flex h-[68px] items-center justify-between rounded-2xl px-5 transition-all duration-700" style={{ width: `${w}%`, minWidth: 200, background: i === 3 ? "#f5ea3b" : `rgba(143,176,201,${0.5 - i * 0.09})`, color: i === 3 ? "#0a1f44" : undefined }}>
                                    <span className="text-[14px] leading-tight sm:text-[15px]">{s.l}</span><span className="text-[28px] font-light tabular-nums" style={{ fontFamily: "var(--font-display)" }}>{num(all[i + 1])}</span>
                                </div>
                                <button type="button" aria-pressed={fixed} onClick={() => setOn((o) => (fixed ? o.filter((x) => x !== s.id) : [...o, s.id]))} className={`relative flex min-h-[60px] items-center gap-3 rounded-2xl px-4 py-2.5 text-left text-[14px] leading-tight transition-colors duration-500 ${fixed ? "bg-emerald-400/20" : "bg-red-400/20 hover:bg-red-400/30"}`}>
                                    <span className={`relative grid h-8 w-8 shrink-0 place-items-center rounded-full font-bold ${fixed ? "bg-emerald-400 text-navy" : "bg-red-400 text-white"}`}>
                                        {fixed ? "✓" : "!"}
                                        {!fixed && [0, 1].map((d) => <i key={d} className="svc-drop absolute left-1/2 top-full h-2 w-1.5 -translate-x-1/2 rounded-full bg-red-300" style={{ animationDelay: `${d * 0.5 + i * 0.2}s` }} />)}
                                    </span>
                                    <span>{fixed ? s.fix : <><strong>{num(lost)}</strong> leave here</>}</span>
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className="flex flex-col gap-7 rounded-[28px] bg-white p-[clamp(20px,2vw,32px)]">
                <Range label="Visitors each month" value={visitors} min={500} max={50000} step={500} onChange={setVisitors} show={num(visitors)} />
                <Range label="Average order or client value" value={value} min={10} max={2000} step={10} onChange={setValue} show={money(value)} />
                <div className="mt-auto space-y-5 border-t border-navy/10 pt-6">
                    <div><p className="text-sm text-navy-2">Today</p><p className="text-[34px] font-light leading-none tracking-[-0.04em] tabular-nums" style={{ fontFamily: "var(--font-display)" }}>{money(now * value)}</p></div>
                    <div className={`-mx-2 rounded-2xl p-5 transition-colors duration-500 ${on.length ? "bg-lemon" : "bg-glacier"}`}><p className="text-sm">With {on.length} of 4 leaks fixed</p><p className="mt-1 text-[clamp(40px,3.8vw,64px)] font-light leading-none tracking-[-0.05em] tabular-nums" style={{ fontFamily: "var(--font-display)" }}>{money(after * value)}</p><p className="mt-2 text-sm font-medium">Same traffic. {on.length ? `${money((after - now) * value)} more stays.` : "Tap a leak to start."}</p></div>
                    <p className="text-[13px] text-navy-2">Step rates are examples. Your audit measures the real ones.</p>
                </div>
            </div>
        </div>
    );
}
