import type { Patient } from "../../domain/patient";

/**
 * Parkland-ын коэффициент, мл/кг/БНГТ%.
 *
 * ✅ ЭХ СУРВАЛЖ: mn-burns-2015, 70–73 хуудас, Хүснэгт 3
 *    «Паркланд — 4 мл/кг/гэмтлийн хувь, талыг нь эхний 8 цагт»
 *
 * Өмнө нь ANZBA-ийн 3 мл/кг/% байж магадгүй гэж эргэлзсэн — энэ эх
 * сурвалж 4 гэж баталсан.
 */
export const PARKLAND_ML_PER_KG_PERCENT = 4;

/** Эхний хагасыг өгөх цагийн тоо. */
export const FIRST_HALF_HOURS = 8;

export interface ParklandResult {
  readonly totalMl: number;
  readonly firstHalfMl: number;
  readonly secondHalfMl: number;
  readonly firstHalfRateMlPerHour: number;
  readonly secondHalfRateMlPerHour: number;
}

const SECOND_HALF_HOURS = 16;

/**
 * Parkland: 4 мл × жин(кг) × БНГТ%. Эхний хагасыг 8 цагт, үлдсэнийг 16 цагт.
 *
 * ⚠️ Энэ нь ЗӨВХӨН сэхээний шингэн — тэтгэх шингэнийг НЭМЖ тооцоолно.
 * ⚠️ Хугацааг ОСОЛ БОЛСОН цагаас тоолно, эмнэлэгт ирсэн цагаас биш.
 */
export const parkland = (
  patient: Patient,
  tbsaPercent: number,
): ParklandResult => {
  const totalMl = PARKLAND_ML_PER_KG_PERCENT * patient.weightKg * tbsaPercent;
  const half = totalMl / 2;
  return {
    totalMl,
    firstHalfMl: half,
    secondHalfMl: half,
    firstHalfRateMlPerHour: half / FIRST_HALF_HOURS,
    secondHalfRateMlPerHour: half / SECOND_HALF_HOURS,
  };
};
