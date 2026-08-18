const UNSET = "1970-01-01";

/** Сүүлд хянасан огноо. Бөглөөгүй бол илэн далангүй хэлнэ. */
export default function ReviewDate({ date }: { readonly date: string }) {
  if (date === UNSET) {
    return <span className="text-muted-foreground">Хяналт бүртгэгдээгүй</span>;
  }
  return (
    <span className="text-muted-foreground">Сүүлд хянасан: {date}</span>
  );
}
