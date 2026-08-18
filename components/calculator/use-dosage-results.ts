"use client";

import { useMemo } from "react";
import type { CalculationResult } from "@/lib/domain/calculation-result";
import type { Drug } from "@/lib/domain/drug";
import type { Patient } from "@/lib/domain/patient";
import type { IndicationMap } from "./use-indications";
import { calculateDosage } from "@/lib/engine";

export interface ResultsInput {
  readonly drugs: readonly Drug[];
  readonly patient: Patient;
  readonly indications: IndicationMap;
  readonly ready: boolean;
}

const entryOf = (input: ResultsInput, drug: Drug) =>
  [
    drug.id,
    calculateDosage(drug, input.patient, {
      indicationCode: input.indications.get(drug.id),
    }),
  ] as const;

const compute = (
  input: ResultsInput,
): ReadonlyMap<string, CalculationResult> =>
  new Map(input.drugs.map((drug) => entryOf(input, drug)));

/** Сонгосон эм бүрд тунг тооцоолж, id-гаар индекслэнэ. */
export const useDosageResults = (
  input: ResultsInput,
): ReadonlyMap<string, CalculationResult> => {
  const { drugs, patient, indications, ready } = input;
  return useMemo(
    () => (ready ? compute({ drugs, patient, indications, ready }) : new Map()),
    [drugs, patient, indications, ready],
  );
};
