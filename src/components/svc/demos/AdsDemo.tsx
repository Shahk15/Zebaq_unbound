import { useState } from "react";
import { Logo, Range } from "../ui";
import { useBiz } from "../store";
import { handle, money, num, photo } from "../util";

const TABS = [{ s: "google", n: "Google search" }, { s: "instagram", n: "Instagram" }, { s: "facebook", n: "Facebook" }] as const;

/** The visitor's own ad, and a calculator that follows each dollar to a customer */
export default function AdsDemo() {
    const biz = useBiz();
    const [tab, setTab] = useState(0);
    const [budget, setBudget] = useState(2000);
    const [cpc, setCpc] = useState(2);
    const [cr, setCr] = useState(5);
    const [close, setClose] = useState(20);
    const [sale, setSale] = useState(250);

    const clicks = budget / cpc;
    const leads = (clicks * cr) / 100;
    const customers = (leads * close) / 100;
    const revenue = customers * sale;
    const rows = [
        { l: "Clicks", n: num(clicks), w: 100 },
        { l: "Leads", n: num(leads), w: 34 + Math.min(40, cr * 2) },
        { l: "Customers", n: num(customers), w: 20 + Math.min(34, close * 0.7) },
    ];
    const people = Math.max(1, Math.min(28, Math.round(customers)));

    return (
        <div className="grid gap-5 lg:grid-cols-[1fr_1.1fr_320px]">
            {/* the ad */}
            <div className="flex flex-col rounded-[32px] bg-white p-[clamp(18px,1.8vw,30px)]">
                <div className="flex flex-wrap gap-2">
                    {TABS.map((t, i) => <button key={t.n} type="button" aria-pressed={i === tab} onClick={() => setTab(i)} className={`flex items-center gap-2 rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${i === tab ? "bg-navy text-off" : "bg-glacier hover:bg-glacier-2"}`}><span className="grid h-5 w-5 place-items-center rounded-full bg-white"><Logo slug={t.s} size={13} /></span>{t.n}</button>)}
                </div>
                <div key={tab} className="svc-pop mt-6 flex-1">
                    {tab === 0 ? (
                        <div>
                            <p className="rounded-full border border-navy/15 px-5 py-3 text-[15px] text-navy-2 shadow-sm">best place for a birthday near me</p>
                            <div className="mt-6 rounded-2xl bg-glacier/60 p-5">
                                <p className="text-[13px] font-semibold">Sponsored</p>
                                <p className="mt-1 text-[13px] text-navy-2">{handle(biz)}</p>
                                <p className="mt-2 text-[22px] font-medium leading-snug text-[#1a0dab]">{biz}: book your date online</p>
                                <p className="mt-2 text-[15px] leading-relaxed text-navy-2">Reserve in one minute. Group packages, clear prices, instant confirmation.</p>
                                <div className="mt-4 flex flex-wrap gap-2 text-[13px] text-[#1a0dab]"><span className="rounded-full border border-navy/10 px-3 py-1.5">Book now</span><span className="rounded-full border border-navy/10 px-3 py-1.5">Prices</span><span className="rounded-full border border-navy/10 px-3 py-1.5">Directions</span></div>
                            </div>
                            <div className="mt-4 space-y-3 opacity-40">{[80, 60, 70].map((w) => <div key={w}><div className="h-3 rounded bg-navy/15" style={{ width: `${w}%` }} /><div className="mt-2 h-2 rounded bg-navy/10" style={{ width: `${w - 20}%` }} /></div>)}</div>
                        </div>
                    ) : (
                        <div className="overflow-hidden rounded-2xl border border-navy/10">
                            <div className="flex items-center gap-3 p-4"><span className="grid h-10 w-10 place-items-center rounded-full bg-navy font-semibold text-off">{biz.charAt(0).toUpperCase()}</span><p className="text-sm leading-tight"><span className="block font-semibold">{biz}</span><span className="text-navy-2">Sponsored</span></p></div>
                            <div className={`relative ${tab === 1 ? "aspect-square" : "aspect-[16/11]"}`}><img src={photo(tab === 1 ? "friends-phone" : "dining-full")} alt="" className="absolute inset-0 h-full w-full object-cover" /><div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgba(7,22,49,.8))]" /><p className="absolute bottom-5 left-5 max-w-[12ch] text-[clamp(26px,2.3vw,40px)] font-medium leading-none tracking-[-0.04em] text-white" style={{ fontFamily: "var(--font-display)" }}>This weekend at {biz}</p></div>
                            <div className="flex items-center justify-between gap-3 bg-glacier/60 p-4 text-sm"><span className="min-w-0 truncate">Limited tables. Book online.</span><span className="shrink-0 rounded-lg bg-[#0866ff] px-4 py-2 font-semibold text-white">Book now</span></div>
                        </div>
                    )}
                </div>
            </div>

            {/* the money path */}
            <div className="flex flex-col justify-between gap-6 rounded-[32px] bg-ink p-[clamp(20px,2.2vw,40px)] text-off">
                <div className="space-y-3">
                    <p className="text-sm text-glacier-2">{money(budget)} in</p>
                    {rows.map((r, i) => (
                        <div key={r.l} className="flex h-[74px] items-center justify-between rounded-2xl px-5 transition-all duration-500" style={{ width: `${Math.min(100, r.w)}%`, minWidth: 190, background: ["rgba(255,255,255,.1)", "rgba(143,176,201,.35)", "#f5ea3b"][i], color: i === 2 ? "#0a1f44" : undefined }}>
                            <span className="text-sm">{r.l}</span><span className="text-[32px] font-light tracking-[-0.04em] tabular-nums" style={{ fontFamily: "var(--font-display)" }}>{r.n}</span>
                        </div>
                    ))}
                </div>
                <div className="flex flex-wrap gap-1.5" aria-hidden="true">
                    {Array.from({ length: 28 }, (_, i) => <svg key={i} viewBox="0 0 20 28" className={`h-8 w-6 transition-all duration-500 ${i < people ? "fill-lemon" : "fill-white/10"}`}><circle cx="10" cy="6" r="5" /><path d="M1 28c0-9 4-14 9-14s9 5 9 14z" /></svg>)}
                </div>
                <div className="border-t border-white/15 pt-5">
                    <p className="text-sm text-glacier-2">Sales from those customers</p>
                    <p className="text-[clamp(44px,4.6vw,78px)] font-light leading-none tracking-[-0.06em] tabular-nums" style={{ fontFamily: "var(--font-display)" }}>{money(revenue)}</p>
                    <p className="mt-2 text-sm text-glacier-2">{leads > 0 ? money(budget / leads) : "$0"} per lead, {customers >= 0.5 ? money(budget / customers) : "n/a"} per customer</p>
                </div>
            </div>

            <div className="flex flex-col gap-6 rounded-[28px] bg-glacier-2 p-[clamp(18px,1.8vw,28px)]">
                <Range label="Monthly ad spend" value={budget} min={300} max={15000} step={100} onChange={setBudget} show={money(budget)} />
                <Range label="Cost per click" value={cpc} min={0.2} max={12} step={0.1} onChange={setCpc} show={"$" + cpc.toFixed(2)} />
                <Range label="Clicks that become leads" value={cr} min={1} max={20} onChange={setCr} show={`${cr}%`} />
                <Range label="Leads that buy" value={close} min={5} max={60} step={5} onChange={setClose} show={`${close}%`} />
                <Range label="Average sale" value={sale} min={20} max={5000} step={10} onChange={setSale} show={money(sale)} />
                <p className="mt-auto text-[13px] text-navy-2">Your numbers, simple maths. Not a forecast.</p>
            </div>
        </div>
    );
}
