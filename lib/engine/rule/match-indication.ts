import type { DosingRule } from "../../domain/dosing-rule";

/**
 * Заалтаар шүүх.
 *
 * Заалт заагаагүй бол БҮХ дүрэм нэр дэвшинэ — эцсийн сонголтыг
 * preferRule хийнэ. Ингэснээр зөвхөн заалттай дүрэмтэй эм (жишээ нь
 * зөвхөн "уушгины хатгаа" гэсэн дүрэмтэй) эмч заалт сонгоогүй үед
 * чимээгүйхэн алга болохгүй.
 *
 * Заалт заасан бол тухайн заалтын дүрэм ба ерөнхий дүрэм хоёулаа
 * нэр дэвшинэ — ерөнхий нь нөөц хувилбар болно.
 */
export const matchIndication = (
  rule: DosingRule,
  indicationCode?: string,
): boolean => {
  if (indicationCode === undefined) return true;
  return rule.indication === "general" || rule.indication.code === indicationCode;
};
