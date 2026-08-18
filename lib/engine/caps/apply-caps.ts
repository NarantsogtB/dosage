import type { DoseCap } from "../../domain/dose-cap";
import type { DoseRange } from "../../domain/dose-range";
import type { Patient } from "../../domain/patient";
import { limitRange } from "../math/limit-range";
import { resolveDoseLimit } from "./resolve-dose-limit";

export interface CappedDose {
  readonly range: DoseRange;
  readonly limitMg: number;
  readonly cappedAtMax: boolean;
}

/** Тунг дээд хязгаараар таслаж, тасалсан эсэхийг мэдээлнэ. */
export const applyCaps = (
  range: DoseRange,
  caps: readonly DoseCap[],
  patient: Patient,
  dosesPerDay: number,
): CappedDose => {
  const limitMg = resolveDoseLimit(caps, patient, dosesPerDay);
  return {
    range: limitRange(range, limitMg),
    limitMg,
    cappedAtMax: range.maxMg > limitMg,
  };
};
