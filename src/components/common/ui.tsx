import type { ReactNode } from "react";
import { Magnetic } from "./fx";

/** Red "verify" tag — visible in dev only, never in production builds. */
export function Verify({ on }: { on?: boolean }) {
  if (!on || !import.meta.env.DEV) return null;
  return <span className="verify-tag" title="Confirm this before launch">verify</span>;
}

export function Arrow({ className = "", size = 18 }: { className?: string; size?: number }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`eyebrow ${className}`} data-reveal>{children}</p>;
}

/** The lemon full-stop that ends every headline. */
export const Dot = () => <span className="dot" aria-hidden="true" />;

/**
 * Headline whose words rise out of a mask when scrolled into view.
 * Pass plain text; add `dot` for the lemon full-stop.
 */
export function Split({ text, dot, className = "" }: { text: string; dot?: boolean; className?: string }) {
  const words = text.split(" ");
  return (
    <span data-split className={className}>
      {words.map((w, i) => (
        <span key={i} className="sw">
          <span>
            {w}
            {dot && i === words.length - 1 ? <Dot /> : null}
            {i < words.length - 1 ? " " : ""}
          </span>
        </span>
      ))}
    </span>
  );
}

export function Pill({
  href, children, variant = "navy", className = "", onClick,
}: { href?: string; children: ReactNode; variant?: "navy" | "light" | "lemon" | "ghost"; className?: string; onClick?: () => void }) {
  const cls = `pill pill-${variant} ${className}`;
  const inner = (
    <>
      {children}
      <span className="pill-ic"><Arrow size={16} /></span>
    </>
  );
  return (
    <Magnetic strength={0.25}>
      {href ? <a href={href} className={cls} data-cursor="hover">{inner}</a> : <button onClick={onClick} className={cls} data-cursor="hover">{inner}</button>}
    </Magnetic>
  );
}
