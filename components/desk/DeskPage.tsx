"use client";

import type { ReactNode } from "react";
import type { Drug } from "@/lib/domain/drug";
import PrintTemplate from "@/components/print/PrintTemplate";
import AppFooter from "@/components/calculator/AppFooter";
import SharedNotice from "@/components/calculator/SharedNotice";
import type { useCalculatorState } from "@/components/calculator/use-calculator-state";
import { usePatientActions } from "@/components/home/use-patient-actions";
import DashboardAside from "./DashboardAside";
import DashboardMain from "./DashboardMain";
import DeskShell from "./DeskShell";
import DetailAside from "./DetailAside";
import DetailMain from "./DetailMain";
import PatientColumn from "./PatientColumn";

interface Props {
  readonly calc: ReturnType<typeof useCalculatorState>;
  /** Байвал эмийн дэлгэрэнгүй (`/dose/[slug]`), үгүй бол dashboard (`/dose`). */
  readonly drug?: Drug;
  readonly children?: ReactNode;
}

/**
 * Desktop (≥1024) `/dose`, `/dose/[slug]` (V4, Figma 126:354, 127:426): зүүн өвчтөний багана,
 * гол (dashboard эсвэл дэлгэрэнгүй), баруун aside. Төлөв нь `useCalculatorState` (нэг эзэн).
 */
export default function DeskPage({ calc, drug, children }: Props) {
  const actions = usePatientActions();
  return (
    <>
      <div className="mx-auto w-full max-w-[1152px] px-4 pt-4 xl:px-0">
        <SharedNotice notice={calc.share.notice} onDismiss={calc.share.dismiss} />
      </div>
      <DeskShell
        left={<PatientColumn actions={actions} drugs={calc.drugs} results={calc.results} />}
        main={drug ? <DetailMain drug={drug} calc={calc} /> : <DashboardMain />}
        aside={drug ? <DetailAside drug={drug} result={calc.results.get(drug.id)} /> : <DashboardAside />}
      />
      <PrintTemplate drugs={calc.drugs} results={calc.results} patient={calc.patient} />
      <div className="mx-auto w-full max-w-[1152px] space-y-4 px-4 pb-6 xl:px-0">
        {children}
        <AppFooter />
      </div>
    </>
  );
}
