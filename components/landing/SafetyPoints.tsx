import { DRUG_COUNT, VERIFIED_COUNT } from "./landing-stats";

interface Point {
  readonly titleMn: string;
  readonly bodyMn: string;
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
    titleMn: "Тооцоолол нь жор биш",
    bodyMn:
      "Үр дүн нь эмнэлгийн мэргэжилтний эмнэлзүйн шийдвэрийг орлохгүй. Эцсийн шийдвэрийг эмч гаргана.",
  },
  {
    titleMn: "Тунгийн өгөгдлийг зохиодоггүй",
    bodyMn:
      "Утга бүр эх сурвалжаас гарна. Эх сурвалжид байхгүй тунг систем таамаглан нөхөхгүй. Ишлэл нь хуудас, хүснэгтийн дугаартай.",
  },
  {
    titleMn: "Баталгаажаагүйг нуудаггүй",
    bodyMn: `${DRUG_COUNT} эмээс ${VERIFIED_COUNT} нь эх сурвалж заасан. Бусад нь анхны хувилбараас хөрвүүлсэн утгатай бөгөөд «эх сурвалж баталгаажаагүй» гэж ил тэмдэглэгдэнэ.`,
  },
  {
    titleMn: "Эмчийн хяналт хараахан бүртгэгдээгүй",
    bodyMn:
      "Эх сурвалжийн чанар ба эмнэлзүйн хяналт хоёр өөр зүйл. Одоогоор нэр бүхий эмчийн хяналт тэмдэглэгдээгүй байгааг ил хэлж байна.",
  },
];

/** Хязгаарлалтын жагсаалт. */
export default function SafetyPoints() {
  return (
    <dl className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
      {POINTS.map((point) => (
        <div key={point.titleMn}>
          <dt className="text-sm font-semibold tracking-tight">
            {point.titleMn}
          </dt>
          <dd className="text-muted-foreground mt-1.5 text-sm leading-relaxed">
            {point.bodyMn}
          </dd>
        </div>
      ))}
    </dl>
  );
}
