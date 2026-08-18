import type { Drug } from "../../domain/drug";
import type { DosingRule } from "../../domain/dosing-rule";
import type { Patient } from "../../domain/patient";
import { matchAge } from "./match-age";
import { matchWeight } from "./match-weight";

/**
 * Өвчтөний нас, жинд ТОХИРОХ дүрмүүд.
 *
 * UI нь зөвхөн эдгээрийг санал болгоно. Тохирохгүй дүрмийг санал
 * болговол эмч сонгоод үр дүн өөрчлөгдөхгүй — төөрөгдөл үүснэ.
 */
export const applicableRules = (
  drug: Drug,
  patient: Patient,
): readonly DosingRule[] =>
  drug.rules.filter(
    (rule) => matchAge(rule, patient) && matchWeight(rule, patient),
  );
