"use client";

import type { Patient } from "@/lib/domain/patient";
import {
  deficitMl,
  isValidDeficitPercent,
  needsSeniorConsult,
  rehydrationPlan,
  type RehydrationDay,
} from "@/lib/calculators/fluid/deficit";
import { Card } from "@/components/ui/card";
import NumberField from "@/components/calculator/NumberField";
import FluidRow from "@/components/burns/FluidRow";
import { ml, mlPerHour } from "@/components/burns/burn-format";

interface Props {
  readonly patient: Patient;
  readonly percent: string;
  readonly onPercent: (value: string) => void;
}

const DayRow = ({ day }: { readonly day: RehydrationDay }) => (
  <FluidRow
    label={`${day.day}-р 24 цаг`}
    hint={`maintenance + ${day.deficitPercent}% (${ml(day.deficitMl)}) / 24 цаг`}
    value={mlPerHour(day.rateMlPerHour)}
  />
);

const Plan = ({ patient, percent }: { readonly patient: Patient; readonly percent: number }) => (
  <>
    <FluidRow label="Дутагдал" hint={`${patient.weightKg} кг × ${percent}% × 10`} value={ml(deficitMl(patient, percent))} />
    {rehydrationPlan(patient, percent).map((day) => (
      <DayRow key={day.day} day={day} />
    ))}
    {needsSeniorConsult(patient) ? (
      <p className="text-muted-foreground mt-2 text-xs">&lt;4 кг — ахлах эмчтэй зөвлөлдөнө (RCH).</p>
    ) : null}
  </>
);

/** Шингэний дутагдал, судсаар нөхөх хурд — RCH Dehydration / IV fluids. */
export default function DeficitCard({ patient, percent, onPercent }: Props) {
  const value = Number(percent);
  const valid = isValidDeficitPercent(value);
  return (
    <Card className="gap-0 px-5 py-4">
      <p className="text-sm font-semibold">Шингэний дутагдал (судсаар)</p>
      <p className="text-muted-foreground mb-3 text-xs">
        Хөнгөн &lt;5%, дунд 5–9%, хүнд ≥10%. Өдөрт ≤5% нөхнө. Жин — өвчний өмнөх.
      </p>
      <NumberField
        label="Шингэн алдалт"
        suffix="%"
        step="1"
        placeholder="жишээ: 5"
        value={percent}
        onChange={onPercent}
        invalid={percent !== "" && !valid}
        error="1–10 хооронд бүхэл тоо"
      />
      {valid ? <Plan patient={patient} percent={value} /> : null}
    </Card>
  );
}
