"use client";

import { useMemo } from "react";
import { hasWeight, inputStatus, isReady, toPatient } from "./patient-form";
import { usePatientForm, usePatients } from "./patient-store";
import { activeOf } from "./patients";
import { useAppliedPendingChoices } from "@/components/history/use-applied-pending-choices";
import { useRecordHistory } from "./use-record-history";
import { useCalculatorTracking } from "./use-calculator-tracking";
import { useChoices } from "./use-choices";
import { useDosageResults } from "./use-dosage-results";
import { useSelectedDrugs } from "./use-selected-drugs";
import { useShare } from "./use-share";
import { useUndoableRemoval } from "./use-undoable-removal";

/**
 * Тооцоолуурын бүх төлөв нэг дор: өвчтөн, сонгосон эм, заалт/бэлдмэл,
 * буцаах, хуваалцах линк, үр дүн. `CalculatorPage` зөвхөн угсарна.
 */
export const useCalculatorState = (initialDrugIds?: readonly string[]) => {
  const [form, setForm] = usePatientForm();
  const selection = useSelectedDrugs(initialDrugIds);
  const { drugs } = selection;
  const { choices, onToggle } = useChoices(selection.toggle);
  const { onRemove, onClear } = useUndoableRemoval(selection);
  useAppliedPendingChoices(choices);
  const share = useShare({
    form,
    setForm,
    selectedIds: selection.selectedIds,
    restore: selection.restore,
    choices,
  });

  const patient = useMemo(() => toPatient(form), [form]);
  const ready = isReady(form);
  const results = useDosageResults({ drugs, patient, indications: choices.indications, ready });
  useCalculatorTracking({ patient, hasWeight: hasWeight(form), results });
  useRecordHistory({ label: activeOf(usePatients())?.label ?? "", patient, drugs, results, choices });

  return {
    form,
    setForm,
    selectedIds: selection.selectedIds,
    drugs,
    choices,
    onToggle,
    onRemove,
    onClear,
    share,
    patient,
    ready,
    results,
    status: inputStatus(form, drugs.length > 0),
  };
};
