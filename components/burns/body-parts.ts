import type { BodyRegionId } from "@/lib/domain/body-region";

export type BodyPartKey =
  | "head"
  | "neck"
  | "trunk"
  | "upperArmL"
  | "upperArmR"
  | "forearmL"
  | "forearmR"
  | "handL"
  | "handR"
  | "buttockL"
  | "buttockR"
  | "genitalia"
  | "thighL"
  | "thighR"
  | "legL"
  | "legR"
  | "footL"
  | "footR";

interface RectShape {
  readonly kind: "rect";
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
  readonly rx: number;
}

interface EllipseShape {
  readonly kind: "ellipse";
  readonly cx: number;
  readonly cy: number;
  readonly rx: number;
  readonly ry: number;
}

export type PartShape = { readonly part: BodyPartKey } & (RectShape | EllipseShape);

/**
 * Диаграмын хэлбэрүүд — насанд ХАМААРАХГҮЙ ерөнхий хүний дүрс (зөвхөн
 * байрлал заана, БНГТ хувийг `lib/data/burns/lund-browder.ts`-ээс авна).
 *
 * Зүүн/баруун нь ӨВЧТӨНИЙ өөрийнх нь тал (эмнэлзүйн конвенц) — үзэгчээс
 * харахад толин тусгал: өвчтөний баруун гар зурган дээр ЗҮҮН талд байна.
 */
export const BODY_PARTS: readonly PartShape[] = [
  { part: "head", kind: "ellipse", cx: 110, cy: 36, rx: 24, ry: 28 },
  { part: "neck", kind: "rect", x: 100, y: 58, width: 20, height: 12, rx: 4 },
  { part: "trunk", kind: "rect", x: 72, y: 70, width: 76, height: 112, rx: 16 },
  { part: "upperArmR", kind: "rect", x: 32, y: 74, width: 26, height: 84, rx: 13 },
  { part: "upperArmL", kind: "rect", x: 162, y: 74, width: 26, height: 84, rx: 13 },
  { part: "forearmR", kind: "rect", x: 30, y: 162, width: 22, height: 78, rx: 11 },
  { part: "forearmL", kind: "rect", x: 168, y: 162, width: 22, height: 78, rx: 11 },
  { part: "handR", kind: "ellipse", cx: 41, cy: 250, rx: 15, ry: 17 },
  { part: "handL", kind: "ellipse", cx: 179, cy: 250, rx: 15, ry: 17 },
  { part: "buttockR", kind: "rect", x: 74, y: 182, width: 25, height: 13, rx: 5 },
  { part: "genitalia", kind: "rect", x: 100, y: 182, width: 20, height: 13, rx: 4 },
  { part: "buttockL", kind: "rect", x: 121, y: 182, width: 25, height: 13, rx: 5 },
  { part: "thighR", kind: "rect", x: 80, y: 194, width: 30, height: 100, rx: 14 },
  { part: "thighL", kind: "rect", x: 110, y: 194, width: 30, height: 100, rx: 14 },
  { part: "legR", kind: "rect", x: 82, y: 298, width: 26, height: 100, rx: 12 },
  { part: "legL", kind: "rect", x: 112, y: 298, width: 26, height: 100, rx: 12 },
  { part: "footR", kind: "ellipse", cx: 95, cy: 410, rx: 18, ry: 12 },
  { part: "footL", kind: "ellipse", cx: 125, cy: 410, rx: 18, ry: 12 },
];

/**
 * Урд талаас тэмдэглэдэг бүсүүд.
 *
 * ⚠️ FRONT ба BACK-ийн НЭГДЭЛ нь `BodyRegionId`-ийн БҮХ утгыг агуулах
 * ёстой. Аль ч талд байхгүй бүс нь сонгогдох боломжгүй болж, БНГТ%
 * чимээгүйхэн дутуу гарна — тэр нь Parkland-ын шингэнийг дутуу
 * тооцоолно. `tests/calculators/burns.test.ts` үүнийг шалгана.
 *
 * ⚠️ Бүс бүр ЯГ НЭГ талд байрлана. Lund-Browder-ийн хувь нь бүсийг
 * БҮТНЭЭР нь (урд + ар) илэрхийлдэг тул хоёр талд давхар байрлуулах
 * шаардлагагүй: «зүүн мөр» гэдэг нь мөрний урд, ар хоёулаа = 4%.
 */
export const FRONT_PART_REGION: Partial<Record<BodyPartKey, BodyRegionId>> = {
  head: "head",
  neck: "neck",
  trunk: "trunk_anterior",
  upperArmL: "upper_arm_left",
  upperArmR: "upper_arm_right",
  forearmL: "forearm_left",
  forearmR: "forearm_right",
  handL: "hand_left",
  handR: "hand_right",
  genitalia: "genitalia",
};

/** Ар талаас тэмдэглэдэг бүсүүд. */
export const BACK_PART_REGION: Partial<Record<BodyPartKey, BodyRegionId>> = {
  trunk: "trunk_posterior",
  buttockL: "buttock_left",
  buttockR: "buttock_right",
  thighL: "thigh_left",
  thighR: "thigh_right",
  legL: "leg_left",
  legR: "leg_right",
  footL: "foot_left",
  footR: "foot_right",
};
