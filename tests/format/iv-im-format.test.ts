import { describe, expect, it } from "vitest";
import type { FormulationAmount } from "@/lib/domain/calculation-result";
import type { PowderFormulation } from "@/lib/domain/formulation";
import { formatAmount } from "@/lib/format/format-amount";
import { concentrationOf } from "@/lib/format/primary-formulation-line";
import { amountKey, formulationIdOfKey, reconstitutionText } from "@/lib/format/reconstitution";

const vial: PowderFormulation = {
  kind: "powder",
  id: "vial-1g",
  labelMn: "1 г шил",
  mgPerVial: 1000,
  reconstitutions: [{ route: "im", diluentMn: "1% лидокаин", diluentMl: 3.5, finalMgPerMl: 250 }],
};
const amount: FormulationAmount = { formulation: vial, reconstitution: vial.reconstitutions[0], vials: 1, min: 3.2, max: 3.2 };

describe("Нунтагийн бичиглэл (Шат 6)", () => {
  it("«3.2 мл · 1 шил», концентрац, найруулга", () => {
    expect(formatAmount(amount)).toBe("3.2 мл · 1 шил");
    expect(concentrationOf(amount)).toBe("250 мг/мл");
    expect(reconstitutionText(amount)).toBe("1000 мг шил + 3.5 мл 1% лидокаин → 250 мг/мл (Булчинд (IM))");
  });

  it("сонголтын түлхүүр: id@зам ↔ id", () => {
    expect(amountKey(amount)).toBe("vial-1g@im");
    expect(formulationIdOfKey("vial-1g@im")).toBe("vial-1g");
  });
});
