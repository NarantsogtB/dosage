import type { SolidFormulation } from "../../domain/formulation";

/** Тунг шахмал/капсулын тоо болгож хөрвүүлнэ. Тоймлохгүй. */
export const solidCount = (
  formulation: SolidFormulation,
  doseMg: number,
): number => doseMg / formulation.mgPerUnit;
