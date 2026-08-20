import type { DoseRange } from "../domain/dose-range";
import { formatRange } from "./format-range";

/**
 * Тоо ба нэгжийг ТУСАД нь буцаана.
 *
 * `formatDose` нь "180 мг" гэсэн нэг мөр өгдөг тул тоог нэгжээс нь өөр
 * бичиглэлээр харуулах боломжгүй. UI-д тоог Mono, нэгжийг Sans-аар
 * бичих шаардлагатай учир задалсан хувилбар хэрэгтэй болов.
 */
export interface DoseParts {
  readonly value: string;
  readonly unit: string;
}

export const doseParts = (range: DoseRange): DoseParts => ({
  value: formatRange(range.minMg, range.maxMg, 0.01),
  unit: "мг",
});
