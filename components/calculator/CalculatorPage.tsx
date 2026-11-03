"use client";

import type { ReactNode } from "react";
import { useMemo } from "react";
import Disclaimer from "@/components/Disclaimer";
import PrintTemplate from "@/components/print/PrintTemplate";
import ActionBar from "./ActionBar";
import AppFooter from "./AppFooter";
import InputColumn from "./InputColumn";
import PatientBar from "./PatientBar";
import ResultsColumn from "./ResultsColumn";
import { hasWeight, inputStatus, isReady, toPatient } from "./patient-form";
import { usePatientForm } from "./patient-store";
import { useCalculatorTracking } from "./use-calculator-tracking";
import { useDosageResults } from "./use-dosage-results";
import { useIndications } from "./use-indications";
import { useSelectedDrugs } from "./use-selected-drugs";
import { useUndoableRemoval } from "./use-undoable-removal";

interface Props {
  /** Урьдчилан сонгох эмүүд (эмийн хуудаснаас). */
  readonly initialDrugIds?: readonly string[];
  /** Тооцоолуурын дээр — эмийн хуудасны гарчиг. */
  readonly intro?: ReactNode;
  /** Тооцоолуурын доор, footer-ийн өмнө — статик мэдээлэл. */
  readonly children?: ReactNode;
}

/**
 * Тооцоолуурын үндсэн хуудас. Төлөвийг эзэмшиж, хэсгүүдийг угсарна.
 *
 * Template — Figma "V3 · 04 Templates": mobile-д нэг багана (жин эхэнд),
 * desktop (≥1024) 5/7 сүлжээ — зүүн талд оролт, баруун талд үр дүн.
 */
export default function CalculatorPage({ initialDrugIds, intro, children }: Props) {
  const [form, setForm] = usePatientForm();
  const selection = useSelectedDrugs(initialDrugIds);
  const { drugs } = selection;
  const { indications, select } = useIndications();
  const { onRemove, onClear } = useUndoableRemoval(selection);

  const patient = useMemo(() => toPatient(form), [form]);
  const ready = isReady(form);
  const results = useDosageResults({ drugs, patient, indications, ready });
  const status = inputStatus(form, drugs.length > 0);
  useCalculatorTracking({ patient, hasWeight: hasWeight(form), results });

  return (
    <main className="mx-auto w-full max-w-4xl space-y-4 px-4 py-6 sm:px-6 lg:max-w-[1440px] lg:px-20">
      <PatientBar patient={patient} ready={ready} drugs={drugs} results={results} onClear={onClear} />
      {intro}
      <Disclaimer />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:items-start lg:grid-cols-12 lg:gap-6 print:hidden">
        <div className="lg:col-span-5">
          <InputColumn form={form} onForm={setForm} selectedIds={selection.selectedIds} onToggle={selection.toggle} />
        </div>
        <div className="lg:col-span-7">
          <ResultsColumn
            drugs={drugs}
            results={results}
            patient={patient}
            status={status}
            ready={ready}
            indications={indications}
            onRemove={onRemove}
            onIndication={select}
          />
        </div>
      </div>
      <ActionBar drugs={drugs} results={results} patient={patient} />
      <PrintTemplate drugs={drugs} results={results} patient={patient} />
      {children}
      <AppFooter />
    </main>
  );
}
