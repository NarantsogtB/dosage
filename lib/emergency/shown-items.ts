import type { EmergencyItem } from "../calculators/emergency/items";
import { validateSourceRefs } from "../validation/validate-source-refs";

/**
 * Эм бус мөрийн эх сурвалж эмийн дүрэмтэй ИЖИЛ шаардлага хангах ёстой
 * (≥2 эх сурвалж, locator, үгчилсэн утга, ≥1 нь 2020+). Хангаагүйг харуулахгүй.
 */
export const shownItems = (items: readonly EmergencyItem[]): readonly EmergencyItem[] =>
  items.filter((item) => validateSourceRefs(item.sources).length === 0);
