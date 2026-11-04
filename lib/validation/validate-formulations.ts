import type { Drug } from "../domain/drug";
import type { Formulation, Reconstitution } from "../domain/formulation";
import { matchesRoute } from "../engine/formulation/route-match";

const isText = (value: string | undefined): value is string => value !== undefined;

const badReconstitution = (formulation: Formulation) => (item: Reconstitution): string | undefined =>
  item.finalMgPerMl > 0 && item.diluentMl > 0
    ? undefined
    : `${formulation.id}: найруулга (${item.route}) — эзэлхүүн, концентрац > 0 байх ёстой`;

const powderProblems = (formulation: Formulation): readonly string[] => {
  if (formulation.kind !== "powder") return [];
  return formulation.reconstitutions.length === 0
    ? [`${formulation.id}: нунтагт найруулга алга`]
    : formulation.reconstitutions.map(badReconstitution(formulation)).filter(isText);
};

const routeProblem = (drug: Drug) => (formulation: Formulation): string | undefined =>
  drug.rules.some((rule) => matchesRoute(formulation, rule.route))
    ? undefined
    : `${drug.id}: бэлдмэл ${formulation.id} аль ч дүрмийн замтай тохирохгүй`;

/**
 * Бэлдмэлийн бүтэц (Шат 6): нунтаг бүр ≥1 зөв найруулгатай, бэлдмэл бүр ядаж
 * нэг дүрмийн замаар хэрэглэгдэнэ. Engine тохирохгүйг чимээгүй алгасдаг тул
 * өгөгдлийн алдааг ЭНД барина. Хоосон массив = зөв.
 */
export const validateFormulations = (drug: Drug): readonly string[] => [
  ...drug.formulations.flatMap(powderProblems),
  ...drug.formulations.map(routeProblem(drug)).filter(isText),
];
