import type { ReactNode } from "react";

/** Хэсгийн жижиг тэмдэглэгээ (Figma 154:1859): 12 SemiBold teal, том үсэг. */
export default function Eyebrow({ children }: { readonly children: ReactNode }) {
  return <p className="text-primary text-xs/[15px] font-semibold tracking-[0.06em] uppercase">{children}</p>;
}
