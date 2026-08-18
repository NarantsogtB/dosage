"use client";

import { DRUGS } from "@/lib/data/drugs";
import DrugSearch from "@/components/search/DrugSearch";
import PatientInput from "./PatientInput";
import type { PatientForm } from "./patient-form";

interface Props {
  readonly form: PatientForm;
  readonly onForm: (form: PatientForm) => void;
  readonly selectedIds: readonly string[];
  readonly onToggle: (id: string) => void;
}

/** Зүүн багана: өвчтөний мэдээлэл, эм сонгох. */
export default function InputColumn(props: Props) {
  return (
    <div className="space-y-4">
      <PatientInput form={props.form} onChange={props.onForm} />
      <DrugSearch
        drugs={DRUGS}
        selectedIds={props.selectedIds}
        onToggle={props.onToggle}
      />
    </div>
  );
}
