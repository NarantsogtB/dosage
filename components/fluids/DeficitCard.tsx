"use client";

import { ChartColumn } from "lucide-react";
import type { Patient } from "@/lib/domain/patient";
import {
  deficitMl,
  isValidDeficitPercent,
  needsSeniorConsult,
  rehydrationPlan,
  type RehydrationDay,
} from "@/lib/calculators/fluid/deficit";
import { ml, mlPerHour } from "@/components/burns/burn-format";
import NoteRow from "@/components/v4/NoteRow";
import ResultCard from "@/components/v4/ResultCard";
import ValueTile, { TileGrid } from "@/components/v4/ValueTile";
import DeficitInput from "./DeficitInput";

interface Props {
  readonly patient: Patient;
  readonly percent: string;
  readonly onPercent: (value: string) => void;
}

const DayTile = ({ day }: { readonly day: RehydrationDay }) => (
  <ValueTile accent label={`${day.day}-р 24 цаг · (тэтгэх + ${day.deficitPercent}%) / 24`} value={mlPerHour(day.rateMlPerHour)} />
);

const Senior = ({ patient }: { readonly patient: Patient }) =>
  needsSeniorConsult(patient) ? <NoteRow tone="warning">&lt;4 кг — ахлах эмчтэй зөвлөлдөнө (RCH).</NoteRow> : null;

const Plan = ({ patient, percent }: { readonly patient: Patient; readonly percent: number }) => (
  <>
    <TileGrid>
      <ValueTile label={`Дутагдал · ${patient.weightKg} кг × ${percent}% × 10`} value={ml(deficitMl(patient, percent))} />
      {rehydrationPlan(patient, percent).map((day) => <DayTile key={day.day} day={day} />)}
    </TileGrid>
    <Senior patient={patient} />
  </>
);

/** Шингэний дутагдал, судсаар нөхөх хурд — RCH Dehydration / IV fluids. Figma «Deficit». */
export default function DeficitCard({ patient, percent, onPercent }: Props) {
  const value = Number(percent);
  const valid = isValidDeficitPercent(value);
  return (
    <ResultCard
      id="deficit"
      icon={ChartColumn}
      title="Шингэний дутагдал (судсаар)"
      sub="Хөнгөн <5%, дунд 5–9%, хүнд ≥10%. Өдөрт ≤5% нөхнө. Жин — өвчний өмнөх."
    >
      <DeficitInput value={percent} onChange={onPercent} invalid={percent !== "" && !valid} />
      {valid ? <Plan patient={patient} percent={value} /> : null}
    </ResultCard>
  );
}
