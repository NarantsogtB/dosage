import type { Patient } from "../../domain/patient";
import type { SafetyLimit } from "../../domain/calculator";

/**
 * Ivy индекс — 24 цагийн шингэний ХАТУУ дээд хязгаар.
 *
 * ЭХ СУРВАЛЖ: mn-burns-2015, х.121
 * «Шингэний хүргэлт > 250 мл/кг» (24 цагт)
 *
 * Давбал хэвлийн хөндийн даралт ихсэх (abdominal compartment syndrome)
 * эрсдэлтэй. Энэ нь зөвлөмж БИШ — тооцооллын үр дүнг заавал шалгана.
 */
export const IVY_LIMIT_ML_PER_KG = 250;

export const ivyLimitMl = (patient: Patient): number =>
  IVY_LIMIT_ML_PER_KG * patient.weightKg;

export const ivyLimit = (patient: Patient): SafetyLimit => ({
  labelMn: "24 цагийн шингэний дээд хязгаар (Ivy индекс)",
  limit: ivyLimitMl(patient),
  unit: "ml",
  rationaleMn:
    "Хэтрүүлбэл хэвлийн хөндийн даралт ихсэх хам шинж үүсэх эрсдэлтэй.",
});

/** Тооцоолсон эзэлхүүн хязгаарыг давсан эсэх. */
export const exceedsIvyLimit = (
  patient: Patient,
  totalMl: number,
): boolean => totalMl > ivyLimitMl(patient);
