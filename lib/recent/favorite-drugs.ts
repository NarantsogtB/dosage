import { DRUG_BY_ID } from "../data/drugs";

/** «Миний эмүүд»-ийн дээд тоо — нэг мөрөнд цуглуулсан чипүүд хэт урт болохгүй. */
export const MAX_FAVORITES = 12;

/** Байвал хасна, байхгүй бол төгсгөлд нэмнэ. Дүүрсэн бол өөрчлөхгүй. */
export const toggleFavorite = (ids: readonly string[], id: string): readonly string[] => {
  if (ids.includes(id)) return ids.filter((item) => item !== id);
  return ids.length >= MAX_FAVORITES ? ids : [...ids, id];
};

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
  Array.isArray(value) ? [...new Set(value.filter(isKnownId))].slice(0, MAX_FAVORITES) : [];

/** localStorage-ийн түүхий утга. Эвдэрсэн, хасагдсан эмийн id, давхардлыг чимээгүй хаяна. */
export const parseFavorites = (raw: string | null): readonly string[] =>
  raw === null ? [] : toIds(parseJson(raw));
