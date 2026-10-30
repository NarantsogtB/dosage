import { DRUGS } from "../data/drugs";
import type { SiteRoute } from "../site";
import { drugPath, isIndexable } from "./drug-page-meta";

/**
 * Sitemap-д орох эмийн хуудсууд — зөвхөн эх сурвалжтай эмүүд.
 * Эх сурвалжгүй эмийн хуудас байгаа ч `noindex` (docs/DECISIONS.md).
 */
export const DRUG_ROUTES: readonly SiteRoute[] = DRUGS.filter(isIndexable).map(
  (drug) => ({ path: drugPath(drug), priority: 0.7 }),
);
