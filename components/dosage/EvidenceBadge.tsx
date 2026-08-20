import type { EvidenceLevel } from "@/lib/domain/source";
import { EVIDENCE_LABELS } from "@/lib/domain/source";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { EVIDENCE_TONES } from "./evidence-tone";

/**
 * Нотолгооны түвшинг эм тус бүрд харуулна.
 *
 * ⚠️ Энэ нь ЭХ СУРВАЛЖИЙН чанар — эмнэлзүйн хяналт БИШ.
 * Хяналтыг хажууд нь ReviewDate тусад нь харуулна.
 *
 * Өмнө нь түвшин бүр өөр өнгийн дүүрэн Badge авдаг байсан. Тэгэхээр
 * дөрвөн ХЭВИЙН түвшин баталгаажаагүйтэй адил чангаар хашгирдаг байв.
 * Одоо зөвхөн «баталгаажаагүй» нь тасалдуулна — бусад нь цэг + текст,
 * жагсаалт дээрх EvidenceDot-той яг ижил хэлээр.
 */
export default function EvidenceBadge({
  level,
}: {
  readonly level: EvidenceLevel;
}) {
  if (level === "E_unverified") {
    return <Badge variant="warning">{EVIDENCE_LABELS[level]}</Badge>;
  }
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-medium">
      <span
        aria-hidden
        className={cn("size-2 rounded-full", EVIDENCE_TONES[level].dot)}
      />
      {EVIDENCE_LABELS[level]}
    </span>
  );
}
