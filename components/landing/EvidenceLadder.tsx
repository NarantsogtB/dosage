import type { EvidenceLevel } from "@/lib/domain/source";
import { EVIDENCE_LABELS } from "@/lib/domain/source";
import { EVIDENCE_ORDER } from "@/lib/engine/rule/drug-evidence";
import { EVIDENCE_LETTERS, EVIDENCE_TONES } from "@/components/dosage/evidence-tone";
import { cn } from "@/lib/utils";

const NOTES: Record<EvidenceLevel, string> = {
  A_mn_approved: "Эрүүл мэндийн яамны тушаалаар батлагдсан заавар.",
  B_who: "Дэлхийн эрүүл мэндийн байгууллагын 2022–2025 оны заавар.",
  C_international: "Олон улсын хүүхдийн эмнэлгийн заавар — RCH Melbourne, Starship.",
  D_label_only: "Зөвхөн Монголд бүртгэгдсэн эмийн зааврын мэдээлэл.",
  E_unverified: "Эх сурвалж хараахан хавсраагүй. Тооцоолол харагдана.",
};

/**
 * Нотолгооны шат — A-аас E хүртэл эх сурвалжийн хүч буурна (чимэглэлийн дугаар биш).
 * Figma: нэг карт, мөр py 14 g 12 — chip (цэг + үсэг) · гарчиг 15 SemiBold · тайлбар 13.
 */
export default function EvidenceLadder() {
  return (
    <ol className="bg-card rounded-3xl px-4">
      {EVIDENCE_ORDER.map((level) => (
        <li key={level} className="flex items-start gap-3 border-b py-3.5 last:border-b-0">
          <span aria-hidden className="bg-muted inline-flex h-[21px] shrink-0 items-center gap-[5px] rounded-full px-2">
            <span className={cn("size-[7px] rounded-full", EVIDENCE_TONES[level].dot)} />
            <span className="text-xs/[15px] font-semibold">{EVIDENCE_LETTERS[level]}</span>
          </span>
          <div className="flex min-w-0 flex-col gap-0.5">
            <p className="text-[15px]/[19px] font-semibold">{EVIDENCE_LABELS[level]}</p>
            <p className="text-muted-foreground text-[13px]/[17px]">{NOTES[level]}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
