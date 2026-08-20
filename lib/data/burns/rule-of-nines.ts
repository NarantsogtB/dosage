import type { BodyRegionId } from "../../domain/body-region";

/**
 * ⛔ ХОЦРОГДСОН — БНГТ% тооцоололд ХЭРЭГЛЭХГҮЙ.
 *
 * Естийн дүрэм (Rule of Nines) нь зөвхөн хоёр ангилалтай: «хүүхэд» ба
 * «насанд хүрэгч». Тэрхүү «хүүхэд» багана нь НЯРАЙН харьцаа (толгой 19%)
 * бөгөөд 5, 10, 14 настай хүүхдэд бүгдэд нь ижил утга өгдөг. Үүнээс
 * болж 14 настай өсвөр насныхны толгойг 19% гэж тооцож байсан — бодит
 * утга 11%.
 *
 * Тооцооллыг `lib/data/burns/lund-browder.ts` руу бүрэн шилжүүлсэн
 * (зургаан насны багана). Энэ файлыг ЗӨВХӨН лавлагаа болгон үлдээв:
 * mn-burns-2015 (х.41, Зураг 4) энэ хүснэгтийг хэвлэсэн бөгөөд ном
 * өөрөө «бүр илүү нарийвчлан тооцоолох хэрэгтэй бол Ланд, Броудер
 * нарын хүснэгтийг ашиглана» гэж заасан.
 *
 * ⚠️ Хэрэв «түргэн үнэлгээ» горим нэмэх бол үүнийг тусад нь, ил тод
 *    шошготойгоор гаргана — Lund-Browder-ийн ОРОНД биш.
 */
export type NinesBand = "child" | "adult";

export type RegionNines = Readonly<Record<NinesBand, number>>;

export const RULE_OF_NINES: Readonly<
  Partial<Record<BodyRegionId, RegionNines>>
> = {
  head: { child: 19, adult: 9 },
  upper_arm_left: { child: 4.5, adult: 4.5 },
  upper_arm_right: { child: 4.5, adult: 4.5 },
  forearm_left: { child: 4.5, adult: 4.5 },
  forearm_right: { child: 4.5, adult: 4.5 },
  trunk_anterior: { child: 18, adult: 18 },
  trunk_posterior: { child: 18, adult: 18 },
  genitalia: { child: 1, adult: 1 },
  thigh_left: { child: 6.5, adult: 9 },
  thigh_right: { child: 6.5, adult: 9 },
  leg_left: { child: 6.5, adult: 9 },
  leg_right: { child: 6.5, adult: 9 },
};

/** Хүснэгтийн нийлбэр 100% байх ёстой. */
export const ninesTotalPercent = (band: NinesBand): number =>
  Object.values(RULE_OF_NINES).reduce((sum, region) => sum + region[band], 0);
