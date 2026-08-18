import type { DoseRange } from "../../domain/dose-range";
import { roundDose } from "./round-dose";

/** Тунгийн мужийн хоёр захыг тоймлоно. */
export const roundRange = (range: DoseRange): DoseRange => ({
  minMg: roundDose(range.minMg),
  maxMg: roundDose(range.maxMg),
});
