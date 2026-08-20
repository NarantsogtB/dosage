import type { Metadata } from "next";
import { Source_Sans_3 } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/nav/SiteHeader";
import ThemeProvider from "@/components/theme/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";

/**
 * Source Sans 3 — Adobe-ийн хүмүүнлэг бичиглэл, кирилл үсэг бүрэн.
 *
 * IBM Plex-ээс ЗОРИУД буцав. Plex бол техникийн баримт бичигт зохиосон
 * бичиглэл; бүх тоог Plex Mono-гоор бичихэд энэ хэрэгсэл эмчийн биш,
 * хөгжүүлэгчийн зэвсэг мэт харагдаж байв. Source Sans нь шинжлэх ухаан,
 * эмнэлгийн хэвлэлд өргөн хэрэглэгддэг — мэргэжлийн боловч хүйтэн биш.
 *
 * Тоог баганаар жигдрүүлэх ШААРДЛАГА хэвээрээ. Гэхдээ үүнийг mono
 * бичиглэлээр биш, OpenType-ийн `tabular-nums`-аар шийдэв: үр дүн яг
 * ижил — 2.5 ба 25 хоёр өөр урттай харагдана. BNF, Nelson зэрэг
 * эмнэлзүйн лавлахууд ч mono ашигладаггүй. globals.css → .num-ыг үз.
 *
 * Variable font тул weight заахгүй — 400–700 бүгд боломжтой.
 */
const sans = Source_Sans_3({
  variable: "--font-sans",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "dosage.mn — Монгол эмчийн эмнэлзүйн тооцоолуур",
    template: "%s · dosage.mn",
  },
  description:
    "Хүүхдийн жинд суурилсан эмийн тун, түлэгдэлтийн шингэн сэлбэлтийг эх сурвалж заасан хэлбэрээр тооцоолно. Эмнэлгийн мэргэжилтэнд зориулав.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    /*
     * `suppressHydrationWarning` — next-themes нь `<html>`-д классыг
     * скриптээр тавьдаг тул сервер, клиентийн эхний markup зөрнө. Энэ
     * бол хүлээгдэж буй зөрүү; өөр ямар ч зөрүүг далдлахгүй.
     */
    <html
      lang="mn"
      suppressHydrationWarning
      className={`${sans.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <ThemeProvider>
          <SiteHeader />
          {children}
          <Toaster position="bottom-center" duration={2400} />
        </ThemeProvider>
      </body>
    </html>
  );
}
