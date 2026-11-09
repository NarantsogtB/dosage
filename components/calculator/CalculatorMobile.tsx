"use client";

import type { ReactNode } from "react";
import Disclaimer from "@/components/Disclaimer";
import PatientHome from "@/components/home/PatientHome";
import PrintTemplate from "@/components/print/PrintTemplate";
import ActionBar from "./ActionBar";
import AppFooter from "./AppFooter";
import ResultsColumn from "./ResultsColumn";
import SharedNotice from "./SharedNotice";
import type { useCalculatorState } from "./use-calculator-state";

interface Props {
  readonly calc: ReturnType<typeof useCalculatorState>;
  readonly intro?: ReactNode;
  readonly children?: ReactNode;
}

/**
 * Mobile (<1024) тооцоолуурын хуудас: өвчтөний hero → үр дүнгийн картууд (бүтэн дэлгэцийн
 * хайлт `search/SearchOverlay`). Desktop-д `desk/DeskPage`.
 */
export default function CalculatorMobile({ calc, intro, children }: Props) {
  const { drugs, results, patient, ready, share } = calc;
  return (
    <main className="mx-auto w-full max-w-4xl space-y-4 px-4 py-6 sm:px-6">
      <SharedNotice notice={share.notice} onDismiss={share.dismiss} />
      <PatientHome drugs={drugs} results={results} ready={ready} />
      {intro}
      <Disclaimer />
      <div className="print:hidden">
        <ResultsColumn
          drugs={drugs}
          results={results}
          patient={patient}
          status={calc.status}
          ready={ready}
          choices={calc.choices}
          shareFragment={share.fragment}
          onRemove={calc.onRemove}
        />
      </div>
      <ActionBar drugs={drugs} results={results} patient={patient} shareFragment={share.fragment} />
      <PrintTemplate drugs={drugs} results={results} patient={patient} />
      {children}
      <AppFooter />
    </main>
  );
}
