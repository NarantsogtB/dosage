"use client";

import { useSyncExternalStore } from "react";
import { DEFAULT_PREFS, parsePrefs, type Prefs } from "./prefs";

const KEY = "dosage.prefs.v1";

let cache: Prefs | undefined;
const listeners = new Set<() => void>();

/* localStorage — `recent-store.ts`-тэй ижил: хандалт бүр try/catch. */

const read = (): Prefs => {
  try {
    return parsePrefs(localStorage.getItem(KEY));
  } catch {
    return DEFAULT_PREFS;
  }
};

const getSnapshot = (): Prefs => (cache ??= read());

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

export const setPrefs = (patch: Partial<Prefs>): void => {
  cache = { ...getSnapshot(), ...patch };
  try {
    localStorage.setItem(KEY, JSON.stringify(cache));
  } catch {
    // Хадгалж чадахгүй ч энэ хуудсанд санах ойд үлдэнэ.
  }
  listeners.forEach((listener) => listener());
};

/** Сервер дээр ҮРГЭЛЖ анхдагч — hydration зөрөхгүй. */
export const usePrefs = (): Prefs => useSyncExternalStore(subscribe, getSnapshot, () => DEFAULT_PREFS);
