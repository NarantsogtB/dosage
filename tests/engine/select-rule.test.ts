import { describe, expect, it } from "vitest";
import type { DosingRule } from "@/lib/domain/dosing-rule";
import { selectRule } from "@/lib/engine/rule/select-rule";
import { makeDrug, makeRule } from "../fixtures/make-drug";

const patient = { weightKg: 12, ageMonths: 24 };

const general: DosingRule = makeRule({ id: "general", isDefault: true });
const otitis: DosingRule = makeRule({
  id: "otitis",
  indication: { code: "aom", labelMn: "Дунд чихний үрэвсэл" },
});

const pick = (rules: readonly DosingRule[], code?: string) =>
  selectRule(makeDrug(rules), patient, code)?.id;

describe("selectRule", () => {
  it("заалт заагаагүй бол isDefault дүрмийг сонгоно", () => {
    expect(pick([general, otitis])).toBe("general");
  });

  it("заалт заасан бол яг тохирсон дүрэм давамгайлна", () => {
    expect(pick([general, otitis], "aom")).toBe("otitis");
  });

  it("тохирох заалт байхгүй бол ерөнхий дүрэм рүү шилжинэ", () => {
    expect(pick([general, otitis], "uti")).toBe("general");
  });

  it("ерөнхий дүрэмгүй эм заалт заалгүй ч үр дүн өгнө", () => {
    expect(pick([otitis])).toBe("otitis");
  });

  it("нас тохирохгүй бол дүрэм олдохгүй", () => {
    const infantOnly = makeRule({ id: "infant", ageMaxMonths: 6 });
    expect(pick([infantOnly])).toBeUndefined();
  });
});
