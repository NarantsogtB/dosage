import Link from "next/link";
import type { Drug } from "@/lib/domain/drug";
import { DRUGS } from "@/lib/data/drugs";
import { drugPath } from "@/lib/drug-page/drug-page-meta";
import { ChevronDown } from "lucide-react";
import EvidenceDot from "@/components/dosage/EvidenceDot";

const byNameMn = (a: Drug, b: Drug): number => a.innMn.localeCompare(b.innMn, "mn");

const SORTED = [...DRUGS].sort(byNameMn);

/**
 * Бүх эмийн холбоос — `/dose`-ийн доор, серверээр render хийгдэнэ.
 *
 * Тооцоолуур нь client-ийн төлөвт суурилсан тул Google эм бүрийн
 * хуудсыг олох ЦОРЫН ГАНЦ мөлхөх зам нь энэ жагсаалт. Тооцоолуурын
 * UX-д нөлөөлөхгүйн тулд доод талд, footer-ийн өмнө байрлана.
 *
 * V3.1: А–Я жагсаалт хураагдсан — холбоосууд DOM-д үлдэнэ (мөлхөгч
 * уншина), харин эмчийн дэлгэцийг 51 мөрөөр дүүргэхгүй.
 */
export default function DrugIndex() {
  return (
    <details id="drug-index" className="group bg-card scroll-mt-20 rounded-xl border shadow-sm print:hidden">
      <summary className="hover:bg-accent/50 flex min-h-14 cursor-pointer list-none items-center gap-3 rounded-xl px-5 py-3">
        <h2 className="flex-1 text-base font-semibold">
          Бүх эм <span className="num text-muted-foreground">({SORTED.length})</span>{" "}
          <span className="text-muted-foreground text-sm font-normal">· А–Я</span>
        </h2>
        <ChevronDown aria-hidden className="text-muted-foreground size-5 transition-transform group-open:rotate-180" />
      </summary>
      <div className="border-t px-5 py-4">
        <ul className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm sm:grid-cols-3 lg:grid-cols-4">
          {SORTED.map((drug) => (
            <li key={drug.id} className="flex items-center gap-1.5">
              <EvidenceDot drug={drug} />
              <Link href={drugPath(drug)} className="hover:underline">
                {drug.innMn}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </details>
  );
}
