import { TriangleAlert } from "lucide-react";

/** Дээд хязгаарт хүрсэн үед л харагдана. */
export default function CapNotice({ capped }: { readonly capped: boolean }) {
  if (!capped) return null;
  return (
    <p className="text-warning mt-1 flex items-center gap-1.5 text-xs">
      <TriangleAlert className="size-3.5 shrink-0" />
      Хамгийн их тунд хязгаарлагдсан.
    </p>
  );
}
