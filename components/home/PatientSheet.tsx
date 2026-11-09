"use client";

import { useState, type FormEvent } from "react";
import { ChevronLeft } from "lucide-react";import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  EMPTY_FORM,
  hasValidAge,
  hasWeight,
  type PatientForm,
  type WeightUnit,
} from "@/components/calculator/patient-form";
import { usePrefs } from "@/components/settings/prefs-store";
import { AgeStep, WeightStep, type StepProps } from "./PatientSteps";
import { newPatientId, updatePatients } from "@/components/calculator/patient-store";
import {
  addPatient,
  cleanLabel,
  newPatient,
  updatePatient,
  type StoredPatient,
} from "@/components/calculator/patients";

interface Props {
  readonly open: boolean;
  /** Засах өвчтөн; байхгүй бол шинээр нэмнэ. */
  readonly editing?: StoredPatient;
  readonly onClose: () => void;
}

const save = (editing: StoredPatient | undefined, form: PatientForm, label: string): void =>
  updatePatients((state) =>
    editing
      ? updatePatient(state, editing.id, { form, label: cleanLabel(label) })
      : (addPatient(state, { ...newPatient(newPatientId(), form), label: cleanLabel(label) }) ?? state),
  );

const initialOf = (editing: StoredPatient | undefined, weightUnit: WeightUnit) =>
  editing
    ? { form: editing.form, label: editing.label }
    : { form: { ...EMPTY_FORM, weightUnit }, label: "" };

const isStepOk = (step: 1 | 2, form: PatientForm): boolean =>
  step === 1 ? hasWeight(form) : hasValidAge(form);

/** Хүчингүй бол юу ч хийхгүй; 1-р алхамд цааш, 2-рт хадгална. */
const submitStep = (step: 1 | 2, ok: boolean, next: () => void, finish: () => void): void => {
  if (!ok) return;
  (step === 1 ? next : finish)();
};

const Header = ({ editing, step }: { readonly editing?: StoredPatient; readonly step: 1 | 2 }) => (
  <DialogHeader>
    <DialogTitle>
      {editing ? "Өвчтөн засах" : "Шинэ өвчтөн"} · {step}/2
    </DialogTitle>
    <DialogDescription className="sr-only">Жин, дараа нь нас оруулна.</DialogDescription>
  </DialogHeader>
);

interface FieldsProps extends StepProps {
  readonly step: 1 | 2;
  readonly label: string;
  readonly onLabel: (label: string) => void;
  readonly onBack: () => void;
}

const Fields = (props: FieldsProps) =>
  props.step === 1 ? (
    <>
      <FieldGroup className="gap-4">
        <WeightStep form={props.form} set={props.set} />
      </FieldGroup>
      <div className="space-y-1">
        <Input
          value={props.label}
          maxLength={24}
          placeholder="Шошго (заавал биш), жишээ: Ор 3"
          aria-label="Шошго"
          onChange={(event) => props.onLabel(event.target.value)}
        />
        <p className="text-muted-foreground text-xs">
          Нэр, регистр бүү оруул — төхөөрөмж дээр зөвхөн жин, нас хадгална.
        </p>
      </div>
    </>
  ) : (
    <>
      <FieldGroup className="gap-4">
        <AgeStep form={props.form} set={props.set} />
      </FieldGroup>
      <Button type="button" variant="ghost" className="justify-self-start" onClick={props.onBack}>
        <ChevronLeft aria-hidden /> Буцах
      </Button>
    </>
  );

const Body = ({ editing, onClose }: Pick<Props, "editing" | "onClose">) => {
  const initial = initialOf(editing, usePrefs().weightUnit);
  const [step, setStep] = useState<1 | 2>(1);
  const [form, setForm] = useState<PatientForm>(initial.form);
  const [label, setLabel] = useState(initial.label);
  const ok = isStepOk(step, form);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    submitStep(step, ok, () => setStep(2), () => {
      save(editing, form, label);
      onClose();
    });
  };

  return (
    <form onSubmit={submit} className="grid gap-4">
      <Header editing={editing} step={step} />
      <Fields
        step={step}
        form={form}
        set={(patch) => setForm({ ...form, ...patch })}
        label={label}
        onLabel={setLabel}
        onBack={() => setStep(1)}
      />
      <Button type="submit" size="lg" disabled={!ok} className="bg-tile text-tile-foreground hover:bg-tile/90 h-12 rounded-full">
        {step === 1 ? "Үргэлжлүүлэх" : "Хадгалах"}
      </Button>
    </form>
  );
};

const keyOf = (editing?: StoredPatient): string => editing?.id ?? "new";

/** Өвчтөн нэмэх/засах — 2 алхам: Жин → Нас (Figma 128:792, 128:858). */
export default function PatientSheet({ open, editing, onClose }: Props) {
  return (
    <Dialog open={open} onOpenChange={(next) => !next && onClose()}>
      <DialogContent className="h-dvh w-full max-w-none content-start rounded-none sm:h-auto sm:max-w-md sm:rounded-lg">
        {open ? <Body key={keyOf(editing)} editing={editing} onClose={onClose} /> : null}
      </DialogContent>
    </Dialog>
  );
}
