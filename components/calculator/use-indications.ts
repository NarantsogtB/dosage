"use client";

import { useCallback, useState } from "react";

export type IndicationMap = ReadonlyMap<string, string | undefined>;

const withEntry = (
  map: IndicationMap,
  drugId: string,
  code?: string,
): IndicationMap => new Map(map).set(drugId, code);

/**
 * Эм тус бүрд сонгосон заалтыг хадгална.
 *
 * `onToggle` — эм сонгох + өвчнөөр хайж олдсон бол тухайн заалтыг
 * урьдчилан сонгох (Шат 4).
 */
export const useIndications = (toggle: (id: string) => void) => {
  const [indications, setIndications] = useState<IndicationMap>(new Map());

  const select = useCallback(
    (drugId: string, code?: string) =>
      setIndications((map) => withEntry(map, drugId, code)),
    [],
  );

  const onToggle = useCallback(
    (id: string, indicationCode?: string) => {
      toggle(id);
      if (indicationCode) select(id, indicationCode);
    },
    [toggle, select],
  );

  return { indications, select, onToggle };
};

