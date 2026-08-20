"use client";

import { TriangleAlert } from "lucide-react";
import type { Drug } from "@/lib/domain/drug";
import { drugRowSummary } from "@/lib/search/drug-row-summary";
import DrugRowIcon from "./DrugRowIcon";
import { CommandItem } from "@/components/ui/command";
import {
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import EvidenceDot from "@/components/dosage/EvidenceDot";
import DrugListItemIcon from "./DrugListItemIcon";
import { rowClass, rowTitleClass } from "./drug-row-style";

interface Props {
  readonly drug: Drug;
  readonly selected: boolean;
  readonly onToggle: (id: string) => void;
}

/**
 * Жагсаалтын нэг мөр. Дарах эсвэл Enter дарахад сонголт солигдоно.
 *
 * `cmdk`-ийн `CommandItem` тул хайлтын талбараас салалгүй ↑ ↓ Enter-ээр
 * ажиллана. Өнгөний хоёр сувгийн тухай `drug-row-style.ts`-ыг үз.
 *
 * Тайлбар мөр нь кирилл нэрийн оронд ЗААЛТ + мг/кг (`drugRowSummary`)
 * харуулна — Figma-гийн "Item" дүрмээр эмч мөр бүрээс шууд хэрэгтэй
 * мэдээллээ (аль өвчинд, ямар тунгаар) 3 секундэд олно. Кирилл нэр нь
 * хайлтын түлхүүр үг хэвээр (`keywords`), зөвхөн харагдахаа больсон.
 */
export default function DrugListItem({ drug, selected, onToggle }: Props) {
  const summary = drugRowSummary(drug) ?? drug.innMn;
  return (
    <CommandItem
      value={drug.id}
      keywords={[drug.inn, drug.innMn]}
      onSelect={() => onToggle(drug.id)}
      aria-checked={selected}
      className={rowClass(selected)}
    >
      <ItemMedia className="self-center">
        <DrugRowIcon selected={selected} />
      </ItemMedia>
      <ItemContent className="min-w-0 gap-0">
        <ItemTitle className={rowTitleClass(selected)}>{drug.inn}</ItemTitle>
        <ItemDescription className="block truncate text-[13px] leading-5">
          {summary}
        </ItemDescription>
      </ItemContent>
      <ItemActions className="gap-2">
        <EvidenceDot drug={drug} />
        <DrugListItemIcon
          show={drug.warnings.length > 0}
          icon={TriangleAlert}
          className="text-warning"
          label={`${drug.inn}: анхааруулгатай`}
        />
      </ItemActions>
      <span className="sr-only">{selected ? "сонгосон" : "сонгоогүй"}</span>
    </CommandItem>
  );
}
