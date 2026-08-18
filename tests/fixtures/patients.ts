import type { Patient } from "@/lib/domain/patient";

/**
 * Snapshot тестэд ашиглах төлөөлөх өвчтөнүүд.
 * Хилийн утгуудыг зориуд оруулсан: нярай, 1 нас, дээд хязгаарт хүрэх жин.
 */
export const SAMPLE_PATIENTS: readonly Patient[] = [
  { weightKg: 3, ageMonths: 0 },
  { weightKg: 6, ageMonths: 6 },
  { weightKg: 10, ageMonths: 12 },
  { weightKg: 15, ageMonths: 36 },
  { weightKg: 20, ageMonths: 60 },
  { weightKg: 35, ageMonths: 120 },
  { weightKg: 60, ageMonths: 192 },
];
