import { useSyncExternalStore } from "react";

// What the visitor tells us while exploring: their business name (every demo shows it)
// and the plan they build (it travels to the booking form). Kept in this tab only.
export type Plan = { service: string; lines: string[]; estimate?: string };
type State = { name: string; plan: Plan | null };

const KEY = "zebaq-visitor";
const read = (): State => {
    try {
        const v = JSON.parse(sessionStorage.getItem(KEY) ?? "");
        return { name: typeof v.name === "string" ? v.name.slice(0, 32) : "", plan: null };
    } catch {
        return { name: "", plan: null };
    }
};

let state: State = read();
const subs = new Set<() => void>();
const emit = () => subs.forEach((f) => f());
const subscribe = (f: () => void) => {
    subs.add(f);
    return () => {
        subs.delete(f);
    };
};

export const setBusinessName = (name: string) => {
    state = { ...state, name: name.slice(0, 32) };
    try {
        sessionStorage.setItem(KEY, JSON.stringify({ name: state.name }));
    } catch {
        // private mode: keep it in memory only
    }
    emit();
};

export const setPlan = (plan: Plan | null) => {
    state = { ...state, plan };
    emit();
};

export const useVisitor = () => useSyncExternalStore(subscribe, () => state);

/** The visitor's business name, or a neutral stand-in */
export const useBiz = (fallback = "Your Business") => useVisitor().name.trim() || fallback;
