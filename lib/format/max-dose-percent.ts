import type { DosageOutcome } from "@/lib/domain/calculation-result";

/**
 * Хоногийн тунг дээд хязгаартай харьцуулсан хувь.
 *
 * `perDose`/`limitMg` хоёулаа НЭГ УДААГИЙН тунгийн нэгжтэй тул шууд
 * харьцуулна — `perDay` ашиглавал давтамжаар дахин үржүүлэх шаардлагатай
 * болж, нэгж холилдох эрсдэлтэй. Хязгааргүй бол undefined.
 */
export const maxDosePercent = (outcome: DosageOutcome): number | undefined => {
  if (!Number.isFinite(outcome.limitMg)) return undefined;
  return Math.round((outcome.perDose.maxMg / outcome.limitMg) * 100);
};

/** Идэвхтэй хязгаарыг ХОНОГИЙН нийт дүнгээр илэрхийлнэ (мг). */
export const dailyLimitMg = (outcome: DosageOutcome): number =>
  outcome.limitMg * outcome.dosesPerDay;
