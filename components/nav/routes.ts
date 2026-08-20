import type { LucideIcon } from "lucide-react";
import { Calculator, Droplets } from "lucide-react";

export interface CalculatorRoute {
  readonly href: string;
  readonly labelMn: string;
  readonly shortMn: string;
  readonly icon: LucideIcon;
}

/** Тооцоолуурын бүртгэл. Шинэ тооцоолуур нэмэхэд энд нэг мөр нэмнэ. */
export const ROUTES: readonly CalculatorRoute[] = [
  {
    href: "/dose",
    labelMn: "Эмийн тун",
    shortMn: "Эм",
    icon: Calculator,
  },
  {
    href: "/burns",
    labelMn: "Түлэгдэлт",
    shortMn: "Түлэгдэлт",
    icon: Droplets,
  },
];
