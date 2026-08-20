import type { AgeBand } from "../../domain/body-region";
import type { Patient } from "../../domain/patient";

const MONTHS_PER_YEAR = 12;

/** Насны дээд хязгаар (жил) → ангилал. Эрэмбэ чухал. */
const BANDS: readonly { readonly underYears: number; readonly band: AgeBand }[] = [
  { underYears: 1, band: "infant" },
  { underYears: 5, band: "y1" },
  { underYears: 10, band: "y5" },
  { underYears: 15, band: "y10" },
  { underYears: 18, band: "y15" },
];

/** Өвчтөний насыг Lund-Browder-ийн ангилалд буулгана. */
export const ageBandOf = (patient: Patient): AgeBand =>
  BANDS.find((entry) => patient.ageMonths < entry.underYears * MONTHS_PER_YEAR)
    ?.band ?? "adult";
