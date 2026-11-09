import type { ReactNode } from "react";

interface Props {
  readonly left: ReactNode;
  readonly main: ReactNode;
  readonly aside: ReactNode;
}

/**
 * Desktop 3 баганын сүлжээ (V4, roadmap 9g): ≥1280 — 1152px контейнер, зүүн 296 · гол 520 · баруун aside;
 * 1024–1279 — 2 багана (зүүн + гол), aside гол баганын ДООР.
 */
export default function DeskShell({ left, main, aside }: Props) {
  return (
    <div className="mx-auto grid w-full max-w-[1152px] items-start gap-6 px-4 py-6 lg:grid-cols-[296px_minmax(0,1fr)] xl:grid-cols-[296px_520px_minmax(0,1fr)] xl:px-0 print:hidden">
      <aside aria-label="Өвчтөн" className="lg:row-span-2 xl:row-span-1">{left}</aside>
      <div className="min-w-0">{main}</div>
      <aside aria-label="Нэмэлт мэдээлэл" className="min-w-0 lg:col-start-2 xl:col-start-3">{aside}</aside>
    </div>
  );
}
