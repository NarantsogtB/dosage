/**
 * Үр дүн харагдахгүй байгаа ШАЛТГААНЫГ нэрлэнэ.
 *
 * Өмнө нь «Тун харагдахгүй байна» гэсэн нэг ерөнхий зурвас гардаг
 * байсан. Эмч юу дутуугаа таах шаардлагатай болдог. Одоо дутуу зүйл
 * бүр өөрийн нэртэй, өөрийн зөвлөмжтэй (Nielsen H9: алдааг таньж,
 * засахад туслах).
 *
 * Эрэмбэ нь чухал: жин → нас → эм. Оролтын дараалалтай ижил.
 */
export interface InputStatus {
  readonly hasWeight: boolean;
  readonly hasAge: boolean;
  readonly ageInvalid: boolean;
  readonly hasDrugs: boolean;
}

export interface Blocker {
  readonly title: string;
  readonly hint: string;
}

type Rule = readonly [(status: InputStatus) => boolean, Blocker];

const RULES: readonly Rule[] = [
  [
    (status) => !status.hasWeight,
    {
      title: "Жин оруулаагүй байна",
      hint: "Тун бүр жинд суурилдаг тул энэ талбар заавал шаардлагатай.",
    },
  ],
  [
    (status) => !status.hasAge,
    {
      title: "Нас оруулаагүй байна",
      hint: "Нас нь аль заавар хамаарахыг тодорхойлно. Хоосон орхивол нярай гэж тооцогдоно.",
    },
  ],
  [
    (status) => status.ageInvalid,
    {
      title: "Нас 18-аас дээш байна",
      hint: "dosage.mn зөвхөн хүүхдийн (0–18 нас) жинд суурилсан тунг тооцоолдог. Насанд хүрэгчийн тун ихэвчлэн ФИКС байдаг тул энд тооцоологдохгүй.",
    },
  ],
  [
    (status) => !status.hasDrugs,
    {
      title: "Эм сонгоогүй байна",
      hint: "«Эм сонгох» хэсгээс нэг буюу хэд хэдэн эм сонгоно уу.",
    },
  ],
];

/** Хамгийн эхний дутуу зүйл. Бүгд бүрдсэн бол undefined. */
export const blockerFor = (status: InputStatus): Blocker | undefined =>
  RULES.find(([test]) => test(status))?.[1];
