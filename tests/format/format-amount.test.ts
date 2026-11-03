import { describe, expect, it } from "vitest";
import type { FormulationAmount } from "@/lib/domain/calculation-result";
import { formatAmount } from "@/lib/format/format-amount";
import { primaryOf } from "@/lib/format/primary-formulation-line";

const tablet = (count: number, max = count): FormulationAmount => ({
  formulation: { kind: "solid", id: "20mg", labelMn: "20mg таблет", mgPerUnit: 20, unitMn: "таблет", divisible: true },
  min: count,
  max,
});

const liquid = (min: number, max = min): FormulationAmount => ({
  formulation: { kind: "liquid", id: "100u", labelMn: "100 ЕД/мл", mgPerMl: 100 },
  min,
  max,
});

const primaryId = (amounts: readonly FormulationAmount[]) => primaryOf(amounts)?.formulation.id;

describe("Хэмжих боломжгүй бага хэмжээ", () => {
  it("таблет: ¼-ээс бага бол «¼» гэж харуулахгүй", () => {
    expect(formatAmount(tablet(0.0375))).toBe("¼-ээс бага — тохиромжгүй");
    expect(formatAmount(tablet(0.05, 0.5))).toBe("<¼–½ таблет");
    expect(formatAmount(tablet(0.25))).toBe("¼ таблет");
  });

  it("шингэн: 0 мл болж тоймлогдсон бол «шингэлнэ»", () => {
    expect(formatAmount(liquid(0))).toBe("0.05 мл-ээс бага — шингэлнэ");
    expect(formatAmount(liquid(0, 0.1))).toBe("<0.05–0.1 мл");
    expect(formatAmount(liquid(0.05))).toBe("0.05 мл");
  });

  it("хэмжих боломжгүй хэлбэр анхдагч болохгүй", () => {
    expect(primaryId([liquid(0), tablet(0.5)])).toBe("20mg");
    expect(primaryId([tablet(0.05), liquid(0.2)])).toBe("100u");
    expect(primaryId([tablet(0.05)])).toBe("20mg");
  });
});
