import type { Formulation } from "../../domain/formulation";
import type { FormulationAmount } from "../../domain/calculation-result";
import type { DoseRange } from "../../domain/dose-range";
import { liquidVolume } from "./liquid-volume";
import { solidCount } from "./solid-count";

const convert = (formulation: Formulation, doseMg: number): number =>
  formulation.kind === "liquid"
    ? liquidVolume(formulation, doseMg)
    : solidCount(formulation, doseMg);

/** Нэг бэлдмэлээр өгөх доод/дээд хэмжээг тооцоолно. */
export const formulationAmount = (
  formulation: Formulation,
  range: DoseRange,
): FormulationAmount => ({
  formulation,
  min: convert(formulation, range.minMg),
  max: convert(formulation, range.maxMg),
});
