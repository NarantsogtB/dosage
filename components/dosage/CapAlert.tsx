import { TriangleAlert } from "lucide-react";
import type { DosageOutcome } from "@/lib/domain/calculation-result";
import { dailyLimitMg } from "@/lib/format/max-dose-percent";
import { roundDose } from "@/lib/engine/math/round-dose";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

/**
 * Дээд хязгаарт хүрсэн үед л харагдана.
 *
 * Өмнө нь тоог `trace`-ийн "Дээд хязгаар" алхмаас (`capStep.resultMg`)
 * шууд авдаг байсан — гэвч энэ утга ХЭЗЭЭ Ч НЭГ УДААГИЙН тунгийн нэгжтэй
 * (`to-per-dose-limit.ts`), эх хязгаар "per_day" scope-той байсан ч мөн
 * адил. Картын доод хэсэгт "Өдрийн нийт" аль хэдийн ХОНОГИЙН нэгжээр
 * харуулагдаж байхад "мг/хоногийн хязгаарт" гэж нэг удаагийн тоог бичих
 * нь эмчийг андуурна. `dailyLimitMg`-ээр хоногийн нэгжид жигдрүүлсэн —
 * шинэ клиникийн тоо ГАРГААГҮЙ, зөвхөн нэгжийг зөв харьцуулав.
 */
export default function CapAlert({
  outcome,
}: {
  readonly outcome: DosageOutcome;
}) {
  if (!outcome.cappedAtMax) return null;

  return (
    <Alert variant="warning">
      <TriangleAlert />
      <AlertTitle>Хоногийн дээд хязгаарт хязгаарлагдсан</AlertTitle>
      <AlertDescription>
        Тооцоолсон тун өдөрт {roundDose(dailyLimitMg(outcome))} мг хязгаарт
        таслагдсан. Доорх “Яаж бодсон бэ?” хэсгээс дэлгэрэнгүйг үзнэ үү.
      </AlertDescription>
    </Alert>
  );
}
