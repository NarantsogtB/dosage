import type { Formulation, LiquidFormulation, PowderFormulation, Reconstitution, SolidFormulation } from "../../domain/formulation";
import type { FormulationAmount } from "../../domain/calculation-result";
import type { DoseRange } from "../../domain/dose-range";
import type { DoseUnit } from "../../domain/dose-unit";
import type { Route } from "../../domain/route";
import { roundVolume } from "../math/round-volume";
import { convertAmount, strengthUnitOf } from "../units/convert-unit";
import { routeAllowed } from "./route-match";

export interface AmountContext {
  readonly range: DoseRange;
  readonly doseUnit: DoseUnit;
  readonly route: Route;
}

/** Бэлдмэлийн хүчийг дүрмийн нэгж рүү (S4). Хөрвөхгүй бол null. */
const strengthIn = (formulation: Formulation, value: number, ctx: AmountContext): number | null =>
  convertAmount(value, strengthUnitOf(formulation), ctx.doseUnit);

const volume = (ctx: AmountContext, strength: number) => ({
  min: roundVolume(ctx.range.minMg / strength),
  max: roundVolume(ctx.range.maxMg / strength),
});

const liquid = (formulation: LiquidFormulation, ctx: AmountContext): readonly FormulationAmount[] => {
  const strength = strengthIn(formulation, formulation.mgPerMl, ctx);
  return strength === null ? [] : [{ formulation, ...volume(ctx, strength) }];
};

const solid = (formulation: SolidFormulation, ctx: AmountContext): readonly FormulationAmount[] => {
  const strength = strengthIn(formulation, formulation.mgPerUnit, ctx);
  return strength === null
    ? []
    : [{ formulation, min: ctx.range.minMg / strength, max: ctx.range.maxMg / strength }];
};

const vialsOf = (formulation: PowderFormulation, ctx: AmountContext): number | null => {
  const perVial = strengthIn(formulation, formulation.mgPerVial, ctx);
  return perVial === null ? null : Math.ceil(ctx.range.maxMg / perVial);
};

/** Найруулга бүрд нэг мөр: мл = тун ÷ эцсийн концентрац, шил = ⌈дээд тун ÷ шил⌉. */
const reconstituted = (formulation: PowderFormulation, ctx: AmountContext) =>
  (reconstitution: Reconstitution): readonly FormulationAmount[] => {
    const strength = strengthIn(formulation, reconstitution.finalMgPerMl, ctx);
    const vials = vialsOf(formulation, ctx);
    return strength === null || vials === null
      ? []
      : [{ formulation, reconstitution, vials, ...volume(ctx, strength) }];
  };

const powder = (formulation: PowderFormulation, ctx: AmountContext): readonly FormulationAmount[] =>
  formulation.reconstitutions
    .filter((reconstitution) => routeAllowed(ctx.route, reconstitution.route))
    .flatMap(reconstituted(formulation, ctx));

type Builders = {
  [K in Formulation["kind"]]: (
    formulation: Extract<Formulation, { kind: K }>,
    ctx: AmountContext,
  ) => readonly FormulationAmount[];
};

const BUILDERS: Builders = { liquid, solid, powder };

type AnyBuilder = (formulation: Formulation, ctx: AmountContext) => readonly FormulationAmount[];

/**
 * Нэг бэлдмэлээр өгөх хэмжээ(нүүд). Нэгж нийцэхгүй бол хоосон — буруу мл
 * гаргахаас аюулгүй (S4). Нунтаг нь дүрмийн замд тохирох найруулга бүрд мөртэй.
 */
export const formulationAmounts = (
  formulation: Formulation,
  ctx: AmountContext,
): readonly FormulationAmount[] => (BUILDERS[formulation.kind] as AnyBuilder)(formulation, ctx);
