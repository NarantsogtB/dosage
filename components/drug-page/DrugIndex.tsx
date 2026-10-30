import Link from "next/link";
import type { Drug } from "@/lib/domain/drug";
import { DRUGS } from "@/lib/data/drugs";
import { drugPath } from "@/lib/drug-page/drug-page-meta";
import { Card, CardContent } from "@/components/ui/card";
import EvidenceDot from "@/components/dosage/EvidenceDot";

const byNameMn = (a: Drug, b: Drug): number => a.innMn.localeCompare(b.innMn, "mn");

const SORTED = [...DRUGS].sort(byNameMn);

/**
 * Бүх эмийн холбоос — `/dose`-ийн доор, серверээр render хийгдэнэ.
 *
 * Тооцоолуур нь client-ийн төлөвт суурилсан тул Google эм бүрийн
 * хуудсыг олох ЦОРЫН ГАНЦ мөлхөх зам нь энэ жагсаалт. Тооцоолуурын
 * UX-д нөлөөлөхгүйн тулд доод талд, footer-ийн өмнө байрлана.
 */
export default function DrugIndex() {
  return (
    <Card id="drug-index" className="scroll-mt-20 print:hidden">
      <CardContent className="space-y-3">
        <h2 className="text-base font-semibold">
          Бүх эм <span className="num text-muted-foreground">({SORTED.length})</span>
        </h2>
        <ul className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm sm:grid-cols-3">
          {SORTED.map((drug) => (
            <li key={drug.id} className="flex items-center gap-1.5">
              <EvidenceDot drug={drug} />
              <Link href={drugPath(drug)} className="hover:underline">
                {drug.innMn}
              </Link>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
