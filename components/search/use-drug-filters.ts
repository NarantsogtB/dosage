"use client";

import { useMemo, useState } from "react";
import type { Drug } from "@/lib/domain/drug";
import type { DrugCategory } from "@/lib/domain/category";
import { CATEGORY_LABELS } from "@/lib/data/labels/category-labels";
import { filterDrugs, indicationHits } from "@/lib/search/filter-drugs";
import { ROUTE_FILTER_LABELS, type RouteFilter } from "@/lib/search/route-filter";
import { useTrackSearchMisses } from "./use-track-search-misses";

/** Хайлт, ангилал, баталгаажилтын шүүлтүүрийн төлөв. `initialCategory` — ангиллын картаас нээхэд. */
export const useDrugFilters = (drugs: readonly Drug[], initialCategory?: DrugCategory) => {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<DrugCategory | undefined>(initialCategory);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [route, setRoute] = useState<RouteFilter | undefined>();

  const visible = useMemo(
    () => filterDrugs(drugs, { query, category, verifiedOnly, route }),
    [drugs, query, category, verifiedOnly, route],
  );
  const hits = useMemo(() => indicationHits(visible, query), [visible, query]);
  useTrackSearchMisses({ query, visible, category, verifiedOnly, routeFiltered: route !== undefined });

  const reset = () => {
    setQuery("");
    setCategory(undefined);
    setVerifiedOnly(false);
    setRoute(undefined);
  };

  return {
    query,
    setQuery,
    category,
    setCategory,
    verifiedOnly,
    route,
    setRoute,
    toggleVerified: () => setVerifiedOnly((on) => !on),
    visible,
    hits,
    reset,
    labels: {
      query,
      categoryLabel: category ? CATEGORY_LABELS[category] : undefined,
      routeLabel: route ? ROUTE_FILTER_LABELS[route] : undefined,
      verifiedOnly,
    },
  };
};
