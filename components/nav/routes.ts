import type { LucideIcon } from "lucide-react";
import { Calculator, Droplet, Droplets, House, Pill, Siren, SlidersHorizontal } from "lucide-react";
import {
  CALCULATOR_REGISTRY,
  type CalculatorId,
} from "@/lib/calculators/registry";

export interface CalculatorRoute {
  readonly href: string;
  readonly labelMn: string;
  readonly shortMn: string;
  readonly icon: LucideIcon;
}

/**
 * Тооцоолуур бүрийн дүрс. `Record` тул бүртгэлд шинэ тооцоолуур нэмэхэд
 * дүрс заагаагүй бол typecheck унана.
 */
const ICONS: Record<CalculatorId, LucideIcon> = {
  dose: Calculator,
  burns: Droplets,
  fluids: Droplet,
  emergency: Siren,
};

const toRoute = (entry: (typeof CALCULATOR_REGISTRY)[number]): CalculatorRoute => ({
  href: entry.path,
  labelMn: entry.labelMn,
  shortMn: entry.shortMn,
  icon: ICONS[entry.id],
});

/** Навигацийн route-ууд — `lib/calculators/registry.ts`-ээс. */
export const ROUTES: readonly CalculatorRoute[] = CALCULATOR_REGISTRY.map(toRoute);

export interface Tab {
  readonly href: string;
  readonly labelMn: string;
  readonly icon: LucideIcon;
}

/**
 * Mobile доод навигацын 3 таб (V4). Тооцоолуурууд (`ROUTES`) нүүрний 4 товчноос;
 * «Яаралтай» нь толгойд байнга харагдана (`SiteHeader`).
 */
export const TABS: readonly Tab[] = [
  { href: "/dose", labelMn: "Нүүр", icon: House },
  { href: "/drugs", labelMn: "Эмүүд", icon: Pill },
  { href: "/settings", labelMn: "Тохиргоо", icon: SlidersHorizontal },
];
