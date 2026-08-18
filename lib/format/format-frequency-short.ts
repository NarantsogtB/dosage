import type { FrequencyCode } from "../domain/frequency";

/** Хураангуй самбарт багтах богино бичиглэл. */
export const FREQUENCY_SHORT: Record<FrequencyCode, string> = {
  od: "×1/өдөр",
  bd: "×2/өдөр",
  tds: "×3/өдөр",
  qds: "×4/өдөр",
  q4h: "4 ц тутам",
  q6h: "6 ц тутам",
  q8h: "8 ц тутам",
  q12h: "12 ц тутам",
  q4_6h: "4–6 ц тутам",
  q6_8h: "6–8 ц тутам",
  q8_12h: "8–12 ц тутам",
};
