import type { DrugCategory } from "../domain/category";
import type { Drug } from "../domain/drug";
import { CATEGORY_LABELS } from "../data/labels/category-labels";

export interface CategoryGroup {
  readonly category: DrugCategory;
  readonly labelMn: string;
  readonly count: number;
  /** Картад харуулах жишээ эмүүд (кирилл нэр). */
  readonly sample: readonly string[];
}

const SAMPLE_SIZE = 4;

const toGroup = (category: DrugCategory, drugs: readonly Drug[]): CategoryGroup => ({
  category,
  labelMn: CATEGORY_LABELS[category],
  count: drugs.length,
  sample: drugs.slice(0, SAMPLE_SIZE).map((drug) => drug.innMn),
});

/** Эмийг ангилалаар бүлэглэнэ; ангиллыг нэрээр (Монгол) эрэмбэлнэ. */
export const groupByCategory = (drugs: readonly Drug[]): readonly CategoryGroup[] => {
  const map = new Map<DrugCategory, Drug[]>();
  drugs.forEach((drug) => map.set(drug.category, [...(map.get(drug.category) ?? []), drug]));
  return [...map]
    .map(([category, list]) => toGroup(category, list))
    .sort((a, b) => a.labelMn.localeCompare(b.labelMn, "mn"));
};
