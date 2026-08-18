/** Анхааруулгын хүнд байдал. */
export type WarningLevel = "block" | "warn" | "info";

export interface Warning {
  readonly level: WarningLevel;
  readonly messageMn: string;
}
