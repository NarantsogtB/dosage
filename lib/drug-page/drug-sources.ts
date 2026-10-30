import type { Drug } from "../domain/drug";
import type { SourceRef } from "../domain/source";
import { findSource } from "../data/sources/get-source";

const keyOf = (ref: SourceRef): string => `${ref.sourceId}|${ref.locator}`;

const firstOfEach = (refs: readonly SourceRef[]): readonly SourceRef[] =>
  [...new Map(refs.map((ref) => [keyOf(ref), ref] as const)).values()];

/**
 * Эмийн бүх эшлэл: эмийн түвшний + дүрэм бүрийн. Ижил эх сурвалж,
 * ижил байршил (locator) давхардвал нэг л удаа.
 */
export const drugSources = (drug: Drug): readonly SourceRef[] =>
  firstOfEach([...drug.sources, ...drug.rules.flatMap((rule) => rule.sources)]);

/** Эшлэлүүдийн хэвлэгчид, давхардалгүй, гарч ирсэн дарааллаар. */
export const drugPublishers = (drug: Drug): readonly string[] => [
  ...new Set(
    drugSources(drug)
      .map((ref) => findSource(ref.sourceId)?.publisher)
      .filter((publisher): publisher is string => publisher !== undefined),
  ),
];
