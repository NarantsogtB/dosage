"use client";

import type { Drug } from "@/lib/domain/drug";
import { CommandList } from "@/components/ui/command";
import DrugList from "./DrugList";
import SearchEmpty from "./SearchEmpty";
import type { FilterState } from "./active-filters";

interface Props {
  readonly drugs: readonly Drug[];
  readonly selectedIds: readonly string[];
  readonly labels: FilterState;
  readonly onToggle: (id: string) => void;
  readonly onReset: () => void;
}

/**
 * Үр дүнгийн хэсэг — жагсаалт эсвэл хоосон төлөв.
 *
 * Өндрийг `max-h-72` (288px) хязгаарласан нь санаатай: доор нь юу
 * байгааг (тоолуур, нотолгооны тайлбар) харагдуулж, жагсаалт төгсгөлгүй
 * гүйхээс сэргийлнэ.
 */
export default function SearchResults(props: Props) {
  return (
    <CommandList className="max-h-72">
      {props.drugs.length === 0 ? (
        <SearchEmpty filters={props.labels} onReset={props.onReset} />
      ) : (
        <DrugList
          drugs={props.drugs}
          selectedIds={props.selectedIds}
          onToggle={props.onToggle}
        />
      )}
    </CommandList>
  );
}
