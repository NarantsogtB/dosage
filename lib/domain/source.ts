/** Эх сурвалжийг дахин ашиглах эрхийн түвшин. */
export type SourceTier = "open" | "cite-only" | "regulatory-mn";

/**
 * Нотолгооны түвшин — эм тус бүрд UI дээр ил харуулна.
 *
 * ⚠️ Энэ нь ЭХ СУРВАЛЖИЙН чанарыг заана, эмнэлзүйн хяналтыг БИШ.
 * Эмчийн хяналтыг `Drug.reviewedBy` + `Drug.lastReviewed` тусад нь илэрхийлнэ.
 * Хоёрыг хольж болохгүй: эх сурвалж бүрдсэн ч эмч хараагүй байж болно.
 */
export type EvidenceLevel =
  /** ЭМЯ-ны тушаалаар батлагдсан заавар */
  | "A_mn_approved"
  /** ДЭМБ-ын заавар (2022–2025) */
  | "B_who"
  /** Олон улсын хүүхдийн эмнэлгийн заавар — RCH, Starship г.м. */
  | "C_international"
  /** Зөвхөн Монголын бүртгэлийн заавар */
  | "D_label_only"
  /** Эх сурвалж хараахан хавсаргаагүй */
  | "E_unverified";

export const EVIDENCE_LABELS: Record<EvidenceLevel, string> = {
  A_mn_approved: "ЭМЯ-ны зааврын дагуу",
  B_who: "ДЭМБ-ын зааврын дагуу",
  C_international: "Олон улсын зааврын дагуу",
  D_label_only: "Бүртгэлийн зааврын дагуу",
  E_unverified: "⚠️ Эх сурвалж баталгаажаагүй",
};

/** Тухайн эх сурвалжийг хэрхэн дахин ашиглаж болох. */
export type ReusePolicy =
  | { readonly kind: "cc-by-nc-sa-3.0-igo"; readonly note?: string }
  | { readonly kind: "cc-by-4.0" }
  | { readonly kind: "public-domain-mn-law"; readonly note?: string }
  | { readonly kind: "cite-only"; readonly note: string };

export interface Source {
  readonly id: string;
  readonly citation: string;
  readonly publisher: string;
  readonly edition: string;
  /** Хэвлэгдсэн буюу сүүлд шинэчлэгдсэн он. */
  readonly year: number;
  readonly url?: string;
  readonly tier: SourceTier;
  readonly reuse: ReusePolicy;
  readonly lastVerified: string;
  readonly relevanceMn: string;
}

/** Дүрэмд заасан тодорхой ишлэл. */
export interface SourceRef {
  readonly sourceId: string;
  /** Бүлэг / хуудас / хүснэгт. Хоосон байж болохгүй. */
  readonly locator: string;
  /** Эх сурвалж дээрх ЯГ утга. Буруу уншсаныг хянахад ашиглана. */
  readonly quotedValue?: string;
}
