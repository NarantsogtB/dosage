"use client";

import { useMemo } from "react";
import { searchMissEvents } from "@/lib/analytics/builders";
import { useTrackSettled } from "@/components/analytics/use-track-settled";
import type { Drug } from "@/lib/domain/drug";
import type { DrugCategory } from "@/lib/domain/category";

interface Filters {
  readonly query: string;
  readonly visible: readonly Drug[];
  readonly category?: DrugCategory;
  readonly verifiedOnly: boolean;
  /** Замын шүүлт идэвхтэй эсэх (Шат 6). */
  readonly routeFiltered?: boolean;
}

/** Эмч бичиж дуусаад (1.2 сек) юу ч олдоогүй бол хайлтын үгийг тэмдэглэнэ. */
const SEARCH_SETTLE_MS = 1200;

export const useTrackSearchMisses = (filters: Filters): void => {
  const { query, visible, category, verifiedOnly, routeFiltered } = filters;
  const misses = useMemo(
    () =>
      searchMissEvents({
        query,
        shown: visible.length,
        filtered: category !== undefined || verifiedOnly || Boolean(routeFiltered),
      }),
    [query, visible.length, category, verifiedOnly, routeFiltered],
  );
  useTrackSettled(misses, SEARCH_SETTLE_MS);
};
