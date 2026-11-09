import { EMPTY_FORM, type PatientForm, type WeightUnit } from "@/components/calculator/patient-form";
import { newPatientId, updatePatients } from "@/components/calculator/patient-store";
import { addPatient, cleanLabel, newPatient, updatePatient, type StoredPatient } from "@/components/calculator/patients";

/** Өвчтөнийг хадгална: засах бол шинэчилнэ, үгүй бол нэмнэ (6 дүүрсэн бол өөрчлөхгүй). */
export const save = (editing: StoredPatient | undefined, form: PatientForm, label: string): void =>
  updatePatients((state) =>
    editing
      ? updatePatient(state, editing.id, { form, label: cleanLabel(label) })
      : (addPatient(state, { ...newPatient(newPatientId(), form), label: cleanLabel(label) }) ?? state),
  );

/** Нээхэд анхны утга: засах өвчтөн, эсвэл хоосон (анхны жингийн нэгж — тохиргооноос). */
export const initialOf = (editing: StoredPatient | undefined, weightUnit: WeightUnit) =>
  editing
    ? { form: editing.form, label: editing.label }
    : { form: { ...EMPTY_FORM, weightUnit }, label: "" };
