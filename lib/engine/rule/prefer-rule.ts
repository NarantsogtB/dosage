import type { DosingRule } from "../../domain/dosing-rule";
import { isExactIndication } from "./is-exact-indication";

/**
 * Сонголтын эрэмбэ:
 *   1. Заалтад ЯГ тохирсон дүрэм
 *   2. isDefault тэмдэглэгээтэй дүрэм
 *   3. Эхний тохирсон дүрэм
 *
 * Эрэмбэ чухал: "дунд чихний үрэвсэл" гэж зааж өгөөд ерөнхий дүрмээр
 * тооцоолвол эмч 80 мг/кг/өдөр хүлээж байхад 45 авна.
 */
export const preferRule = (
  rules: readonly DosingRule[],
  indicationCode?: string,
): DosingRule | undefined =>
  rules.find((rule) => isExactIndication(rule, indicationCode)) ??
  rules.find((rule) => rule.isDefault) ??
  rules[0];
