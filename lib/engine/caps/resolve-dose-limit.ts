import type { DoseCap } from "../../domain/dose-cap";
import type { Patient } from "../../domain/patient";
import { toPerDoseLimit } from "./to-per-dose-limit";

/** Бүх хязгаарын хамгийн бага нь үйлчилнэ. Хязгааргүй бол Infinity. */
export const resolveDoseLimit = (
  caps: readonly DoseCap[],
  patient: Patient,
  dosesPerDay: number,
): number =>
  Math.min(
    ...caps.map((cap) => toPerDoseLimit(cap, patient, dosesPerDay)),
    Number.POSITIVE_INFINITY,
  );
