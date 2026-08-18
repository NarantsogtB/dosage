/** 1 мл-ээс бага эзэлхүүнийг 0.05 мл, бусдыг 0.1 мл нарийвчлалаар тоймлоно. */
export const roundVolume = (ml: number): number =>
  ml < 1 ? Math.round(ml * 20) / 20 : Math.round(ml * 10) / 10;
