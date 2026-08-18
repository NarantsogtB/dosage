import type { DoseRange } from "../domain/dose-range";
import { formatRange } from "./format-range";

/** Тунгийн мужийг "180 мг" эсвэл "120–180 мг" хэлбэрээр харуулна. */
export const formatDose = (range: DoseRange): string =>
  `${formatRange(range.minMg, range.maxMg, 0.01)} мг`;
