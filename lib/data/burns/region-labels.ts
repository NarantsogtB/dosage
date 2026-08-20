import type { BodyRegionId } from "../../domain/body-region";
import type { BurnDepth } from "../../domain/body-region";

/**
 * ⚠️ `Partial` БИШ. Шинэ бүс нэмээд шошгыг нь бичихээ мартвал build
 * унана — эс бөгөөс UI дээр `thigh_left` гэсэн түүхий id харагдана.
 */
export const REGION_LABELS: Record<BodyRegionId, string> = {
  head: "Толгой",
  neck: "Хүзүү",
  trunk_anterior: "Их бие — урд",
  trunk_posterior: "Их бие — ар",
  buttock_left: "Зүүн өгзөг",
  buttock_right: "Баруун өгзөг",
  genitalia: "Бэлэг эрхтэн",
  upper_arm_left: "Зүүн мөр",
  upper_arm_right: "Баруун мөр",
  forearm_left: "Зүүн шуу",
  forearm_right: "Баруун шуу",
  hand_left: "Зүүн алга",
  hand_right: "Баруун алга",
  thigh_left: "Зүүн гуя",
  thigh_right: "Баруун гуя",
  leg_left: "Зүүн шилбэ",
  leg_right: "Баруун шилбэ",
  foot_left: "Зүүн хөл",
  foot_right: "Баруун хөл",
};

/**
 * Урд/ар талын бүлэглэл — эмчийн үзлэгийн дарааллаар.
 *
 * Хоёрын нийлбэр нь БҮХ бүсийг агуулах ёстой: аль нэг талд ч байхгүй
 * бүс нь сонгогдох боломжгүй болж, БНГТ% чимээгүйхэн дутуу гарна.
 * `tests/calculators/burns.test.ts` үүнийг шалгана.
 */
export const FRONT_REGIONS: readonly BodyRegionId[] = [
  "head",
  "neck",
  "trunk_anterior",
  "upper_arm_left",
  "upper_arm_right",
  "forearm_left",
  "forearm_right",
  "hand_left",
  "hand_right",
  "genitalia",
];

export const BACK_REGIONS: readonly BodyRegionId[] = [
  "trunk_posterior",
  "buttock_left",
  "buttock_right",
  "thigh_left",
  "thigh_right",
  "leg_left",
  "leg_right",
  "foot_left",
  "foot_right",
];

export const DEPTH_LABELS: Record<BurnDepth, string> = {
  superficial: "I зэрэг (өнгөц)",
  partial: "II зэрэг",
  full: "III зэрэг",
};

/** I зэргийн түлэгдэл гадаргуугийн тооцоололд ОРОХГҮЙ. */
export const DEPTH_COUNTS: Record<BurnDepth, boolean> = {
  superficial: false,
  partial: true,
  full: true,
};

/** Насны ангилалын шошго — UI дээр ямар багана ашиглаж байгааг ил гаргана. */
export const AGE_BAND_LABELS = {
  infant: "0–11 сар",
  y1: "1–4 нас",
  y5: "5–9 нас",
  y10: "10–14 нас",
  y15: "15–17 нас",
  adult: "18+ нас",
} as const;
