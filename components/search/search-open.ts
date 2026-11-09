"use client";

import type { DrugCategory } from "@/lib/domain/category";

/** Бүтэн дэлгэцийн хайлтыг нээх хүсэлт (`SearchOverlayHost` сонсоно). */
export const OPEN_SEARCH_EVENT = "dosage:open-search";

/**
 * `pick` — эмийг идэвхтэй өвчтөнд нэмнэ. `favorite` — «Миний эмүүд»-ийг
 * нэмж/хасна (хайлт хаагдахгүй).
 */
export type SearchMode = "pick" | "favorite";

export interface OpenSearchDetail {
  readonly mode?: SearchMode;
  readonly category?: DrugCategory;
}

export const openSearch = (detail: OpenSearchDetail = {}): void => {
  window.dispatchEvent(new CustomEvent<OpenSearchDetail>(OPEN_SEARCH_EVENT, { detail }));
};
