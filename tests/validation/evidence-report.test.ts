import { describe, expect, it } from "vitest";
import { DRUGS } from "@/lib/data/drugs";
import { DRUG_COUNT, VERIFIED_COUNT } from "@/components/landing/landing-stats";
import { levelCounts, renderEvidenceReport, ruleRows, type RuleRow } from "@/lib/validation/evidence-report";
import { makeDrug, makeRule } from "../fixtures/make-drug";

const DRUG_A = makeDrug(
  [makeRule({ id: "a-b", evidenceLevel: "B_who" }), makeRule({ id: "a-e", evidenceLevel: "E_unverified" })],
  { id: "a", inn: "Alpha" },
);
const DRUG_B = makeDrug([makeRule({ id: "b-c", evidenceLevel: "C_international" })], { id: "b", inn: "Beta" });

const ruleIdOf = (row: RuleRow): string => row.ruleId;

describe("evidence report", () => {
  it("дүрэм бүрийн түвшинг тоолно, 0-тэй түвшин ч үлдэнэ", () => {
    expect(levelCounts([DRUG_A, DRUG_B])).toEqual({
      A_mn_approved: 0,
      B_who: 1,
      C_international: 1,
      D_label_only: 0,
      E_unverified: 1,
    });
  });

  it("сул нотолгоо эхэнд, known-gap тэмдэглэгдэнэ", () => {
    const rows = ruleRows([DRUG_A, DRUG_B], ["b-c"]);
    expect(rows.map(ruleIdOf)).toEqual(["a-e", "b-c", "a-b"]);
    expect(rows[1].knownGap).toBe(true);
  });

  it("огноо ижил бол үр дүн тогтвортой", () => {
    expect(renderEvidenceReport(DRUGS, [], "2026-10-30")).toBe(renderEvidenceReport(DRUGS, [], "2026-10-30"));
  });

  it("бодит өгөгдлийн тоо танилцуулга хуудастай таарна", () => {
    const report = renderEvidenceReport(DRUGS, [], "2026-10-30");
    expect(report).toContain(`Эм: **${DRUG_COUNT}**, баталгаажсан (ядаж нэг дүрэм A–D): **${VERIFIED_COUNT}**`);
  });
});
