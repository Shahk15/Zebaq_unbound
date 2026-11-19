import { MODELS } from "../../data/models";
import { Split } from "../common/ui";

export default function Models() {
  return (
    <section
      data-over
      data-index="12"
      data-label="Flexible Engagement Models"
      className="on-light section relative rounded-t-[40px] bg-glacier"
    >
      <div className="wrap">
        <p className="eyebrow" data-reveal>Flexible engagement</p>
        <h2 className="t-xl mt-8"><Split text="Work with us your way" dot /></h2>
        <div className="mt-24 grid gap-4 md:grid-cols-2 lg:grid-cols-4" data-flip>
          {MODELS.map((m, i) => (
            <div
              key={m.t}
              className="group relative isolate flex min-h-[360px] flex-col justify-between overflow-hidden rounded-[28px] bg-off p-8 transition-[translate,box-shadow] duration-500 ease-[cubic-bezier(.2,.8,.2,1)] hover:-translate-y-2 hover:shadow-[0_30px_60px_-30px_rgba(10,31,68,.35)]"
            >
              {/* lemon fill that rises from the bottom on hover */}
              <span aria-hidden="true" className="absolute inset-0 -z-10 translate-y-full bg-lemon transition-transform duration-500 ease-[cubic-bezier(.2,.8,.2,1)] group-hover:translate-y-0" />
              {/* navy accent line that draws across the top */}
              <span aria-hidden="true" className="absolute inset-x-8 top-0 h-[3px] origin-left scale-x-0 rounded-b-full bg-navy transition-transform duration-500 ease-[cubic-bezier(.2,.8,.2,1)] group-hover:scale-x-100" />

              <div className="flex items-start justify-between">
                <span
                  className="origin-left text-[88px] font-medium leading-none tracking-[-0.06em] text-glacier-2 transition-[color,transform] duration-500 group-hover:scale-105 group-hover:text-navy"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {i + 1}
                </span>
                {/* pulsing brand dot */}
                <span aria-hidden="true" className="relative mt-3 flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lemon-deep opacity-60 motion-reduce:animate-none group-hover:bg-navy" />
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-lemon-deep transition-colors duration-500 group-hover:bg-navy" />
                </span>
              </div>

              <div>
                <h3 className="text-2xl font-semibold tracking-tight">{m.t}</h3>
                <p className="mt-3 leading-relaxed text-navy-2 transition-colors duration-500 group-hover:text-navy">{m.d}</p>

                {/* CTA on every card */}
                <a
                  href="#contact"
                  aria-label={`Discuss the ${m.t} model`}
                  className="mt-6 flex items-center justify-between gap-4 border-t border-navy/10 pt-5 text-[15px] font-semibold text-navy transition-colors duration-500 group-hover:border-navy/25 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-navy"
                >
                  <span>Discuss this model</span>
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-navy text-off transition-transform duration-500 ease-[cubic-bezier(.2,.8,.2,1)] group-hover:-rotate-45 group-hover:scale-110">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}