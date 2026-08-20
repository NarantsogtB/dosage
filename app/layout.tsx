import type { Metadata, Viewport } from "next";
import { Source_Sans_3 } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/nav/SiteHeader";
import {
  SITE_DESCRIPTION_MN,
  SITE_NAME,
  SITE_TAGLINE_MN,
  SITE_URL,
} from "@/lib/site";
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

const TITLE = `${SITE_NAME} — ${SITE_TAGLINE_MN}`;

/**
 * `metadataBase` нь ЗААВАЛ хэрэгтэй: үүнгүйгээр og:image харьцангуй
 * замтай гарч, Facebook дээр урьдчилан харах зураг эвдэрнэ. Сошиал
 * нь энэ бүтээгдэхүүний хамгийн үр дүнтэй суваг тул энэ нь жижиг
 * алдаа биш.
 *
 * og:image өөрөө `app/opengraph-image.png`-ээс автоматаар холбогдоно.
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: TITLE, template: `%s · ${SITE_NAME}` },
  description: SITE_DESCRIPTION_MN,
  applicationName: SITE_NAME,
  /*
   * canonical болон og:url-ыг ЭНД БИЧИХГҮЙ — хуудас бүр өөрийнхөө
   * хаягийг зарлана. Учрыг lib/page-meta.ts-ээс үз.
   */
  openGraph: {
    type: "website",
    locale: "mn_MN",
    siteName: SITE_NAME,
    title: TITLE,
    description: SITE_DESCRIPTION_MN,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: SITE_DESCRIPTION_MN,
  },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

/**
 * Хөтчийн UI-ийн өнгө (Android Chrome-ийн хаягийн мөр, iOS PWA).
 *
 * Номин БИШ, толгойн дэвсгэрийн өнгө: хаягийн мөр толгойтойгоо
 * үргэлжилж харагдана. Гэрэл, харанхуй хоёрт өөр утга — эсрэг
 * тохиолдолд харанхуй горимд цагаан судал гялсхийнэ.
 */
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#162024" },
  ],
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
