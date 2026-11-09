"use client";

import { openSearch } from "./search-open";

/** Хайлтыг нээнэ — mobile-д бүтэн дэлгэц, desktop-д ⌘K palette (V4, `SearchOverlay`). */
export const requestSearchFocus = (): void => openSearch();

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
