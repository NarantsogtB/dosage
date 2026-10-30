import Link from "next/link";
import CalculatorNav from "./CalculatorNav";
import SearchTrigger from "./SearchTrigger";
import Logo from "@/components/brand/Logo";
import ThemeToggle from "@/components/theme/ThemeToggle";

/**
 * Сайтын толгой — Figma "App header" (V3 · 03). Бүх хуудсанд нийтлэг.
 *
 * Нэг мөр: тэмдэг · (desktop) тооцоолуурын таб · хайлт · горим.
 * Mobile-д таб доод навигац руу шилжсэн, толгой нь гүйлгэхэд алга
 * болно — дээд талд наалдах зай нь өвчтөний мөрт (Patient bar) хэрэгтэй.
 * Desktop-д толгой наалдамхай хэвээр.
 *
 * Тэмдгийн түүх, `.num`-ийн шалтгааныг `components/brand/Logo`-оос үз.
 */
export default function SiteHeader() {
  return (
    <header className="bg-card/95 supports-[backdrop-filter]:bg-card/80 z-30 border-b backdrop-blur md:sticky md:top-0 print:hidden">
      <div className="mx-auto flex h-14 max-w-[1440px] items-center gap-3 px-4 sm:px-6 md:h-16 lg:px-20">
        <Link
          href="/"
          aria-label="dosage.mn — нүүр хуудас"
          className="focus-visible:ring-ring mr-3 rounded-sm focus-visible:ring-2 focus-visible:outline-none"
        >
          <Logo />
        </Link>
        <CalculatorNav />
        <div className="flex-1" />
        <SearchTrigger />
        <ThemeToggle />
      </div>
    </header>
  );
}
