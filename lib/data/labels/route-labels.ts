import type { Route } from "../../domain/route";

export const ROUTE_LABELS: Record<Route, string> = {
  oral: "Амаар",
  iv: "Судсаар (IV)",
  im: "Булчинд (IM)",
  iv_im: "Судсаар / Булчинд (IV/IM)",
  oral_iv: "Амаар эсвэл судсаар",
  pr: "Шулуун гэдсээр (PR)",
  neb: "Амьсгалаар (небулайзер)",
  sc: "Арьсан дор (SC)",
};
