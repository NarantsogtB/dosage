import type { Patient } from "../../domain/patient";
import { mostellerBsaM2 } from "../bsa/mosteller";

/** ЭХ СУРВАЛЖ: mn-burns-2015, х.155 */
export const GALVESTON_ML_PER_M2_BURN = 5000;
export const GALVESTON_ML_PER_M2_TOTAL = 2000;

export interface GalvestonResult {
  readonly bsaM2: number;
  readonly totalMl: number;
  /** ½ — эхний 8 цагт */
  readonly firstBlockMl: number;
  /** ¼ — дараагийн 8 цаг тутам, 2 удаа */
  readonly laterBlockMl: number;
  readonly firstRateMlPerHour: number;
  readonly laterRateMlPerHour: number;
}

const BLOCK_HOURS = 8;

/**
 * Гальвестон — ХҮҮХДЭД зориулсан. Биеийн гадаргуугийн талбайд суурилна.
 *
 * 5000 мл/м² түлэгдсэн + 2000 мл/м² БГТ.
 * ½ эхний 8 цагт · ¼ дараагийн 8 ц · ¼ сүүлийн 8 ц.
 *
 * ⚠️ Өндөр мэдэгдээгүй бол null — таамаглал хийхгүй.
 */
export const galveston = (
  patient: Patient,
  tbsaPercent: number,
): GalvestonResult | null => {
  const bsaM2 = mostellerBsaM2(patient);
  if (bsaM2 === null) return null;

  const burnedM2 = bsaM2 * (tbsaPercent / 100);
  const totalMl =
    GALVESTON_ML_PER_M2_BURN * burnedM2 + GALVESTON_ML_PER_M2_TOTAL * bsaM2;

  return {
    bsaM2,
    totalMl,
    firstBlockMl: totalMl / 2,
    laterBlockMl: totalMl / 4,
    firstRateMlPerHour: totalMl / 2 / BLOCK_HOURS,
    laterRateMlPerHour: totalMl / 4 / BLOCK_HOURS,
  };
};
