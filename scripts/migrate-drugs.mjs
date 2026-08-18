/**
 * MVP-ийн lib/drugs.ts → lib/data/drugs/<id>.ts руу нэг удаагийн хөрвүүлэлт.
 *
 * Энэ скрипт нэг л удаа ажиллана. Дараа нь lib/data/drugs/ нь эх сурвалж
 * болно — гараар засварлана, скриптийг дахин ажиллуулахгүй.
 */
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { DRUGS } = require(process.argv[2]);
const INN_MN = require(path.resolve("scripts/inn-mn.json"));
const OUT = path.resolve("lib/data/drugs");

const FREQ = {
  once: "od", bid: "bd", tid: "tds", qid: "qds",
  q4h: "q4h", q6h: "q6h", q8h: "q8h", q12h: "q12h",
  q4_6h: "q4_6h", q6_8h: "q6_8h", q8_12h: "q8_12h",
};

const camel = (id) => id.replace(/-(\w)/g, (_, c) => c.toUpperCase());
const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const unitOf = (label) => {
  if (label.includes("капсул")) return { unitMn: "капсул", divisible: false };
  if (label.includes("гранул")) return { unitMn: "гранул", divisible: false };
  return { unitMn: "таблет", divisible: true };
};

const toFormulation = (f, i) => {
  if (f.type === "syrup") {
    return {
      kind: "liquid", id: `${slug(f.displayLabel)}-${i}`,
      labelMn: f.displayLabel, mgPerMl: f.concentrationMgPerMl,
    };
  }
  const { unitMn, divisible } = unitOf(f.displayLabel);
  return {
    kind: "solid", id: `${slug(f.displayLabel)}-${i}`,
    labelMn: f.displayLabel, mgPerUnit: f.strengthMg, unitMn, divisible,
  };
};

const toBasis = (d) => {
  if (d.kind === "per_kg") {
    return { kind: "per_kg_per_dose",
      minMgPerKg: d.dosePerKgMinMg ?? d.dosePerKgMg,
      maxMgPerKg: d.dosePerKgMaxMg ?? d.dosePerKgMg };
  }
  if (d.kind === "daily_total") {
    return { kind: "per_kg_per_day",
      minMgPerKg: d.dailyDosePerKgMinMg ?? d.dailyDosePerKgMg,
      maxMgPerKg: d.dailyDosePerKgMaxMg ?? d.dailyDosePerKgMg };
  }
  return { kind: "weight_band", bands: d.brackets.map((b) => ({
    minWeightKg: b.minWeightKg,
    ...(Number.isFinite(b.maxWeightKg) ? { maxWeightKg: b.maxWeightKg } : {}),
    doseMg: b.dosePerAdministrationMg })) };
};

const toCaps = (d) => {
  const caps = [];
  if (d.maxDosePerAdministrationMg !== undefined) {
    caps.push({ kind: "absolute", scope: "per_dose", maxMg: d.maxDosePerAdministrationMg });
  }
  if (d.maxDailyDoseMg !== undefined) {
    caps.push({ kind: "absolute", scope: "per_day", maxMg: d.maxDailyDoseMg });
  }
  // Хуучин engine дэх if (drug.id === "domperidone") hack-ийг өгөгдөл болгов.
  if (d.id === "domperidone") {
    caps.push({ kind: "per_kg", scope: "per_day", maxMgPerKg: 0.75 });
  }
  return caps;
};

const toDrug = (d) => ({
  id: d.id,
  inn: d.name,
  innMn: INN_MN[d.name] ?? d.name,
  category: d.category,
  rules: [{
    id: `${d.id}-general`,
    indication: "general",
    route: d.route,
    ageMinMonths: d.minAgeMo,
    basis: toBasis(d),
    frequency: FREQ[d.frequency],
    ...(d.durationDays ? { duration: { minDays: d.durationDays, maxDays: d.durationDays } } : {}),
    caps: toCaps(d),
    sources: [],
    evidenceLevel: "D_unverified",
    isDefault: true,
  }],
  formulations: d.formulationOptions.filter((f) => f.type !== "none").map(toFormulation),
  warnings: d.warnings.map((messageMn) => ({ level: "warn", messageMn })),
  contraindicationsMn: [],
  ...(d.notes ? { notesMn: d.notes } : {}),
  sources: [],
  lastReviewed: "1970-01-01",
  status: "active",
});

const HEADER = (d) => `import type { Drug } from "../../domain/drug";

/**
 * ${d.inn} — ${d.innMn}
 *
 * ⚠️ ЭХ СУРВАЛЖ БАТАЛГААЖААГҮЙ (evidenceLevel: "D_unverified").
 * MVP-ийн lib/drugs.ts-ээс автоматаар хөрвүүлсэн. Тунгийн утга нь
 * анхны хувилбартай ЯГ ИЖИЛ — өөрчлөөгүй.
 *
 * Хийх ажил (docs/SOURCES.md, 5-р хэсэг):
 *   1. WHO AWaRe / 2024 заавраас тунг баталгаажуулах
 *   2. sources[] бөглөх, evidenceLevel шинэчлэх
 *   3. lastReviewed, reviewedBy бөглөх
 *   4. contraindicationsMn нэмэх (druginfo.mohs.mn)
 *   5. formulation бүрд availableInMn тэмдэглэх
 *   6. warnings[].level-ийг эргэн харах (бүгд "warn" гэж хөрвүүлсэн)
 */
`;

fs.mkdirSync(OUT, { recursive: true });
const names = [];
for (const legacy of DRUGS) {
  const drug = toDrug(legacy);
  const name = camel(drug.id);
  names.push({ name, id: drug.id, file: drug.id });
  const body = JSON.stringify(drug, null, 2)
    .replace(/^(\s*)"([A-Za-z_$][\w$]*)":/gm, "$1$2:");
  fs.writeFileSync(path.join(OUT, `${drug.id}.ts`),
    `${HEADER(drug)}\nexport const ${name}: Drug = ${body};\n`);
}

names.sort((a, b) => (a.name < b.name ? -1 : 1));
const imports = names.map((n) => `import { ${n.name} } from "./${n.file}";`).join("\n");
const list = names.map((n) => `  ${n.name},`).join("\n");
fs.writeFileSync(path.join(OUT, "index.ts"),
`import type { Drug } from "../../domain/drug";
${imports}

/** Бүх эмийн жагсаалт. Шинэ эм нэмэхэд энд импорт + мөр нэмнэ. */
export const DRUGS: readonly Drug[] = [
${list}
];

/** id-гаар хурдан хайх хүснэгт. */
export const DRUG_BY_ID: ReadonlyMap<string, Drug> = new Map(
  DRUGS.map((drug) => [drug.id, drug]),
);
`);
console.log(`Үүсгэсэн: ${names.length} эм + index.ts`);
