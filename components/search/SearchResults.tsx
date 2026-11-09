"use client";

import type { Drug } from "@/lib/domain/drug";
import type { Indication } from "@/lib/domain/indication";
import { CommandList } from "@/components/ui/command";
import { cn } from "@/lib/utils";
import DrugList from "./DrugList";
import SearchEmpty from "./SearchEmpty";
import type { FilterState } from "./active-filters";

interface Props {
  readonly drugs: readonly Drug[];
  readonly selectedIds: readonly string[];
  readonly labels: FilterState;
  /** Заалтаар таарсан эмүүд — мөрөнд заалтыг харуулна. */
  readonly hits: ReadonlyMap<string, Indication>;
  readonly onToggle: (id: string, indicationCode?: string) => void;
  readonly onReset: () => void;
  /** Жагсаалтын өндөр — бүтэн дэлгэцийн хайлтад `max-h-none flex-1`. */
  readonly className?: string;
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
    <CommandList className={cn("max-h-72", props.className)}>
      {props.drugs.length === 0 ? (
        <SearchEmpty filters={props.labels} onReset={props.onReset} />
      ) : (
        <DrugList
          drugs={props.drugs}
          selectedIds={props.selectedIds}
          hits={props.hits}
          onToggle={props.onToggle}
        />
      )}
    </CommandList>
  );
}
