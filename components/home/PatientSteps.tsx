import AgeEcho from "@/components/calculator/AgeEcho";
import AgeFields from "@/components/calculator/AgeFields";
import WeightField from "@/components/calculator/WeightField";
import {
  convertWeight,
  hasValidAge,
  isAgeInvalid,
  isWeightInvalid,
  toPatient,
  type PatientForm,
} from "@/components/calculator/patient-form";

export interface StepProps {
  readonly form: PatientForm;
  readonly set: (patch: Partial<PatientForm>) => void;
}

export const WeightStep = ({ form, set }: StepProps) => (
  <WeightField
    value={form.weight}
    unit={form.weightUnit}
    weightKg={toPatient(form).weightKg}
    invalid={isWeightInvalid(form)}
    onChange={(weight) => set({ weight })}
    onUnit={(weightUnit) => set({ weightUnit, weight: convertWeight(form.weight, weightUnit) })}
  />
);

export const AgeStep = ({ form, set }: StepProps) => (
  <AgeFields
    years={form.years}
    months={form.months}
    onYears={(years) => set({ years })}
    onMonths={(months) => set({ months })}
    invalid={isAgeInvalid(form)}
    error="dosage.mn зөвхөн 0–18 насны хүүхдийн жинд суурилсан тунг тооцоолдог."
    echo={<AgeEcho ageMonths={toPatient(form).ageMonths} entered={hasValidAge(form)} />}
  />
);
