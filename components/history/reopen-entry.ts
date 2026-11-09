import { track } from "@/lib/analytics/track";
import type { HistoryEntry } from "@/lib/history/history";
import type { PatientForm } from "@/components/calculator/patient-form";
import { newPatientId, updatePatients } from "@/components/calculator/patient-store";
import { addPatient, changeActive, newPatient } from "@/components/calculator/patients";
import { queueChoices } from "./pending-choices";

const MONTHS_PER_YEAR = 12;

const formOf = (entry: HistoryEntry): PatientForm => ({
  weight: String(entry.weightKg),
  weightUnit: "kg",
  years: String(Math.floor(entry.ageMonths / MONTHS_PER_YEAR)),
  months: String(entry.ageMonths % MONTHS_PER_YEAR),
});

/**
 * Түүхийн мөрийг сэргээнэ: өвчтөнийг ШИНЭЭР нэмнэ (6 дүүрсэн бол идэвхтэйг солино),
 * эмийг сонгоно, заалт/бэлдмэл `/dose` дээр хэрэглэгдэнэ. Тунг одоогийн өгөгдлөөр
 * дахин тооцно. Дуудагч дараа нь `/dose` руу шилжинэ.
 */
export const reopenEntry = (entry: HistoryEntry): void => {
  const patch = { form: formOf(entry), label: entry.label, drugIds: [entry.drugId] };
  updatePatients(
    (state) =>
      addPatient(state, { ...newPatient(newPatientId(), patch.form), label: patch.label, drugIds: patch.drugIds }) ??
      changeActive(state, patch, newPatientId()),
  );
  queueChoices([{ drugId: entry.drugId, indication: entry.indication, formulation: entry.formulation }]);
  track({ name: "history_entry_opened", drugId: entry.drugId });
};
