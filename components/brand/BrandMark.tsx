/**
 * dosage.mn-ийн тэмдэг — хэмжээсийн зураастай дусал.
 *
 * Figma дизайн системийн "Concept A — Дусал + хэмжээс / Solid" (Solid —
 * үндсэн хувилбар) давхаргаас шууд авсан геометр. Эх сурвалж:
 * public/brand/mark.svg (`app/icon.svg`, PWA дүрсүүд ч мөн энэ файлаас
 * гардаг — `scripts/brand-icons.mjs`-г үз).
 *
 * ⚠️ ӨНГӨ NURRENTCOLOR БИШ — зориудаар хатуу кодлосон (тил дусал +
 * цагаан зураас). Энэ бол theme-adaptive шугаман дүрс биш, хоёр өнгийн
 * бэлэн тэмдэг: teal (#006C79) өөрөө хараат бус, ямар ч дэвсгэр дээр
 * (цагаан карт, харанхуй горим) хангалттай ялгарна (contrast баталгаажсан
 * — `bun run contrast`). Хэмжээг className-ээр (`size-5`) өгнө.
 *
 * ⛔ Figma-ийн "App icon" (тил дэвсгэртэй, radius 24 дугуйрсан хавтгай)
 * хувилбарыг ЭНД АШИГЛААГҮЙ — зөвхөн цэвэр дусал тэмдгийг ашигладаг.
 */

export default function BrandMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 96 96"
      className={className}
      aria-hidden
      focusable="false"
    >
      <path
        d="M48 10C48 10 75 43.6 75 61C75 68.1608 72.1554 75.0284 67.0919 80.0919C62.0284 85.1554 55.1608 88 48 88C40.8392 88 33.9716 85.1554 28.9081 80.0919C23.8446 75.0284 21 68.1608 21 61C21 43.6 48 10 48 10Z"
        fill="#006C79"
      />
      <path
        d="M34 50.4H62.4M34 61.6H50.8M34 72.8H62.4"
        stroke="white"
        strokeWidth={6.4}
        strokeLinecap="round"
      />
    </svg>
  );
}
