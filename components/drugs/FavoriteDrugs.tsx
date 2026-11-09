"use client";

import { useRouter } from "next/navigation";
import { ChevronRight, Plus } from "lucide-react";
import type { Drug } from "@/lib/domain/drug";
import { DRUGS, DRUG_BY_ID } from "@/lib/data/drugs";
import { Button } from "@/components/ui/button";
import { addDrugToActive } from "@/components/calculator/use-selected-drugs";
import { openSearch } from "@/components/search/search-open";
import { useFavoriteIds } from "@/components/recent/favorites-store";

const isDrug = (drug?: Drug): drug is Drug => drug !== undefined;

const Circle = ({ drug, onPick }: { readonly drug: Drug; readonly onPick: (id: string) => void }) => (
  <li className="w-20 shrink-0 text-center">
    <button type="button" onClick={() => onPick(drug.id)} className="group flex w-full flex-col items-center gap-1.5">
      <span className="bg-tile text-tile-foreground group-focus-visible:ring-ring/50 grid size-14 place-items-center rounded-full text-xl font-bold group-focus-visible:ring-[3px]">
        {drug.innMn.charAt(0)}
      </span>
      <span className="text-muted-foreground w-full truncate text-xs">{drug.innMn}</span>
    </button>
  </li>
);

/**
 * «Миний эмүүд» — эмч өөрийн байнга хэрэглэдэг эмүүд. Дарахад идэвхтэй
 * өвчтөнд нэмээд `/dose` руу (тун шууд гарна). «Нэмэх» → хайлтыг favorite
 * горимд нээнэ. Төхөөрөмж дээр (localStorage) л хадгалагдана.
 */
export default function FavoriteDrugs() {
  const router = useRouter();
  const drugs = useFavoriteIds().map((id) => DRUG_BY_ID.get(id)).filter(isDrug);
  const pick = (id: string) => {
    addDrugToActive(id);
    router.push("/dose");
  };

  return (
    <section aria-labelledby="favorites-title" className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 id="favorites-title" className="text-xl font-bold">
          Миний эмүүд
        </h2>
        <Button type="button" variant="secondary" size="pill" onClick={() => openSearch()}>
          Бүгд · <span className="num">{DRUGS.length}</span>
          <ChevronRight aria-hidden />
        </Button>
      </div>
      <ul className="flex gap-2 overflow-x-auto pb-1">
        <li className="w-20 shrink-0 text-center">
          <button type="button" onClick={() => openSearch({ mode: "favorite" })} className="flex w-full flex-col items-center gap-1.5">
            <span className="bg-muted grid size-14 place-items-center rounded-full">
              <Plus aria-hidden />
            </span>
            <span className="text-muted-foreground text-xs">Нэмэх</span>
          </button>
        </li>
        {drugs.map((drug) => (
          <Circle key={drug.id} drug={drug} onPick={pick} />
        ))}
      </ul>
    </section>
  );
}
