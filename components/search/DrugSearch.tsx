"use client";

import { useMemo, useState } from "react";
import type { Drug } from "@/lib/domain/drug";
import type { DrugCategory } from "@/lib/domain/category";
import { filterDrugs } from "@/lib/search/filter-drugs";
import { isVerified } from "@/lib/engine/rule/drug-evidence";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import CategoryFilter from "./CategoryFilter";
import DrugList from "./DrugList";
import SearchHeader from "./SearchHeader";

interface Props {
  readonly drugs: readonly Drug[];
  readonly selectedIds: readonly string[];
  readonly onToggle: (id: string) => void;
}

const categoriesOf = (drugs: readonly Drug[]): readonly DrugCategory[] =>
  [...new Set(drugs.map((drug) => drug.category))].sort();

/** Эм хайх, шүүх, сонгох хэсэг. */
export default function DrugSearch({ drugs, selectedIds, onToggle }: Props) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<DrugCategory | undefined>();
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  const categories = useMemo(() => categoriesOf(drugs), [drugs]);
  const verifiedCount = useMemo(() => drugs.filter(isVerified).length, [drugs]);
  const visible = useMemo(
    () => filterDrugs(drugs, { query, category, verifiedOnly }),
    [drugs, query, category, verifiedOnly],
  );

  return (
    <Card className="gap-0 overflow-hidden py-0">
      <SearchHeader
        query={query}
        onQuery={setQuery}
        verifiedOnly={verifiedOnly}
        verifiedCount={verifiedCount}
        onVerified={() => setVerifiedOnly((on) => !on)}
      />

      <CategoryFilter
        categories={categories}
        selected={category}
        onSelect={setCategory}
      />

      <Separator />

      <CardContent className="max-h-72 overflow-y-auto p-0">
        <DrugList drugs={visible} selectedIds={selectedIds} onToggle={onToggle} />
      </CardContent>

      <Separator />

      <div className="text-muted-foreground px-5 py-2 text-xs">
        {visible.length} / {drugs.length} эм
      </div>
    </Card>
  );
}
