import type { DosageOutcome } from "@/lib/domain/calculation-result";
import { CardContent } from "@/components/ui/card";
import CapAlert from "./CapAlert";
import DoseBand from "./DoseBand";
import MaxDoseIndicator from "./MaxDoseIndicator";

/**
 * Тунгийн хэсэг: зурвас + анхааруулга.
 *
 * Бодитоор тасалсан бол CapAlert (хатуу анхааруулга), эс бөгөөс
 * идэвхтэй хязгаар байвал MaxDoseIndicator (хувиар мэдээлэх) харагдана —
 * хоёуланг зэрэг харуулбал 100%-ийг давхардуулна.
 */
const doseAlertOf = (outcome: DosageOutcome) => {
  if (outcome.cappedAtMax) return <CapAlert outcome={outcome} />;
  if (Number.isFinite(outcome.limitMg)) return <MaxDoseIndicator outcome={outcome} />;
  return null;
};

export default function DoseSummary({
  outcome,
}: {
  readonly outcome: DosageOutcome;
}) {
  const alert = doseAlertOf(outcome);
  return (
    <CardContent className="space-y-3 p-0 pb-1">
      <DoseBand outcome={outcome} />
      {alert ? <div className="px-5">{alert}</div> : null}
    </CardContent>
  );
}
