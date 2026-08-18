"use client";

import { useCallback, useState } from "react";

export type IndicationMap = ReadonlyMap<string, string | undefined>;

const withEntry = (
  map: IndicationMap,
  drugId: string,
  code?: string,
): IndicationMap => new Map(map).set(drugId, code);

/** Эм тус бүрд сонгосон заалтыг хадгална. */
export const useIndications = () => {
  const [indications, setIndications] = useState<IndicationMap>(new Map());

  const select = useCallback(
    (drugId: string, code?: string) =>
      setIndications((map) => withEntry(map, drugId, code)),
    [],
  );

  return { indications, select };
};
