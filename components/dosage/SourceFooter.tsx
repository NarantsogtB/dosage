import type { DosageOutcome } from "@/lib/domain/calculation-result";
import { CardFooter } from "@/components/ui/card";
import SourceList from "./SourceList";

/**
 * Эх сурвалжийн эшлэлүүд — ҮРГЭЛЖ харагдана, дэлгэгдэх мөрөнд нуухгүй.
 * Нотолгооны түвшин, хяналтын огноо нь шилэн толгойд (`DoseBand`).
 */
export default function SourceFooter({ outcome }: { readonly outcome: DosageOutcome }) {
  return (
    <CardFooter className="px-4 pt-1 pb-4">
      <SourceList sources={outcome.sources} />
    </CardFooter>
  );
}
