const round = (value: number): number => Math.round(value);

/** «2400 мл» */
export const ml = (value: number): string => `${round(value)} мл`;

/** «150 мл/цаг» */
export const mlPerHour = (value: number): string =>
  `${Math.round(value * 10) / 10} мл/цаг`;
