import type { Drug } from "../domain/drug";
import type { DosingRule } from "../domain/dosing-rule";
import type { Formulation } from "../domain/formulation";
import { doseUnitOf, isConvertible, strengthUnitOf } from "../engine/units/convert-unit";

const mismatch = (drug: Drug, rule: DosingRule) => (formulation: Formulation): string | undefined =>
  isConvertible(strengthUnitOf(formulation), doseUnitOf(rule))
    ? undefined
    : `${drug.id}: дүрэм ${rule.id} (${doseUnitOf(rule)}) ↔ бэлдмэл ${formulation.id} (${strengthUnitOf(formulation)}) нэгж нийцэхгүй`;

const isText = (value: string | undefined): value is string => value !== undefined;

/**
 * Эмийн бэлдмэл бүр дүрэм бүрийн нэгж рүү хөрвөх ёстой (Шат S4).
 * Нийцэхгүй бол engine тэр бэлдмэлийг чимээгүй алгасна — тиймээс өгөгдлийн
 * алдааг ЭНД тестээр барина. Хоосон массив = зөв.
 */
export const validateUnits = (drug: Drug): readonly string[] =>
  drug.rules.flatMap((rule) => drug.formulations.map(mismatch(drug, rule)).filter(isText));
