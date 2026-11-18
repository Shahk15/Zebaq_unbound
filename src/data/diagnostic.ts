export const DIAGNOSTIC = [
  { q: "What's your biggest growth challenge right now?", options: ["Not enough qualified leads", "Website traffic isn't converting", "Low visibility on Google or AI search", "Leads aren't turning into customers"] },
  { q: "Which best describes your business?", options: ["B2B company", "Service business", "Consultant or professional firm", "Marketing agency"] },
  { q: "Which engagement model fits best?", options: ["Project-based", "Monthly managed", "Dedicated talent", "Not sure yet"] },
];

export const DIAGNOSTIC_INSIGHT: Record<string, { title: string; body: string; services: string[] }> = {
  "Not enough qualified leads": { title: "You likely have a targeting gap, not a volume gap.", body: "The right decision-makers, reached consistently and followed up fast, usually beat more leads.", services: ["02", "04", "07"] },
  "Website traffic isn't converting": { title: "You likely have a conversion gap.", body: "Traffic is already paid for. Message, page and journey changes often outperform buying more of it.", services: ["09", "03"] },
  "Low visibility on Google or AI search": { title: "You likely have a discoverability gap.", body: "Buyers now ask AI assistants for recommendations. If your entity and content aren't clear to them, you're invisible.", services: ["01", "03"] },
  "Leads aren't turning into customers": { title: "You likely have a follow-up gap.", body: "Most lost deals are lost to silence. Speed-to-lead and structured nurturing recover revenue you've already earned.", services: ["07", "10", "09"] },
};
