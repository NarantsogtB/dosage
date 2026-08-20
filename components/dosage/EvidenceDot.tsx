import type { Drug } from "@/lib/domain/drug";
import { EVIDENCE_LABELS } from "@/lib/domain/source";
import { drugEvidence } from "@/lib/engine/rule/drug-evidence";
import { cn } from "@/lib/utils";
import { EVIDENCE_LETTERS, EVIDENCE_TONES } from "./evidence-tone";

/**
 * Нотолгооны түвшний цэг + үсэг.
 *
 * Эмчид СОНГОХООС ӨМНӨ аль эм эх сурвалжтайг харуулна — карт нээж
 * байж мэдэх нь оройтсон. Figma-гийн "Evidence badge" дүрмээр цэг
 * ХЭЗЭЭ Ч дангаараа биш, үсэгтэйгээ хамт бичигдэнэ.
 */
export default function EvidenceDot({ drug }: { readonly drug: Drug }) {
  const level = drugEvidence(drug);
  return (
    <span
      role="img"
      aria-label={EVIDENCE_LABELS[level]}
      className="inline-flex shrink-0 items-center gap-1.5"
    >
      <span
        aria-hidden
        className={cn("size-2 rounded-full", EVIDENCE_TONES[level].dot)}
      />
      <span
        aria-hidden
        className="text-muted-foreground text-xs font-medium tracking-[0.04em]"
      >
        {EVIDENCE_LETTERS[level]}
      </span>
    </span>
  );
}
