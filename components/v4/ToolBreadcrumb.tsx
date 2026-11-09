import type { ReactNode } from "react";
import Link from "next/link";
import { ChevronRight, House } from "lucide-react";

interface Props {
  readonly title: string;
  readonly right?: ReactNode;
}

/** Desktop замын мөр (Figma 140:1822): bg-sheet, r 20, p 14/18, g 10; ⌂ › гарчиг 14 SemiBold · баруун талд 13 muted. */
export default function ToolBreadcrumb({ title, right }: Props) {
  return (
    <nav aria-label="Замын мөр" className="bg-sheet flex h-[46px] items-center gap-2.5 rounded-[20px] px-[18px]">
      <Link href="/dose" aria-label="Нүүр" className="text-muted-foreground hover:text-foreground">
        <House aria-hidden className="size-4" />
      </Link>
      <ChevronRight aria-hidden className="text-muted-foreground size-3.5" />
      <span aria-current="page" className="text-sm/[18px] font-semibold">{title}</span>
      <span className="flex-1" />
      {right ? <span className="text-muted-foreground flex items-center gap-2.5 text-[13px]/[17px] [&_svg]:size-4">{right}</span> : null}
    </nav>
  );
}
