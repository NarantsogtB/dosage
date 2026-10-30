import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

/**
 * Кодын хэмжээ, салаалалтын хязгаар.
 * Зорилго: функц бүр НЭГ үүрэгтэй байхыг механикаар албадах.
 * Хязгаар давбал функцээ салга — дүрмийг сулруулж болохгүй.
 */
const COMPLEXITY_RULES = {
  complexity: ["error", { max: 3 }],
  "max-depth": ["error", 3],
  "max-lines": [
    "error",
    { max: 160, skipBlankLines: true, skipComments: true },
  ],
  "max-lines-per-function": [
    "error",
    { max: 40, skipBlankLines: true, skipComments: true },
  ],
  "max-nested-callbacks": ["error", 2],
  "max-params": ["error", 4],
};

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,

  {
    name: "dosage/complexity",
    files: ["**/*.{ts,tsx,mts}"],
    rules: COMPLEXITY_RULES,
  },

  {
    // Өгөгдөл нь кодын нарийн төвөгтэй байдал биш — урт байж болно.
    name: "dosage/data-files",
    files: ["lib/data/**/*.ts"],
    rules: { "max-lines": "off" },
  },

  {
    // shadcn/ui-ийн эх код. Бидний бичсэн код биш тул хэмжээний дүрэм
    // үйлчлэхгүй. `bunx shadcn add …` дахин бичихэд зөрчил гарахгүй.
    name: "dosage/shadcn-ui",
    files: ["components/ui/**/*.tsx"],
    rules: {
      "max-lines": "off",
      "max-lines-per-function": "off",
      complexity: "off",
    },
  },

  {
    // TODO: шилжүүлэлт дуусахад энэ блокийг устгана. docs/ARCHITECTURE.md үз.
    name: "dosage/legacy",
    files: [
      "lib/drugs.ts",
      "lib/calculations.ts",
      "components/PrintTemplate.tsx",
      "components/CalculatorPage.tsx",
    ],
    rules: {
      "max-lines": "off",
      "max-lines-per-function": "off",
      complexity: "off",
    },
  },

  globalIgnores([".next/**", ".wrangler/**", "out/**", "build/**", "next-env.d.ts"]),
]);

export default eslintConfig;
