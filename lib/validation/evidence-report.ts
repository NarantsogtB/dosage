import type { Drug } from "@/lib/domain/drug";
import type { DosingRule } from "@/lib/domain/dosing-rule";
import type { EvidenceLevel } from "@/lib/domain/source";
import { ROUTE_LABELS } from "@/lib/data/labels/route-labels";
import { EVIDENCE_ORDER, isVerified } from "@/lib/engine/rule/drug-evidence";
import { ruleSummary } from "@/lib/search/drug-row-summary";

/** Тайлангийн нэг мөр — эмийн нэг дүрэм. */
export interface RuleRow {
  readonly drug: string;
  readonly ruleId: string;
  readonly summary: string;
  readonly route: string;
  readonly level: EvidenceLevel;
  readonly sources: readonly string[];
  readonly lastReviewed: string;
  readonly knownGap: boolean;
}

const LETTERS: Record<EvidenceLevel, string> = {
  A_mn_approved: "A",
  B_who: "B",
  C_international: "C",
  D_label_only: "D",
  E_unverified: "E",
};

const rulesOf = (drugs: readonly Drug[]): readonly DosingRule[] =>
  drugs.flatMap((drug) => drug.rules);

/** Дүрэм бүрийн түвшинг тоолно. Тоо 0 түвшин ч жагсаалтад үлдэнэ. */
export const levelCounts = (drugs: readonly Drug[]): Record<EvidenceLevel, number> => {
  const counts = Object.fromEntries(EVIDENCE_ORDER.map((level) => [level, 0])) as Record<EvidenceLevel, number>;
  rulesOf(drugs).forEach((rule) => (counts[rule.evidenceLevel] += 1));
  return counts;
};

const rowOf = (drug: Drug, rule: DosingRule, gaps: ReadonlySet<string>): RuleRow => ({
  drug: drug.inn,
  ruleId: rule.id,
  summary: ruleSummary(rule),
  route: ROUTE_LABELS[rule.route],
  level: rule.evidenceLevel,
  sources: rule.sources.map((ref) => ref.sourceId),
  lastReviewed: drug.lastReviewed,
  knownGap: gaps.has(rule.id),
});

/** Сул нотолгоо эхэнд (E → A), дараа нь эмийн нэрээр. */
const compareRows = (a: RuleRow, b: RuleRow): number =>
  EVIDENCE_ORDER.indexOf(b.level) - EVIDENCE_ORDER.indexOf(a.level) ||
  a.drug.localeCompare(b.drug) ||
  a.ruleId.localeCompare(b.ruleId);

/** Эм бүрийн дүрэм бүр — баталгаажаагүй нь дээр. */
export const ruleRows = (drugs: readonly Drug[], gapIds: readonly string[]): readonly RuleRow[] => {
  const gaps = new Set(gapIds);
  return drugs
    .flatMap((drug) => drug.rules.map((rule) => rowOf(drug, rule, gaps)))
    .toSorted(compareRows);
};

const cell = (value: string): string => value.replaceAll("|", "\\|");

const rowLine = (row: RuleRow): string =>
  `| ${[
    row.drug,
    row.summary,
    row.route,
    LETTERS[row.level],
    row.sources.join(", ") || "—",
    row.lastReviewed,
    row.knownGap ? "⚠️" : "",
  ]
    .map(cell)
    .join(" | ")} |`;

const levelLines = (drugs: readonly Drug[]): readonly string[] => {
  const counts = levelCounts(drugs);
  return EVIDENCE_ORDER.map((level) => `| ${LETTERS[level]} | \`${level}\` | ${counts[level]} |`);
};

const summaryLines = (drugs: readonly Drug[]): readonly string[] => [
  `- Эм: **${drugs.length}**, баталгаажсан (ядаж нэг дүрэм A–D): **${drugs.filter(isVerified).length}**`,
  `- Дүрэм: **${rulesOf(drugs).length}**`,
];

/**
 * `docs/EVIDENCE-STATUS.md`-ийн агуулга. Огноог гаднаас авна — тест
 * тогтвортой, script өдөр бүр ажиллахад diff зөвхөн тоо өөрчлөгдсөн үед.
 */
export const renderEvidenceReport = (
  drugs: readonly Drug[],
  gapIds: readonly string[],
  date: string,
): string =>
  [
    "<!-- Автоматаар үүсгэсэн — ГАРААР ЗАСАХГҮЙ. `bun run evidence:report` -->",
    "# Эх сурвалжийн статус",
    "",
    `Огноо: ${date}. Эх: \`lib/data/drugs/\`, \`tests/data/known-gaps.ts\`.`,
    "",
    ...summaryLines(drugs),
    "",
    "| Түвшин | Код | Дүрэм |",
    "|---|---|---|",
    ...levelLines(drugs),
    "",
    "## Дүрэм бүр (сул нотолгоо эхэнд)",
    "",
    "⚠️ = `known-gaps.ts`-д бүртгэлтэй (ганц эх сурвалж).",
    "",
    "| Эм | Заалт · тун | Зам | Түвшин | Эх сурвалж | Хянасан | Цоорхой |",
    "|---|---|---|---|---|---|---|",
    ...ruleRows(drugs, gapIds).map(rowLine),
    "",
  ].join("\n");
