import type { BurnDepth } from "@/lib/domain/body-region";

export interface RegionColors {
  readonly fill: string;
  readonly stroke: string;
}

/**
 * SVG бүсийн өнгө — CSS хувьсагчаар шууд (Tailwind `fill-*` биш), учир нь
 * `style` prop-оор `.dark`-ын хувьсагч солигдоход автоматаар дагана.
 */
const TONES: Record<BurnDepth, RegionColors> = {
  superficial: { fill: "var(--muted)", stroke: "var(--muted-foreground)" },
  partial: { fill: "var(--warning-muted)", stroke: "var(--warning)" },
  full: { fill: "var(--destructive-muted)", stroke: "var(--destructive)" },
};

const IDLE: RegionColors = { fill: "var(--card)", stroke: "var(--border)" };

/** Сонгосон зэргээс хамаарсан өнгө. Сонгоогүй бол саармаг. */
export const regionColors = (depth?: BurnDepth): RegionColors =>
  depth ? TONES[depth] : IDLE;
