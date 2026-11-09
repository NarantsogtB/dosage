"use client";

import { useMemo } from "react";
import { isReady, toPatient } from "@/components/calculator/patient-form";
import { usePatientForm } from "@/components/calculator/patient-store";
import { useDosageResults } from "@/components/calculator/use-dosage-results";
import { useSelectedDrugs } from "@/components/calculator/use-selected-drugs";

const NO_INDICATIONS = new Map<string, string | undefined>();

/**
 * Desktop зүүн баганын «Энэ өвчтөнд» — хэрэгслийн хуудсанд. Заалтын сонголт `/dose`-д ч
 * хуудас хоорондоо хадгалагддаггүй тул анхдагч заалтаар (`/dose`-ийг дахин нээхтэй ижил).
 * Түүх бичихгүй, analytics илгээхгүй — зөвхөн харуулна.
 */
export const usePatientDrugResults = () => {
  const [form] = usePatientForm();
  const { drugs } = useSelectedDrugs();
  const patient = useMemo(() => toPatient(form), [form]);
  const results = useDosageResults({ drugs, patient, indications: NO_INDICATIONS, ready: isReady(form) });
  return { drugs, results };
};
