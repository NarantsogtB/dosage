"use client";

import { useEffect } from "react";
import type { CalculationResult } from "@/lib/domain/calculation-result";
import type { Drug } from "@/lib/domain/drug";
import type { Patient } from "@/lib/domain/patient";
import { recordHistory } from "@/components/history/history-store";
import type { Choices } from "./use-choices";

interface Input {
  readonly label: string;
  readonly patient: Patient;
  readonly drugs: readonly Drug[];
  readonly results: ReadonlyMap<string, CalculationResult>;
  readonly choices: Choices;
}

const SETTLE_MS = 1500;

const entriesOf = ({ label, patient, drugs, results, choices }: Input) =>
  drugs
    .filter((drug) => results.get(drug.id)?.type === "dosage")
    .map((drug) => ({
      label,
      weightKg: patient.weightKg,
      ageMonths: patient.ageMonths,
      drugId: drug.id,
      indication: choices.indications.get(drug.id),
      formulation: choices.formulations.get(drug.id),
    }));

/**
 * Тооцоо ТОГТСОНЫ дараа түүхэнд бичнэ. Эмч жинг "1" → "15" гэж бичих үед
 * завсрын утгыг бичихгүйн тулд `SETTLE_MS` өөрчлөлтгүй байх ёстой (analytics-ийн
 * `useTrackSettled`-тэй ижил зарчим). `results` нь бүх оролт хүчинтэй үед л дүүрнэ.
 * Ижил хос дахин бол store цагийг шинэчилнэ (`recordEntries`).
 */
export const useRecordHistory = (input: Input): void => {
  const key = JSON.stringify(entriesOf(input));

  useEffect(() => {
    const entries = JSON.parse(key) as ReturnType<typeof entriesOf>;
    if (entries.length === 0) return;
    const timer = setTimeout(() => recordHistory(entries), SETTLE_MS);
    return () => clearTimeout(timer);
  }, [key]);
};
