"use client";

import { useCallback, useMemo, useState } from "react";
import type { Drug } from "@/lib/domain/drug";
import type { DrugCategory } from "@/lib/domain/category";
import { isVerified } from "@/lib/engine/rule/drug-evidence";
import { Card } from "@/components/ui/card";
import { Command } from "@/components/ui/command";
import { Separator } from "@/components/ui/separator";
import RecentDrugs from "@/components/recent/RecentDrugs";
import CategoryFilter from "./CategoryFilter";
import SearchFooter from "./SearchFooter";
import SearchHeader from "./SearchHeader";
import SearchResults from "./SearchResults";
import { useDrugFilters } from "./use-drug-filters";
import DrugSearchCollapsed from "./DrugSearchCollapsed";
import { DRUG_SEARCH_ID, focusSearchInput } from "./search-focus";
import { useSearchShortcut } from "./use-search-shortcut";
import { cn } from "@/lib/utils";

interface Props {
  readonly drugs: readonly Drug[];
  readonly selectedIds: readonly string[];
  readonly onToggle: (id: string) => void;
}

const categoriesOf = (drugs: readonly Drug[]): readonly DrugCategory[] =>
  [...new Set(drugs.map((drug) => drug.category))].sort();

/** Ангиллын жагсаалт ба баталгаажсан эмийн тоо — эмийн жагсаалтаас. */
const useDrugStats = (drugs: readonly Drug[]) =>
  useMemo(
    () => ({
      categories: categoriesOf(drugs),
      verifiedCount: drugs.filter(isVerified).length,
    }),
    [drugs],
  );

/**
 * Mobile-д эм НЭМСЭН даруйд жагсаалт хураагдана (V3.1). Desktop-д
 * хураагдсан төлөв CSS-ээр харагдахгүй тул нөлөөгүй.
 */
const useCollapse = (selectedIds: readonly string[], onToggle: (id: string) => void) => {
  const [expanded, setExpanded] = useState(false);
  const expand = useCallback(() => {
    setExpanded(true);
    requestAnimationFrame(focusSearchInput);
  }, []);
  const toggle = (id: string) => {
    if (!selectedIds.includes(id)) setExpanded(false);
    onToggle(id);
  };
  return { collapsed: selectedIds.length > 0 && !expanded, expand, toggle };
};

interface PanelProps extends Props {
  readonly collapsed: boolean;
}

/** Бүтэн хайлтын карт. Mobile-д хураагдсан үед нуугдана. */
function SearchPanel({ drugs, selectedIds, onToggle, collapsed }: PanelProps) {
  const filters = useDrugFilters(drugs);
  const { categories, verifiedCount } = useDrugStats(drugs);
  return (
    <Card
      id={DRUG_SEARCH_ID}
      className={cn("scroll-mt-20 gap-0 overflow-hidden py-0", collapsed && "max-md:hidden")}
    >
      {/*
        `label` нь cmdk-д нуугдмал <label>-ээр орж, оролтын `aria-labelledby`
        болно — тиймээс оролт дээр `aria-label` бичих нь ҮР ДҮНГҮЙ
        (aria-labelledby давамгайлна). Нэрийг ЭНД өгнө.
      */}
      <Command shouldFilter={false} loop label="Эмийн нэрээр хайх" className="bg-transparent">
        <SearchHeader
          query={filters.query}
          onQuery={filters.setQuery}
          verifiedOnly={filters.verifiedOnly}
          verifiedCount={verifiedCount}
          selectedCount={selectedIds.length}
          onVerified={filters.toggleVerified}
        />
        <RecentDrugs selectedIds={selectedIds} onToggle={onToggle} hidden={filters.query !== ""} />
        <CategoryFilter categories={categories} selected={filters.category} onSelect={filters.setCategory} />
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
  const { collapsed, expand, toggle } = useCollapse(selectedIds, onToggle);
  useSearchShortcut(expand);

  return (
    <>
      {collapsed ? (
        <DrugSearchCollapsed selectedIds={selectedIds} onToggle={onToggle} onExpand={expand} />
      ) : null}
      <SearchPanel drugs={drugs} selectedIds={selectedIds} onToggle={toggle} collapsed={collapsed} />
    </>
  );
}
