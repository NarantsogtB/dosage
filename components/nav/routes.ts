import type { LucideIcon } from "lucide-react";
import { Calculator, Droplets } from "lucide-react";
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
};

const toRoute = (entry: (typeof CALCULATOR_REGISTRY)[number]): CalculatorRoute => ({
  href: entry.path,
  labelMn: entry.labelMn,
  shortMn: entry.shortMn,
  icon: ICONS[entry.id],
});

/** Навигацийн route-ууд — `lib/calculators/registry.ts`-ээс. */
export const ROUTES: readonly CalculatorRoute[] = CALCULATOR_REGISTRY.map(toRoute);
