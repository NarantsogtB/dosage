"use client";

import type { PatientForm } from "./patient-form";
import {
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

/** Өвчтөний жин, нас оруулах хэсэг. Алхам 1. */
export default function PatientInput({ form, onChange }: Props) {
  const set = (patch: Partial<PatientForm>) => onChange({ ...form, ...patch });
  const weightOk = form.weight !== "" && !isWeightInvalid(form);
  const ageInvalid = isAgeInvalid(form);
  const ageOk = hasValidAge(form);

  return (
    <Card>
      <CardHeader>
        <StepHeader step={1} label="Өвчтөн" done={weightOk && ageOk} />
      </CardHeader>
      <CardContent className="pb-5">
        <FieldGroup className="gap-4">
          <WeightField
            value={form.weight}
            invalid={isWeightInvalid(form)}
            onChange={(weight) => set({ weight })}
          />
          <AgeFields
            years={form.years}
            months={form.months}
            onYears={(years) => set({ years })}
            onMonths={(months) => set({ months })}
            invalid={ageInvalid}
            error="dosage.mn зөвхөн 0–18 насны хүүхдийн жинд суурилсан тунг тооцоолдог."
            echo={
              <AgeEcho ageMonths={toPatient(form).ageMonths} entered={ageOk} />
            }
          />
        </FieldGroup>
      </CardContent>
    </Card>
  );
}
