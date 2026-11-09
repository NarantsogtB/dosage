import { Droplet } from "lucide-react";
import type { Patient } from "@/lib/domain/patient";
import ResultCard from "@/components/v4/ResultCard";
import { galvestonData } from "./burn-formulas";
import FormulaCard from "./FormulaCard";
import HeightInput from "./HeightInput";

interface Props {
  readonly patient: Patient;
  readonly tbsaPercent: number;
  readonly height: string;
  readonly onHeight: (value: string) => void;
}

/** Гальвестон (mobile). Өндөргүй бол тооцоолохгүй — таамаглахгүй. */
export default function GalvestonCard({ patient, tbsaPercent, height, onHeight }: Props) {
  const data = galvestonData(patient, tbsaPercent);
  const input = <HeightInput value={height} onChange={onHeight} />;
  if (data === null) {
    return (
      <ResultCard icon={Droplet} title="Гальвестон (хүүхдэд)" sub="Өндөр оруулбал тооцоолно. Биеийн гадаргуугийн талбайд суурилдаг тул өндөргүйгээр таамаглахгүй.">
        {input}
      </ResultCard>
    );
  }
  return <FormulaCard data={data}>{input}</FormulaCard>;
}
