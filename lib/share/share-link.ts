import type { Drug } from "../domain/drug";
import {
  MAX_AGE_MONTHS,
  MAX_WEIGHT_KG,
  MIN_WEIGHT_KG,
} from "../engine/eligibility/limits";

/**
 * Тооцооллыг линкээр хуваалцах (Шат 5).
 *
 * Формат нь URL-ийн FRAGMENT (`#`-ийн ард): `w=14&m=36&d=amoxicillin:pneumonia:susp,paracetamol`.
 * Fragment хөтчөөс сервер рүү ОГТ явдаггүй — өвчтөний жин, нас сервер,
 * CDN-ийн log-д үлдэхгүй (root CLAUDE.md, дүрэм 8). Таних мэдээлэл байхгүй.
 *
 * Эм бүр `id[:заалт[:бэлдмэл]]`. Хоосон заалт — `id::бэлдмэл`.
 */

export interface SharedDrug {
  readonly id: string;
  readonly indication?: string;
  readonly formulation?: string;
}

export interface SharedCalc {
  readonly weightKg?: number;
  readonly ageMonths?: number;
  readonly drugs: readonly SharedDrug[];
}

export interface ParsedShare {
  readonly calc: SharedCalc;
  /** Алгассан хэсгүүд — эмчид ил харуулна. */
  readonly skipped: readonly string[];
}

/** Нэг линкэнд орох эмийн дээд тоо — илүүг нь алгасна. */
export const MAX_SHARED_DRUGS = 20;

const drugToken = (drug: SharedDrug): string =>
  [drug.id, drug.indication ?? "", drug.formulation ?? ""].join(":").replace(/:+$/, "");

const optional = (key: string, value?: number): readonly string[] =>
  value === undefined ? [] : [`${key}=${value}`];

/** Fragment-ийн текст (`#`-гүй). */
export const serializeShare = (calc: SharedCalc): string =>
  [
    ...optional("w", calc.weightKg),
    ...optional("m", calc.ageMonths),
    ...(calc.drugs.length > 0 ? [`d=${calc.drugs.map(drugToken).join(",")}`] : []),
  ].join("&");

// ── Задлах ─────────────────────────────────────────────────────────────────

type Lookup = ReadonlyMap<string, Drug>;

const paramsOf = (fragment: string): URLSearchParams =>
  new URLSearchParams(fragment.replace(/^#/, ""));

const numberOf = (raw: string): number | undefined => {
  const value = Number(raw);
  return raw.trim() !== "" && Number.isFinite(value) ? value : undefined;
};

const isWeightOk = (kg: number): boolean => kg >= MIN_WEIGHT_KG && kg <= MAX_WEIGHT_KG;
const isAgeOk = (months: number): boolean =>
  Number.isInteger(months) && months >= 0 && months <= MAX_AGE_MONTHS;

interface Field<T> {
  readonly value?: T;
  readonly skipped: readonly string[];
}

const validated = (raw: string, ok: (value: number) => boolean, label: string): Field<number> => {
  const value = numberOf(raw);
  return value !== undefined && ok(value)
    ? { value, skipped: [] }
    : { skipped: [`${label} «${raw}» — хүчингүй`] };
};

const checked = (
  raw: string | null,
  ok: (value: number) => boolean,
  label: string,
): Field<number> => (raw === null ? { skipped: [] } : validated(raw, ok, label));

const hasIndication = (drug: Drug, code: string): boolean =>
  drug.rules.some((rule) => rule.indication !== "general" && rule.indication.code === code);

/** `id` эсвэл нунтагийн `id@зам` (Шат 6). */
const hasFormulation = (drug: Drug, key: string): boolean =>
  drug.formulations.some((formulation) => formulation.id === key.split("@")[0]);

const part = (
  drug: Drug,
  value: string | undefined,
  valid: (drug: Drug, value: string) => boolean,
  label: string,
): Field<string> => {
  if (!value) return { skipped: [] };
  return valid(drug, value)
    ? { value, skipped: [] }
    : { skipped: [`${drug.inn}: ${label} «${value}» олдсонгүй`] };
};

const drugOf = (token: string, lookup: Lookup): Field<SharedDrug> => {
  const [id, indicationRaw, formulationRaw] = token.split(":");
  const drug = lookup.get(id);
  if (!drug) return { skipped: [`Эм «${id}» — олдсонгүй эсвэл хасагдсан`] };
  const indication = part(drug, indicationRaw, hasIndication, "заалт");
  const formulation = part(drug, formulationRaw, hasFormulation, "бэлдмэл");
  return {
    value: { id, indication: indication.value, formulation: formulation.value },
    skipped: [...indication.skipped, ...formulation.skipped],
  };
};

const unique = (tokens: readonly string[]): readonly string[] => {
  const seen = new Set<string>();
  return tokens.filter((token) => {
    const id = token.split(":")[0];
    return id !== "" && !seen.has(id) && Boolean(seen.add(id));
  });
};

const tooMany = (count: number): readonly string[] =>
  count > MAX_SHARED_DRUGS ? [`${count - MAX_SHARED_DRUGS} эм — нэг линкэнд ${MAX_SHARED_DRUGS}-аас ихгүй`] : [];

const drugsOf = (raw: string | null, lookup: Lookup): Field<readonly SharedDrug[]> => {
  const tokens = unique((raw ?? "").split(","));
  const fields = tokens.slice(0, MAX_SHARED_DRUGS).map((token) => drugOf(token, lookup));
  return {
    value: fields.flatMap((field) => (field.value ? [field.value] : [])),
    skipped: [...fields.flatMap((field) => field.skipped), ...tooMany(tokens.length)],
  };
};

/**
 * Fragment-ээс тооцоог сэргээнэ. Буруу, хуучирсан (хасагдсан эм, бэлдмэл)
 * хэсгийг АЛГАСАЖ, юу алгассанаа `skipped`-д буцаана — чимээгүй хаяхгүй.
 */
export const parseShare = (fragment: string, lookup: Lookup): ParsedShare => {
  const params = paramsOf(fragment);
  const weight = checked(params.get("w"), isWeightOk, "Жин");
  const age = checked(params.get("m"), isAgeOk, "Нас (сар)");
  const drugs = drugsOf(params.get("d"), lookup);
  return {
    calc: { weightKg: weight.value, ageMonths: age.value, drugs: drugs.value ?? [] },
    skipped: [...weight.skipped, ...age.skipped, ...drugs.skipped],
  };
};

/** Fragment-д хуваалцсан тооцоо байгаа эсэх. */
export const hasShare = (fragment: string): boolean => {
  const params = paramsOf(fragment);
  return params.has("w") || params.has("m") || params.has("d");
};
