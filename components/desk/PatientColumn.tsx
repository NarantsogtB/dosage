"use client";

import { Plus, User } from "lucide-react";
import type { CalculationResult } from "@/lib/domain/calculation-result";
import type { Drug } from "@/lib/domain/drug";
import { drugPath } from "@/lib/drug-page/drug-page-meta";
import { Button } from "@/components/ui/button";
import { hasWeight, toPatient } from "@/components/calculator/patient-form";
import { updatePatients } from "@/components/calculator/patient-store";
import { MAX_PATIENTS, activeOf, labelOf, setActive, type PatientsState, type StoredPatient } from "@/components/calculator/patients";
import PatientDrugs from "@/components/home/PatientDrugs";
import PatientMenu from "@/components/home/PatientMenu";
import PatientSheet from "@/components/home/PatientSheet";
import QuickTiles from "@/components/home/QuickTiles";
import type { usePatientActions } from "@/components/home/use-patient-actions";
import { cn } from "@/lib/utils";

type Actions = ReturnType<typeof usePatientActions>;

interface Props {
  readonly actions: Actions;
  readonly drugs: readonly Drug[];
  readonly results: ReadonlyMap<string, CalculationResult>;
}

const AddButton = ({ state, onAdd }: { readonly state: PatientsState; readonly onAdd: () => void }) => (
  <Button type="button" variant="secondary" size="icon-sm" aria-label="Өвчтөн нэмэх" disabled={state.patients.length >= MAX_PATIENTS} onClick={onAdd}>
    <Plus aria-hidden />
  </Button>
);

const Weight = ({ patient }: { readonly patient: StoredPatient }) => (
  <p className="num text-5xl leading-none font-bold">
    {hasWeight(patient.form) ? toPatient(patient.form).weightKg : "—"}
    <span className="text-muted-foreground ml-1.5 text-lg font-semibold">кг</span>
  </p>
);

/** Одоогийн өвчтөн: цэс, том жин, 4 товч (Figma 126:354). */
const PatientCard = ({ actions }: { readonly actions: Actions }) => {
  const { state } = actions;
  const active = activeOf(state);
  const index = state.patients.findIndex((patient) => patient.id === state.activeId);
  return (
    <section aria-label="Одоогийн өвчтөн" className="bg-card space-y-3 rounded-2xl p-4">
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground text-xs">Одоогийн өвчтөн</p>
        <AddButton state={state} onAdd={actions.onAdd} />
      </div>
      {active ? (
        <>
          <PatientMenu state={state} patient={active} index={index} onEdit={actions.onEdit} onRemove={actions.onRemove} className="-ml-3 h-auto px-3 py-1 text-base font-semibold" />
          <Weight patient={active} />
        </>
      ) : (
        <p className="text-muted-foreground text-sm">Өвчтөн нэмээгүй байна. «+» дарж жин, нас оруулна.</p>
      )}
      <QuickTiles compact />
    </section>
  );
};

const ROW = {
  on: "border-primary/60 bg-accent",
  off: "bg-muted/50 border-transparent",
} as const;

const AVATAR = {
  on: "bg-tile text-tile-foreground",
  off: "bg-muted text-muted-foreground",
} as const;

const weightText = (patient: StoredPatient): string => `${patient.form.weight || "—"} кг`;

const PatientRow = ({ patient, index, active }: { readonly patient: StoredPatient; readonly index: number; readonly active: boolean }) => (
  <li>
    <button
      type="button"
      aria-current={active}
      onClick={() => updatePatients((state) => setActive(state, patient.id))}
      className={cn("hover:bg-accent flex min-h-14 w-full items-center gap-3 rounded-xl border p-2.5 text-left outline-none focus-visible:ring-[3px]", ROW[active ? "on" : "off"])}
    >
      <span className={cn("grid size-9 shrink-0 place-items-center rounded-lg", AVATAR[active ? "on" : "off"])}>
        <User aria-hidden className="size-4" />
      </span>
      <span className="min-w-0">
        <span className="block truncate text-sm font-semibold">{labelOf(patient, index)}</span>
        <span className="num text-muted-foreground block text-xs">{weightText(patient)}</span>
      </span>
    </button>
  </li>
);

const PatientList = ({ actions }: { readonly actions: Actions }) =>
  actions.state.patients.length === 0 ? null : (
    <section aria-labelledby="patient-list" className="bg-card space-y-3 rounded-2xl p-4">
      <div className="flex items-center justify-between">
        <h2 id="patient-list" className="text-lg font-bold">Өвчтөнүүд</h2>
        <AddButton state={actions.state} onAdd={actions.onAdd} />
      </div>
      <ul className="space-y-2">
        {actions.state.patients.map((patient, index) => (
          <PatientRow key={patient.id} patient={patient} index={index} active={patient.id === actions.state.activeId} />
        ))}
      </ul>
    </section>
  );

/** Desktop зүүн багана (296px): өвчтөн, өвчтөнүүд, «Энэ өвчтөнд». */
export default function PatientColumn({ actions, drugs, results }: Props) {
  return (
    <div className="space-y-4">
      <PatientCard actions={actions} />
      <PatientList actions={actions} />
      <div className="bg-card rounded-2xl p-4">
        <PatientDrugs drugs={drugs} results={results} hrefOf={drugPath} compact />
      </div>
      <PatientSheet open={actions.target !== null} editing={actions.target?.editing} onClose={actions.close} />
    </div>
  );
}
