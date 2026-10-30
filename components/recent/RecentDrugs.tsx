"use client";

import { Check, History } from "lucide-react";
import type { Drug } from "@/lib/domain/drug";
import { DRUG_BY_ID } from "@/lib/data/drugs";
import { track } from "@/lib/analytics/track";
import { Button } from "@/components/ui/button";
import { useRecentDrugIds } from "./recent-store";

interface Props {
  readonly selectedIds: readonly string[];
  readonly onToggle: (id: string) => void;
  /** Хайлт бичиж байх үед нуух — тэр үед хайлтын үр дүн чухал. */
  readonly hidden: boolean;
}

const isDrug = (drug?: Drug): drug is Drug => drug !== undefined;

interface ChipProps {
  readonly drug: Drug;
  readonly selected: boolean;
  readonly onPick: (id: string) => void;
}

const RecentChip = ({ drug, selected, onPick }: ChipProps) => (
  <Button
    type="button"
    size="xs"
    variant="outline"
    aria-pressed={selected}
    onClick={() => onPick(drug.id)}
  >
    {selected ? <Check aria-hidden /> : null}
    {drug.innMn}
  </Button>
);

/**
 * «Сүүлд хэрэглэсэн» эмүүд — эргэж ирсэн эмч хайлтгүйгээр нэг товшилтоор
 * сонгоно. Төхөөрөмж дээр (localStorage) л хадгалагдана, серверт явахгүй.
 */
export default function RecentDrugs({ selectedIds, onToggle, hidden }: Props) {
  const drugs = useRecentDrugIds().map((id) => DRUG_BY_ID.get(id)).filter(isDrug);
  if (hidden || drugs.length === 0) return null;

  const pick = (id: string) => {
    if (!selectedIds.includes(id)) track({ name: "recent_drug_used", drugId: id });
    onToggle(id);
  };

  return (
    <div className="flex items-center gap-1.5 overflow-x-auto px-5 pb-3">
      <History aria-label="Сүүлд хэрэглэсэн" className="text-muted-foreground size-3.5 shrink-0" />
      {drugs.map((drug) => (
        <RecentChip
          key={drug.id}
          drug={drug}
          selected={selectedIds.includes(drug.id)}
          onPick={pick}
        />
      ))}
    </div>
  );
}
