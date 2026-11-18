# ZEBAQ — cinematic homepage

React + Vite + Tailwind + GSAP. The previous hand-built site is preserved at the git tag `legacy-manual-site`.

```bash
npm run dev        # then open http://localhost:5173/
npm run build      # production build into dist/
```

## Where things are
- **All copy:** `src/content.ts`. Items with `verify: true` show a red "verify" tag in dev only.
- **SEO / AI search:** `vite.config.ts` writes Organization + Services + FAQPage JSON-LD into `index.html` at build time, from `content.ts`. FAQ answers target the AI-assistant queries.
- **Hero horse:** client-supplied rearing marble horse → background + stand removed and four variants generated locally: `public/v2/horse-hero-kintsugi.webp` (hero), `horse-hero-gold.webp` (cursor glow), `horse-pristine.webp` and `horse-cracked.webp` (Why ZEBAQ). No external upload.
- **Globe:** `src/data/land-dots.json` — land dots precomputed from Natural Earth (public domain).
- **Imagery:** other sculpture photos are free Unsplash images (Unsplash License), listed in `IMAGES` in `content.ts` and hot-linked from Unsplash's CDN. Swap for owned or AI-generated art any time. Client mockups are screenshots of the live client sites in `public/v2/work/`.
- **Motion:** loader, custom cursor and dot-wave field in `src/components/fx.tsx`; shared reveal/split/parallax in `App.tsx`.
- **Lead capture:** `src/sections/Diagnostic.tsx`. Set `VITE_LEAD_ENDPOINT=https://…` in `.env` to POST leads as JSON to a Zapier / Make / n8n / HubSpot webhook. Without it, the form opens a pre-filled email.

## Before launch
- Confirm stats (1,000+ SMEs, 30+ countries, 48+ industries), case-study outcomes, and permission for the Google-review quotes.
- Set `SITE.bookingUrl` to a Calendly / HubSpot meetings link.
- Add real team photography and 2–3 video testimonials (slot marked in `Testimonials.tsx`).
- Consider prerendering (for example `vite-plugin-prerender` or a move to Next.js) so crawlers that don't run JavaScript see the full copy.
