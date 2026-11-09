"use client";

import { openSearch } from "./search-open";

/** Хайлтыг нээж, фокуслах хүсэлт — толгойн товч, `/`, ⌘K. */
export const FOCUS_SEARCH_EVENT = "dosage:focus-search";

/** `DrugSearch`-ийн Card-ийн id. Доторх cmdk оролт руу хүрэх зам. */
export const DRUG_SEARCH_ID = "drug-search";

/** Хайлтыг нээнэ — mobile-д бүтэн дэлгэц, desktop-д ⌘K palette (V4, `SearchOverlay`). */
export const requestSearchFocus = (): void => openSearch();

/**
 * cmdk нь оролтод өөрийн `id`-г хүчээр тавьдаг тул id-аар биш,
 * `[cmdk-input]` атрибутаар олно.
 */
export const focusSearchInput = (): void => {
  const input = document.querySelector<HTMLInputElement>(`#${DRUG_SEARCH_ID} [cmdk-input]`);
  input?.focus();
  input?.scrollIntoView({ block: "center", behavior: "smooth" });
};

const TYPING = new Set(["INPUT", "TEXTAREA", "SELECT"]);

const isTyping = (target: EventTarget | null): boolean =>
  target instanceof HTMLElement && (TYPING.has(target.tagName) || target.isContentEditable);

const isCommandK = (event: KeyboardEvent): boolean =>
  (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k";

/**
 * `/` (бичиж байхгүй үед) эсвэл ⌘K / Ctrl+K — хайлт руу үсрэх товчлол
 * (HEURISTICS.md §7, Nielsen H7).
 */
export const isSearchShortcut = (event: KeyboardEvent): boolean =>
  isCommandK(event) || (event.key === "/" && !isTyping(event.target));
