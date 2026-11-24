import { SERVICES } from "../shared/services";

// Slugs of services whose page is ready. All of them now: their rows open the page instead of the popup.
export const LIVE_SERVICE_PAGES = SERVICES.map((s) => s.slug);
