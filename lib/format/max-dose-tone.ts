/** Дээд тунгийн хэмжүүрийн өнгө. */
export type MaxDoseTone = "neutral" | "warning" | "destructive";

/** Энэ хувиас эхлэн шар — эмч хязгаарт ойртсоныг анзаарах ёстой. */
export const WARNING_PERCENT = 80;

/**
 * Хувь ба таслалтаас өнгө сонгоно (Figma "Max-dose meter", V3 · 02).
 *
 *   < 80%        neutral      — мэдээлэл
 *   80–99%       warning      — хязгаарт ойрхон
 *   тасалсан     destructive  — тооцоолсон тун хязгаараар тасарсан
 *
 * Улаан нь зөвхөн БОДИТ таслалтад: 100% хүрсэн ч тасраагүй (яг хязгаар
 * дээр тооцоологдсон) бол шар хэвээр.
 */
export const maxDoseTone = (percent: number, capped: boolean): MaxDoseTone => {
  if (capped) return "destructive";
  return percent >= WARNING_PERCENT ? "warning" : "neutral";
};
