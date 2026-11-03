"use client";

import { useMemo, useState } from "react";
import { MIN_AGE_MONTHS } from "@/lib/calculators/fluid/maintenance";
import {
  EMPTY_FORM,
  isReady,
  toPatient,
} from "@/components/calculator/patient-form";
import PatientInput from "@/components/calculator/PatientInput";
import { useTrackOpened } from "@/components/analytics/use-track-opened";
import type { Patient } from "@/lib/domain/patient";
import BolusCard from "./BolusCard";
import DeficitCard from "./DeficitCard";
import FluidsDisclaimer from "./FluidsDisclaimer";
import MaintenanceCard from "./MaintenanceCard";

const Notice = ({ children }: { readonly children: React.ReactNode }) => (
  <p className="text-muted-foreground rounded-xl border border-dashed p-8 text-center text-sm">
    {children}
  </p>
);

interface ResultsProps {
  readonly patient: Patient;
  readonly percent: string;
  readonly onPercent: (value: string) => void;
}

const Results = ({ patient, percent, onPercent }: ResultsProps) =>
  patient.ageMonths < MIN_AGE_MONTHS ? (
    <Notice>Нярай (&lt;1 сар), дутуу төрсөн хүүхдэд хамаарахгүй — нярайн заавар хэрэглэнэ.</Notice>
  ) : (
    <div className="space-y-4">
      <MaintenanceCard patient={patient} />
      <BolusCard patient={patient} />
      <DeficitCard patient={patient} percent={percent} onPercent={onPercent} />
    </div>
  );

/** Хүүхдийн шингэний тооцоолуур: тэтгэх, болюс, дутагдал. */
export default function FluidsPage() {
  useTrackOpened("fluids");
  const [form, setForm] = useState(EMPTY_FORM);
  const [percent, setPercent] = useState("");
  const patient = useMemo(() => toPatient(form), [form]);

  return (
    <main className="mx-auto max-w-4xl space-y-4 px-4 py-6 sm:px-6">
      <FluidsDisclaimer />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:items-start">
        <PatientInput form={form} onChange={setForm} />
        {isReady(form) ? (
          <Results patient={patient} percent={percent} onPercent={setPercent} />
        ) : (
          <Notice>Жин, нас оруулбал шингэний тооцоолол гарна.</Notice>
        )}
      </div>
    </main>
  );
}
