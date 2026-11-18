import { useState, type FormEvent } from "react";
import { DIAGNOSTIC, DIAGNOSTIC_INSIGHT, SERVICES, SITE } from "../content";
import { Arrow } from "../components/ui";

// Lead form used in the final CTA: three quick questions → tailored insight → contact.
// Leads POST as JSON to VITE_LEAD_ENDPOINT (Zapier/Make/n8n/HubSpot webhook);
// without an endpoint it falls back to a pre-filled email.
const ENDPOINT: string = import.meta.env.VITE_LEAD_ENDPOINT || SITE.leadEndpoint;

type Stage = "quiz" | "insight" | "contact" | "done";

export default function LeadForm() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [stage, setStage] = useState<Stage>("quiz");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const total = DIAGNOSTIC.length;
  const insight = DIAGNOSTIC_INSIGHT[answers[0]] ?? DIAGNOSTIC_INSIGHT["Not enough qualified leads"];
  const recommended = SERVICES.filter((s) => insight.services.includes(s.n));
  const progress = stage === "quiz" ? (step + 0.3) / (total + 1) : stage === "insight" ? total / (total + 1) : 1;

  const choose = (opt: string) => {
    setAnswers([...answers.slice(0, step), opt]);
    if (step < total - 1) setStep(step + 1);
    else setStage("insight");
  };

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    if (form.get("company_url_hp")) return; // honeypot
    const lead = {
      name: String(form.get("name") || ""),
      email: String(form.get("email") || ""),
      website: String(form.get("website") || ""),
      phone: String(form.get("phone") || ""),
      challenge: answers[0],
      businessType: answers[1],
      engagement: answers[2],
      recommended: recommended.map((s) => s.name),
      page: window.location.href,
      utm: Object.fromEntries(new URLSearchParams(window.location.search)),
      submittedAt: new Date().toISOString(),
    };
    setError("");
    if (!ENDPOINT) {
      const body = Object.entries(lead).map(([k, v]) => `${k}: ${typeof v === "string" ? v : JSON.stringify(v)}`).join("\n");
      window.location.assign(`mailto:${SITE.email}?subject=${encodeURIComponent("Strategy call request — " + lead.name)}&body=${encodeURIComponent(body)}`);
      setStage("done");
      return;
    }
    setSending(true);
    try {
      const res = await fetch(ENDPOINT, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(lead) });
      if (!res.ok) throw new Error(String(res.status));
      setStage("done");
      (window as unknown as { dataLayer?: unknown[] }).dataLayer?.push({ event: "generate_lead", challenge: lead.challenge });
    } catch {
      setError(`Something went wrong. Email us at ${SITE.email} and we'll reply within one business day.`);
    } finally {
      setSending(false);
    }
  };

  const reset = () => { setStage("quiz"); setStep(0); setAnswers([]); };
  const H = "text-[clamp(26px,2.6vw,38px)] leading-[1.05] tracking-[-0.04em]";

  return (
    <div className="relative rounded-[32px] bg-off p-7 text-navy shadow-[0_60px_120px_-40px_rgba(0,0,0,.6)] md:p-10">
      <div className="flex items-center justify-between text-sm text-navy-2">
        <span>{stage === "quiz" ? `Question ${step + 1} / ${total}` : stage === "insight" ? "Your likely gap" : stage === "contact" ? "Last step" : "Received"}</span>
        <span className="tabular-nums">{Math.round(progress * 100)}%</span>
      </div>
      <div className="mt-4 h-[3px] w-full overflow-hidden rounded-full bg-navy/10">
        <div className="h-full rounded-full bg-navy transition-all duration-700" style={{ width: `${progress * 100}%` }} />
      </div>

      {stage === "quiz" && (
        <div key={step} className="mt-8 animate-[fadein_.5s_ease]">
          <h3 className={H}>{DIAGNOSTIC[step].q}</h3>
          <div className="mt-8 grid gap-2.5">
            {DIAGNOSTIC[step].options.map((o, i) => (
              <button key={o} onClick={() => choose(o)} className={`group flex items-center gap-5 rounded-2xl px-5 py-4 text-left text-[17px] font-medium transition-all duration-300 hover:bg-lemon ${answers[step] === o ? "bg-lemon" : "bg-glacier"}`}>
                <span className="text-sm opacity-60">{String.fromCharCode(65 + i)}</span>
                <span className="flex-1">{o}</span>
                <Arrow className="opacity-0 transition group-hover:opacity-100" />
              </button>
            ))}
          </div>
          {step > 0 && <button onClick={() => setStep(step - 1)} className="mt-6 text-sm font-semibold text-navy-2 hover:text-navy">← Back</button>}
        </div>
      )}

      {stage === "insight" && (
        <div className="mt-8 animate-[fadein_.5s_ease]">
          <h3 className={H}>{insight.title}</h3>
          <p className="mt-4 text-lg leading-relaxed text-navy-2">{insight.body}</p>
          <p className="mt-8 text-xs font-semibold uppercase tracking-[0.14em] text-navy-2">Where we'd look first</p>
          <ul className="mt-3 divide-y divide-navy/10 border-y border-navy/10">
            {recommended.map((s) => <li key={s.n} className="flex items-center justify-between py-3.5 text-lg">{s.short}<span className="text-sm text-navy-2">{s.n}</span></li>)}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <button onClick={() => setStage("contact")} className="pill pill-navy">Book my strategy call <span className="pill-ic"><Arrow size={16} /></span></button>
            <button onClick={reset} className="pill pill-ghost">Start over <span className="pill-ic"><Arrow size={16} /></span></button>
          </div>
        </div>
      )}

      {stage === "contact" && (
        <form onSubmit={submit} className="mt-8 animate-[fadein_.5s_ease]">
          <h3 className={H}>Where should we reach you?</h3>
          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            <Field name="name" label="Your name" required autoComplete="name" />
            <Field name="email" label="Work email" type="email" required autoComplete="email" />
            <Field name="website" label="Website" placeholder="yourbusiness.com" autoComplete="url" />
            <Field name="phone" label="Phone (optional)" type="tel" autoComplete="tel" />
          </div>
          <input type="text" name="company_url_hp" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
          {error && <p className="mt-4 text-sm text-red-700">{error}</p>}
          <button disabled={sending} className="pill pill-navy mt-7 w-full justify-between disabled:opacity-60">
            {sending ? "Sending…" : "Book a Strategy Call"} <span className="pill-ic"><Arrow size={16} /></span>
          </button>
          <p className="mt-4 text-center text-sm text-navy-2">No spam. No pressure. Reply within one business day.</p>
        </form>
      )}

      {stage === "done" && (
        <div className="mt-8 animate-[fadein_.5s_ease]">
          <h3 className={H}>Thank you. Here's what happens next.</h3>
          <ol className="mt-7 space-y-4">
            {["A strategist reviews your answers and current website.", "Within one business day you get a short note on priority gaps.", "If it's useful, we book a 30-minute call. If not, you keep the insight."].map((t, i) => (
              <li key={t} className="flex gap-4 text-lg"><span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-lemon text-sm font-bold">{i + 1}</span>{t}</li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}

function Field({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-navy-2">{label}</span>
      <input {...props} className="mt-2 w-full rounded-2xl border border-navy/10 bg-white px-5 py-3.5 text-base outline-none transition focus:border-navy" />
    </label>
  );
}
