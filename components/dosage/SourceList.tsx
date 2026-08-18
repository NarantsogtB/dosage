import type { SourceRef } from "@/lib/domain/source";
import { findSource } from "@/lib/data/sources/get-source";

interface Props {
  readonly sources: readonly SourceRef[];
}

const citationOf = (ref: SourceRef): string =>
  findSource(ref.sourceId)?.citation ?? ref.sourceId;

/** Эх сурвалжийн эшлэлүүд. Хоосон бол харагдахгүй. */
export default function SourceList({ sources }: Props) {
  if (sources.length === 0) return null;
  return (
    <ul className="mt-2 w-full space-y-1">
      {sources.map((ref) => (
        <li
          key={`${ref.sourceId}-${ref.locator}`}
          className="text-muted-foreground text-xs leading-relaxed"
        >
          {citationOf(ref)} — {ref.locator}
        </li>
      ))}
    </ul>
  );
}
