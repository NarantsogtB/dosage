"use client";

import { useCallback, useState } from "react";
import { useIndications, type IndicationMap } from "./use-indications";

export type FormulationMap = ReadonlyMap<string, string | undefined>;

/** Эм тус бүрд эмчийн сонгосон заалт, бэлдмэл — үр дүнгийн картуудад. */
export interface Choices {
  readonly indications: IndicationMap;
  readonly formulations: FormulationMap;
  readonly onIndication: (drugId: string, code?: string) => void;
  readonly onFormulation: (drugId: string, formulationId: string) => void;
}

/**
 * Заалт ба бэлдмэлийн сонголт. Бэлдмэл өмнө нь картын дотор (`useState`)
 * байсан — линкээр хуваалцах (Шат 5) нь бүх картын сонголтыг уншдаг тул
 * энд өргөв.
 */
export const useChoices = (toggle: (id: string) => void) => {
  const { indications, select, onToggle } = useIndications(toggle);
  const [formulations, setFormulations] = useState<FormulationMap>(new Map());
  const onFormulation = useCallback(
    (drugId: string, formulationId: string) =>
      setFormulations((map) => new Map(map).set(drugId, formulationId)),
    [],
  );
  const choices: Choices = { indications, formulations, onIndication: select, onFormulation };
  return { choices, onToggle };
};
