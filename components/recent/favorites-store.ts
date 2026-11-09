"use client";

import { useSyncExternalStore } from "react";
import { parseFavorites, toggleFavorite } from "@/lib/recent/favorite-drugs";

const KEY = "dosage.favorites.v1";
const EMPTY: readonly string[] = [];

let cache: readonly string[] | undefined;
const listeners = new Set<() => void>();

/*
 * «Миний эмүүд» — эмийн id л (өвчтөний мэдээлэл БИШ), тиймээс localStorage.
 * `recent-store.ts`-тэй ижил: хандалт бүр try/catch, алдаа гарвал хоосон.
 */

const read = (): readonly string[] => {
  try {
    return parseFavorites(localStorage.getItem(KEY));
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

export const toggleFavoriteDrug = (id: string): void => {
  cache = toggleFavorite(getSnapshot(), id);
  write(cache);
  listeners.forEach((listener) => listener());
};

/** Миний эмүүдийн id-ууд. Сервер дээр ҮРГЭЛЖ хоосон — hydration зөрөхгүй. */
export const useFavoriteIds = (): readonly string[] =>
  useSyncExternalStore(subscribe, getSnapshot, () => EMPTY);
