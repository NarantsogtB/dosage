import type { Drug } from "../../domain/drug";
import type { DosingRule } from "../../domain/dosing-rule";
import type { Patient } from "../../domain/patient";
import { matchRule } from "./match-rule";
import { preferRule } from "./prefer-rule";

/** Өвчтөнд тохирох тунгийн дүрмийг сонгоно. Олдохгүй бол null. */
export const selectRule = (
  drug: Drug,
  patient: Patient,
  indicationCode?: string,
): DosingRule | null => {
  const matches = drug.rules.filter((rule) =>
    matchRule(rule, patient, indicationCode),
  );
  return preferRule(matches, indicationCode) ?? null;
};
