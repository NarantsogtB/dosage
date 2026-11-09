import { describe, expect, it } from "vitest";
import { EMPTY_FORM } from "@/components/calculator/patient-form";
import {
  MAX_PATIENTS,
  NO_PATIENTS,
  activeOf,
  addPatient,
  changeActive,
  newPatient,
  parsePatients,
  removePatient,
  setActive,
  type PatientsState,
} from "@/components/calculator/patients";

const form = (weight: string) => ({ ...EMPTY_FORM, weight });

const withPatients = (...ids: string[]): PatientsState =>
  ids.reduce<PatientsState>((state, id) => addPatient(state, newPatient(id)) ?? state, NO_PATIENTS);

describe("parsePatients", () => {
  it("serialize → parse буцаад ижил", () => {
    const state = changeActive(withPatients("a", "b"), { label: "Ор 3", drugIds: ["amoxicillin"] }, "x");
    expect(parsePatients(JSON.stringify(state), null)).toEqual(state);
  });

  it("эвдэрсэн JSON → хоосон", () => {
    expect(parsePatients("{не json", null)).toEqual(NO_PATIENTS);
  });

  it("хуучин нэг өвчтөний хэлбэрийг шилжүүлнэ", () => {
    const v1 = JSON.stringify({ weight: "12.5", weightUnit: "kg", years: "", months: "8" });
    const state = parsePatients(null, v1);
    expect(state.patients).toHaveLength(1);
    expect(activeOf(state)?.form.weight).toBe("12.5");
    expect(activeOf(state)?.drugIds).toEqual([]);
  });

  it("хоосон v1 → өвчтөнгүй", () => {
    expect(parsePatients(null, JSON.stringify(EMPTY_FORM))).toEqual(NO_PATIENTS);
  });

  it("буруу мөр, байхгүй activeId-г засна, шошгыг тайрна", () => {
    const raw = JSON.stringify({
      patients: [{ id: 5 }, { id: "a", label: `  ${"x".repeat(40)} `, form: { weightUnit: "lb" }, drugIds: ["p", 1] }],
      activeId: "zzz",
    });
    const state = parsePatients(raw, null);
    expect(state.activeId).toBe("a");
    expect(state.patients).toEqual([{ id: "a", label: "x".repeat(24), form: EMPTY_FORM, drugIds: ["p"] }]);
  });
});

describe("өвчтөн нэмэх, устгах", () => {
  it(`${MAX_PATIENTS}-аас олныг нэмэхгүй`, () => {
    const full = withPatients("1", "2", "3", "4", "5", "6");
    expect(full.patients).toHaveLength(MAX_PATIENTS);
    expect(addPatient(full, newPatient("7"))).toBeNull();
  });

  it("нэмсэн нь идэвхтэй болно", () => {
    expect(withPatients("a", "b").activeId).toBe("b");
  });

  it("идэвхтэйг устгахад хөрш нь идэвхтэй болно", () => {
    const state = setActive(withPatients("a", "b", "c"), "b");
    expect(removePatient(state, "b").activeId).toBe("c");
    expect(removePatient(setActive(state, "c"), "c").activeId).toBe("b");
    expect(removePatient(withPatients("a"), "a")).toEqual(NO_PATIENTS);
  });

  it("өвчтөнгүй үед changeActive шинээр үүсгэнэ", () => {
    const state = changeActive(NO_PATIENTS, { form: form("10") }, "new");
    expect(state.activeId).toBe("new");
    expect(activeOf(state)?.form.weight).toBe("10");
  });
});
