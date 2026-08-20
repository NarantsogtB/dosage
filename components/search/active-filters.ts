export interface FilterState {
  readonly query: string;
  readonly categoryLabel?: string;
  readonly verifiedOnly: boolean;
}

const isText = (value: string | null): value is string => value !== null;

/**
 * Идэвхтэй шүүлтүүр тус бүрийг НЭРЛЭНЭ.
 *
 * «Хайлт олдсонгүй» гэдэг нь шүүлтүүр асаалттай байгааг нуудаг:
 * эмч ангиллаа шүүсэн, эсвэл «зөвхөн баталгаажсан» товчийг дарсныг
 * мартаад эм байхгүй гэж дүгнэх эрсдэлтэй (Nielsen H6: санахын
 * оронд таних).
 */
const READERS: readonly ((state: FilterState) => string | null)[] = [
  (state) => (state.query === "" ? null : `«${state.query}»`),
  (state) => state.categoryLabel ?? null,
  (state) => (state.verifiedOnly ? "зөвхөн баталгаажсан" : null),
];

export const activeFilters = (state: FilterState): readonly string[] =>
  READERS.map((read) => read(state)).filter(isText);
