"use client";

import { useSyncExternalStore } from "react";

/** «Дахиж харуулахгүй» / «Ойлголоо» дарсан эсэх. Зөвхөн энэ төхөөрөмжид. */
const KEY = "dosage.tour.v1";
const DONE = "done";

let cache: boolean | undefined;
const listeners = new Set<() => void>();

/* localStorage — `prefs-store.ts`-тэй ижил: хандалт бүр try/catch.
 * Уншиж чадахгүй бол «үзсэн» гэж үзнэ — хувийн цонхонд хуудас бүрт гарч саадлахгүй. */
const read = (): boolean => {
  try {
    return localStorage.getItem(KEY) === DONE;
  } catch {
    return true;
  }
};

const persist = (done: boolean): void => {
  try {
    if (done) localStorage.setItem(KEY, DONE);
    else localStorage.removeItem(KEY);
  } catch {
    // Хадгалж чадахгүй ч энэ хуудсанд санах ойд үлдэнэ.
  }
};

const write = (done: boolean): void => {
  cache = done;
  persist(done);
  listeners.forEach((listener) => listener());
};

const getSnapshot = (): boolean => (cache ??= read());

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

/** Дахиж харуулахгүй. */
export const markTourDone = (): void => write(true);

/** Тохиргооноос «Хэрхэн ашиглах заавар» — дараагийн тооцоолуурын хуудсанд дахин гарна. */
export const resetTour = (): void => write(false);

/** Сервер дээр ҮРГЭЛЖ `true` — статик HTML-д заавар гарахгүй, hydration зөрөхгүй. */
export const useTourDone = (): boolean => useSyncExternalStore(subscribe, getSnapshot, () => true);
