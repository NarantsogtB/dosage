"use client";

import { useCallback, useState } from "react";
import type { BodyRegionId, BurnDepth, BurnSelection } from "@/lib/domain/body-region";

export type SelectionMap = ReadonlyMap<BodyRegionId, BurnDepth>;

const withRegion = (
  map: SelectionMap,
  region: BodyRegionId,
  depth?: BurnDepth,
): SelectionMap => {
  const next = new Map(map);
  if (depth === undefined) next.delete(region);
  else next.set(region, depth);
  return next;
};

const toSelection = (
  entry: readonly [BodyRegionId, BurnDepth],
): BurnSelection => ({ region: entry[0], depth: entry[1], fraction: 1 });

/** Сонгосон бүс бүрийн түлэгдэлтийн зэргийг хадгална. */
export const useBurnSelections = () => {
  const [map, setMap] = useState<SelectionMap>(new Map());

  const setDepth = useCallback(
    (region: BodyRegionId, depth?: BurnDepth) =>
      setMap((current) => withRegion(current, region, depth)),
    [],
  );

  const clear = useCallback(() => setMap(new Map()), []);

  const selections: readonly BurnSelection[] = [...map.entries()].map(toSelection);

  return { map, selections, setDepth, clear };
};
