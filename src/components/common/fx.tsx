import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import LAND from "../../data/land-dots.json";

const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ── Intro curtain: count to 100, then lift ─────────────────────────── */
export function Loader({ onDone }: { onDone: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const num = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (reduced()) { onDone(); return; }
    document.body.style.overflow = "hidden";
    const c = { v: 0 };
    const tl = gsap.timeline({ onComplete: () => { document.body.style.overflow = ""; onDone(); } });
    tl.to(c, { v: 100, duration: 1.4, ease: "power3.inOut", onUpdate: () => { if (num.current) num.current.textContent = String(Math.round(c.v)).padStart(3, "0"); } })
      .to(".ld-bar", { scaleX: 1, duration: 1.4, ease: "power3.inOut" }, 0)
      .to(".ld-word > span", { yPercent: -110, duration: 0.6, ease: "power3.in" }, "+=0.1")
      .to(root.current, { yPercent: -100, duration: 1.1, ease: "expo.inOut" }, "-=0.2");
    return () => { tl.kill(); document.body.style.overflow = ""; };
  }, [onDone]);

  return (
    <div ref={root} className="fixed inset-0 z-[100] flex flex-col justify-between bg-ink p-[clamp(16px,3.2vw,64px)] text-off">
      <div className="flex items-center justify-between text-sm text-glacier-3">
        <span>ZEBAQ®</span>
        <span>AI · Growth · Creative · Technology</span>
      </div>
      <div>
        <p className="ld-word overflow-hidden text-[clamp(40px,8vw,120px)] font-medium leading-none tracking-[-0.05em]" style={{ fontFamily: "var(--font-display)" }}>
          <span className="inline-block">We’re ZEBAQ<span className="dot" /></span>
        </p>
        <div className="mt-8 flex items-end justify-between gap-6">
          <div className="h-px flex-1 bg-white/15"><div className="ld-bar h-px origin-left scale-x-0 bg-lemon" /></div>
          <span ref={num} className="tabular-nums text-glacier-3">000</span>
        </div>
      </div>
    </div>
  );
}

/* ── Custom cursor ─────────────────────────────────────────────────── */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [enabled] = useState(() => window.matchMedia("(pointer: fine)").matches && !reduced());

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add("has-cursor");
    const dx = gsap.quickTo(dot.current, "x", { duration: 0.08 });
    const dy = gsap.quickTo(dot.current, "y", { duration: 0.08 });
    const rx = gsap.quickTo(ring.current, "x", { duration: 0.45, ease: "power3" });
    const ry = gsap.quickTo(ring.current, "y", { duration: 0.45, ease: "power3" });
    const move = (e: PointerEvent) => { dx(e.clientX); dy(e.clientY); rx(e.clientX); ry(e.clientY); };
    const over = (e: PointerEvent) => {
      const hot = (e.target as HTMLElement).closest("a,button,[data-cursor]");
      gsap.to(ring.current, { scale: hot ? 1.8 : 1, borderColor: hot ? "rgba(227,212,0,1)" : "rgba(10,31,68,.4)", backgroundColor: hot ? "rgba(245,234,59,.18)" : "rgba(245,234,59,0)", duration: 0.35 });
      gsap.to(dot.current, { scale: hot ? 0 : 1, duration: 0.25 });
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerover", over);
    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
    };
  }, [enabled]);

  if (!enabled) return null;
  return (
    <>
      <div ref={ring} className="pointer-events-none fixed left-0 top-0 z-[90] -ml-5 -mt-5 h-10 w-10 rounded-full border-2 border-navy/40" />
      <div ref={dot} className="pointer-events-none fixed left-0 top-0 z-[91] -ml-1 -mt-1 h-2 w-2 rounded-full bg-navy" />
    </>
  );
}

/* ── Scroll progress hairline ──────────────────────────────────────── */
export function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const on = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      if (bar.current) bar.current.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
    };
    on();
    addEventListener("scroll", on, { passive: true });
    return () => removeEventListener("scroll", on);
  }, []);
  return <div ref={bar} className="fixed inset-x-0 top-0 z-[70] h-[3px] origin-left scale-x-0 bg-lemon" />;
}

/* ── Live section index (bottom-left): "05 / 16 — Core Services" ──── */
export function SectionIndex() {
  const [cur, setCur] = useState<{ n: string; label: string; dark: boolean } | null>(null);
  useEffect(() => {
    const els = [...document.querySelectorAll<HTMLElement>("[data-index]")];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const el = e.target as HTMLElement;
            setCur({ n: el.dataset.index!, label: el.dataset.label!, dark: !!el.closest("[data-dark]") || el.hasAttribute("data-dark") });
          }
        });
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  if (!cur || cur.n === "02") return null; // hero has its own footer line
  return (
    <div className={`pointer-events-none fixed bottom-6 left-[clamp(16px,3.2vw,64px)] z-[65] hidden items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] transition-colors duration-500 lg:flex ${cur.dark ? "text-glacier-2" : "text-navy-2"}`}>
      <span className="tabular-nums">{cur.n} / 16</span>
      <span className="h-px w-8 bg-current opacity-50" />
      <span key={cur.label} className="animate-[fadein_.5s_ease]">{cur.label}</span>
    </div>
  );
}

/* ── Magnetic: children drift toward the cursor ─────────────────────── */
export function Magnetic({ children, strength = 0.35 }: { children: React.ReactNode; strength?: number }) {
  const el = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const node = el.current;
    if (!node || !matchMedia("(pointer: fine)").matches || reduced()) return;
    const xTo = gsap.quickTo(node, "x", { duration: 0.6, ease: "elastic.out(1,0.4)" });
    const yTo = gsap.quickTo(node, "y", { duration: 0.6, ease: "elastic.out(1,0.4)" });
    const move = (e: PointerEvent) => {
      const r = node.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * strength);
      yTo((e.clientY - (r.top + r.height / 2)) * strength);
    };
    const leave = () => { xTo(0); yTo(0); };
    node.addEventListener("pointermove", move);
    node.addEventListener("pointerleave", leave);
    return () => { node.removeEventListener("pointermove", move); node.removeEventListener("pointerleave", leave); };
  }, [strength]);
  return <span ref={el} className="inline-block">{children}</span>;
}

/* ── Dot field: perspective wave; reacts to the cursor and to clicks ── */
export function DotField({
  color = "10,31,68", accent = "227,212,0", className = "", interactive = false, top = 0.35,
}: { color?: string; accent?: string; className?: string; interactive?: boolean; top?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const cv = ref.current!;
    const ctx = cv.getContext("2d");
    if (!ctx) return;
    let w = 0, h = 0, raf = 0, t = 0, visible = true;
    const dpr = Math.min(window.devicePixelRatio, 2);
    const resize = () => {
      w = cv.clientWidth; h = cv.clientHeight;
      cv.width = w * dpr; cv.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const ro = new ResizeObserver(resize); ro.observe(cv); resize();
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting)); io.observe(cv);
    const still = reduced();

    // pointer state (relative to canvas)
    const m = { x: -9999, y: -9999, tx: -9999, ty: -9999 };
    const ripples: { x: number; y: number; t0: number }[] = [];
    const host = cv.parentElement!;
    const onMove = (e: PointerEvent) => { const r = cv.getBoundingClientRect(); m.tx = e.clientX - r.left; m.ty = e.clientY - r.top; };
    const onLeave = () => { m.tx = -9999; m.ty = -9999; };
    const onDown = (e: PointerEvent) => { const r = cv.getBoundingClientRect(); ripples.push({ x: e.clientX - r.left, y: e.clientY - r.top, t0: performance.now() }); if (ripples.length > 4) ripples.shift(); };
    if (interactive) {
      host.addEventListener("pointermove", onMove);
      host.addEventListener("pointerleave", onLeave);
      host.addEventListener("pointerdown", onDown);
    }

    const ROWS = 38, COLS = 96, R = 150;
    const draw = () => {
      raf = requestAnimationFrame(draw);
      if (!visible) return;
      t += still ? 0 : 0.012;
      m.x += (m.tx - m.x) * 0.15; m.y += (m.ty - m.y) * 0.15;
      if (m.tx < -1000) { m.x = m.tx; m.y = m.ty; }
      const now = performance.now();
      ctx.clearRect(0, 0, w, h);
      for (let r = 0; r < ROWS; r++) {
        const z = r / (ROWS - 1);
        const persp = 0.25 + z * 0.75;
        const y0 = h * (top + z * (1.05 - top));
        for (let c = 0; c < COLS; c++) {
          const u = c / (COLS - 1) - 0.5;
          let x = w / 2 + u * w * (0.6 + persp * 1.3);
          const wave = Math.sin(u * 7 + t * 2 + z * 4) * 0.5 + Math.sin(u * 13 - t * 1.3 + z * 7) * 0.25;
          let y = y0 - wave * 26 * persp;
          let a = (0.08 + z * 0.4) * (0.55 + wave * 0.45);
          let size = 0.6 + persp * 1.3;
          let hot = 0;
          if (interactive) {
            const dx = x - m.x, dy = y - m.y, d = Math.hypot(dx, dy);
            if (d < R) {
              const k = (1 - d / R) ** 2;
              x += (dx / (d || 1)) * k * 34; y += (dy / (d || 1)) * k * 34;
              hot = Math.max(hot, k); size += k * 2.2;
            }
            for (const rp of ripples) {
              const rad = (now - rp.t0) * 0.7;
              const life = 1 - (now - rp.t0) / 1600;
              if (life <= 0) continue;
              const dd = Math.hypot(x - rp.x, y - rp.y);
              const band = 1 - Math.min(1, Math.abs(dd - rad) / 46);
              if (band > 0) {
                const k = band * life;
                x += ((x - rp.x) / (dd || 1)) * k * 22; y += ((y - rp.y) / (dd || 1)) * k * 22;
                hot = Math.max(hot, k); size += k * 2;
              }
            }
          }
          a = Math.min(1, a + hot * 0.9);
          ctx.fillStyle = hot > 0.05 ? `rgba(${accent},${a.toFixed(3)})` : `rgba(${color},${Math.max(0, a).toFixed(3)})`;
          ctx.beginPath(); ctx.arc(x, y, size, 0, Math.PI * 2); ctx.fill();
        }
      }
    };
    draw();
    return () => {
      cancelAnimationFrame(raf); ro.disconnect(); io.disconnect();
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
      host.removeEventListener("pointerdown", onDown);
    };
  }, [color, accent, interactive, top]);
  return <canvas ref={ref} className={`pointer-events-none ${className}`} aria-hidden="true" />;
}

/* ── Dotted globe with lemon market beacons; drag/hover to spin ────── */
export function Globe({ points, className = "" }: { points: { name: string; lat: number; lng: number }[]; className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const cv = ref.current!;
    const ctx = cv.getContext("2d");
    if (!ctx) return;
    let size = 0, raf = 0, visible = true;
    const dpr = Math.min(devicePixelRatio, 2);
    const resize = () => { size = cv.clientWidth; cv.width = size * dpr; cv.height = size * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); };
    const ro = new ResizeObserver(resize); ro.observe(cv); resize();
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting)); io.observe(cv);

    const toXYZ = (lat: number, lng: number): [number, number, number] => {
      const la = (lat * Math.PI) / 180, ln = (lng * Math.PI) / 180;
      return [Math.cos(la) * Math.sin(ln), Math.sin(la), Math.cos(la) * Math.cos(ln)];
    };
    // continents as dots (precomputed from Natural Earth land, see data/land-dots.json)
    const pts = (LAND as [number, number][]).map(([la, ln]) => toXYZ(la, ln));
    const markets = points.map((p) => ({ ...p, v: toXYZ(p.lat, p.lng) }));
    // arcs from ZEBAQ offices (London, Texas, India) out to each market
    const hubs = [toXYZ(51.5, -0.1), toXYZ(32.9, -96.9), toXYZ(20.3, 85.8)];
    const slerp = (a: [number, number, number], b: [number, number, number], t: number): [number, number, number] => {
      const d = Math.acos(Math.min(1, a[0] * b[0] + a[1] * b[1] + a[2] * b[2])) || 1e-6;
      const s1 = Math.sin((1 - t) * d) / Math.sin(d), s2 = Math.sin(t * d) / Math.sin(d);
      const lift = 1 + Math.sin(Math.PI * t) * 0.18 * Math.min(1, d);
      return [(a[0] * s1 + b[0] * s2) * lift, (a[1] * s1 + b[1] * s2) * lift, (a[2] * s1 + b[2] * s2) * lift];
    };
    const arcs = markets.map((m, i) => ({ a: hubs[i % hubs.length], b: m.v, off: i * 0.13 }));

    let rot = -0.6, vel = 0.0025, drag = false, lastX = 0;
    const tilt = 0.32;
    const down = (e: PointerEvent) => { drag = true; lastX = e.clientX; cv.setPointerCapture(e.pointerId); };
    const move = (e: PointerEvent) => { if (!drag) return; const d = e.clientX - lastX; lastX = e.clientX; rot += d * 0.008; vel = d * 0.0008; };
    const up = () => { drag = false; };
    cv.addEventListener("pointerdown", down); cv.addEventListener("pointermove", move); cv.addEventListener("pointerup", up);
    const still = reduced();

    const project = ([x, y, z]: [number, number, number]) => {
      const cr = Math.cos(rot), sr = Math.sin(rot);
      const x1 = x * cr + z * sr, z1 = -x * sr + z * cr;
      const ct = Math.cos(tilt), st = Math.sin(tilt);
      const y2 = y * ct - z1 * st, z2 = y * st + z1 * ct;
      return { x: x1, y: y2, z: z2 };
    };

    const draw = () => {
      raf = requestAnimationFrame(draw);
      if (!visible) return;
      if (!drag && !still) { rot += vel; vel += (0.0025 - vel) * 0.02; }
      const R = size * 0.44, cx = size / 2, cy = size / 2;
      ctx.clearRect(0, 0, size, size);
      // halo
      const g = ctx.createRadialGradient(cx, cy, R * 0.6, cx, cy, R * 1.25);
      g.addColorStop(0, "rgba(143,176,201,0.10)"); g.addColorStop(1, "rgba(143,176,201,0)");
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, R * 1.25, 0, Math.PI * 2); ctx.fill();
      // ocean disc + rim
      ctx.fillStyle = "rgba(28,60,120,0.25)";
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = "rgba(207,225,238,0.14)"; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.stroke();
      for (const p of pts) {
        const q = project(p);
        if (q.z < -0.05) continue;
        const a = 0.18 + Math.max(0, q.z) * 0.7;
        ctx.fillStyle = `rgba(207,225,238,${a.toFixed(3)})`;
        ctx.beginPath(); ctx.arc(cx + q.x * R, cy - q.y * R, 0.8 + q.z * 1.1, 0, Math.PI * 2); ctx.fill();
      }
      const now = performance.now() / 1000;
      // travelling arcs
      ctx.lineWidth = 1.4;
      for (const arc of arcs) {
        const prog = ((now * 0.22 + arc.off) % 1.4) / 1.4; // head position 0..1 then pause
        const head = Math.min(1, prog * 1.4), tail = Math.max(0, head - 0.45);
        let started = false;
        ctx.beginPath();
        for (let s = 0; s <= 40; s++) {
          const t = tail + ((head - tail) * s) / 40;
          const q = project(slerp(arc.a, arc.b, t));
          if (q.z < 0) { started = false; continue; }
          const x = cx + q.x * R, y = cy - q.y * R;
          if (!started) { ctx.moveTo(x, y); started = true; } else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = "rgba(245,234,59,0.75)";
        ctx.stroke();
      }
      ctx.font = "600 12px Inter, system-ui, sans-serif";
      markets.forEach((mk, i) => {
        const q = project(mk.v);
        if (q.z < 0) return;
        const x = cx + q.x * R, y = cy - q.y * R;
        const pulse = (now * 0.8 + i * 0.37) % 1;
        ctx.strokeStyle = `rgba(245,234,59,${(1 - pulse) * 0.8})`;
        ctx.lineWidth = 1.2;
        ctx.beginPath(); ctx.arc(x, y, 4 + pulse * 18, 0, Math.PI * 2); ctx.stroke();
        ctx.fillStyle = "#f5ea3b"; ctx.beginPath(); ctx.arc(x, y, 3.6, 0, Math.PI * 2); ctx.fill();
        if (q.z > 0.35) {
          ctx.fillStyle = `rgba(247,246,241,${Math.min(1, (q.z - 0.35) * 3)})`;
          ctx.fillText(mk.name, x + 10, y + 4);
        }
      });
    };
    draw();
    return () => {
      cancelAnimationFrame(raf); ro.disconnect(); io.disconnect();
      cv.removeEventListener("pointerdown", down); cv.removeEventListener("pointermove", move); cv.removeEventListener("pointerup", up);
    };
  }, [points]);
  return <canvas ref={ref} className={`aspect-square w-full cursor-grab touch-pan-y active:cursor-grabbing ${className}`} aria-label="Globe showing the markets ZEBAQ serves" role="img" data-cursor="hover" />;
}

/* ── AutoCarousel: endless drift · slows on hover · drag / flick to scrub ── */
export function AutoCarousel({
  items, speed = 40, reverse = false, className = "", gap = 16, slowOnHover = 0.15,
}: { items: React.ReactNode[]; speed?: number; reverse?: boolean; className?: string; gap?: number; slowOnHover?: number }) {
  const wrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = track.current!, host = wrap.current!;
    const still = reduced();
    let x = 0, w = 0, factor = 1, target = 1, dragging = false, lastX = 0, vel = 0, moved = 0;
    const measure = () => { w = (el.scrollWidth + gap) / 2; };
    const ro = new ResizeObserver(measure); ro.observe(el); measure();
    const dir = reverse ? -1 : 1;
    const tick = (_t: number, dtMs: number) => {
      const dt = Math.min(dtMs, 64) / 1000;
      factor += (target - factor) * 0.06;
      if (!dragging) { x -= dir * (still ? 0 : speed) * dt * factor; x += vel; vel *= 0.94; }
      if (w > 0) { while (x <= -w) x += w; while (x > 0) x -= w; }
      el.style.transform = `translate3d(${x}px,0,0)`;
    };
    gsap.ticker.add(tick);
    const down = (e: PointerEvent) => { dragging = true; moved = 0; lastX = e.clientX; vel = 0; };
    const move = (e: PointerEvent) => { if (!dragging) return; const d = e.clientX - lastX; lastX = e.clientX; x += d; vel = d * 0.9; moved += Math.abs(d); };
    const up = () => { dragging = false; };
    const click = (e: MouseEvent) => { if (moved > 6) { e.preventDefault(); e.stopPropagation(); } };
    const enter = () => (target = slowOnHover);
    const leave = () => { target = 1; dragging = false; };
    host.addEventListener("pointerdown", down);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    host.addEventListener("click", click, true);
    host.addEventListener("pointerenter", enter);
    host.addEventListener("pointerleave", leave);
    return () => {
      gsap.ticker.remove(tick); ro.disconnect();
      host.removeEventListener("pointerdown", down);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      host.removeEventListener("click", click, true);
      host.removeEventListener("pointerenter", enter);
      host.removeEventListener("pointerleave", leave);
    };
  }, [speed, reverse, slowOnHover, gap]);
  return (
    <div ref={wrap} className={`cursor-grab select-none overflow-hidden active:cursor-grabbing ${className}`} data-cursor="hover" style={{ touchAction: "pan-y" }}>
      <div ref={track} className="flex w-max will-change-transform" style={{ gap }}>
        {items.map((it, i) => <div key={`a${i}`} className="shrink-0">{it}</div>)}
        {items.map((it, i) => <div key={`b${i}`} className="shrink-0" aria-hidden="true">{it}</div>)}
      </div>
    </div>
  );
}
