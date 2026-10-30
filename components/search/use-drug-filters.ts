"use client";

import { useMemo, useState } from "react";
import type { Drug } from "@/lib/domain/drug";
import type { DrugCategory } from "@/lib/domain/category";
import { CATEGORY_LABELS } from "@/lib/data/labels/category-labels";
import { filterDrugs } from "@/lib/search/filter-drugs";
import { useTrackSearchMisses } from "./use-track-search-misses";

/** Хайлт, ангилал, баталгаажилтын шүүлтүүрийн төлөв. */
export const useDrugFilters = (drugs: readonly Drug[]) => {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<DrugCategory | undefined>();
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  const visible = useMemo(
    () => filterDrugs(drugs, { query, category, verifiedOnly }),
    [drugs, query, category, verifiedOnly],
  );
  useTrackSearchMisses({ query, visible, category, verifiedOnly });

  const reset = () => {
    setQuery("");
    setCategory(undefined);
    setVerifiedOnly(false);
  };

  return {
    query,
    setQuery,
    category,
    setCategory,
    verifiedOnly,
    toggleVerified: () => setVerifiedOnly((on) => !on),
    visible,
    reset,
    labels: {
      query,
      categoryLabel: category ? CATEGORY_LABELS[category] : undefined,
      verifiedOnly,
    },
  };
};
