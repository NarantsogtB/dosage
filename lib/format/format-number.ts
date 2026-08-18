/** Бүхэл тоог аравтын цэггүй, бусдыг байгаагаар нь харуулна. */
export const formatNumber = (value: number): string =>
  Number.isInteger(value) ? `${value}` : `${value}`;
