import type { LucideIcon } from "lucide-react";
import { Calculator, Droplets } from "lucide-react";

export interface Tool {
  readonly href: string;
  readonly titleMn: string;
  readonly bodyMn: string;
  readonly icon: LucideIcon;
  /** Одоо ажиллаж байгаа эсэх. Төлөвлөж буйг ил тэмдэглэнэ. */
  readonly live: boolean;
}

/**
 * ⚠️ Байхгүй хэрэгслийг байгаа мэт харуулахгүй. Төлөвлөж буй зүйлийг
 * `live: false` гэж тэмдэглээд «удахгүй» гэж бичнэ.
 */
export const TOOLS: readonly Tool[] = [
  {
    href: "/dose",
    titleMn: "Эмийн тун",
    bodyMn: "Жин, наснаас нэг удаагийн тун, хоногийн нийт тун, мл рүү хөрвүүлэлт. Дээд хязгаар давсныг шалгана.",
    icon: Calculator,
    live: true,
  },
  {
    href: "/burns",
    titleMn: "Түлэгдэлтийн шингэн",
    bodyMn: "Биеийн гадаргуугийн талбай, Паркланд ба Гальвестоны томьёо, шээсний гарцын зорилт, шингэн хэтрэлтийн хязгаар.",
    icon: Droplets,
    live: true,
  },
];
