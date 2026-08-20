import type { EvidenceLevel, SourceRef } from "@/lib/domain/source";
import { EVIDENCE_LABELS } from "@/lib/domain/source";
import { findSource } from "@/lib/data/sources/get-source";
import { EVIDENCE_TONES } from "@/components/dosage/evidence-tone";
import { cn } from "@/lib/utils";

interface Props {
  readonly sources: readonly SourceRef[];
  readonly level: EvidenceLevel;
}

const citationOf = (ref: SourceRef): string =>
  findSource(ref.sourceId)?.citation ?? ref.sourceId;

/**
 * Тооцооллын ард юу байгааг ил гаргана.
 *
 * Үгчилсэн ишлэл нь энэ бүтээгдэхүүнийг ердийн тооцоолуураас ялгах
 * гол зүйл: эмч тоог итгэх эсэхээ шийдэхийн тулд эх бичвэрийг нь
 * харах боломжтой.
 */
export default function DemoSource({ sources, level }: Props) {
  const first = sources[0];
  if (!first) return null;
  return (
    <div className="mt-3.5 border-t pt-3">
      <p className="flex items-center gap-1.5 text-xs font-medium">
        <span
          aria-hidden
          className={cn("size-2 rounded-full", EVIDENCE_TONES[level].dot)}
        />
        {EVIDENCE_LABELS[level]}
      </p>
      <p className="text-muted-foreground mt-1.5 text-xs leading-relaxed">
        {citationOf(first)}
      </p>
      <p className="text-muted-foreground border-primary/30 mt-2 border-l-2 pl-2.5 text-xs leading-relaxed">
        «{first.quotedValue ?? first.locator}»
      </p>
    </div>
  );
}
