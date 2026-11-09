"use client";

import { useSyncExternalStore } from "react";

const DESKTOP = "(min-width: 1024px)";

const subscribe = (listener: () => void) => {
  const query = window.matchMedia(DESKTOP);
  query.addEventListener("change", listener);
  return () => query.removeEventListener("change", listener);
};

/**
 * Desktop (≥lg, 1024px) эсэх. Сервер, hydration-ы эхний зураг ҮРГЭЛЖ `false` (mobile) —
 * статик HTML-д зөрүүгүй; hydration-ы дараа бодит утга. Mobile, desktop биеийг
 * НЭГ DOM-д давхар mount хийхгүйн тулд (`id="dose-x"` давхардахгүй) CSS биш энэ hook-оор сонгоно.
 */
export const useIsDesktop = (): boolean =>
  useSyncExternalStore(
    subscribe,
    () => window.matchMedia(DESKTOP).matches,
    () => false,
  );
