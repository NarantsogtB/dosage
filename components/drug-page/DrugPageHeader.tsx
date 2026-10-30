import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import type { Drug } from "@/lib/domain/drug";
import { drugEvidence } from "@/lib/engine/rule/drug-evidence";
import EvidenceChip from "@/components/dosage/EvidenceChip";

/**
 * Эмийн хуудасны гарчиг — Figma "Drug page header" (V3.1 · 03).
 *
 * Нэг мөр: буцах · нэр · нотолгоо. Өмнө нь 4 мөр эзэлж, жингийн талбар
 * mobile-ийн эхний дэлгэцээс доош унадаг байв. Эмч энэ хуудсанд тун
 * бодохоор ирсэн — нэр нь баталгаа, гол зүйл биш.
 */
export default function DrugPageHeader({ drug }: { readonly drug: Drug }) {
  return (
    <header className="space-y-1">
      <div className="flex items-center gap-2">
        <Link
          href="/dose#drug-index"
          aria-label="Бүх эм"
          className="text-muted-foreground hover:text-foreground hover:bg-accent -ml-2 flex size-9 shrink-0 items-center justify-center rounded-md"
        >
          <ChevronLeft aria-hidden className="size-5" />
        </Link>
        <h1 className="min-w-0 flex-1 truncate text-xl font-semibold tracking-tight sm:text-2xl">
          {drug.innMn}{" "}
          <span lang="en" className="text-muted-foreground font-normal">
            ({drug.inn})
          </span>
        </h1>
        <EvidenceChip level={drugEvidence(drug)} />
      </div>
      <p className="text-muted-foreground text-sm">
        Хүүхдийн жинд суурилсан тун — жин, насаа оруулбал доор тооцоологдоно.
      </p>
    </header>
  );
}
