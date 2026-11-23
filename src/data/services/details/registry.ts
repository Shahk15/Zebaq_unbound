import type { ServiceDetail } from "../detail.types";
import aiSearchVisibility from "./ai-search-visibility";

// Add each new service here as its data file is created
export const DETAILS: Record<string, ServiceDetail> = {
    [aiSearchVisibility.slug]: aiSearchVisibility,
};

export const getDetail = (slug?: string) => (slug ? DETAILS[slug] : undefined);