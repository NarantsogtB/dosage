import type { BurnDepth } from "@/lib/domain/body-region";

export interface RegionColors {
  readonly fill: string;
  readonly stroke: string;
  /** Тасархай хүрээ — I зэрэг (БГТ-д тооцохгүй). */
  readonly dash?: string;
}

const mix = (token: string, percent: number): string =>
  `color-mix(in oklab, var(${token}) ${percent}%, transparent)`;

/**
 * SVG бүсийн өнгө (Figma «V4/Body diagram»): II = шар 38% + шар хүрээ,
 * III = улаан 42% + улаан хүрээ, I = тасархай хүрээ (fill-гүй). CSS хувьсагчаар шууд
 * (Tailwind `fill-*` биш) — `.dark` солигдоход автоматаар дагана. Өнгө ганцаараа
 * утга дамжуулахгүй: зэрэг нь `aria-label`, легенд, жагсаалтад ТЕКСТЭЭР байна.
 */
const TONES: Record<BurnDepth, RegionColors> = {
  superficial: { fill: "transparent", stroke: "var(--muted-foreground)", dash: "3 2.5" },
  partial: { fill: mix("--warning", 38), stroke: "var(--warning)" },
  full: { fill: mix("--destructive", 42), stroke: "var(--destructive)" },
};

const IDLE: RegionColors = { fill: "var(--muted)", stroke: mix("--muted-foreground", 35) };

/** Сонгосон зэргээс хамаарсан өнгө. Сонгоогүй бол саармаг. */
export const regionColors = (depth?: BurnDepth): RegionColors =>
  depth ? TONES[depth] : IDLE;
