"use client";

import Link from "next/link";
import { ChevronRight, House } from "lucide-react";
import type { Drug } from "@/lib/domain/drug";
import { CATEGORY_LABELS } from "@/lib/data/labels/category-labels";
import { openSearch } from "@/components/search/search-open";

const Sep = () => <ChevronRight aria-hidden className="text-muted-foreground size-4 shrink-0" />;

/** «⌂ › Эмүүд › Антибиотик › Амоксициллин» (Figma 127:426). Ангилал дарахад хайлт тухайн ангиллаар. */
export default function Breadcrumb({ drug }: { readonly drug: Drug }) {
  return (
    <nav aria-label="Замын мөр" className="bg-card flex h-12 items-center gap-2 rounded-2xl border px-4 text-sm">
      <Link href="/dose" aria-label="Нүүр" className="text-muted-foreground hover:text-foreground">
        <House aria-hidden className="size-4" />
      </Link>
      <Sep />
      <Link href="/drugs" className="text-muted-foreground hover:text-foreground">Эмүүд</Link>
      <Sep />
      <button type="button" onClick={() => openSearch({ category: drug.category })} className="text-muted-foreground hover:text-foreground">
        {CATEGORY_LABELS[drug.category]}
      </button>
      <Sep />
      <span aria-current="page" className="truncate font-semibold">{drug.innMn}</span>
    </nav>
  );
}
