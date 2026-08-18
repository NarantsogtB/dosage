"use client";

import type { DrugCategory } from "@/lib/domain/category";
import { CATEGORY_LABELS } from "@/lib/data/labels/category-labels";
import CategoryPill from "./CategoryPill";

interface Props {
  readonly categories: readonly DrugCategory[];
  readonly selected?: DrugCategory;
  readonly onSelect: (category?: DrugCategory) => void;
}

/** Ангиллын шүүлтүүрийн эгнээ. */
export default function CategoryFilter({
  categories,
  selected,
  onSelect,
}: Props) {
  return (
    <div className="flex gap-1.5 overflow-x-auto px-5 pb-3">
      <CategoryPill
        label="Бүгд"
        active={selected === undefined}
        onClick={() => onSelect(undefined)}
      />
      {categories.map((category) => (
        <CategoryPill
          key={category}
          label={CATEGORY_LABELS[category]}
          active={selected === category}
          onClick={() => onSelect(selected === category ? undefined : category)}
        />
      ))}
    </div>
  );
}
