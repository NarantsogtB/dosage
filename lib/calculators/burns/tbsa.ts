import type { AgeBand, BurnSelection } from "../../domain/body-region";
import { LUND_BROWDER } from "../../data/burns/lund-browder";

/**
 * Гадаргуугийн хувийг тооцоолоход өнгөц (I зэрэг) түлэгдэлтийг
 * ОРУУЛАХГҮЙ — эмнэлзүйн стандарт.
 */
const countsTowardTbsa = (selection: BurnSelection): boolean =>
  selection.depth !== "superficial";

const regionPercent = (selection: BurnSelection, ageBand: AgeBand): number =>
  LUND_BROWDER[selection.region][ageBand] * selection.fraction;

/**
 * Сонгосон бүсүүдийн нийт гадаргуугийн хувь (БНГТ %).
 *
 * Насны ангилалыг `ageBandOf(patient)`-ээс авна — Естийн дүрмийн
 * хоёр ангилалыг (хүүхэд / насанд хүрэгч) ХЭРЭГЛЭХГҮЙ. Шалтгааныг
 * `lib/data/burns/lund-browder.ts`-ийн толгойгоос үзнэ үү.
 *
 * Хөвөгч цэгийн хуримтлагдсан алдааг арилгахын тулд 0.1 хүртэл
 * дугуйрна: 2.5 + 3.5 + 6.5 нь binary float-д 12.499999… болдог.
 */
export const totalBsaPercent = (
  selections: readonly BurnSelection[],
  ageBand: AgeBand,
): number =>
  Math.round(
    selections
      .filter(countsTowardTbsa)
      .reduce((total, selection) => total + regionPercent(selection, ageBand), 0) *
      10,
  ) / 10;
