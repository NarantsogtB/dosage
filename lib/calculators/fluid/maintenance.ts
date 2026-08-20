import type { Patient } from "../../domain/patient";

/**
 * Holliday-Segar (4-2-1) — өдрийн тэтгэх шингэн.
 *
 * ⚠️ ЭХ СУРВАЛЖ ХАВСРАГДААГҮЙ. Томьёоны бүтэц нь стандарт боловч
 * dosage.mn-ийн дүрмээр эх сурвалжтай болтол E_unverified хэвээр.
 * TODO: WHO Pocket Book Ch.10 (Table 44) эсвэл RCH-аас locator нэмэх.
 */
const TIERS: readonly { readonly upToKg: number; readonly mlPerKg: number }[] = [
  { upToKg: 10, mlPerKg: 100 },
  { upToKg: 20, mlPerKg: 50 },
  { upToKg: Number.POSITIVE_INFINITY, mlPerKg: 20 },
];

const tierVolume = (
  weightKg: number,
  tier: { upToKg: number; mlPerKg: number },
  consumed: number,
): number => Math.max(0, Math.min(weightKg, tier.upToKg) - consumed) * tier.mlPerKg;

/** Өдрийн тэтгэх шингэн, миллилитрээр. */
export const maintenanceMlPerDay = (patient: Patient): number => {
  const bounds = [0, 10, 20];
  return TIERS.reduce(
    (total, tier, index) => total + tierVolume(patient.weightKg, tier, bounds[index]),
    0,
  );
};

/** Цагийн хурд, мл/цаг. */
export const maintenanceMlPerHour = (patient: Patient): number =>
  maintenanceMlPerDay(patient) / 24;
