import type { DosageOutcome } from "@/lib/domain/calculation-result";
import type { Drug } from "@/lib/domain/drug";
import { CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import EvidenceBadge from "./EvidenceBadge";
import ReviewDate from "./ReviewDate";
import SourceList from "./SourceList";

interface Props {
  readonly drug: Drug;
  readonly outcome: DosageOutcome;
}

/**
 * Эх сурвалж ба нотолгооны түвшин.
 *
 * Badge нь ҮРГЭЛЖ идэвхтэй дүрмийн түвшинг харуулна — дээр харагдаж
 * буй тоо яг тэр дүрмээс гарсан. Эх сурвалжийн мөр ҮРГЭЛЖ харагдана —
 * дэлгэгдэх мөрөнд нуухгүй.
 */
export default function SourceFooter({ drug, outcome }: Props) {
  return (
    <>
      <Separator />
      <CardFooter className="flex-wrap gap-2 py-3.5">
        <div className="flex w-full flex-wrap items-center justify-between gap-2">
          <EvidenceBadge level={outcome.rule.evidenceLevel} />
          <span className="text-xs">
            <ReviewDate date={drug.lastReviewed} />
          </span>
        </div>
        <SourceList sources={outcome.sources} />
      </CardFooter>
    </>
  );
}
