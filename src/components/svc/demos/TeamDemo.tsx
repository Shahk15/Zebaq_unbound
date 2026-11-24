import { useState } from "react";
import { Logo, Range } from "../ui";
import { useBiz } from "../store";
import { photo } from "../util";

const ROLES = [
    { id: "dev", n: "Developer", tools: ["react", "wordpress", "shopify"], c: "#8fb0c9", tasks: ["New landing page", "Store speed fixes"] },
    { id: "design", n: "Designer", tools: ["figma", "adobephotoshop", "canva"], c: "#f5ea3b", tasks: ["Campaign visuals", "Menu redesign"] },
    { id: "video", n: "Video editor", tools: ["adobepremierepro", "adobeaftereffects", "davinciresolve"], c: "#f2b5a8", tasks: ["Four reels", "Event recap"] },
    { id: "ads", n: "Ads specialist", tools: ["googleads", "meta", "googleanalytics"], c: "#bfe6b8", tasks: ["Search campaign", "Weekly report"] },
    { id: "social", n: "Social manager", tools: ["instagram", "tiktok", "facebook"], c: "#cfa8f0", tasks: ["Content calendar", "Replies and DMs"] },
    { id: "va", n: "Assistant", tools: ["gmail", "slack", "notion"], c: "#ffd9a8", tasks: ["Inbox and bookings", "CRM clean-up"] },
];
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"];

/** Seat specialists at the visitor's desk and watch the week fill with finished work */
export default function TeamDemo() {
    const biz = useBiz();
    const [team, setTeam] = useState<string[]>(["design", "video", "social"]);
    const [hours, setHours] = useState(20);
    const picked = ROLES.filter((r) => team.includes(r.id));
    const toggle = (id: string) => setTeam((t) => (t.includes(id) ? t.filter((x) => x !== id) : [...t, id]));

    return (
        <div className="grid gap-5 lg:grid-cols-[340px_1fr]">
            <div className="flex flex-col gap-2.5">
                <p className="text-sm font-semibold">Tap to add someone to your team</p>
                {ROLES.map((r) => {
                    const on = team.includes(r.id);
                    return (
                        <button key={r.id} type="button" aria-pressed={on} onClick={() => toggle(r.id)} className={`flex items-center gap-4 rounded-2xl px-4 py-3.5 text-left transition-colors duration-300 ${on ? "bg-navy text-off" : "bg-white hover:bg-glacier-2"}`}>
                            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-lg font-semibold text-navy" style={{ background: r.c }}>{on ? "✓" : "+"}</span>
                            <span className="flex-1 font-semibold">{r.n}</span>
                            <span className="flex gap-1.5">{r.tools.map((t) => <span key={t} className="grid h-7 w-7 place-items-center rounded-lg bg-white"><Logo slug={t} size={16} /></span>)}</span>
                        </button>
                    );
                })}
                <div className="mt-3 rounded-[24px] bg-white p-5"><Range label="Hours each, per week" value={hours} min={5} max={40} step={5} onChange={setHours} show={`${hours} h`} /></div>
            </div>

            <div className="relative overflow-hidden rounded-[32px] bg-ink p-[clamp(20px,2.4vw,40px)] text-off">
                <img src={photo("team-desk")} alt="" className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700" style={{ opacity: 0.1 + Math.min(1, picked.length / 5) * 0.3 }} />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,22,49,.6),rgba(7,22,49,.92))]" />
                <div className="relative">
                    <div className="flex flex-wrap items-end justify-between gap-6">
                        <div>
                            <p className="text-sm text-glacier-2">{biz} team</p>
                            <p className="text-[clamp(44px,5.4vw,92px)] font-light leading-none tracking-[-0.06em] tabular-nums" style={{ fontFamily: "var(--font-display)" }}>{picked.length * hours}<span className="ml-3 text-[clamp(18px,1.6vw,26px)] tracking-normal text-glacier-2">hours a week</span></p>
                        </div>
                        <div className="flex -space-x-3">{picked.map((r) => <span key={r.id} title={r.n} className="svc-pop grid h-14 w-14 place-items-center rounded-full border-4 border-ink text-lg font-semibold text-navy" style={{ background: r.c }}>{r.n.charAt(0)}</span>)}</div>
                    </div>

                    <div className="mt-8 overflow-x-auto">
                        <div className="min-w-[560px]">
                            <div className="grid grid-cols-[130px_repeat(5,1fr)] gap-2 text-[12px] text-glacier-3"><span />{DAYS.map((d) => <span key={d} className="text-center">{d}</span>)}</div>
                            <div className="mt-2 space-y-2">
                                {picked.map((r) => (
                                    <div key={r.id} className="svc-pop grid grid-cols-[130px_repeat(5,1fr)] items-stretch gap-2">
                                        <span className="flex items-center text-sm font-medium">{r.n}</span>
                                        {DAYS.map((d, i) => {
                                            const on = hours / 8 > i * 0.96;
                                            return <span key={d} className="grid h-14 place-items-center rounded-xl px-1 text-center text-[11px] font-medium leading-tight text-navy transition-colors duration-500" style={{ background: on ? r.c : "rgba(255,255,255,.07)" }}>{on && i % 2 === 0 ? r.tasks[(i / 2) % 2] : ""}</span>;
                                        })}
                                    </div>
                                ))}
                                {picked.length === 0 && <p className="rounded-2xl bg-white/10 p-8 text-center text-glacier-2">Your desk is empty. Add your first specialist.</p>}
                            </div>
                        </div>
                    </div>
                    <div className="mt-7 grid gap-3 text-[15px] sm:grid-cols-3">
                        {["You set the priorities", "We handle hiring and replacement", "Scale up or down as work changes"].map((t) => <p key={t} className="rounded-2xl bg-white/10 px-5 py-4">{t}</p>)}
                    </div>
                </div>
            </div>
        </div>
    );
}
