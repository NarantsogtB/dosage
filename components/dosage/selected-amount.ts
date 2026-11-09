import type { DosageOutcome, FormulationAmount } from "@/lib/domain/calculation-result";
import { primaryOf } from "@/lib/format/primary-formulation-line";
import { amountKey } from "@/lib/format/reconstitution";

/**
 * Сонгосон хэлбэр. Заалт солигдоход өмнөх сонголт шинэ жагсаалтад байхгүй бол
 * анхдагч (эхний шингэн) руу буцна. Үр дүнгийн карт, түүх хоёул нэг дүрэм.
 */
export const selectedAmount = (outcome: DosageOutcome, id?: string): FormulationAmount | undefined =>
  outcome.amounts.find((amount) => amountKey(amount) === id) ?? primaryOf(outcome.amounts);
