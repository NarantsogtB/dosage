/**
 * Lund-Browder-ийн биеийн бүсүүд.
 *
 * Rule of Nines-ийг ХҮҮХДЭД ашиглахгүй: нярайн толгой биеийн гадаргуугийн
 * ~19%, насанд хүрэгчийнх ~7%. Насаар өөрчлөгддөг тул Lund-Browder заавал.
 */
export type BodyRegionId =
  | "head"
  | "neck"
  | "trunk_anterior"
  | "trunk_posterior"
  | "buttock_left"
  | "buttock_right"
  | "genitalia"
  | "upper_arm_left"
  | "upper_arm_right"
  | "forearm_left"
  | "forearm_right"
  | "hand_left"
  | "hand_right"
  | "thigh_left"
  | "thigh_right"
  | "leg_left"
  | "leg_right"
  | "foot_left"
  | "foot_right";

/** Насны ангилал — Lund-Browder-ийн стандарт багануудтай нийцнэ. */
export type AgeBand = "infant" | "y1" | "y5" | "y10" | "y15" | "adult";

/** Түлэгдэлтийн зэрэг. Гадаргуугийн тооцоололд оролцох эсэх нь ялгаатай. */
export type BurnDepth = "superficial" | "partial" | "full";

/** Сонгосон бүс ба түүний зэрэг. */
export interface BurnSelection {
  readonly region: BodyRegionId;
  readonly depth: BurnDepth;
  /** Бүсийн хэдэн хувь түлэгдсэн. 1 = бүтэн бүс. */
  readonly fraction: number;
}
