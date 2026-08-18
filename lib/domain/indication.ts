/** Хэрэглэх заалт. "general" нь заалт тодорхойлоогүй үндсэн дүрэм. */
export interface Indication {
  readonly code: string;
  readonly labelMn: string;
}

export type IndicationRef = Indication | "general";
