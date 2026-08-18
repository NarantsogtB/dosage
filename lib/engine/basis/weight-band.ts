import type { DoseRange } from "../../domain/dose-range";
import type { Patient } from "../../domain/patient";
import type { WeightBandBasis } from "../../domain/dosing-basis";
import { matchWeightBand } from "./match-weight-band";

/** Жингийн мужаас тохирохыг олно. Олдохгүй бол null. */
export const weightBand = (
  basis: WeightBandBasis,
  patient: Patient,
): DoseRange | null => {
  const band = basis.bands.find((item) =>
    matchWeightBand(item, patient.weightKg),
  );
  return band ? { minMg: band.doseMg, maxMg: band.doseMg } : null;
};
