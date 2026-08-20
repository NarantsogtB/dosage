"use client";

import { useMemo, useState } from "react";
import Disclaimer from "@/components/Disclaimer";
import PrintTemplate from "@/components/print/PrintTemplate";
import AppFooter from "./AppFooter";
import InputColumn from "./InputColumn";
import ResultsColumn from "./ResultsColumn";
import { EMPTY_FORM, inputStatus, isReady, toPatient } from "./patient-form";
import { useDosageResults } from "./use-dosage-results";
import { useIndications } from "./use-indications";
import { useSelectedDrugs } from "./use-selected-drugs";

/** Тооцоолуурын үндсэн хуудас. Төлөвийг эзэмшиж, хэсгүүдийг угсарна. */
export default function CalculatorPage() {
  const [form, setForm] = useState(EMPTY_FORM);
  const selection = useSelectedDrugs();
  const { drugs } = selection;
  const { indications, select } = useIndications();

  const patient = useMemo(() => toPatient(form), [form]);
  const ready = isReady(form);
  const results = useDosageResults({ drugs, patient, indications, ready });
  const status = inputStatus(form, drugs.length > 0);

  return (
    <main className="mx-auto max-w-4xl space-y-4 px-4 py-6 sm:px-6">
      <Disclaimer />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:items-start print:hidden">
        <InputColumn
          form={form}
          onForm={setForm}
          selectedIds={selection.selectedIds}
          onToggle={selection.toggle}
        />
        <ResultsColumn
          drugs={drugs}
          results={results}
          patient={patient}
          status={status}
          indications={indications}
          onRemove={selection.remove}
          onIndication={select}
          onClear={selection.clear}
          onUndo={selection.undo}
          undoCount={selection.undoCount}
        />
      </div>

      <PrintTemplate drugs={drugs} results={results} patient={patient} />
      <AppFooter />
    </main>
  );
}
