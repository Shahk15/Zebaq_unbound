import { useState } from "react";
import { Chips, Logo, Range } from "../ui";
import { useBiz } from "../store";
import { num, photo } from "../util";

const WHO = {
    "Hotel managers": { role: "General Manager", co: "Example Hotel", hook: "weekend occupancy" },
    "Clinic owners": { role: "Practice Owner", co: "Example Clinic", hook: "new patient enquiries" },
    "Retail directors": { role: "Retail Director", co: "Example Stores", hook: "store rollouts" },
    "Agency founders": { role: "Founder", co: "Example Agency", hook: "extra delivery capacity" },
} as const;
type Who = keyof typeof WHO;
const NAMES = Object.keys(WHO) as Who[];
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"];

/** Size the outreach and watch real conversations land in the visitor's calendar */
export default function B2bDemo() {
    const biz = useBiz();
    const [who, setWho] = useState<Who>("Hotel managers");
    const [reach, setReach] = useState(60);
    const [reply, setReply] = useState(10);
    const [meet, setMeet] = useState(35);
    const w = WHO[who];
    const replies = (reach * reply) / 100;
    const meetings = Math.min(20, Math.round((replies * meet) / 100));
    // spread meetings over the week
    const order = [6, 13, 2, 17, 9, 0, 15, 4, 11, 19, 7, 1, 14, 8, 3, 18, 10, 5, 16, 12];
    const filled = new Set(order.slice(0, meetings));

    return (
        <div className="grid gap-5 lg:grid-cols-[330px_1fr]">
            <div className="flex flex-col gap-7 rounded-[28px] bg-white p-[clamp(20px,2vw,32px)]">
                <div className="[&_button]:bg-glacier [&_button[aria-pressed=true]]:bg-navy">
                    <p className="mb-3 text-sm font-semibold">Who do you want to meet?</p>
                    <Chips items={NAMES} value={who} onChange={setWho} label="Target buyer" />
                </div>
                <Range label="People contacted each week" value={reach} min={20} max={200} step={10} onChange={setReach} />
                <Range label="Reply rate you expect" value={reply} min={2} max={25} onChange={setReply} show={`${reply}%`} />
                <Range label="Replies that become meetings" value={meet} min={10} max={60} step={5} onChange={setMeet} show={`${meet}%`} />
                <p className="mt-auto text-[13px] text-navy-2">A calculator using your own assumptions, not a forecast.</p>
            </div>

            <div className="relative overflow-hidden rounded-[32px] bg-ink p-[clamp(20px,2.4vw,40px)] text-off">
                <img src={photo("handshake")} alt="" className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700" style={{ opacity: 0.12 + (meetings / 20) * 0.4 }} />
                <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(7,22,49,.9),rgba(7,22,49,.55))]" />
                <div className="relative grid gap-8 xl:grid-cols-[1fr_1.15fr]">
                    <div>
                        {/* pipeline */}
                        <div className="grid grid-cols-4 gap-2 text-center">
                            {[["Contacted", reach], ["Replied", replies], ["Qualified", replies * 0.7], ["Meetings", meetings]].map(([l, n], i) => (
                                <div key={l as string} className={`rounded-2xl px-1 py-4 ${i === 3 ? "bg-lemon text-navy" : "bg-white/10"}`}>
                                    <p className="text-[clamp(22px,2.2vw,38px)] font-light leading-none tracking-[-0.04em] tabular-nums" style={{ fontFamily: "var(--font-display)" }}>{num(n as number)}</p>
                                    <p className="mt-2 text-[11px] font-medium opacity-80">{l}</p>
                                </div>
                            ))}
                        </div>
                        {/* message preview */}
                        <div key={who} className="svc-pop mt-5 rounded-[22px] bg-white p-5 text-navy">
                            <div className="flex items-center gap-3">
                                <span className="grid h-11 w-11 place-items-center rounded-full bg-glacier-2 font-semibold">{w.co.charAt(0)}</span>
                                <p className="flex-1 text-sm leading-tight"><span className="block font-semibold">{w.role}</span><span className="text-navy-2">{w.co}</span></p>
                                <Logo slug="linkedin" size={22} />
                            </div>
                            <p className="mt-4 text-[15px] leading-relaxed">Hi, I noticed {w.co} is expanding. <strong>{biz}</strong> helps teams like yours with {w.hook}. Worth a short call this week?</p>
                            {replies >= 4 && <p className="svc-pop mt-3 ml-auto w-fit rounded-2xl rounded-br-md bg-[#0a66c2] px-4 py-2.5 text-[15px] text-white">Yes, Thursday at 11 works.</p>}
                        </div>
                    </div>

                    {/* calendar */}
                    <div>
                        <p className="flex items-center justify-between text-sm"><span className="font-semibold">{biz}: next week</span><span className="flex items-center gap-2 text-glacier-2"><Logo slug="googlemeet" size={18} />{meetings} booked</span></p>
                        <div className="mt-4 grid grid-cols-5 gap-2">
                            {DAYS.map((d) => <p key={d} className="text-center text-[12px] text-glacier-3">{d}</p>)}
                            {Array.from({ length: 20 }, (_, i) => (
                                <div key={i} className={`h-[clamp(58px,6.4vw,92px)] rounded-xl p-2 text-[11px] leading-tight transition-colors duration-500 ${filled.has(i) ? "bg-lemon text-navy" : "bg-white/[.07]"}`}>
                                    {filled.has(i) && <span className="svc-pop block font-semibold">{["10:00", "11:30", "14:00", "16:30"][Math.floor(i / 5)]}<span className="mt-0.5 hidden font-normal sm:block">{w.role}</span></span>}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
