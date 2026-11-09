import { BookOpen, Info, ShieldCheck, TriangleAlert, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { DRUG_COUNT, VERIFIED_COUNT } from "./landing-stats";

interface Point {
  readonly titleMn: string;
  readonly bodyMn: string;
  readonly icon: LucideIcon;
  /** Баталгаажаагүй хэсэг — шар дүрс. */
  readonly warning?: boolean;
}

/**
 * Энэ хэсэг нь бүтээгдэхүүнийг ЗАРАХГҮЙ, хязгаарыг нь хэлнэ.
 *
 * Эмнэлгийн хэрэгсэлд юу хийж ЧАДАХГҮЙГ хэлэх нь юу хийдгийг хэлэхээс
 * дутуугүй чухал. Дутууг нуувал эмч түүнийг өөрөө олох бөгөөд тэр
 * мөчид бүх зүйлд эргэлзэж эхэлнэ.
 */
const POINTS: readonly Point[] = [
  {
    titleMn: "Тооцоолол бол жор биш",
    icon: Info,
    bodyMn:
      "Үр дүн нь эмнэлгийн мэргэжилтний эмнэлзүйн шийдвэрийг орлохгүй. Эцсийн шийдвэрийг эмч гаргана.",
  },
  {
    titleMn: "Тунгийн өгөгдлийг зохиодоггүй",
    icon: BookOpen,
    bodyMn:
      "Тун бүр эх сурвалжаас гарна. Эх сурвалжид байхгүй тунг систем таамаглан нөхөхгүй. Ишлэл нь хуудас, хүснэгтийн дугаартай.",
  },
  {
    titleMn: "Баталгаажаагүй хэсэг",
    icon: TriangleAlert,
    warning: true,
    bodyMn: `${DRUG_COUNT} эмээс ${VERIFIED_COUNT} нь эх сурвалжтай. Бусад тохиолдолд нээлттэй эх сурвалжаас авсан бөгөөд «эх сурвалж баталгаажаагүй» гэж тэмдэглэгдэнэ.`,
  },
  {
    titleMn: "Эмчийн хяналт хараахан бүртгэгдээгүй",
    icon: ShieldCheck,
    bodyMn:
      "Эх сурвалжийн чанар ба эмнэлзүйн хяналт хоёр өөр зүйл. Одоогоор нэр бүхий эмчийн хяналт тэмдэглэгдээгүй байгааг хэлж байна.",
  },
];

/** Хязгаарлалт (Figma): карт бүр r 22, p 14/16, g 12 — дүрс 20 · гарчиг 15 SemiBold · бие 13. */
export default function SafetyPoints() {
  return (
    <dl className="flex flex-col gap-2.5">
      {POINTS.map(({ titleMn, bodyMn, icon: Icon, warning }) => (
        <div key={titleMn} className="flex gap-3 rounded-[22px] border border-border bg-card dark:border-white/8 dark:bg-white/4 px-4 py-3.5">
          <Icon aria-hidden className={cn("size-5 shrink-0", warning ? "text-warning" : "text-primary")} />
          <div className="flex min-w-0 flex-col gap-1">
            <dt className="text-[15px]/[19px] font-semibold">{titleMn}</dt>
            <dd className="text-muted-foreground text-[13px]/[17px]">{bodyMn}</dd>
          </div>
        </div>
      ))}
    </dl>
  );
}
