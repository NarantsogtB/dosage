import { ChartColumn } from "lucide-react";
import type { Patient } from "@/lib/domain/patient";
import { targetMlPerHour, urineTargetOf } from "@/lib/calculators/burns/urine-target";

export interface UrineData {
  readonly targetLabel: string;
  readonly target: string;
  readonly oliguriaLabel: string;
  readonly oliguria: string;
}

/** Шээсний гарц — шингэн сэлбэлтийн ГОЛ хяналтын үзүүлэлт. Тооцоолуур эзэлхүүн гаргаад зогсох ёсгүй. */
export const urineData = (patient: Patient): UrineData => {
  const target = urineTargetOf(patient);
  const range = targetMlPerHour(patient, target);
  const oliguria = target.oliguriaBelow * patient.weightKg;
  return {
    targetLabel: `${target.minMlPerKgPerHour}–${target.maxMlPerKgPerHour} мл/кг/цаг`,
    target: `${Math.round(range.minMl)}–${Math.round(range.maxMl)}`,
    oliguriaLabel: `< ${target.oliguriaBelow} мл/кг/цаг`,
    oliguria: `< ${Math.round(oliguria * 10) / 10}`,
  };
};

const Row = ({ label, value, danger }: { readonly label: string; readonly value: string; readonly danger?: boolean }) => (
  <p className="flex items-baseline gap-2">
    <span className="text-muted-foreground flex-1 text-sm/[18px]">{label}</span>
    <span className={danger ? "num text-destructive text-base/5 font-bold" : "num text-primary text-base/5 font-bold"}>{value}</span>
  </p>
);

/** Mobile (Figma 138:1691): tile нь саармаг (raised), 2 мөр. */
export default function UrineTargetCard({ patient }: { readonly patient: Patient }) {
  const data = urineData(patient);
  return (
    <section aria-label="Шээсний гарцын зорилт" className="bg-card flex flex-col gap-2.5 rounded-3xl px-[18px] py-4">
      <div className="flex items-center gap-2.5">
        <span className="bg-muted grid size-10 shrink-0 place-items-center rounded-xl"><ChartColumn aria-hidden className="size-5" /></span>
        <div className="flex flex-col gap-0.5">
          <h2 className="text-[17px]/[22px] font-semibold">Шээсний гарцын зорилт</h2>
          <p className="text-muted-foreground text-xs/[15px]">Шингэн сэлбэлтийн үр дүнг үүгээр хянана</p>
        </div>
      </div>
      <Row label={`Зорилт · ${data.targetLabel}`} value={`${data.target} мл/цаг`} />
      <Row label={`Олигури · ${data.oliguriaLabel}`} value={`${data.oliguria} мл/цаг`} danger />
    </section>
  );
}
