"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { activeTab } from "./active-route";
import { TABS, type Tab } from "./routes";

/** Доод навигацын өндөр — action bar, toast үүнээс дээш суурилна. */
export const BOTTOM_NAV_HEIGHT = "4.5rem";

/**
 * Mobile доод навигац — Figma "Bottom nav" (V3 · 03).
 *
 * V4: 3 таб — Нүүр · Эмүүд · Тохиргоо (Figma 123:263). Тооцоолуур хооронд
 * нүүрний 4 товчоор шилжинэ; «Яаралтай» толгойд байнга. Баганын тоо табын
 * тоогоор (`grid-flow-col auto-cols-fr`). Landing-д харагдахгүй. Ард нь ижил
 * өндөртэй зай үлдээж, хуудасны төгсгөлийг дарахгүй.
 */
export default function BottomNav() {
  const current = activeTab(usePathname());
  if (!current) return null;
  return (
    <>
      <div aria-hidden className="h-[calc(4.5rem+env(safe-area-inset-bottom))] md:hidden print:hidden" />
      <nav
        aria-label="Үндсэн навигац"
        className="bg-card/95 supports-[backdrop-filter]:bg-card/85 fixed inset-x-0 bottom-0 z-30 grid grid-flow-col auto-cols-fr border-t pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden print:hidden"
      >
        {TABS.map((tab) => (
          <BottomTab key={tab.href} href={tab.href} label={tab.labelMn} icon={tab.icon} active={tab === current} />
        ))}
      </nav>
    </>
  );
}

interface TabProps {
  readonly href: string;
  readonly label: string;
  readonly icon: Tab["icon"];
  readonly active: boolean;
}

const ACTIVE = { current: "page", link: "text-primary", pill: "bg-accent" } as const;
const IDLE = { current: undefined, link: "text-muted-foreground", pill: "" } as const;

const BottomTab = ({ href, label, icon: Icon, active }: TabProps) => {
  const tone = active ? ACTIVE : IDLE;
  return (
    <Link
      href={href}
      aria-current={tone.current}
      className={cn(
        "focus-visible:ring-ring/50 flex h-[4.5rem] flex-col items-center justify-center gap-1 text-xs font-medium outline-none focus-visible:ring-[3px]",
        tone.link,
      )}
    >
      <span className={cn("flex h-8 w-14 items-center justify-center rounded-full", tone.pill)}>
        <Icon aria-hidden className="size-5" />
      </span>
      {label}
    </Link>
  );
};
