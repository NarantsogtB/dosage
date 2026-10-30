/**
 * `bun run evidence:report` → `docs/EVIDENCE-STATUS.md`.
 *
 * Өгөгдөлд гар хүрэхгүй — зөвхөн уншиж тайлан бичнэ. Эм баталгаажуулах
 * batch-ийн өмнө/дараа ажиллуулж тоог харьцуулна (roadmap шат 0b).
 */
import { writeFileSync } from "node:fs";
import { ALL_DRUGS } from "@/lib/data/drugs";
import { renderEvidenceReport } from "@/lib/validation/evidence-report";
import { KNOWN_GAPS } from "@/tests/data/known-gaps";

const OUT = "docs/EVIDENCE-STATUS.md";
const today = new Date().toISOString().slice(0, 10);

writeFileSync(OUT, renderEvidenceReport(ALL_DRUGS, KNOWN_GAPS.map((gap) => gap.ruleId), today));
console.log(`${OUT} бичигдлээ (${ALL_DRUGS.length} эм).`);
