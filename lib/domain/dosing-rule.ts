import type { DoseCap } from "./dose-cap";
import type { DosingBasis } from "./dosing-basis";
import type { EvidenceLevel, SourceRef } from "./source";
import type { FrequencyCode } from "./frequency";
import type { IndicationRef } from "./indication";
import type { Route } from "./route";

/** Эмчилгээний үргэлжлэх хугацаа, хоногоор. */
export interface Duration {
  readonly minDays: number;
  readonly maxDays: number;
}

/**
 * Нэг эм ОЛОН дүрэмтэй байж болно.
 * Жишээ: Amoxicillin — энгийн халдвар vs дунд чихний үрэвсэл.
 */
export interface DosingRule {
  readonly id: string;
  readonly indication: IndicationRef;
  readonly route: Route;
  readonly ageMinMonths: number;
  readonly ageMaxMonths?: number;
  readonly weightMinKg?: number;
  readonly weightMaxKg?: number;
  readonly basis: DosingBasis;
  readonly frequency: FrequencyCode;
  readonly duration?: Duration;
  readonly caps: readonly DoseCap[];
  readonly sources: readonly SourceRef[];
  readonly evidenceLevel: EvidenceLevel;
  /** Заалт заагаагүй үед сонгогдох дүрэм. */
  readonly isDefault?: boolean;
  /** Эх сурвалжууд зөрчилдсөн бол тайлбарыг энд бүртгэнэ. */
  readonly conflictNote?: string;
}
