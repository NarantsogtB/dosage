"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft, X } from "lucide-react";

const ROUND = "grid size-12 shrink-0 place-items-center rounded-full border border-border bg-card/70 dark:border-white/18 dark:bg-white/12 outline-none focus-visible:ring-[3px] focus-visible:ring-ring";

const goBack = (router: ReturnType<typeof useRouter>) => () => {
  if (window.history.length > 1) router.back();
  else router.push("/dose");
};

/** Mobile дэлгэцийн дээд мөр (Figma 138:1551): ‹ · гарчиг 20 SemiBold · ✕, өндөр 48, px 16, g 10. */
export default function ScreenTopBar({ title }: { readonly title: string }) {
  const router = useRouter();
  return (
    <div className="flex h-12 items-center gap-2.5 px-4">
      <button type="button" aria-label="Буцах" onClick={goBack(router)} className={ROUND}>
        <ChevronLeft aria-hidden className="size-[22px]" />
      </button>
      <h1 className="flex-1 text-center text-xl/[26px] font-semibold">{title}</h1>
      <Link href="/dose" aria-label="Хаах — нүүр" className={ROUND}>
        <X aria-hidden className="size-[22px]" />
      </Link>
    </div>
  );
}
