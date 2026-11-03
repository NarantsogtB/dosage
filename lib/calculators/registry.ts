/**
 * Тооцоолуурын НЭГ бүртгэл.
 *
 * Шинэ тооцоолуур нэмэхэд энд нэг мөр нэмнэ — nav (`components/nav/routes.ts`),
 * sitemap (`lib/site.ts`), analytics (`lib/analytics/events.ts`) эндээс уншина.
 *
 * React, дүрс зураг БАЙХГҮЙ: analytics schema серверт (`functions/api/e.ts`)
 * ч ажилладаг. Дүрсийг `components/nav/routes.ts` id-аар холбоно.
 */

export const CALCULATOR_GROUPS = ["dose", "fluids", "scores", "emergency"] as const;
export type CalculatorGroup = (typeof CALCULATOR_GROUPS)[number];

export interface CalculatorEntry {
  /** Analytics-ийн нэр. Өөрчилбөл хуучин өгөгдөл тасарна. */
  readonly id: string;
  readonly path: string;
  readonly labelMn: string;
  /** Доод навигацид багтах богино нэр. */
  readonly shortMn: string;
  readonly group: CalculatorGroup;
  /** Sitemap-ийн эрэмбэ. */
  readonly priority: number;
}

export const CALCULATOR_REGISTRY = [
  {
    id: "dose",
    path: "/dose",
    labelMn: "Эмийн тун",
    shortMn: "Эм",
    group: "dose",
    priority: 0.9,
  },
  {
    id: "burns",
    path: "/burns",
    labelMn: "Түлэгдэлт",
    shortMn: "Түлэгдэлт",
    group: "fluids",
    priority: 0.9,
  },
  {
    id: "fluids",
    path: "/fluids",
    labelMn: "Шингэн",
    shortMn: "Шингэн",
    group: "fluids",
    priority: 0.9,
  },
] as const satisfies readonly CalculatorEntry[];

export type CalculatorId = (typeof CALCULATOR_REGISTRY)[number]["id"];

const idOf = (entry: CalculatorEntry): string => entry.id;

/** Бүртгэлийн дарааллаар id-ууд. */
export const CALCULATOR_IDS = CALCULATOR_REGISTRY.map(idOf) as readonly CalculatorId[];
