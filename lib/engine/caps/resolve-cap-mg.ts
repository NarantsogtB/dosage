import type { DoseCap } from "../../domain/dose-cap";
import type { Patient } from "../../domain/patient";

/** Хязгаарыг миллиграмм болгож хөрвүүлнэ. Жинд суурилсныг жингээр үржүүлнэ. */
export const resolveCapMg = (cap: DoseCap, patient: Patient): number =>
  cap.kind === "per_kg" ? cap.maxMgPerKg * patient.weightKg : cap.maxMg;
