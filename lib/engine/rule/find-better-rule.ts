import type { Drug } from "../../domain/drug";
import type { DosingRule } from "../../domain/dosing-rule";
import type { EvidenceLevel } from "../../domain/source";
import type { Patient } from "../../domain/patient";
import { applicableRules } from "./applicable-rules";

/** Хамгийн хүчтэйгээс сул руу. Индекс бага нь илүү хүчтэй. */
const RANK: readonly EvidenceLevel[] = [
  "A_mn_approved",
  "B_who",
  "C_international",
  "D_label_only",
  "E_unverified",
];

const isStronger = (candidate: DosingRule, current: DosingRule): boolean =>
  RANK.indexOf(candidate.evidenceLevel) < RANK.indexOf(current.evidenceLevel);

const byStrength = (a: DosingRule, b: DosingRule): number =>
  RANK.indexOf(a.evidenceLevel) - RANK.indexOf(b.evidenceLevel);

/**
 * Идэвхтэй дүрмээс ИЛҮҮ САЙН эх сурвалжтай, ӨВЧТӨНД ТОХИРОХ дүрэм.
 *
 * Badge нь үргэлж идэвхтэй дүрмийн түвшинг харуулна — харагдаж буй тоог
 * буруу тодорхойлж болохгүй. Харин илүү сайн дүрэм байвал зам зааж өгнө.
 * Насанд тохирохгүй дүрмийг санал болгохгүй.
 */
export const findBetterRule = (
  drug: Drug,
  current: DosingRule,
  patient: Patient,
): DosingRule | undefined =>
  applicableRules(drug, patient)
    .filter((rule) => isStronger(rule, current))
    .slice()
    .sort(byStrength)[0];
