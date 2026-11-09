"use client";

import { useState, type FormEvent } from "react";
import { ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Kbd } from "@/components/ui/kbd";
import { hasValidAge, hasWeight, type PatientForm } from "@/components/calculator/patient-form";
import type { StoredPatient } from "@/components/calculator/patients";
import { usePrefs } from "@/components/settings/prefs-store";
import { initialOf, save } from "./patient-draft";
import { AgeStep, WeightStep } from "./PatientSteps";

interface Props {
  readonly editing?: StoredPatient;
  readonly onClose: () => void;
}

const PRIVACY = "Нэр, регистр бүү оруул. Зөвхөн энэ төхөөрөмж дээр жин, нас, шошго хадгална.";

const LabelField = ({ value, onChange }: { readonly value: string; readonly onChange: (value: string) => void }) => (
  <div className="space-y-1.5">
    <label htmlFor="patient-label" className="text-sm font-medium">Шошго (заавал биш)</label>
    <Input id="patient-label" value={value} maxLength={24} placeholder="жишээ: Ор 3" onChange={(event) => onChange(event.target.value)} />
  </div>
);

/**
 * Өвчтөн нэмэх/засах — desktop нэг алхам (Figma 129:823): Шошго, Жин, Нас нэг дор.
 * `Enter` = хадгалах (form submit), `Esc` = хаах (Dialog). Mobile-ийн 2 алхам нь `PatientSheet`.
 */
export default function WideBody({ editing, onClose }: Props) {
  const initial = initialOf(editing, usePrefs().weightUnit);
  const [form, setForm] = useState<PatientForm>(initial.form);
  const [label, setLabel] = useState(initial.label);
  const ok = hasWeight(form) && hasValidAge(form);
  const set = (patch: Partial<PatientForm>) => setForm((prev) => ({ ...prev, ...patch }));

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!ok) return;
    save(editing, form, label);
    onClose();
  };

  return (
    <form onSubmit={submit} className="grid gap-4">
      <DialogHeader>
        <DialogTitle>{editing ? "Өвчтөн засах" : "Шинэ өвчтөн"}</DialogTitle>
        <DialogDescription className="sr-only">Шошго, жин, нас оруулна.</DialogDescription>
      </DialogHeader>
      <LabelField value={label} onChange={setLabel} />
      <FieldGroup className="gap-4">
        <WeightStep form={form} set={set} />
        <AgeStep form={form} set={set} />
      </FieldGroup>
      <p className="bg-muted/50 text-muted-foreground flex items-start gap-2 rounded-xl p-3 text-xs">
        <ShieldCheck aria-hidden className="mt-0.5 size-4 shrink-0" />
        {PRIVACY}
      </p>
      <div className="grid grid-cols-[1fr_2fr] gap-3">
        <Button type="button" variant="secondary" size="lg" className="rounded-full" onClick={onClose}>
          Болих <Kbd>Esc</Kbd>
        </Button>
        <Button type="submit" size="lg" disabled={!ok} className="bg-tile text-tile-foreground hover:bg-tile/90 rounded-full">
          Хадгалах <Kbd>Enter</Kbd>
        </Button>
      </div>
    </form>
  );
}
