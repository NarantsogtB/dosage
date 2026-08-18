"use client";

import { Check, TriangleAlert } from "lucide-react";
import type { Drug } from "@/lib/domain/drug";
import { CATEGORY_LABELS } from "@/lib/data/labels/category-labels";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import EvidenceDot from "@/components/dosage/EvidenceDot";
import DrugListItemIcon from "./DrugListItemIcon";

interface Props {
  readonly drug: Drug;
  readonly selected: boolean;
  readonly onToggle: (id: string) => void;
}

/** Жагсаалтын нэг мөр. Дарахад сонголт солигдоно. */
export default function DrugListItem({ drug, selected, onToggle }: Props) {
  return (
    <button
      type="button"
      onClick={() => onToggle(drug.id)}
      aria-pressed={selected}
      className={cn(
        "border-border/60 flex w-full items-center gap-3 border-b px-5 py-2.5 text-left transition-colors last:border-0",
        selected ? "bg-primary/5" : "hover:bg-accent",
      )}
    >
      <DrugListItemIcon selected={selected} icon={Check} />
      <EvidenceDot drug={drug} />
      <span className="min-w-0 flex-1">
        <span
          className={cn(
            "block truncate text-sm font-medium",
            selected && "text-primary",
          )}
        >
          {drug.inn}
        </span>
        <span className="text-muted-foreground block truncate text-xs">
          {drug.innMn}
        </span>
      </span>
      <DrugListItemIcon
        selected={drug.warnings.length > 0}
        icon={TriangleAlert}
        className="text-warning"
      />
      <Badge variant="secondary" className="shrink-0">
        {CATEGORY_LABELS[drug.category].split(" ")[0]}
      </Badge>
    </button>
  );
}
