import type { EvidenceLevel } from "@/lib/domain/source";
import { EVIDENCE_LABELS } from "@/lib/domain/source";
import { EVIDENCE_ORDER } from "@/lib/engine/rule/drug-evidence";
import { EVIDENCE_TONES } from "@/components/dosage/evidence-tone";
import { cn } from "@/lib/utils";

const NOTES: Record<EvidenceLevel, string> = {
  A_mn_approved: "Эрүүл мэндийн яамны тушаалаар батлагдсан заавар.",
  B_who: "Дэлхийн эрүүл мэндийн байгууллагын 2022–2025 оны заавар.",
  C_international:
    "Олон улсын хүүхдийн эмнэлгийн заавар — RCH Melbourne, Starship.",
  D_label_only: "Зөвхөн Монголд бүртгэгдсэн эмийн зааврын мэдээлэл.",
  E_unverified: "Эх сурвалж хараахан хавсраагүй. Тооцоолол харагдана",
};

/**
 * Нотолгооны шат.
 *
 * Энэ бол хуудасны цорын ганц бүтцийн хэрэглүүр бөгөөд ЖИНХЭНЭ утга
 * агуулна: A-аас E хүртэл эрэмбэ нь эх сурвалжийн хүч буурч байгааг
 * илэрхийлнэ. 01 / 02 / 03 гэсэн чимэглэлийн дугаарлалт биш.
 */
export default function EvidenceLadder() {
  return (
    <ol className="border-border/70 divide-border/70 divide-y border-y">
      {EVIDENCE_ORDER.map((level) => (
        <li key={level} className="flex gap-3.5 py-3.5">
          <span
            aria-hidden
            className={cn(
              "mt-1.5 h-2 w-8 shrink-0 rounded-full",
              EVIDENCE_TONES[level].dot,
            )}
          />
          <div>
            <p className="text-sm font-medium">{EVIDENCE_LABELS[level]}</p>
            <p className="text-muted-foreground mt-0.5 text-xs leading-relaxed">
              {NOTES[level]}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}
