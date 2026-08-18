"use client";

import type { PatientForm } from "./patient-form";
import { isWeightInvalid } from "./patient-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AgeFields from "./AgeFields";
import WeightField from "./WeightField";

interface Props {
  readonly form: PatientForm;
  readonly onChange: (form: PatientForm) => void;
}

/** Өвчтөний жин, нас оруулах хэсэг. */
export default function PatientInput({ form, onChange }: Props) {
  const set = (patch: Partial<PatientForm>) => onChange({ ...form, ...patch });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-muted-foreground text-xs uppercase tracking-widest">
          Өвчтөний мэдээлэл
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 pb-5">
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
        />
        <p className="text-muted-foreground text-xs">
          Нярайд: нас = 0, сарыг оруулна уу.
        </p>
      </CardContent>
    </Card>
  );
}
