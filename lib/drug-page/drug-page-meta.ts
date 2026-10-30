import type { Metadata } from "next";
import type { Drug } from "../domain/drug";
import { isVerified } from "../engine/rule/drug-evidence";
import { pageMeta } from "../page-meta";
import { defaultRuleOf, ruleSummary } from "../search/drug-row-summary";
import { drugPublishers } from "./drug-sources";

/** `/dose/[slug]`-ийн slug. Эмийн id нь аль хэдийн латин kebab-case. */
export const drugSlug = (drug: Drug): string => drug.id;

export const drugPath = (drug: Drug): string => `/dose/${drugSlug(drug)}`;

/**
 * Google индексжүүлэх эсэх.
 *
 * ⚠️ Эх сурвалжгүй эмийн тунг хайлтын үр дүнд гаргахгүй — хуудас
 * байгаа ч `noindex`, sitemap-д орохгүй. Эх сурвалж нэмэгдмэгц
 * автоматаар индексжүүлэгдэнэ. Шийдвэр: docs/DECISIONS.md.
 */
export const isIndexable = (drug: Drug): boolean => isVerified(drug);

/** Layout-ийн template « · dosage.mn»-ийг нэмнэ. */
export const drugPageTitle = (drug: Drug): string =>
  `${drug.innMn} — хүүхдийн тун жингээр`;

/** "Médecins Sans Frontières (MSF)" → "Médecins Sans Frontières". */
const shortName = (publisher: string): string =>
  publisher.replace(/\s*\(.*\)$/, "");

const sourceLine = (drug: Drug): string => {
  const publishers = drugPublishers(drug).slice(0, 2).map(shortName);
  return publishers.length > 0
    ? `Эх сурвалж: ${publishers.join(", ")}.`
    : "Эх сурвалж баталгаажаагүй.";
};

const doseLine = (drug: Drug): string => {
  const rule = defaultRuleOf(drug);
  return rule ? `${ruleSummary(rule)}. ` : "";
};

export const drugPageDescription = (drug: Drug): string =>
  `${drug.innMn} (${drug.inn}): ${doseLine(drug)}` +
  `Жингээр тун, мл/шахмалаар тооцоолно. ${sourceLine(drug)}`;

const robotsOf = (drug: Drug): Metadata["robots"] =>
  isIndexable(drug) ? undefined : { index: false, follow: true };

/** Эмийн хуудасны metadata: title, description, canonical, robots. */
export const drugPageMeta = (drug: Drug): Metadata => {
  const path = drugPath(drug);
  const title = drugPageTitle(drug);
  const description = drugPageDescription(drug);
  return {
    ...pageMeta(path),
    title,
    description,
    openGraph: { url: path, title, description },
    robots: robotsOf(drug),
  };
};
