import type { Drug } from "@/lib/domain/drug";
import { EVIDENCE_LABELS } from "@/lib/domain/source";
import { drugEvidence } from "@/lib/engine/rule/drug-evidence";
import { EVIDENCE_LETTERS, EVIDENCE_TONES } from "@/components/dosage/evidence-tone";
import { cn } from "@/lib/utils";

/** Нотолгооны chip (Figma «V4/Evidence chip» 120:3): цэг 7 + үсэг 12, pill p 3/8. */
export default function EvidenceChip({ drug }: { readonly drug: Drug }) {
  const level = drugEvidence(drug);
  return (
    <span role="img" aria-label={EVIDENCE_LABELS[level]} className="bg-muted inline-flex h-[21px] shrink-0 items-center gap-[5px] rounded-full px-2">
      <span aria-hidden className={cn("size-[7px] rounded-full", EVIDENCE_TONES[level].dot)} />
      <span aria-hidden className="text-xs/[15px] font-semibold">{EVIDENCE_LETTERS[level]}</span>
    </span>
  );
}
