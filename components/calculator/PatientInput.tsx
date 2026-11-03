"use client";

import type { PatientForm } from "./patient-form";
import {
  convertWeight,
  hasValidAge,
  isAgeInvalid,
  isWeightInvalid,
  toPatient,
} from "./patient-form";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { FieldGroup } from "@/components/ui/field";
import StepHeader from "@/components/step/StepHeader";
import AgeEcho from "./AgeEcho";
import AgeFields from "./AgeFields";
import WeightField from "./WeightField";

interface Props {
  readonly form: PatientForm;
  readonly onChange: (form: PatientForm) => void;
}

/** Patient bar-аас «засах» дарахад энд үсэрнэ. */
export const PATIENT_CARD_ID = "patient-card";

/** Өвчтөний жин, нас оруулах хэсэг. Алхам 1. */
export default function PatientInput({ form, onChange }: Props) {
  const set = (patch: Partial<PatientForm>) => onChange({ ...form, ...patch });
  const weightOk = form.weight !== "" && !isWeightInvalid(form);
  const ageInvalid = isAgeInvalid(form);
  const ageOk = hasValidAge(form);
  const patient = toPatient(form);

  return (
    <Card id={PATIENT_CARD_ID} className="scroll-mt-20">
      <CardHeader>
        <StepHeader step={1} label="Өвчтөн" done={weightOk && ageOk} />
      </CardHeader>
      <CardContent className="pb-5">
        <FieldGroup className="gap-4">
          <WeightField
            value={form.weight}
            unit={form.weightUnit}
            weightKg={patient.weightKg}
            invalid={isWeightInvalid(form)}
            onChange={(weight) => set({ weight })}
            onUnit={(weightUnit) =>
              set({ weightUnit, weight: convertWeight(form.weight, weightUnit) })
            }
          />
          <AgeFields
            years={form.years}
            months={form.months}
            onYears={(years) => set({ years })}
            onMonths={(months) => set({ months })}
            invalid={ageInvalid}
            error="dosage.mn зөвхөн 0–18 насны хүүхдийн жинд суурилсан тунг тооцоолдог."
            echo={
              <AgeEcho ageMonths={patient.ageMonths} entered={ageOk} />
            }
          />
        </FieldGroup>
      </CardContent>
    </Card>
  );
}
