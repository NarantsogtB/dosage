import Link from "next/link";
import type { Drug } from "@/lib/domain/drug";
import { drugEvidence } from "@/lib/engine/rule/drug-evidence";
import EvidenceBadge from "@/components/dosage/EvidenceBadge";

/** Эмийн хуудасны гарчиг: нэр, нотолгооны түвшин, буцах зам. */
export default function DrugPageHeader({ drug }: { readonly drug: Drug }) {
  return (
    <header className="space-y-2">
      <Link
        href="/dose#drug-index"
        className="text-muted-foreground hover:text-foreground text-xs"
      >
        ← Бүх эм
      </Link>
      <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
        {drug.innMn}{" "}
        <span lang="en" className="text-muted-foreground font-normal">
          ({drug.inn})
        </span>
      </h1>
      <p className="text-muted-foreground text-sm">
        Хүүхдийн жинд суурилсан тун — жин, насаа оруулбал доор тооцоологдоно.
      </p>
      <EvidenceBadge level={drugEvidence(drug)} />
    </header>
  );
}
