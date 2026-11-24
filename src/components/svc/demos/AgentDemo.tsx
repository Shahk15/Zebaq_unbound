import { useState } from "react";
import { Chips, Logo, Phone, Range, Toggle } from "../ui";
import { useBiz } from "../store";
import { photo, ramp } from "../util";

const ASK = {
    Restaurant: { q: "Hi, do you have a table for 6 on Friday?", a: "Yes! 7:30 or 8:45 pm on Friday. Which works for you?", r: "8:45 please", c: "Booked: 6 people, Friday 8:45 pm. See you then!" },
    Salon: { q: "Can I get a cut and colour tomorrow?", a: "We have 11:00 and 3:30 tomorrow. Shall I hold one?", r: "3:30 is perfect", c: "Done. Cut and colour, tomorrow 3:30 pm." },
    "Home services": { q: "My AC stopped working. Can someone come?", a: "Sorry to hear that. I can send someone at 9:00 tomorrow. Your postcode?", r: "75063", c: "Confirmed for 9:00. You will get a text on the way." },
} as const;
type Kind = keyof typeof ASK;
const NAMES = Object.keys(ASK) as Kind[];
const FLOW = [{ s: "whatsapp", n: "Message in" }, { s: "openai", n: "AI agent replies" }, { s: "calendly", n: "Slot booked" }, { s: "hubspot", n: "CRM updated" }, { s: "slack", n: "Team told" }];

/** Scrub through the night: with the agent off a lead goes cold, with it on the lead is booked */
export default function AgentDemo() {
    const biz = useBiz();
    const [kind, setKind] = useState<Kind>("Restaurant");
    const [m, setM] = useState(0); // minutes after 22:00, up to 11 h
    const [on, setOn] = useState(true);
    const k = ASK[kind];
    const at = 254; // 02:14
    const clock = (22 * 60 + m) % 1440;
    const time = `${String(Math.floor(clock / 60)).padStart(2, "0")}:${String(clock % 60).padStart(2, "0")}`;
    const day = ramp(m, 450, 640);
    const asked = m >= at;
    const step = !on ? 0 : m < at ? -1 : m < at + 12 ? 1 : m < at + 24 ? 2 : m < at + 36 ? 3 : 4;
    const lost = !on && m >= at + 90;

    const bub = "svc-pop w-fit max-w-[86%] rounded-2xl px-3.5 py-2.5 text-[14px] leading-snug shadow-sm";
    return (
        <div className="grid gap-5 lg:grid-cols-[1fr_330px]">
            <div className="grid items-center gap-5 rounded-[28px] bg-white p-5 lg:col-span-2 lg:grid-cols-[1.4fr_300px_auto] lg:gap-8 lg:px-8">
                <Range label="Drag through the night" value={m} min={0} max={660} step={2} onChange={setM} show={time} />
                <Toggle on={on} onChange={setOn} label="AI agent on duty" />
                <div className="[&_button]:bg-glacier [&_button[aria-pressed=true]]:bg-navy"><Chips items={NAMES} value={kind} onChange={setKind} label="Type of business" /></div>
            </div>
            <div className="relative flex min-h-[460px] lg:min-h-[520px] flex-col justify-between overflow-hidden rounded-[32px] bg-ink p-[clamp(20px,2.6vw,44px)] text-off">
                <img src={photo("night-shop")} alt="" className="absolute inset-0 h-full w-full object-cover" style={{ filter: `brightness(${0.75 + day * 1.5}) saturate(${0.8 + day * 0.4})` }} />
                <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, rgba(7,22,49,${0.55 - day * 0.35}), rgba(7,22,49,.3) 40%, rgba(7,22,49,.9))` }} />
                <div className="relative flex items-start justify-between gap-6">
                    <p className="text-[clamp(72px,11vw,190px)] font-light leading-[0.85] tracking-[-0.07em] tabular-nums" style={{ fontFamily: "var(--font-display)" }}>{time}</p>
                    <p className="mt-2 rounded-full bg-black/40 px-4 py-2 text-sm">{biz} is {day > 0.7 ? "opening" : "closed"}</p>
                </div>
                <div className="relative">
                    <div className="grid grid-cols-5 gap-2">
                        {FLOW.map((f, i) => {
                            const lit = on ? step >= i && asked : i === 0 && asked;
                            return (
                                <div key={f.n} className={`flex flex-col items-center gap-2 rounded-2xl px-1 py-4 text-center text-[11px] leading-tight transition-all duration-500 sm:text-[13px] ${lit ? "bg-lemon font-semibold text-navy" : "bg-white/10 text-glacier-2"}`}>
                                    <span className="grid h-9 w-9 place-items-center rounded-xl bg-white"><Logo slug={f.s} size={20} /></span>{f.n}
                                </div>
                            );
                        })}
                    </div>
                    <p className="mt-5 min-h-[2.4em] text-[clamp(20px,1.9vw,30px)] font-medium leading-[1.15] tracking-[-0.03em]" style={{ fontFamily: "var(--font-display)" }}>
                        {!asked ? "Everyone is asleep. Drag the night forward." : on ? (step >= 4 ? "Booked before anyone woke up." : "A lead just arrived, and it is being answered.") : lost ? "No reply. They booked somewhere else." : "A lead is waiting, and nobody is there."}
                    </p>
                </div>
            </div>

            <div className="flex flex-col gap-5">
                <Phone className="h-[520px] lg:max-w-none">
                    <div className="flex h-full flex-col bg-[#efe7dd]">
                        <div className="flex items-center gap-3 bg-[#075e54] px-4 pb-3 pt-10 text-white"><span className="grid h-9 w-9 place-items-center rounded-full bg-white/20 font-semibold">{biz.charAt(0).toUpperCase()}</span><p className="min-w-0 text-sm leading-tight"><span className="block truncate font-semibold">{biz}</span><span className="text-[11px] opacity-80">{on ? "Replies in seconds" : "Away"}</span></p></div>
                        <div className="flex flex-1 flex-col justify-end gap-2 p-3">
                            {asked && <p key={kind + "q"} className={`${bub} ml-auto bg-[#dcf8c6]`}>{k.q}<span className="ml-2 text-[10px] text-navy/50">02:14</span></p>}
                            {step >= 1 && asked && <p key={kind + "a"} className={`${bub} bg-white`}>{k.a}</p>}
                            {step >= 2 && asked && <p key={kind + "r"} className={`${bub} ml-auto bg-[#dcf8c6]`}>{k.r}</p>}
                            {step >= 3 && asked && <p key={kind + "c"} className={`${bub} bg-white font-semibold`}>{k.c}</p>}
                            {lost && <p className={`${bub} ml-auto bg-[#dcf8c6]`}>No worries, found somewhere else.</p>}
                        </div>
                    </div>
                </Phone>
            </div>
        </div>
    );
}
