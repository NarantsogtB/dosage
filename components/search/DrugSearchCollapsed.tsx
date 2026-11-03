"use client";

import { Plus } from "lucide-react";
import type { Drug } from "@/lib/domain/drug";
import { DRUG_BY_ID } from "@/lib/data/drugs";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import EvidenceDot from "@/components/dosage/EvidenceDot";
import RecentDrugs from "@/components/recent/RecentDrugs";
import StepHeader from "@/components/step/StepHeader";
import RemoveButton from "@/components/summary/RemoveButton";

interface Props {
  readonly selectedIds: readonly string[];
  readonly onToggle: (id: string) => void;
  readonly onExpand: () => void;
}

const isDrug = (drug?: Drug): drug is Drug => drug !== undefined;

const SelectedRow = ({ drug, onToggle }: { readonly drug: Drug; readonly onToggle: (id: string) => void }) => (
  <li className="bg-primary/10 flex min-h-11 items-center gap-2 rounded-md py-1 pr-1 pl-3">
    <span className="text-primary flex-1 truncate text-sm font-semibold">{drug.inn}</span>
    <EvidenceDot drug={drug} />
    <RemoveButton label={drug.inn} onRemove={() => onToggle(drug.id)} />
  </li>
);

/**
 * Хураагдсан хайлт — Figma "Drug search panel · collapsed" (V3.1 · 03).
 *
 * Зөвхөн mobile-д. Эм сонгосны дараа 50 мөрт жагсаалт үр дүнг ~1300px
 * доош түлхэж байв — эмч тунгаа олохын тулд гүйлгэх ёстой болдог.
 * Одоо сонгосон эмүүд + «Өөр эм нэмэх», жагсаалт нэг товшилтын цаана.
 */
export default function DrugSearchCollapsed({ selectedIds, onToggle, onExpand }: Props) {
  const drugs = selectedIds.map((id) => DRUG_BY_ID.get(id)).filter(isDrug);
  return (
    <Card className="gap-0 py-0 md:hidden">
      <CardHeader className="pb-3">
        <StepHeader step={2} label="Эм сонгох" done />
      </CardHeader>
      <ul className="space-y-1.5 px-5 pb-3">
        {drugs.map((drug) => (
          <SelectedRow key={drug.id} drug={drug} onToggle={onToggle} />
        ))}
      </ul>
      <div className="px-5 pb-3">
        <Button type="button" variant="outline" className="w-full justify-start" onClick={onExpand}>
          <Plus aria-hidden />
          Өөр эм нэмэх
        </Button>
      </div>
      <RecentDrugs selectedIds={selectedIds} onToggle={onToggle} hidden={false} />
    </Card>
  );
}
