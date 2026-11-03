import type { LucideIcon } from "lucide-react";
import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";
import { Separator } from "@/components/ui/separator";

interface Props {
  readonly icon: LucideIcon;
  readonly label: string;
  readonly children: ReactNode;
}

/**
 * Картын доод хэсгийн дэлгэгдэх мөр — Figma "Disclosure row" (V3 · 02).
 *
 * Radix Collapsible-ийн оронд native <details>: JavaScript хэрэггүй,
 * hydration хүлээхгүй, гар болон дэлгэц уншигчид ажиллана. Агуулга нь
 * DOM-д байгаа тул хэвлэх, хуудсаас хайх (Ctrl+F) хоёулаа олно.
 */
export default function DisclosureRow({ icon: Icon, label, children }: Props) {
  return (
    <>
      <Separator />
      <details className="group print:hidden">
        <summary className="hover:bg-accent flex min-h-11 cursor-pointer list-none items-center gap-2 px-5 py-2.5 text-sm font-medium transition-colors">
          <Icon aria-hidden className="text-muted-foreground size-4" />
          <span className="flex-1">{label}</span>
          <ChevronRight
            aria-hidden
            className="text-muted-foreground size-4 transition-transform group-open:rotate-90"
          />
        </summary>
        <div className="bg-muted/40 px-5 pt-1 pb-4">{children}</div>
      </details>
    </>
  );
}
