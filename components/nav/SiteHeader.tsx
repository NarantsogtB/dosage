import Link from "next/link";
import CalculatorNav from "./CalculatorNav";
import Logo from "@/components/brand/Logo";
import ThemeToggle from "@/components/theme/ThemeToggle";

/**
 * Сайтын толгой + тооцоолуурын таб. Бүх хуудсанд нийтлэг.
 *
 * Өмнө нь энд зөвхөн домэйн нэр байсан: стетоскопын дүрсийг АВСАН,
 * учир нь ерөнхий эмнэлгийн клипарт энэ бүтээгдэхүүний тухай юу ч
 * хэлэхгүй байв. Тэр шийдвэр хүчинтэй хэвээр.
 *
 * Одоо тэмдэг эргэж ирсэн шалтгаан өөр: favicon, PWA, апп дүрс нь
 * ЯМАРЧ ТОХИОЛДОЛД тэмдэг шаарддаг — таб дээр "dosage.mn" гэсэн текст
 * багтахгүй. Тиймээс тэмдэг байх ёстой бол нэг л тэмдэг байх нь зүйтэй:
 * толгой дээрх нь favicon-той яг ижил зураг (`components/brand/BrandMark`).
 * Энэ нь клипарт биш — хэмжээсийн зураастай дусал, өөрөөр хэлбэл
 * "хэмжсэн тун" гэсэн санаа.
 *
 * Бичиглэл, өнгө, `.num`-ийн шалтгааныг `components/brand/Logo`-оос үз.
 */
export default function SiteHeader() {
  return (
    <header className="bg-card/95 supports-[backdrop-filter]:bg-card/80 sticky top-0 z-20 border-b backdrop-blur print:hidden">
      <div className="mx-auto flex max-w-4xl items-center gap-3 px-4 py-1.5 sm:px-6">
        <Link
          href="/"
          aria-label="dosage.mn — нүүр хуудас"
          className="focus-visible:ring-ring rounded-sm focus-visible:ring-2 focus-visible:outline-none"
        >
          <Logo />
        </Link>
        <p className="text-muted-foreground hidden truncate text-xs sm:block">
          Монгол эмчийн эмнэлзүйн тооцоолуур
        </p>
        <ThemeToggle />
      </div>
      <CalculatorNav />
    </header>
  );
}
