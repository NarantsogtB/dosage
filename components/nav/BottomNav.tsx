"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { activeTab } from "./active-route";
import { TABS, type Tab } from "./routes";

/** Доод навигацын эзлэх өндөр (72 + доод зай 22) — action bar, toast үүнээс дээш суурилна. */
export const BOTTOM_NAV_HEIGHT = "94px";

/**
 * Mobile доод навигац — Figma «V4/Tab bar» (120:39): хөвөгч pill, зүүн/баруун 16, доороос 22,
 * 72 өндөр, r 36, surface/card + 1px хүрээ, p 6 g 4; идэвхтэй таб — bg/ink, teal 13 SemiBold.
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
      <div aria-hidden className="h-[calc(94px+env(safe-area-inset-bottom))] md:hidden print:hidden" />
      <nav
        aria-label="Үндсэн навигац"
        className="bg-card fixed inset-x-4 bottom-[calc(22px+env(safe-area-inset-bottom))] z-30 grid h-[72px] auto-cols-fr grid-flow-col gap-1 rounded-[36px] border border-border dark:border-white/10 p-1.5 md:hidden print:hidden"
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

const ACTIVE = { current: "page", link: "bg-background text-primary font-semibold" } as const;
const IDLE = { current: undefined, link: "text-foreground font-medium" } as const;

const BottomTab = ({ href, label, icon: Icon, active }: TabProps) => {
  const tone = active ? ACTIVE : IDLE;
  return (
    <Link
      href={href}
      aria-current={tone.current}
      className={cn(
        "focus-visible:ring-ring/50 flex h-[58px] flex-col items-center justify-center gap-[3px] rounded-[30px] text-[13px]/[17px] outline-none focus-visible:ring-[3px]",
        tone.link,
      )}
    >
      <Icon aria-hidden className="size-6" />
      {label}
    </Link>
  );
};
