import type { Patient } from "../../domain/patient";
import type { NinesBand } from "../../data/burns/rule-of-nines";

const ADULT_FROM_YEARS = 15;
const MONTHS_PER_YEAR = 12;

/**
 * ⛔ ХОЦРОГДСОН — `ageBandOf` (age-band.ts)-ыг ашиглана уу.
 *
 * Естийн дүрмийн хоёр ангилал. Энэ функц 14 настай хүүхдийг «child»
 * гэж ангилдаг байсан бөгөөд тэр багана нь НЯРАЙН харьцаатай (толгой
 * 19%). Lund-Browder-ийн зургаан баганад 14 нас нь `y10` ангилалд
 * орж, толгой 11% болно.
 *
 * Тооцооллоос бүрэн салгасан. Ирээдүйд «түргэн үнэлгээ» горим нэмэх
 * бол л дахин хэрэглэнэ — тэр үед ч ил тод шошготой байх ёстой.
 */
export const ninesBandOf = (patient: Patient): NinesBand =>
  patient.ageMonths >= ADULT_FROM_YEARS * MONTHS_PER_YEAR ? "adult" : "child";
