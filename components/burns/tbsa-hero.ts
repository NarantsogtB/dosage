/** Хүндийн шалгуур: II зэргийн түлэгдэл ≥10% (mn-burns-2015, х.42). */
export const SEVERE_TBSA = 10;

/** «20», «12.5» — 1 оронтой. */
export const tbsaText = (tbsa: number): string => `${Math.round(tbsa * 10) / 10}`;
