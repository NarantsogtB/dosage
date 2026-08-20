import { describe, expect, it } from "vitest";
import { primaryFormulationLine } from "@/lib/format/primary-formulation-line";
import type { FormulationAmount } from "@/lib/domain/calculation-result";

const liquid: FormulationAmount = {
  formulation: { kind: "liquid", id: "250-5", labelMn: "250mg/5ml", mgPerMl: 50 },
  min: 7.5,
  max: 7.5,
};

const solid: FormulationAmount = {
  formulation: {
    kind: "solid",
    id: "tab",
    labelMn: "шахмал",
    mgPerUnit: 500,
    unitMn: "шахмал",
    divisible: true,
  },
  min: 1,
  max: 1,
};

describe("primaryFormulationLine", () => {
  it("шингэнийг эхэнд тавьж, концентрацийг mgPerMl-ээс тооцоолно", () => {
    expect(primaryFormulationLine([solid, liquid])).toBe(
      "= 7.5 мл · 250 мг / 5 мл",
    );
  });

  it("шингэн байхгүй бол эхний хэлбэрийг л буцаана", () => {
    expect(primaryFormulationLine([solid])).toBe("= 1 шахмал");
  });

  it("хоосон жагсаалтад undefined", () => {
    expect(primaryFormulationLine([])).toBeUndefined();
  });
});
