import type { Drug } from "@/lib/domain/drug";
import type { DosingRule } from "@/lib/domain/dosing-rule";
import { formatRange } from "@/lib/format/format-range";

export const defaultRuleOf = (drug: Drug): DosingRule | undefined =>
  drug.rules.find((rule) => rule.isDefault) ?? drug.rules[0];

const indicationLabel = (rule: DosingRule): string =>
  rule.indication === "general" ? "Ерөнхий заалт" : rule.indication.labelMn;

/** mg/kg дүрмүүдэд л мужийг харуулна — жингийн муж/тогтмол тунд хамаагүй. */
const basisLabel = (rule: DosingRule): string | undefined => {
  const basis = rule.basis;
  if (basis.kind === "per_kg_per_day") {
    return `${formatRange(basis.minMgPerKg, basis.maxMgPerKg)} мг/кг/хон`;
  }
  if (basis.kind === "per_kg_per_dose") {
    return `${formatRange(basis.minMgPerKg, basis.maxMgPerKg)} мг/кг/тун`;
  }
  return undefined;
};

/**
 * Жагсаалтын мөрөнд харуулах нэг мөр тайлбар — "Заалт · мг/кг/хон".
 *
 * Үндсэн (`isDefault`) дүрмээс гаргана; байхгүй бол эхнийхээс. Энэ нь
 * ЗӨВХӨН урьдчилан харуулах зориулалттай — бодит тооцоолол өвчтөний
 * жин, нас, сонгосон заалтаас хамаарч өөр дүрэм сонгож болно
 * (`lib/engine/rule/match-indication.ts`-ыг үз).
 */
export const drugRowSummary = (drug: Drug): string | undefined => {
  const rule = defaultRuleOf(drug);
  return rule ? ruleSummary(rule) : undefined;
};

/** Нэг дүрмийн тайлбар — "Заалт · мг/кг/хон". Эмийн хуудас ч ашиглана. */
export const ruleSummary = (rule: DosingRule): string => {
  const basis = basisLabel(rule);
  return basis ? `${indicationLabel(rule)} · ${basis}` : indicationLabel(rule);
};
