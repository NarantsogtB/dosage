import { describe, expect, it } from "vitest";
import {
  MAX_ENTRIES,
  filterEntries,
  groupByDay,
  parseHistory,
  patientKeyOf,
  patientsOf,
  recordEntries,
  summaryOf,
  type HistoryEntry,
} from "@/lib/history/history";

const NOW = new Date(2026, 10, 9, 15, 0).getTime();
const HOUR = 3_600_000;
const DAY = 24 * HOUR;

const entry = (overrides: Partial<HistoryEntry> = {}): HistoryEntry => ({
  id: "x", at: NOW, label: "Ор 3", weightKg: 12.5, ageMonths: 8, drugId: "amoxicillin", ...overrides,
});

const baseOf = (item: HistoryEntry) => ({
  label: item.label, weightKg: item.weightKg, ageMonths: item.ageMonths, drugId: item.drugId,
});
const ids = (list: readonly HistoryEntry[]): readonly string[] => list.map((item) => item.id);
const labels = (groups: readonly { label: string }[]): readonly string[] => groups.map((group) => group.label);
const withWeights = (count: number) => Array.from({ length: count }, (_, i) => baseOf(entry({ weightKg: 10 + i })));

describe("parseHistory", () => {
  it("serialize → parse буцаад ижил", () => {
    const list = [entry()];
    expect(parseHistory(JSON.stringify(list), NOW)).toEqual(list);
  });

  it("эвдэрсэн, null, массив биш → хоосон", () => {
    expect(parseHistory(null, NOW)).toEqual([]);
    expect(parseHistory("{не json", NOW)).toEqual([]);
    expect(parseHistory(JSON.stringify({ a: 1 }), NOW)).toEqual([]);
  });

  it("буруу мөр, үл мэдэгдэх эм, 30 хоногоос хуучныг хаяна", () => {
    const raw = JSON.stringify([
      entry({ id: "ok" }),
      entry({ id: "bad-drug", drugId: "zzz" }),
      entry({ id: "old", at: NOW - 31 * DAY }),
      { id: "no-weight", at: NOW, drugId: "amoxicillin" },
      5,
    ]);
    expect(ids(parseHistory(raw, NOW))).toEqual(["ok"]);
  });
});

describe("recordEntries", () => {
  it("ижил хосыг давхардуулахгүй, цагийг шинэчилж эхэнд гаргана", () => {
    const first = recordEntries([], [baseOf(entry())], NOW - HOUR);
    const second = recordEntries(first, [baseOf(entry())], NOW);
    expect(second).toHaveLength(1);
    expect(second[0]?.at).toBe(NOW);
  });

  it("жин өөр бол шинэ мөр", () => {
    const first = recordEntries([], [baseOf(entry())], NOW - HOUR);
    expect(recordEntries(first, [baseOf(entry({ weightKg: 13 }))], NOW)).toHaveLength(2);
  });

  it(`${MAX_ENTRIES}-аас олныг хадгалахгүй`, () => {
    expect(recordEntries([], withWeights(MAX_ENTRIES + 5), NOW)).toHaveLength(MAX_ENTRIES);
  });
});

describe("groupByDay", () => {
  it("Өнөөдөр, Өчигдөр, өмнөх өдрийг сар/өдрөөр нэрлэнэ", () => {
    const list = [entry({ id: "a" }), entry({ id: "b", at: NOW - DAY }), entry({ id: "c", at: NOW - 5 * DAY })];
    expect(labels(groupByDay(list, NOW))).toEqual(["Өнөөдөр", "Өчигдөр", "11 сар 4"]);
  });

  it("нэг өдрийн мөрүүд нэг бүлэгт", () => {
    const groups = groupByDay([entry({ id: "a" }), entry({ id: "b", at: NOW - HOUR })], NOW);
    expect(groups).toHaveLength(1);
    expect(groups[0]?.entries).toHaveLength(2);
  });
});

describe("шүүлт", () => {
  const list = [entry({ id: "a" }), entry({ id: "b", label: "", weightKg: 20, ageMonths: 60, drugId: "paracetamol" })];

  it("өвчтөний түлхүүр: шошго, байхгүй бол жин · нас", () => {
    expect(patientKeyOf(list[0]!)).toBe("Ор 3");
    expect(patientKeyOf(list[1]!)).toBe("20 кг · 5 нас");
    expect(patientsOf(list)).toHaveLength(2);
  });

  it("мөрийн тайлбар: шошго · кг · нас", () => {
    expect(summaryOf(list[0]!)).toBe("Ор 3 · 12.5 кг · 8 сар");
    expect(summaryOf(list[1]!)).toBe("20 кг · 5 нас");
  });

  it("эмийн нэр (латин/кирилл), шошгоор хайна; өвчтөнөөр шүүнэ", () => {
    expect(ids(filterEntries(list, { query: "amox" }))).toEqual(["a"]);
    expect(ids(filterEntries(list, { query: "парацетамол" }))).toEqual(["b"]);
    expect(ids(filterEntries(list, { query: "ор 3" }))).toEqual(["a"]);
    expect(ids(filterEntries(list, { query: "", patientKey: "Ор 3" }))).toEqual(["a"]);
  });
});
