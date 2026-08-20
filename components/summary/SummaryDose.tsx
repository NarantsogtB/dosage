/** Хураангуй мөрийн тунгийн хэсэг. Тооцоолол бүтэлгүй бол зураас. */
export default function SummaryDose({ text }: { readonly text: string | null }) {
  if (text === null) {
    return <span className="text-muted-foreground shrink-0 text-xs">—</span>;
  }
  return (
    <span className="num shrink-0 text-xs font-semibold">{text}</span>
  );
}
