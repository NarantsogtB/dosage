import type { SourceRef } from "../domain/source";
import { findSource } from "../data/sources/get-source";

const MIN_SOURCES = 2;
const MIN_RECENT_YEAR = 2020;

const missingLocator = (refs: readonly SourceRef[]): readonly string[] =>
  refs
    .filter((ref) => !ref.locator?.trim())
    .map((ref) => `${ref.sourceId}: locator (бүлэг/хуудас) хоосон байна.`);

const missingQuote = (refs: readonly SourceRef[]): readonly string[] =>
  refs
    .filter((ref) => !ref.quotedValue?.trim())
    .map((ref) => `${ref.sourceId}: quotedValue хоосон — эх утгыг үгчлэн бич.`);

const tooFew = (refs: readonly SourceRef[]): readonly string[] =>
  refs.length < MIN_SOURCES
    ? [`Дор хаяж ${MIN_SOURCES} эх сурвалж шаардлагатай, одоо ${refs.length}.`]
    : [];

const isRecent = (ref: SourceRef): boolean =>
  (findSource(ref.sourceId)?.year ?? 0) >= MIN_RECENT_YEAR;

const tooOld = (refs: readonly SourceRef[]): readonly string[] =>
  refs.some(isRecent)
    ? []
    : [`Дор хаяж нэг эх сурвалж ${MIN_RECENT_YEAR} оноос хойших байх ёстой.`];

/**
 * Эх сурвалжийн шаардлага.
 *
 * 1. Дор хаяж 2 бие даасан эх сурвалж
 * 2. Тус бүр locator болон quotedValue-тай
 * 3. Дор хаяж нэг нь 2020 оноос хойших
 *
 * ⚠️ `open` эх сурвалж ЗААВАЛ байх шаардлагыг ХАССАН. Шалтгаан: тунгийн
 * тоо нь баримт (fact) бөгөөд зохиогчийн эрхээр хамгаалагддаггүй —
 * хамгаалагддаг нь хүснэгтийн эмхэтгэл. Бие даасан хоёр cite-only
 * эх сурвалж нийцвэл энэ нь хүчинтэй баталгаажуулалт болно.
 * Гэхдээ хүснэгт, өгүүлбэрийг ХУУЛАХГҮЙ — утгыг гаргаж авна.
 */
export const validateSourceRefs = (
  refs: readonly SourceRef[],
): readonly string[] => [
  ...tooFew(refs),
  ...tooOld(refs),
  ...missingLocator(refs),
  ...missingQuote(refs),
];
