import Link from "next/link";
import { ROUTES } from "@/components/nav/routes";

/** Нүүрний 4 товч — бодит тооцоолууд, `lib/calculators/registry.ts`-ээс. */
export default function QuickTiles() {
  return (
    <nav aria-label="Тооцоолуурууд" className="grid grid-cols-4 gap-2">
      {ROUTES.map(({ href, labelMn, icon: Icon }) => (
        <Link key={href} href={href} className="flex flex-col items-center gap-2 text-center">
          <span className="bg-card/60 grid size-16 place-items-center rounded-2xl border backdrop-blur-md">
            <Icon aria-hidden className="size-6" />
          </span>
          <span className="text-xs leading-tight font-medium">{labelMn}</span>
        </Link>
      ))}
    </nav>
  );
}
