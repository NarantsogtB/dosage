import type { Drug } from "@/lib/domain/drug";
import type { EvidenceLevel } from "@/lib/domain/source";
import { EVIDENCE_LABELS } from "@/lib/domain/source";
import { drugEvidence } from "@/lib/engine/rule/drug-evidence";
import { cn } from "@/lib/utils";

const TONES: Record<EvidenceLevel, string> = {
  A_mn_approved: "bg-emerald-500",
  B_who: "bg-primary",
  C_international: "bg-sky-400",
  D_label_only: "bg-slate-400",
  E_unverified: "bg-warning/50",
};

/**
 * Нотолгооны түвшний жижиг цэг.
 *
 * Эмчид СОНГОХООС ӨМНӨ аль эм эх сурвалжтайг харуулна — карт нээж
 * байж мэдэх нь оройтсон.
 */
export default function EvidenceDot({ drug }: { readonly drug: Drug }) {
  const level = drugEvidence(drug);
  return (
    <span
      title={EVIDENCE_LABELS[level]}
      aria-label={EVIDENCE_LABELS[level]}
      className={cn("size-2 shrink-0 rounded-full", TONES[level])}
    />
  );
}
