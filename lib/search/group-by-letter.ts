import type { Drug } from "../domain/drug";

export interface LetterGroup {
  readonly letter: string;
  readonly drugs: readonly Drug[];
}

const firstLetter = (drug: Drug): string => drug.innMn.charAt(0).toLocaleUpperCase("mn");

/** Кирилл нэрийн эхний үсгээр (А–Я) бүлэглэнэ; эм, үсэг хоёуланг нь эрэмбэлнэ. */
export const groupByLetter = (drugs: readonly Drug[]): readonly LetterGroup[] => {
  const sorted = [...drugs].sort((a, b) => a.innMn.localeCompare(b.innMn, "mn"));
  const groups: LetterGroup[] = [];
  sorted.forEach((drug) => {
    const letter = firstLetter(drug);
    const last = groups[groups.length - 1];
    if (last?.letter === letter) groups[groups.length - 1] = { letter, drugs: [...last.drugs, drug] };
    else groups.push({ letter, drugs: [drug] });
  });
  return groups;
};
