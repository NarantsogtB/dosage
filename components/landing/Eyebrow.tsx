import type { ReactNode } from "react";

/** Хэсгийн жижиг тэмдэглэгээ. Mono — бүтээгдэхүүний тоон шинжийг үргэлжлүүлнэ. */
export default function Eyebrow({ children }: { readonly children: ReactNode }) {
  return (
    <p className="num text-primary text-xs font-semibold uppercase tracking-[0.16em]">
      {children}
    </p>
  );
}
