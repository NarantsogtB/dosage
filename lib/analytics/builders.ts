import type { CalculationResult, DosageOutcome } from "../domain/calculation-result";
import { primaryOf } from "../format/primary-formulation-line";
import { normalize } from "../search/normalize";
import type { AnalyticsEvent, WeightBucket } from "./events";
import { MAX_QUERY_LENGTH } from "./events";

/*
 * UI-ийн төлөвөөс event үүсгэх цэвэр функцууд. Хоосон массив = илгээх
 * юм алга. React-гүй тул тестлэхэд хялбар.
 */

export interface SearchState {
  readonly query: string;
  readonly shown: number;
  /** Ангилал эсвэл «баталгаажсан» шүүлт идэвхтэй эсэх. */
  readonly filtered: boolean;
}

const isMiss = (query: string, state: SearchState): boolean =>
  query !== "" && state.shown === 0 && !state.filtered;

/**
 * Зөвхөн ХАЙЛТЫН ҮГЭЭС болж хоосон буцсан үед. Шүүлтээс болсон хоосон
 * жагсаалт нь өгөгдлийн дутагдал биш тул тоолохгүй.
 */
export const searchMissEvents = (
  state: SearchState,
): readonly AnalyticsEvent[] => {
  const query = normalize(state.query).slice(0, MAX_QUERY_LENGTH);
  return isMiss(query, state) ? [{ name: "search_no_result", query }] : [];
};

const formulationIdOf = (data: DosageOutcome): string =>
  primaryOf(data.amounts)?.formulation.id ?? "none";

const calcEventOf = (
  drugId: string,
  result: CalculationResult,
  bucket: WeightBucket,
): readonly AnalyticsEvent[] =>
  result.type === "dosage"
    ? [
        {
          name: "calc_completed",
          drugId,
          formulationId: formulationIdOf(result.data),
          bucket,
        },
      ]
    : [];

/** Амжилттай тооцоолсон эм бүрд нэг event. Тооцоолох боломжгүйг алгасна. */
export const calcEvents = (
  results: ReadonlyMap<string, CalculationResult>,
  bucket: WeightBucket,
): readonly AnalyticsEvent[] =>
  [...results].flatMap(([drugId, result]) =>
    calcEventOf(drugId, result, bucket),
  );
