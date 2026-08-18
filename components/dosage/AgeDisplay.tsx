const MONTHS_PER_YEAR = 12;

const label = (years: number, months: number): string => {
  if (years === 0) return `${months} сар`;
  return months === 0 ? `${years} нас` : `${years} нас ${months} сар`;
};

/** Нийт сарыг "3 нас 4 сар" хэлбэрээр харуулна. */
export default function AgeDisplay({ ageMonths }: { readonly ageMonths: number }) {
  const years = Math.floor(ageMonths / MONTHS_PER_YEAR);
  return <>{label(years, ageMonths % MONTHS_PER_YEAR)}</>;
}
