"use client";

import { useSyncExternalStore } from "react";
import { parseHistory, recordEntries, type HistoryEntry } from "@/lib/history/history";

const KEY = "dosage.history.v1";
const EMPTY: readonly HistoryEntry[] = [];

let cache: readonly HistoryEntry[] | undefined;
const listeners = new Set<() => void>();

/*
 * Түүх нь өвчтөний жин, нас, шошгыг ТӨХӨӨРӨМЖ ДЭЭР 30 хоног хадгална (localStorage;
 * серверт явахгүй). `recent-store.ts`-тэй ижил: хандалт бүр try/catch, алдаа гарвал хоосон.
 */

const read = (): readonly HistoryEntry[] => {
  try {
    return parseHistory(localStorage.getItem(KEY), Date.now());
  } catch {
    return EMPTY;
  }
};

const write = (entries: readonly HistoryEntry[]): void => {
  try {
    localStorage.setItem(KEY, JSON.stringify(entries));
  } catch {
    // Хадгалж чадахгүй ч энэ хуудсанд санах ойд үлдэнэ.
  }
};

const getSnapshot = (): readonly HistoryEntry[] => (cache ??= read());

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

/** Бүх түүхийг сольно (устгах, «Буцаах»). */
export const replaceHistory = (entries: readonly HistoryEntry[]): void => {
  cache = entries;
  write(entries);
  listeners.forEach((listener) => listener());
};

export const snapshotHistory = getSnapshot;

export const recordHistory = (incoming: Parameters<typeof recordEntries>[1]): void =>
  replaceHistory(recordEntries(getSnapshot(), incoming, Date.now()));

/** Түүх. Сервер дээр ҮРГЭЛЖ хоосон — hydration зөрөхгүй. */
export const useHistory = (): readonly HistoryEntry[] =>
  useSyncExternalStore(subscribe, getSnapshot, () => EMPTY);
