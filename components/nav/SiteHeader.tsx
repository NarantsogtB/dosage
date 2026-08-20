import Link from "next/link";
import CalculatorNav from "./CalculatorNav";
import ThemeToggle from "@/components/theme/ThemeToggle";

/**
 * Сайтын толгой + тооцоолуурын таб. Бүх хуудсанд нийтлэг.
 *
 * Тэмдэг нь домэйн нэр өөрөө. Стетоскопын дүрсийг АВСАН: эмнэлгийн
 * клипарт нь энэ бүтээгдэхүүний тухай юу ч хэлэхгүй. Домэйн нэр
 * өөрөө хамгийн богино тайлбар.
 *
 * `.num` энд үлдсэн нь фонт солихын тулд БИШ — tabular фигурууд нь
 * "dosage.mn"-ийн бичиглэлийг бүх хуудсанд яг ижил өргөнтэй байлгана.
 */
export default function SiteHeader() {
  return (
    <header className="bg-card/95 supports-[backdrop-filter]:bg-card/80 sticky top-0 z-20 border-b backdrop-blur print:hidden">
      <div className="mx-auto flex max-w-4xl items-center gap-3 px-4 py-1.5 sm:px-6">
        <Link
          href="/"
          className="num focus-visible:ring-ring rounded-sm text-lg font-semibold tracking-tight focus-visible:ring-2 focus-visible:outline-none"
        >
          dosage<span className="text-primary">.mn</span>
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
