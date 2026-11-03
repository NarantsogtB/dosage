"use client";

import { useEffect, useRef, useState } from "react";
import { DRUG_BY_ID } from "@/lib/data/drugs";
import { hasShare, parseShare, serializeShare, type SharedCalc } from "@/lib/share/share-link";
import type { Choices } from "./use-choices";
import type { PatientForm } from "./patient-form";
import { formOf, toSharedCalc } from "./share-state";

interface Input {
  readonly form: PatientForm;
  readonly setForm: (form: PatientForm) => void;
  readonly selectedIds: readonly string[];
  readonly restore: (ids: readonly string[]) => void;
  readonly choices: Choices;
}

/** Хуваалцсан линкээр нээгдсэн үеийн мэдэгдэл. */
export interface SharedNoticeState {
  readonly skipped: readonly string[];
}

const applyChoices = (calc: SharedCalc, choices: Choices): void =>
  calc.drugs.forEach((drug) => {
    if (drug.indication) choices.onIndication(drug.id, drug.indication);
    if (drug.formulation) choices.onFormulation(drug.id, drug.formulation);
  });

/** Fragment-ийг арилгана — дахин ачаалахад дахин сэргээхгүй, түүхэнд үлдэхгүй. */
const clearFragment = (): void =>
  history.replaceState(null, "", `${location.pathname}${location.search}`);

/**
 * Линкээр хуваалцах (Шат 5): ачаалахад `#...`-ээс сэргээж, одоогийн
 * төлөвийн fragment-ийг буцаана. Fragment сервер рүү явдаггүй.
 */
export const useShare = ({ form, setForm, selectedIds, restore, choices }: Input) => {
  const [notice, setNotice] = useState<SharedNoticeState | null>(null);
  const restored = useRef(false);

  useEffect(() => {
    if (restored.current || !hasShare(location.hash)) return;
    restored.current = true;
    const { calc, skipped } = parseShare(location.hash, DRUG_BY_ID);
    setForm(formOf(calc));
    restore(calc.drugs.map((drug) => drug.id));
    applyChoices(calc, choices);
    setNotice({ skipped });
    clearFragment();
  }, [setForm, restore, choices]);

  return {
    fragment: serializeShare(toSharedCalc(form, selectedIds, choices)),
    notice,
    dismiss: () => setNotice(null),
  };
};
