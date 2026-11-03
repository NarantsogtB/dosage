/**
 * Тунгийн нэгж (Шат S4).
 *
 * Дүрэм (`DosingRule.doseUnit`) ба бэлдмэл (`strengthUnit`) түвшинд заана.
 * Анхдагч мг — заагаагүй бол одоогийн бүх өгөгдөл мг хэвээр.
 * Масс (г, мг, мкг) хоорондоо хөрвөнө; ЕД, ммоль, мл бусадтай хөрвөхгүй.
 */
export type DoseUnit = "mg" | "mcg" | "g" | "units" | "mmol" | "mL";

export const DEFAULT_DOSE_UNIT: DoseUnit = "mg";
