import type { DoseRange } from "../domain/dose-range";
import { DEFAULT_DOSE_UNIT, type DoseUnit } from "../domain/dose-unit";
import { DOSE_UNIT_LABELS } from "./dose-unit-label";
import { alternateDose } from "./format-dose";
import { formatRange } from "./format-range";

/**
 * Тоо ба нэгжийг ТУСАД нь буцаана.
 *
 * `formatDose` нь "180 мг" гэсэн нэг мөр өгдөг тул тоог нэгжээс нь өөр
 * бичиглэлээр харуулах боломжгүй. UI-д тоог Mono, нэгжийг Sans-аар
 * бичих шаардлагатай учир задалсан хувилбар хэрэгтэй болов.
 *
 * `alternate` — мкг/мг давхар бичиглэл (Шат S4), хэрэггүй бол undefined.
 */
export interface DoseParts {
  readonly value: string;
  readonly unit: string;
  readonly alternate?: string;
}

export const doseParts = (range: DoseRange, unit: DoseUnit = DEFAULT_DOSE_UNIT): DoseParts => ({
  value: formatRange(range.minMg, range.maxMg, 0.01),
  unit: DOSE_UNIT_LABELS[unit],
  alternate: alternateDose(range, unit),
});
