"use client";

import { useSyncExternalStore } from "react";
import { parseRecent, pushRecent } from "@/lib/recent/recent-drugs";

const KEY = "dosage.recent.v1";
const EMPTY: readonly string[] = [];

let cache: readonly string[] | undefined;
const listeners = new Set<() => void>();

/*
 * localStorage нь private горим, хаалттай site data, preview-д throw
 * хийж эсвэл хоосон буцаж болно. Тиймээс бүх хандалт try/catch-тэй,
 * алдаа гарвал жагсаалт зүгээр л хоосон — тооцоолуур хэвийн.
 */

const read = (): readonly string[] => {
  try {
    return parseRecent(localStorage.getItem(KEY));
  } catch {
    return EMPTY;
  }
};

const write = (ids: readonly string[]): void => {
  try {
    localStorage.setItem(KEY, JSON.stringify(ids));
  } catch {
    // Хадгалж чадахгүй ч энэ хуудсанд санах ойд үлдэнэ.
  }
};

const getSnapshot = (): readonly string[] => (cache ??= read());

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

/** Эмчийн өөрөө сонгосон эмийг «сүүлд хэрэглэсэн»-д нэмнэ. */
export const rememberDrug = (id: string): void => {
  cache = pushRecent(getSnapshot(), id);
  write(cache);
  listeners.forEach((listener) => listener());
};

/**
 * Сүүлд хэрэглэсэн эмийн id-ууд. Статик HTML (сервер) дээр ҮРГЭЛЖ
 * хоосон — hydration зөрөхгүй, client дээр уншсаны дараа гарна.
 */
export const useRecentDrugIds = (): readonly string[] =>
  useSyncExternalStore(subscribe, getSnapshot, () => EMPTY);
