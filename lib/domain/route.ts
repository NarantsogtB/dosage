/** Эм хэрэглэх зам. */
export type Route =
  | "oral"
  | "iv"
  | "im"
  | "iv_im"
  | "oral_iv"
  | "pr"
  | "neb"
  | "sc"
  /** Ясны хөндийд (intraosseous) — яаралтай тусламж (Шат 7). */
  | "io"
  | "iv_io";
