import type {
  CalculationResult,
  IneligibleCode,
  IneligibleOutcome,
} from "../domain/calculation-result";

/** Тооцоолох боломжгүй үр дүнг үүсгэнэ. */
export const ineligible = (
  code: IneligibleCode,
  reasonMn: string,
): CalculationResult => ({ type: "ineligible", data: { code, reasonMn } });

/** Бэлэн IneligibleOutcome-ийг үр дүн болгож боож өгнө. */
export const wrapIneligible = (
  outcome: IneligibleOutcome,
): CalculationResult => ({ type: "ineligible", data: outcome });
