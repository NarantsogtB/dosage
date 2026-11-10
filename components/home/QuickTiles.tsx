"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { LucideIcon } from "lucide-react";
import { isActive } from "@/components/nav/active-route";
import { ROUTES } from "@/components/nav/routes";
import { cn } from "@/lib/utils";

interface Props {
  /** Desktop зүүн картанд жижиг, одоогийн тооцоолуурыг тодруулна. */
  readonly compact?: boolean;
}

type Tone = "plain" | "compact" | "current";

const TILE: Record<Tone, string> = {
  plain: "bg-card/60 size-16 rounded-2xl backdrop-blur-md",
  compact: "bg-muted size-12 rounded-xl",
  current: "bg-tile text-tile-foreground size-12 rounded-xl border-transparent",
};

const ICON: Record<Tone, string> = { plain: "size-6", compact: "size-5", current: "size-5" };
const LABEL: Record<Tone, string> = { plain: "text-xs", compact: "text-[11px]", current: "text-[11px]" };

const toneOf = (compact: boolean, current: boolean): Tone => {
  if (!compact) return "plain";
  return current ? "current" : "compact";
};

interface TileProps {
  readonly href: string;
  readonly label: string;
  readonly icon: LucideIcon;
  readonly tone: Tone;
  /** Яаралтай тусламжийн tile — заавар үүнийг тодруулна (Figma tour-*-4). */
  readonly tour?: string;
}

const Tile = ({ href, label, icon: Icon, tone, tour }: TileProps) => (
  <Link href={href} data-tour={tour} aria-current={tone === "current" ? "page" : undefined} className="flex flex-col items-center gap-2 text-center">
    <span className={cn("grid place-items-center border", TILE[tone])}>
      <Icon aria-hidden className={ICON[tone]} />
    </span>
    <span className={cn("leading-tight font-medium", LABEL[tone])}>{label}</span>
  </Link>
);

/** Нүүрний 4 товч — бодит тооцоолууд, `lib/calculators/registry.ts`-ээс. */
export default function QuickTiles({ compact = false }: Props) {
  const pathname = usePathname();
  return (
    <nav data-tour="tools" aria-label="Тооцоолуурууд" className="grid grid-cols-4 gap-2">
      {ROUTES.map((route) => (
        <Tile
          key={route.href}
          href={route.href}
          icon={route.icon}
          label={compact ? route.shortMn : route.labelMn}
          tone={toneOf(compact, isActive(pathname, route.href))}
          tour={route.href === "/emergency" ? "emergency" : undefined}
        />
      ))}
    </nav>
  );
}
