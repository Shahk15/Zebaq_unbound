import type { MouseEventHandler, ReactNode } from "react";

type Variant = "primary" | "secondary" | "dark" | "light";
type Size = "sm" | "md" | "lg";
type Arrow = "right" | "up-right" | "none";

type ButtonProps = {
    children: ReactNode;
    href?: string; // renders <a> when provided, otherwise <button>
    onClick?: MouseEventHandler<HTMLElement>;
    type?: "button" | "submit";
    target?: string;
    rel?: string;
    variant?: Variant;
    size?: Size;
    arrow?: Arrow;
    className?: string;
    "aria-label"?: string;
};

/*
  Hover effect: a circle grows from the RIGHT edge and fills the button.
  - primary   (blue)  -> fills with dark navy
  - secondary (white) -> fills with dark navy, text turns white
  - dark      (navy)  -> fills with the normal brand blue
  - light     (white) -> fills with the normal brand blue, text turns white
  The border color also changes to the fill color so no ring is left behind.
*/
const VARIANTS: Record<Variant, { base: string; fill: string }> = {
    primary: {
        base: "border-[#0b57d0] bg-[#0b57d0] text-white hover:border-[#0b1b3a]",
        fill: "bg-[#0b1b3a]",
    },
    secondary: {
        base: "border-[#0b57d0] bg-white text-[#0b1b3a] hover:border-[#0b1b3a] hover:text-white",
        fill: "bg-[#0b1b3a]",
    },
    dark: {
        base: "border-[#0b1b3a] bg-[#0b1b3a] text-white hover:border-[#0b57d0]",
        fill: "bg-[#0b57d0]",
    },
    light: {
        base: "border-white bg-white text-[#0b1b3a] hover:border-[#0b57d0] hover:text-white",
        fill: "bg-[#0b57d0]",
    },
};

const SIZES: Record<Size, string> = {
    sm: "px-5 py-3.5 text-sm",
    md: "px-7 py-4 text-base",
    lg: "px-6 py-4 text-base md:px-9 md:py-[18px] md:text-[17px]",
};

const BASE =
    "group relative isolate inline-flex items-center justify-center gap-3 overflow-hidden rounded-full border " +
    "font-medium leading-none whitespace-nowrap transition-colors duration-500 " +
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0b57d0]";

// The fill circle is centered on the right edge of the button and scales up from 0
const FILL =
    "pointer-events-none absolute left-full top-1/2 aspect-square w-[260%] -translate-x-1/2 -translate-y-1/2 " +
    "scale-0 rounded-full transition-transform duration-[650ms] ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-100";

// Arrow rolls out and a fresh copy rolls in on hover
const ARROW_PATH = {
    right: "M4 12h16M14 6l6 6-6 6",
    "up-right": "M7 17L17 7M9 7h8v8",
} as const;

const ARROW_OUT = {
    right: "group-hover:translate-x-full",
    "up-right": "group-hover:translate-x-full group-hover:-translate-y-full",
} as const;

const ARROW_IN = {
    right: "-translate-x-full group-hover:translate-x-0",
    "up-right": "-translate-x-full translate-y-full group-hover:translate-x-0 group-hover:translate-y-0",
} as const;

const ARROW_SVG =
    "absolute inset-0 h-full w-full transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]";

function ArrowSvg({ d, className }: { d: string; className: string }) {
    return (
        <svg
            viewBox="0 0 24 24"
            className={`${ARROW_SVG} ${className}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            <path d={d} />
        </svg>
    );
}

export default function Button({
    children,
    href,
    onClick,
    type = "button",
    target,
    rel,
    variant = "primary",
    size = "md",
    arrow = "right",
    className = "",
    "aria-label": ariaLabel,
}: ButtonProps) {
    const v = VARIANTS[variant];
    const classes = `${BASE} ${v.base} ${SIZES[size]} ${className}`;

    const content = (
        <>
            <span aria-hidden="true" className={`${FILL} ${v.fill}`} />
            <span className="relative z-10">{children}</span>
            {arrow !== "none" && (
                <span className="relative z-10 block h-[1.15em] w-[1.15em] overflow-hidden">
                    <ArrowSvg d={ARROW_PATH[arrow]} className={ARROW_OUT[arrow]} />
                    <ArrowSvg d={ARROW_PATH[arrow]} className={ARROW_IN[arrow]} />
                </span>
            )}
        </>
    );

    if (href) {
        return (
            <a href={href} onClick={onClick} target={target} rel={rel} aria-label={ariaLabel} className={classes}>
                {content}
            </a>
        );
    }

    return (
        <button type={type} onClick={onClick} aria-label={ariaLabel} className={classes}>
            {content}
        </button>
    );
}