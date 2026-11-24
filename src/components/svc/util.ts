export const photo = (n: string) => `/images/services/${n}.webp`;
export const money = (n: number) => "$" + Math.round(n).toLocaleString("en-US");
export const num = (n: number) => Math.round(n).toLocaleString("en-US");
/** 0 → 1 as v moves from a to b */
export const ramp = (v: number, a: number, b: number) => Math.min(1, Math.max(0, (v - a) / (b - a)));
/** A handle made from a business name: "Blue Moon Lounge" → "bluemoonlounge" */
export const handle = (n: string) => n.toLowerCase().replace(/[^a-z0-9]+/g, "").slice(0, 22) || "yourbusiness";
