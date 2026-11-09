"use client";

import type { ReactNode } from "react";
import Disclaimer from "@/components/Disclaimer";
import PrintTemplate from "@/components/print/PrintTemplate";
import PatientHome from "@/components/home/PatientHome";
import ActionBar from "./ActionBar";
import AppFooter from "./AppFooter";
import InputColumn from "./InputColumn";
import PatientBar from "./PatientBar";
import ResultsColumn from "./ResultsColumn";
import SharedNotice from "./SharedNotice";
import { useCalculatorState } from "./use-calculator-state";

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
  const state = useCalculatorState(initialDrugIds);
  const { drugs, results, patient, ready, share } = state;

  return (
    <main className="mx-auto w-full max-w-4xl space-y-4 px-4 py-6 sm:px-6 lg:max-w-[1440px] lg:px-20">
      <div className="hidden lg:block">
        <PatientBar patient={patient} ready={ready} drugs={drugs} results={results} onClear={state.onClear} />
      </div>
      <SharedNotice notice={share.notice} onDismiss={share.dismiss} />
      <PatientHome drugs={drugs} results={results} ready={ready} />
      {intro}
      <Disclaimer />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:items-start lg:grid-cols-12 lg:gap-6 print:hidden">
        <div className="lg:col-span-5">
          <InputColumn form={state.form} onForm={state.setForm} selectedIds={state.selectedIds} onToggle={state.onToggle} />
        </div>
        <div className="lg:col-span-7">
          <ResultsColumn
            drugs={drugs}
            results={results}
            patient={patient}
            status={state.status}
            ready={ready}
            choices={state.choices}
            shareFragment={share.fragment}
            onRemove={state.onRemove}
          />
        </div>
      </div>
      <ActionBar drugs={drugs} results={results} patient={patient} shareFragment={share.fragment} />
      <PrintTemplate drugs={drugs} results={results} patient={patient} />
      {children}
      <AppFooter />
    </main>
  );
}
