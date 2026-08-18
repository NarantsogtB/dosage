import type { LiquidFormulation } from "../../domain/formulation";
import { roundVolume } from "../math/round-volume";

/** Тунг миллилитр болгож хөрвүүлнэ. */
export const liquidVolume = (
  formulation: LiquidFormulation,
  doseMg: number,
): number => roundVolume(doseMg / formulation.mgPerMl);
