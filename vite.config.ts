import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { SITE, FAQ, SERVICES } from "./src/content.ts";

// Writes JSON-LD (Organization, Services, FAQ) straight into index.html so
// search engines and AI crawlers that don't run JavaScript still read it.
function schema(): Plugin {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": `${SITE.url}/#org`,
        name: SITE.name,
        url: SITE.url,
        email: SITE.email,
        logo: `${SITE.url}/images/logo/full-logo.png`,
        description: SITE.description,
        slogan: SITE.tagline,
        areaServed: ["US", "CA", "GB", "EU", "AE", "IN", "AU", "NZ"],
        address: SITE.offices.map((o) => ({
          "@type": "PostalAddress",
          name: o.entity,
          streetAddress: o.address,
          addressCountry: o.country,
        })),
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "ZEBAQ services",
          itemListElement: SERVICES.map((s) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: s.name, description: `${s.outcome} ${s.bullets.join(". ")}.` },
          })),
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: FAQ.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };
  return {
    name: "zebaq-schema",
    transformIndexHtml(html) {
      return html.replace("</head>", `<script type="application/ld+json">${JSON.stringify(graph)}</script>\n</head>`);
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), schema()],
});
