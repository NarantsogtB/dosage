"use client";

import type { Drug } from "@/lib/domain/drug";
import DrugListItem from "./DrugListItem";

interface Props {
  readonly drugs: readonly Drug[];
  readonly selectedIds: readonly string[];
  readonly onToggle: (id: string) => void;
}

/** Шүүгдсэн эмийн жагсаалт. Хоосон тохиолдлыг DrugSearch хариуцна. */
export default function DrugList({ drugs, selectedIds, onToggle }: Props) {
  return (
    <>
      {drugs.map((drug) => (
        <DrugListItem
          key={drug.id}
          drug={drug}
          selected={selectedIds.includes(drug.id)}
          onToggle={onToggle}
        />
      ))}
    </>
  );
}
