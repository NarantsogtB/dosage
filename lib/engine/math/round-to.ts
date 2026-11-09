/** Өгөгдсөн аравтын оронгоор тоймлоно. */
export const roundTo = (value: number, decimals: number): number => {
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
};

/** Доош тоймлоно — хязгаарыг хэзээ ч давахгүй байх үед. */
export const floorTo = (value: number, decimals: number): number => {
  const factor = 10 ** decimals;
  return Math.floor(value * factor) / factor;
};
