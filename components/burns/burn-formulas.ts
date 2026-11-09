import type { Patient } from "@/lib/domain/patient";
import { galveston } from "@/lib/calculators/burns/galveston";
import { parkland } from "@/lib/calculators/burns/parkland";
import { exceedsIvyLimit, ivyLimitMl } from "@/lib/calculators/burns/ivy-limit";
import { ml, mlPerHour } from "./burn-format";

/** Томьёоны нэг мөр: «Эхний 8 цагт · 800 мл · 100 мл/цаг». */
export interface FormulaRow {
  readonly label: string;
  readonly volume: string;
  readonly rate: string;
}

/** Parkland/Гальвестоны UI өгөгдөл — mobile карт, desktop компакт хоёулаа үүнийг уншина. */
export interface FormulaData {
  readonly title: string;
  readonly sub: string;
  readonly totalMl: number;
  readonly rows: readonly FormulaRow[];
  /** Ivy — 24 цагийн дээд хязгаар давсан бол хязгаарын мл. */
  readonly ivyLimit?: string;
}

const row = (label: string, volume: number, rate: number): FormulaRow => ({ label, volume: ml(volume), rate: mlPerHour(rate) });

const ivyOf = (patient: Patient, totalMl: number): string | undefined =>
  exceedsIvyLimit(patient, totalMl) ? ml(ivyLimitMl(patient)) : undefined;

/** Parkland — 4 мл/кг/БНГТ%. mn-burns-2015, х.70–73. */
export const parklandData = (patient: Patient, tbsa: number): FormulaData => {
  const result = parkland(patient, tbsa);
  return {
    title: "Parkland",
    sub: `4 мл × ${patient.weightKg} кг × ${tbsa}% · Рингерийн лактат`,
    totalMl: result.totalMl,
    rows: [
      row("Эхний 8 цагт", result.firstHalfMl, result.firstHalfRateMlPerHour),
      row("Дараагийн 16 цагт", result.secondHalfMl, result.secondHalfRateMlPerHour),
    ],
    ivyLimit: ivyOf(patient, result.totalMl),
  };
};

/** Гальвестон — 5000 мл/м² түлэгдсэн + 2000 мл/м² БГТ. х.155. Өндөргүй бол null. */
export const galvestonData = (patient: Patient, tbsa: number): FormulaData | null => {
  const result = galveston(patient, tbsa);
  if (result === null) return null;
  return {
    title: "Гальвестон (хүүхдэд)",
    sub: `БГТ ${Math.round(result.bsaM2 * 1000) / 1000} м² · 5000 мл/м² түлэгдсэн + 2000 мл/м²`,
    totalMl: result.totalMl,
    rows: [
      row("Эхний 8 цагт (½)", result.firstBlockMl, result.firstRateMlPerHour),
      row("Дараагийн 8 цаг тутам (¼)", result.laterBlockMl, result.laterRateMlPerHour),
    ],
  };
};
