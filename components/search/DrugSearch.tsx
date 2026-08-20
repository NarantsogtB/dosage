"use client";

import { useMemo } from "react";
import type { Drug } from "@/lib/domain/drug";
import type { DrugCategory } from "@/lib/domain/category";
import { isVerified } from "@/lib/engine/rule/drug-evidence";
import { Card } from "@/components/ui/card";
import { Command } from "@/components/ui/command";
import { Separator } from "@/components/ui/separator";
import CategoryFilter from "./CategoryFilter";
import SearchFooter from "./SearchFooter";
import SearchHeader from "./SearchHeader";
import SearchResults from "./SearchResults";
import { useDrugFilters } from "./use-drug-filters";

interface Props {
  readonly drugs: readonly Drug[];
  readonly selectedIds: readonly string[];
  readonly onToggle: (id: string) => void;
}

const categoriesOf = (drugs: readonly Drug[]): readonly DrugCategory[] =>
  [...new Set(drugs.map((drug) => drug.category))].sort();

/**
 * Эм хайх, шүүх, сонгох хэсэг. Алхам 2.
 *
 * `cmdk` дээр суусан. `shouldFilter={false}` нь САНААТАЙ: шүүлт бүхэлдээ
 * `filterDrugs`-д үлдэнэ (латин↔кирилл дүйцүүлэлт, ангилал, баталгаажилт —
 * бүгд тесттэй домэйн логик). cmdk-ээс авах нь ганцхан зүйл: хайлтын
 * талбараас салалгүй ↑ ↓ Enter-ээр жагсаалтыг удирдах.
 *
 * `loop` — жагсаалтын төгсгөлд хүрээд эхэнд эргэнэ.
 */
export default function DrugSearch({ drugs, selectedIds, onToggle }: Props) {
  const filters = useDrugFilters(drugs);
  const categories = useMemo(() => categoriesOf(drugs), [drugs]);
  const verifiedCount = useMemo(() => drugs.filter(isVerified).length, [drugs]);

  return (
    <Card className="gap-0 overflow-hidden py-0">
      {/*
        `label` нь cmdk-д нуугдмал <label>-ээр орж, оролтын `aria-labelledby`
        болно — тиймээс оролт дээр `aria-label` бичих нь ҮР ДҮНГҮЙ
        (aria-labelledby давамгайлна). Нэрийг ЭНД өгнө.
      */}
      <Command
        shouldFilter={false}
        loop
        label="Эмийн нэрээр хайх"
        className="bg-transparent"
      >
        <SearchHeader
          query={filters.query}
          onQuery={filters.setQuery}
          verifiedOnly={filters.verifiedOnly}
          verifiedCount={verifiedCount}
          selectedCount={selectedIds.length}
          onVerified={filters.toggleVerified}
        />
        <CategoryFilter
          categories={categories}
          selected={filters.category}
          onSelect={filters.setCategory}
        />
        <Separator />
        <SearchResults
          drugs={filters.visible}
          selectedIds={selectedIds}
          labels={filters.labels}
          onToggle={onToggle}
          onReset={filters.reset}
        />
        <SearchFooter shown={filters.visible.length} total={drugs.length} />
      </Command>
    </Card>
  );
}
