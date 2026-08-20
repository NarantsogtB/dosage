import type { Patient } from "@/lib/domain/patient";
import {
  targetMlPerHour,
  urineTargetOf,
} from "@/lib/calculators/burns/urine-target";
import { Card } from "@/components/ui/card";
import FluidRow from "./FluidRow";

/**
 * Шээсний гарц — шингэн сэлбэлтийн ГОЛ хяналтын үзүүлэлт.
 * Тооцоолуур эзэлхүүн гаргаад зогсох ёсгүй.
 */
export default function UrineTargetCard({
  patient,
}: {
  readonly patient: Patient;
}) {
  const target = urineTargetOf(patient);
  const range = targetMlPerHour(patient, target);
  const oliguria = target.oliguriaBelow * patient.weightKg;

  return (
    <Card className="gap-0 px-5 py-4">
      <p className="text-sm font-semibold">Шээсний гарцын зорилт</p>
      <p className="text-muted-foreground mb-2 text-xs">
        Шингэн сэлбэлтийн үр дүнг үүгээр хянана
      </p>
      <FluidRow
        label="Зорилт"
        hint={`${target.minMlPerKgPerHour}–${target.maxMlPerKgPerHour} мл/кг/цаг`}
        value={`${Math.round(range.minMl)}–${Math.round(range.maxMl)} мл/цаг`}
      />
      <FluidRow
        label="Олигури"
        hint={`< ${target.oliguriaBelow} мл/кг/цаг`}
        value={`< ${Math.round(oliguria * 10) / 10} мл/цаг`}
      />
    </Card>
  );
}
