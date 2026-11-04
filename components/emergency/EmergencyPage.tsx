"use client";

import { useMemo } from "react";
import { EMERGENCY_DRUGS, EMERGENCY_SHOWN_ITEMS } from "@/lib/emergency";
import { emergencyDrugRows, emergencyItemRows } from "@/lib/emergency/emergency-rows";
import PatientInput from "@/components/calculator/PatientInput";
import { useTrackOpened } from "@/components/analytics/use-track-opened";
import { isReady, toPatient } from "@/components/calculator/patient-form";
import { usePatientForm } from "@/components/calculator/patient-store";
import EmergencyDisclaimer from "./EmergencyDisclaimer";
import EmergencyPrintCard from "./EmergencyPrintCard";
import EmergencyRows from "./EmergencyRows";

/**
 * Яаралтай тусламжийн горим (Шат 7): нэг жин → нэг дэлгэц. Өвчтөний хэлбэр
 * `/dose`-той нэг (sessionStorage) — шилжихэд дахин бичихгүй.
 */
export default function EmergencyPage() {
  useTrackOpened("emergency");
  const [form, setForm] = usePatientForm();
  const patient = useMemo(() => toPatient(form), [form]);
  const ready = isReady(form);
  const drugRows = useMemo(() => (ready ? emergencyDrugRows(EMERGENCY_DRUGS, patient) : []), [ready, patient]);
  const itemRows = useMemo(() => (ready ? emergencyItemRows(EMERGENCY_SHOWN_ITEMS, patient) : []), [ready, patient]);

  return (
    <main className="mx-auto max-w-4xl space-y-4 px-4 py-6 sm:px-6">
      <EmergencyDisclaimer />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:items-start print:hidden">
        <PatientInput form={form} onChange={setForm} />
        {ready ? (
          <EmergencyRows drugRows={drugRows} itemRows={itemRows} />
        ) : (
          <p className="text-muted-foreground rounded-xl border border-dashed p-8 text-center text-sm">
            Жин, нас оруулбал яаралтай тусламжийн тун гарна.
          </p>
        )}
      </div>
      <EmergencyPrintCard patient={patient} drugRows={drugRows} itemRows={itemRows} />
    </main>
  );
}
