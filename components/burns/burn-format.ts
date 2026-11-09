const round = (value: number): number => Math.round(value);

/** «2400 мл» */
export const ml = (value: number): string => `${round(value)} мл`;

/** «150 мл/цаг» */
export const mlPerHour = (value: number): string =>
  `${Math.round(value * 10) / 10} мл/цаг`;

/** Hero-ийн тоо (нэгжгүй): «60», «146.6» — `mlPerHour`-тэй ижил бөөрөнхийлөлт. */
export const rateValue = (value: number): string => `${Math.round(value * 10) / 10}`;

/** Hero-ийн тоо (нэгжгүй): «1600» — `ml`-тэй ижил бөөрөнхийлөлт. */
export const mlValue = (value: number): string => `${Math.round(value)}`;
