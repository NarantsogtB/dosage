import { TriangleAlert } from "lucide-react";
import type { DosageOutcome } from "@/lib/domain/calculation-result";
import { dailyLimitMg, maxDosePercent } from "@/lib/format/max-dose-percent";
import { roundDose } from "@/lib/engine/math/round-dose";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

/**
 * Хоногийн тунг дээд хязгаартай харьцуулсан мэдээллийн зурвас.
 *
 * ЗӨВХӨН бодитоор ТАСАЛГААГҮЙ үед харагдана — тасалсан бол CapAlert аль
 * хэдийн 100%-ийг илэрхийлнэ, хоёуланг зэрэг харуулбал давхардана. Хувийг
 * engine-ийн аль хэдийн тооцоолсон `perDose`/`limitMg`-ээс гаргасан бөгөөд
 * шинэ клиникийн тоо ГАРГААГҮЙ.
 */
export default function MaxDoseIndicator({
  outcome,
}: {
  readonly outcome: DosageOutcome;
}) {
  if (outcome.cappedAtMax) return null;
  const percent = maxDosePercent(outcome);
  if (percent === undefined) return null;

  return (
    <Alert variant="warning">
      <TriangleAlert />
      <AlertTitle>Өдрийн дээд тунгийн {percent}%</AlertTitle>
      <AlertDescription>
        {roundDose(outcome.perDay.maxMg)} мг/хоног. Дээд хязгаар{" "}
        {roundDose(dailyLimitMg(outcome))} мг/хоног.
      </AlertDescription>
    </Alert>
  );
}
