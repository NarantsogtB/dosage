import type { Drug } from "../../domain/drug";
import type { EvidenceLevel } from "../../domain/source";

/** Хамгийн хүчтэйгээс сул руу. Индекс бага нь илүү хүчтэй. */
const RANK: readonly EvidenceLevel[] = [
  "A_mn_approved",
  "B_who",
  "C_international",
  "D_label_only",
  "E_unverified",
];

const rankOf = (level: EvidenceLevel): number => RANK.indexOf(level);

const strongest = (a: EvidenceLevel, b: EvidenceLevel): EvidenceLevel =>
  rankOf(a) <= rankOf(b) ? a : b;

/** Эмийн дүрмүүдээс ХАМГИЙН ХҮЧТЭЙ нотолгооны түвшинг буцаана. */
export const drugEvidence = (drug: Drug): EvidenceLevel =>
  drug.rules.map((rule) => rule.evidenceLevel).reduce(strongest, "E_unverified");

/** Ядаж нэг дүрэм нь эх сурвалжтай эсэх. */
export const isVerified = (drug: Drug): boolean =>
  drugEvidence(drug) !== "E_unverified";
