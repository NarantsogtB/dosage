import type { Source } from "../../domain/source";
import { SOURCES } from "./registry";

/** Эх сурвалжийг id-гаар авна. Байхгүй бол алдаа шидэнэ. */
export const getSource = (id: string): Source => {
  const source = SOURCES[id];
  if (!source) throw new Error(`Тодорхойлогдоогүй эх сурвалж: ${id}`);
  return source;
};

/** Хуулж ашиглахыг зөвшөөрсөн эх сурвалж мөн эсэх. */
export const isReusable = (id: string): boolean =>
  getSource(id).reuse.kind !== "cite-only";

/** Эх сурвалжийг аюулгүйгээр хайна. Байхгүй бол undefined. */
export const findSource = (id: string): Source | undefined => SOURCES[id];
