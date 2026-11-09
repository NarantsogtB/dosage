import type { LucideIcon } from "lucide-react";
import { CALCULATOR_REGISTRY, type CalculatorId } from "@/lib/calculators/registry";
import { ROUTES } from "@/components/nav/routes";

export interface Tool {
  readonly href: string;
  readonly titleMn: string;
  readonly bodyMn: string;
  readonly icon: LucideIcon;
}

/**
 * Танилцуулгын тайлбар — тооцоолуур бүрд. `Record` тул бүртгэлд шинэ тооцоолуур
 * нэмэхэд тайлбар бичээгүй бол typecheck унана (landing чимээгүй хоцрохгүй).
 */
const COPY: Record<CalculatorId, { readonly titleMn: string; readonly bodyMn: string }> = {
  dose: {
    titleMn: "Эмийн тун",
    bodyMn: "Жин, наснаас нэг удаагийн тун, хоногийн нийт тун, мл рүү хөрвүүлэлт. Дээд хязгаар давсныг шалгана.",
  },
  burns: {
    titleMn: "Түлэгдэлтийн шингэн",
    bodyMn: "Биеийн гадаргуугийн талбай, Паркланд ба Гальвестоны томьёо, шээсний гарцын зорилт, шингэн хэтрэлтийн хязгаар.",
  },
  fluids: {
    titleMn: "Шингэн",
    bodyMn: "Тэтгэх шингэн (мл/хон, мл/цаг, ⅔), шокийн болюс, шингэний дутагдлыг 24 цаг тутам нөхөх хурд.",
  },
  emergency: {
    titleMn: "Яаралтай тусламж",
    bodyMn: "Нэг жингээр яаралтай тусламжийн эм, утгууд — зөвхөн эх сурвалжтай мөр.",
  },
};

const iconOf = (path: string): LucideIcon => ROUTES.find((route) => route.href === path)!.icon;

/** Ажиллаж буй БҮХ тооцоолуур — `lib/calculators/registry.ts`-ээс (9i: өмнө нь гараар 3 байсан). */
export const TOOLS: readonly Tool[] = CALCULATOR_REGISTRY.map((entry) => ({
  href: entry.path,
  icon: iconOf(entry.path),
  ...COPY[entry.id],
}));
