"use client";

import type { Drug } from "@/lib/domain/drug";
import type { Indication } from "@/lib/domain/indication";
import DrugListItem from "./DrugListItem";

interface Props {
  readonly drugs: readonly Drug[];
  readonly selectedIds: readonly string[];
  readonly hits?: ReadonlyMap<string, Indication>;
  readonly onToggle: (id: string, indicationCode?: string) => void;
}

/** Шүүгдсэн эмийн жагсаалт. Хоосон тохиолдлыг DrugSearch хариуцна. */
export default function DrugList({ drugs, selectedIds, hits, onToggle }: Props) {
  return (
    <>
      {drugs.map((drug) => (
        <DrugListItem
          key={drug.id}
          drug={drug}
          selected={selectedIds.includes(drug.id)}
          matched={hits?.get(drug.id)}
          onToggle={onToggle}
        />
      ))}
    </>
  );
}
