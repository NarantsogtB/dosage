"use client";

import { useCallback, useMemo, useState } from "react";
import type { Drug } from "@/lib/domain/drug";
import { DRUG_BY_ID } from "@/lib/data/drugs";

const isDrug = (drug?: Drug): drug is Drug => drug !== undefined;

const without = (ids: readonly string[], id: string): readonly string[] =>
  ids.filter((item) => item !== id);

const toggleId = (ids: readonly string[], id: string): readonly string[] =>
  ids.includes(id) ? without(ids, id) : [...ids, id];

/** Сонгосон эмийн id-уудыг хадгалж, Drug объект болгон буцаана. */
export const useSelectedDrugs = () => {
  const [selectedIds, setSelectedIds] = useState<readonly string[]>([]);

  const toggle = useCallback(
    (id: string) => setSelectedIds((ids) => toggleId(ids, id)),
    [],
  );

  const remove = useCallback(
    (id: string) => setSelectedIds((ids) => without(ids, id)),
    [],
  );

  const clear = useCallback(() => setSelectedIds([]), []);

  const drugs = useMemo(
    () => selectedIds.map((id) => DRUG_BY_ID.get(id)).filter(isDrug),
    [selectedIds],
  );

  return { selectedIds, drugs, toggle, remove, clear };
};
