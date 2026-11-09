import { describe, expect, it } from "vitest";
import type { Drug } from "@/lib/domain/drug";
import { DRUGS } from "@/lib/data/drugs";
import { groupByCategory } from "@/lib/search/group-by-category";
import { groupByLetter, type LetterGroup } from "@/lib/search/group-by-letter";

const total = (counts: readonly number[]): number => counts.reduce((sum, n) => sum + n, 0);
const isSorted = (names: readonly string[]): boolean =>
  names.every((name, i) => i === 0 || names[i - 1]!.localeCompare(name, "mn") <= 0);
const startsWith = (letter: string) => (drug: Drug): boolean =>
  drug.innMn.toLocaleUpperCase("mn").startsWith(letter);
const inOwnGroup = (group: LetterGroup): boolean => group.drugs.every(startsWith(group.letter));

const categories = groupByCategory(DRUGS);
const categoryTotal = total(categories.map((group) => group.count));
const maxSample = Math.max(...categories.map((group) => group.sample.length));
const categoriesSorted = isSorted(categories.map((group) => group.labelMn));

const letters = groupByLetter(DRUGS);
const letterTotal = total(letters.map((group) => group.drugs.length));
const uniqueLetters = new Set(letters.map((group) => group.letter)).size;
const allInOwnGroup = letters.every(inOwnGroup);

describe("groupByCategory", () => {
  it("бүх эмийг нэг л удаа тоолно", () => {
    expect(categoryTotal).toBe(DRUGS.length);
  });

  it("жишээ эм ≤4, ангилал нэрээр эрэмбэлсэн", () => {
    expect(maxSample).toBeLessThanOrEqual(4);
    expect(categoriesSorted).toBe(true);
  });
});

describe("groupByLetter", () => {
  it("бүх эм багтана, үсэг давхардахгүй", () => {
    expect(letterTotal).toBe(DRUGS.length);
    expect(uniqueLetters).toBe(letters.length);
  });

  it("эм бүр өөрийн үсгийн бүлэгт", () => {
    expect(allInOwnGroup).toBe(true);
  });
});
