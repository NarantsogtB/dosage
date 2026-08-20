import type { Patient } from "@/lib/domain/patient";
import { galveston } from "@/lib/calculators/burns/galveston";
import { Card } from "@/components/ui/card";
import FluidRow from "./FluidRow";
import { ml, mlPerHour } from "./burn-format";

interface Props {
  readonly patient: Patient;
  readonly tbsaPercent: number;
}

const NeedHeight = () => (
  <Card className="gap-1 px-5 py-4">
    <p className="text-sm font-semibold">Гальвестон (хүүхдэд)</p>
    <p className="text-muted-foreground text-xs">
      Өндөр оруулбал тооцоолно. Биеийн гадаргуугийн талбайд суурилдаг тул
      өндөргүйгээр таамаглахгүй.
    </p>
  </Card>
);

/** Гальвестон — 5000 мл/м² түлэгдсэн + 2000 мл/м² БГТ. х.155. */
export default function GalvestonCard({ patient, tbsaPercent }: Props) {
  const result = galveston(patient, tbsaPercent);
  if (result === null) return <NeedHeight />;

  return (
    <Card className="gap-0 px-5 py-4">
      <p className="text-sm font-semibold">Гальвестон (хүүхдэд)</p>
      <p className="text-muted-foreground mb-2 text-xs">
        БГТ {Math.round(result.bsaM2 * 1000) / 1000} м² · 5000 мл/м² түлэгдсэн
        + 2000 мл/м²
      </p>
      <FluidRow label="24 цагийн нийт" value={ml(result.totalMl)} />
      <FluidRow
        label="Эхний 8 цагт (½)"
        hint={ml(result.firstBlockMl)}
        value={mlPerHour(result.firstRateMlPerHour)}
      />
      <FluidRow
        label="Дараагийн 8 цаг тутам (¼)"
        hint={ml(result.laterBlockMl)}
        value={mlPerHour(result.laterRateMlPerHour)}
      />
    </Card>
  );
}
