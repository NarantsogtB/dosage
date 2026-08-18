import type { EvidenceLevel } from "@/lib/domain/source";
import { EVIDENCE_LABELS } from "@/lib/domain/source";
import { Badge } from "@/components/ui/badge";

type Variant = "success" | "soft" | "outline" | "secondary" | "warning";

const VARIANTS: Record<EvidenceLevel, Variant> = {
  A_mn_approved: "success",
  B_who: "soft",
  C_international: "outline",
  D_label_only: "secondary",
  E_unverified: "warning",
};

/**
 * Нотолгооны түвшинг эм тус бүрд харуулна.
 *
 * ⚠️ Энэ нь ЭХ СУРВАЛЖИЙН чанар — эмнэлзүйн хяналт БИШ.
 * Хяналтыг хажууд нь ReviewDate тусад нь харуулна.
 */
export default function EvidenceBadge({
  level,
}: {
  readonly level: EvidenceLevel;
}) {
  return <Badge variant={VARIANTS[level]}>{EVIDENCE_LABELS[level]}</Badge>;
}
