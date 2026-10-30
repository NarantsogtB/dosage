import { DRUG_BY_ID } from "../data/drugs";

/** Харуулах дээд тоо. Хайлтын хэсгийг дарахгүйн тулд цөөн. */
export const MAX_RECENT = 5;

/** Шинэ эмийг эхэнд нэмнэ, давхардлыг хасна, `MAX_RECENT`-ээр таслана. */
export const pushRecent = (
  ids: readonly string[],
  id: string,
): readonly string[] =>
  [id, ...ids.filter((item) => item !== id)].slice(0, MAX_RECENT);

const parseJson = (raw: string): unknown => {
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

const isKnownId = (value: unknown): value is string =>
  typeof value === "string" && DRUG_BY_ID.has(value);

const toIds = (value: unknown): readonly string[] =>
  Array.isArray(value)
    ? [...new Set(value.filter(isKnownId))].slice(0, MAX_RECENT)
    : [];

/**
 * localStorage-ийн түүхий утгыг уншина. Эвдэрсэн JSON, өгөгдлөөс
 * хасагдсан эмийн id, давхардлыг чимээгүй хаяна — хэрэглэгчийн
 * төхөөрөмж дээрх хуучин утга аппыг хэзээ ч эвдэх ёсгүй.
 */
export const parseRecent = (raw: string | null): readonly string[] =>
  raw === null ? [] : toIds(parseJson(raw));
