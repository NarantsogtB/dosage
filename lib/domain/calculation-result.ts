import type { DoseRange } from "./dose-range";
import type { DosingRule } from "./dosing-rule";
import type { Formulation } from "./formulation";
import type { FrequencyCode } from "./frequency";
import type { SourceRef } from "./source";
import type { TraceStep } from "../engine/trace/trace-step";
import type { Warning } from "./warning";

/** Нэг бэлдмэлээр өгөх хэмжээ. */
export interface FormulationAmount {
  readonly formulation: Formulation;
  readonly min: number;
  readonly max: number;
}

/** Амжилттай тооцооллын үр дүн. */
export interface DosageOutcome {
  readonly rule: DosingRule;
  readonly perDose: DoseRange;
  readonly perDay: DoseRange;
  readonly frequency: FrequencyCode;
  readonly dosesPerDay: number;
  readonly amounts: readonly FormulationAmount[];
  /** Дээд хязгаарт хүрсэн эсэх. */
  readonly cappedAtMax: boolean;
  /**
   * Идэвхтэй дээд хязгаар, НЭГ УДААГИЙН тунгийн нэгжээр (мг).
   * Хязгааргүй бол Infinity — харуулахдаа Number.isFinite-ээр шалгана.
   */
  readonly limitMg: number;
  readonly warnings: readonly Warning[];
  readonly trace: readonly TraceStep[];
  readonly sources: readonly SourceRef[];
}

/** Тооцоолох боломжгүй тохиолдол. */
export interface IneligibleOutcome {
  readonly reasonMn: string;
  readonly code: IneligibleCode;
}

export type IneligibleCode =
  | "weight_out_of_range"
  | "below_minimum_age"
  | "no_matching_rule"
  | "no_matching_weight_band";

export type CalculationResult =
  | { readonly type: "dosage"; readonly data: DosageOutcome }
  | { readonly type: "ineligible"; readonly data: IneligibleOutcome };
