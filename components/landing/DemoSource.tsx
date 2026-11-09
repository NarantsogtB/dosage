import { BookOpen } from "lucide-react";
import type { EvidenceLevel, SourceRef } from "@/lib/domain/source";
import { EVIDENCE_LABELS } from "@/lib/domain/source";
import { findSource } from "@/lib/data/sources/get-source";

interface Props {
  readonly sources: readonly SourceRef[];
  readonly level: EvidenceLevel;
}

const citationOf = (ref: SourceRef): string => findSource(ref.sourceId)?.citation ?? ref.sourceId;

/**
 * Тооцооллын ард юу байгааг ил гаргана — үгчилсэн ишлэл нь энэ бүтээгдэхүүнийг ердийн
 * тооцоолуураас ялгах гол зүйл. Figma: хуваагч · дүрс + түвшин · ишлэл (teal 3px шугам).
 */
export default function DemoSource({ sources, level }: Props) {
  const first = sources[0];
  if (!first) return null;
  return (
    <>
      <hr className="border-border dark:border-white/10" />
      <p className="text-muted-foreground flex items-center gap-1.5 text-xs/[15px] font-medium">
        <BookOpen aria-hidden className="size-3.5" />
        {EVIDENCE_LABELS[level]}
      </p>
      <p className="text-muted-foreground text-xs/[15px]">{citationOf(first)}</p>
      <p className="border-primary border-l-[3px] pl-2.5 text-[13px]/[17px]">«{first.quotedValue ?? first.locator}»</p>
    </>
  );
}
