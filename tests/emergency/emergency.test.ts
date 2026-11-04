import { describe, expect, it } from "vitest";
import type { DosingRule } from "@/lib/domain/dosing-rule";
import type { Formulation } from "@/lib/domain/formulation";
import type { EmergencyItem } from "@/lib/calculators/emergency/items";
import { EMERGENCY_DRUGS, EMERGENCY_SHOWN_ITEMS } from "@/lib/emergency";
import { emergencyDrugs } from "@/lib/emergency/emergency-drugs";
import { emergencyDrugRows, emergencyItemRows } from "@/lib/emergency/emergency-rows";
import { shownItems } from "@/lib/emergency/shown-items";
import { matchesRoute } from "@/lib/engine/formulation/route-match";
import { makeDrug, makeRule } from "../fixtures/make-drug";

const patient = { weightKg: 16, ageMonths: 48 };
const isUnverified = (rule: DosingRule) => rule.evidenceLevel === "E_unverified";
const rulesOf = (drug: { rules: readonly DosingRule[] }) => drug.rules;
const keyOf = (row: { key: string }) => row.key;
const idOf = (drug: { id: string }) => drug.id;

/** Fixture — бодит тун БИШ. */
const AMPOULE: Formulation = { kind: "liquid", id: "amp", labelMn: "0.1 мг/мл", mgPerMl: 0.1, routes: ["iv", "io"] };
const verified = makeRule({
  id: "v",
  route: "iv_io",
  doseUnit: "mcg",
  basis: { kind: "per_kg_per_dose", minMgPerKg: 10, maxMgPerKg: 10 },
});
const unverified = makeRule({ id: "e", evidenceLevel: "E_unverified", sources: [], indication: { code: "x", labelMn: "X" } });

describe("/emergency — зөвхөн эх сурвалжтай (Шат 7)", () => {
  it("E дүрмийг хасна, зөвхөн E-тэй эм болон emergency биш эм орохгүй", () => {
    const drugs = emergencyDrugs([
      makeDrug([verified, unverified], { id: "a", category: "emergency", formulations: [AMPOULE] }),
      makeDrug([unverified], { id: "b", category: "emergency" }),
      makeDrug([verified], { id: "c", category: "antibiotic" }),
    ]);
    expect(drugs.map(idOf)).toEqual(["a"]);
    expect(drugs.flatMap(rulesOf).filter(isUnverified)).toEqual([]);
  });

  it("бодит EMERGENCY_DRUGS-д E дүрэм байхгүй (инвариант)", () => {
    expect(EMERGENCY_DRUGS.flatMap(rulesOf).filter(isUnverified)).toEqual([]);
  });

  it("мкг/кг × жин, 0.1 мг/мл ампулаар мл; IV/IO зам", () => {
    const drug = makeDrug([verified], { id: "a", category: "emergency", formulations: [AMPOULE] });
    const [row] = emergencyDrugRows([drug], patient);
    expect(row.outcome.perDose).toEqual({ minMg: 160, maxMg: 160 });
    expect(row.outcome.doseUnit).toBe("mcg");
    expect(row.amount?.max).toBeCloseTo(1.6, 2);
    expect(matchesRoute(AMPOULE, "iv_io")).toBe(true);
    expect(matchesRoute(AMPOULE, "oral")).toBe(false);
  });

  it("заалт бүрд мөр (зүрх зогсолт, анафилакси маягийн)", () => {
    const arrest = makeRule({ ...verified, id: "arrest", indication: { code: "asthma", labelMn: "A" }, isDefault: false });
    const drug = makeDrug([verified, arrest], { id: "a", category: "emergency", formulations: [AMPOULE] });
    expect(emergencyDrugRows([drug], patient).map(keyOf)).toEqual(["a:general", "a:asthma"]);
  });
});

const item = (sources: EmergencyItem["sources"], value = 64): EmergencyItem => ({
  id: "defib",
  labelMn: "Дефибрилляци",
  compute: (p) => (value > 0 ? { value: value, unitMn: "J", expressionMn: `4 J/кг × ${p.weightKg} кг` } : null),
  sources,
});

const TWO_SOURCES: EmergencyItem["sources"] = [
  { sourceId: "msf-clinical-guidelines", locator: "fixture", quotedValue: "fixture" },
  { sourceId: "who-pocketbook-2", locator: "fixture", quotedValue: "fixture" },
];

describe("/emergency — эм бус мөр (Шат 7)", () => {
  it("эх сурвалжгүй/дутуу item харагдахгүй, бүрэн нь харагдана", () => {
    expect(shownItems([item([])])).toEqual([]);
    expect(shownItems([item(TWO_SOURCES.slice(0, 1))])).toEqual([]);
    expect(shownItems([item(TWO_SOURCES)])).toHaveLength(1);
  });

  it("тооцоолох боломжгүй (null) item-ийг алгасна", () => {
    expect(emergencyItemRows([item(TWO_SOURCES, 0)], patient)).toEqual([]);
    expect(emergencyItemRows([item(TWO_SOURCES)], patient)[0].value.value).toBe(64);
  });

  it("одоогоор бодит item байхгүй — эмчийн баталгаа хүлээж байна (7b)", () => {
    expect(EMERGENCY_SHOWN_ITEMS).toEqual([]);
  });
});
