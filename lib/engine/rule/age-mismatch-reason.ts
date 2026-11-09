import type { DosingRule } from "../../domain/dosing-rule";
import type { Patient } from "../../domain/patient";
import { isWithinRange } from "../math/is-within-range";

const MONTHS_PER_YEAR = 12;
const MONTHS_ONLY_BELOW = 24;

/** 8 → «8 сар», 60 → «5 нас», 30 → «2 нас 6 сар». */
const ageLabel = (months: number): string => {
  if (months < MONTHS_ONLY_BELOW) return `${months} сар`;
  const rest = months % MONTHS_PER_YEAR;
  const years = `${Math.floor(months / MONTHS_PER_YEAR)} нас`;
  return rest === 0 ? years : `${years} ${rest} сар`;
};

/** Дүрэм ба нийт мужийн хил хоёул оролцоно (`isWithinRange`-тэй адил). */
const spanLabel = (min: number, max: number): string => {
  if (max === Number.POSITIVE_INFINITY) return `≥ ${ageLabel(min)}`;
  return min === 0 ? `≤ ${ageLabel(max)}` : `${ageLabel(min)} – ${ageLabel(max)}`;
};

/**
 * Өвчтөний нас эмийн БҮХ дүрмийн насны мужаас гадуур бол аль хязгаар
 * гэдгийг нэрлэнэ (G3). Муж дотор (завсар, жин, заалт) бол null —
 * дуудагч ерөнхий мессежээ хэрэглэнэ.
 */
export const ageMismatchReason = (
  rules: readonly DosingRule[],
  patient: Patient,
): string | null => {
  const min = Math.min(...rules.map((rule) => rule.ageMinMonths));
  const max = Math.max(...rules.map((rule) => rule.ageMaxMonths ?? Number.POSITIVE_INFINITY));
  if (rules.length === 0 || isWithinRange(patient.ageMonths, min, max)) return null;
  return (
    "Энэ эмийн тун өвчтөний насанд бүртгэгдээгүй. " +
    `Дүрмийн нас: ${spanLabel(min, max)} · өвчтөн: ${ageLabel(patient.ageMonths)}.`
  );
};
