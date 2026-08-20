import { cn } from "@/lib/utils";

/**
 * Жагсаалтын мөрийн ангиуд.
 *
 * ХОЁР өөр "сонгогдсон" төлөв бий бөгөөд тэдгээрийг ХЭЗЭЭ Ч ижил өнгөөр
 * харуулж болохгүй:
 *   · cmdk-ийн ТОДРУУЛГА (`data-selected`) — гар/хулгана хаана байгаа.
 *     Саарал, түр зуурын.
 *   · Эмчийн СОНГОЛТ — тооцоололд орсон эсэх. Номин, чагттай, нэр нь тод.
 *     Тогтвортой.
 * Хоёулаа `bg-accent` байсан бол «би энийг сонгосон уу, эсвэл зүгээр л
 * дээр нь зогсож байна уу?» гэсэн эргэлзээ үүснэ.
 */
export const rowClass = (selected: boolean): string =>
  cn(
    "border-border/60 min-h-11 gap-3 rounded-none border-b px-5 py-2.5 last:border-0",
    "data-[selected=true]:bg-muted data-[selected=true]:text-foreground",
    selected && "bg-accent",
  );

export const rowTitleClass = (selected: boolean): string =>
  cn(
    "block truncate text-sm",
    selected ? "text-primary font-semibold" : "font-medium",
  );
