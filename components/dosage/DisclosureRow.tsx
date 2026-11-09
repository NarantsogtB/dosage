import type { LucideIcon } from "lucide-react";
import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";

interface Props {
  readonly icon: LucideIcon;
  readonly label: string;
  /** Мөрийн баруун талд хураангуй (жишээ нь «40 мг/кг × 12.5»). Өнгөгүй — улаан нь зөвхөн meter-т. */
  readonly summary?: string;
  readonly children: ReactNode;
}

/**
 * Картын доод хэсгийн дэлгэгдэх мөр — Figma "Disclosure row".
 *
 * Radix Collapsible-ийн оронд native <details>: JavaScript хэрэггүй,
 * hydration хүлээхгүй, гар болон дэлгэц уншигчид ажиллана. Агуулга нь
 * DOM-д байгаа тул хэвлэх, хуудсаас хайх (Ctrl+F) хоёулаа олно.
 */
export default function DisclosureRow({ icon: Icon, label, summary, children }: Props) {
  return (
    <details className="group bg-muted/50 mx-4 mt-2 overflow-hidden rounded-2xl print:hidden">
      <summary className="hover:bg-accent flex min-h-14 cursor-pointer list-none items-center gap-3 px-2.5 py-2 text-sm font-medium transition-colors">
        <span className="bg-tile text-tile-foreground grid size-10 shrink-0 place-items-center rounded-lg">
          <Icon aria-hidden className="size-4.5" />
        </span>
        <span className="flex-1">{label}</span>
        {summary ? <span className="num text-muted-foreground max-w-[45%] truncate text-sm">{summary}</span> : null}
        <ChevronRight aria-hidden className="text-muted-foreground size-4 transition-transform group-open:rotate-90" />
      </summary>
      <div className="px-4 pt-1 pb-4">{children}</div>
    </details>
  );
}
