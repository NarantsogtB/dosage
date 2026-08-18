/** [босго, бүхэлд нэмэх, тэмдэгт] */
type FractionRule = readonly [number, number, string];

const FRACTIONS: readonly FractionRule[] = [
  [0.875, 1, ""],
  [0.625, 0, "¾"],
  [0.375, 0, "½"],
  [0.125, 0, "¼"],
  [0, 0, ""],
];

const FALLBACK: FractionRule = [0, 0, ""];
const MIN_SYMBOL = "¼";

const pickFraction = (fraction: number): FractionRule =>
  FRACTIONS.find(([threshold]) => fraction >= threshold) ?? FALLBACK;

/** 1.5 → "1½", 0.25 → "¼". Хамгийн ойрын дөрөвний нэгээр тоймлоно. */
export const formatTabletFraction = (count: number): string => {
  const whole = Math.floor(count);
  const [, carry, symbol] = pickFraction(count - whole);
  const wholeCount = whole + carry;
  return wholeCount > 0 ? `${wholeCount}${symbol}` : symbol || MIN_SYMBOL;
};
