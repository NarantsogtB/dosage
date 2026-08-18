import type { DosingRule } from "../../domain/dosing-rule";

/** Дүрэм тухайн заалтад ЯГ тохирох эсэх. Ерөнхий дүрэм тооцогдохгүй. */
export const isExactIndication = (
  rule: DosingRule,
  indicationCode?: string,
): boolean =>
  rule.indication !== "general" && rule.indication.code === indicationCode;
