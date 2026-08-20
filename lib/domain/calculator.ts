import type { EvidenceLevel, SourceRef } from "./source";
import type { TraceStep } from "../engine/trace/trace-step";
import type { Warning } from "./warning";

/** Хэмжигдэхүүний нэгж. */
export type Unit = "ml" | "ml/hr" | "ml/kg" | "mmol" | "mmol/L" | "%" | "hr";

/** Нэрлэсэн тоон үр дүн. */
export interface CalculatedValue {
  readonly labelMn: string;
  readonly value: number;
  readonly unit: Unit;
}

/**
 * ХАТУУ ХЯЗГААР — зөвлөмж биш.
 *
 * Эрдсийн засварт хурдны хязгаар нь үр дүнгийн ГОЛ хэсэг. Натрийг
 * хэт хурдан засвал osmotic demyelination үүсэх тул энэ нь
 * «анхааруулга» биш, тооцооллын салшгүй хэсэг.
 */
export interface SafetyLimit {
  readonly labelMn: string;
  readonly limit: number;
  readonly unit: Unit;
  readonly rationaleMn: string;
}

/** Аливаа тооцоолуурын нэгдсэн үр дүн. */
export interface CalculatorOutcome {
  readonly values: readonly CalculatedValue[];
  readonly limits: readonly SafetyLimit[];
  readonly warnings: readonly Warning[];
  readonly trace: readonly TraceStep[];
  readonly sources: readonly SourceRef[];
  readonly evidenceLevel: EvidenceLevel;
}
