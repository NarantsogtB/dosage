import { DRUG_BY_ID } from "../data/drugs";

/**
 * Үйлдлийн түвшний analytics-ийн event-үүд.
 *
 * Энэ файл НЭГ үнэний эх: client (`track.ts`) ч, сервер
 * (`functions/api/e.ts`) ч эндээс уншина. Шинэ event нэмэх бол
 * `SCHEMA`-д нэмэхэд л хангалттай — сервер өөрөө зөвшөөрнө.
 *
 * ⚠️ Хувийн мэдээлэл: өвчтөний жин ХЭЗЭЭ Ч явахгүй, зөвхөн `WeightBucket`.
 * Cookie, IP, хэрэглэгчийн ID байхгүй.
 */

export const WEIGHT_BUCKETS = ["<10", "10-20", "20-40", ">40"] as const;
export type WeightBucket = (typeof WEIGHT_BUCKETS)[number];

export const CALCULATORS = ["dose", "burns"] as const;
export type CalculatorName = (typeof CALCULATORS)[number];

/** Хайлтын үгийн дээд урт. Урт текст нь хувийн мэдээлэл агуулах эрсдэлтэй. */
export const MAX_QUERY_LENGTH = 40;

export type AnalyticsEvent =
  | { readonly name: "calculator_opened"; readonly calculator: CalculatorName }
  | { readonly name: "drug_selected"; readonly drugId: string }
  | { readonly name: "search_no_result"; readonly query: string }
  | { readonly name: "weight_entered"; readonly bucket: WeightBucket }
  | {
      readonly name: "calc_completed";
      readonly drugId: string;
      readonly formulationId: string;
      readonly bucket: WeightBucket;
    }
  | { readonly name: "copy_result"; readonly drugId: string }
  | { readonly name: "recent_drug_used"; readonly drugId: string };

export type EventName = AnalyticsEvent["name"];

type Check = (value: unknown) => boolean;

const isString = (value: unknown): value is string => typeof value === "string";

const isDrugId: Check = (value) => isString(value) && DRUG_BY_ID.has(value);

const oneOf =
  (list: readonly string[]): Check =>
  (value) =>
    isString(value) && list.includes(value);

const isQuery: Check = (value) =>
  isString(value) && /^.{1,40}$/u.test(value);

const isFormulationId: Check = (value) =>
  isString(value) && /^[a-z0-9-]{1,40}$/.test(value);

/** Event бүрийн талбар, ДАРААЛАЛ нь blob-ийн байрлалыг тодорхойлно. */
const SCHEMA: Record<EventName, Record<string, Check>> = {
  calculator_opened: { calculator: oneOf(CALCULATORS) },
  drug_selected: { drugId: isDrugId },
  search_no_result: { query: isQuery },
  weight_entered: { bucket: oneOf(WEIGHT_BUCKETS) },
  calc_completed: {
    drugId: isDrugId,
    formulationId: isFormulationId,
    bucket: oneOf(WEIGHT_BUCKETS),
  },
  copy_result: { drugId: isDrugId },
  recent_drug_used: { drugId: isDrugId },
};

type Fields = Record<string, Check>;
type Input = Record<string, unknown>;

const isRecord = (value: unknown): value is Input =>
  typeof value === "object" && value !== null;

const schemaOf = (input: Input): Fields | undefined =>
  Object.hasOwn(SCHEMA, String(input.name))
    ? SCHEMA[input.name as EventName]
    : undefined;

const fieldsValid = (input: Input, fields: Fields): boolean =>
  Object.entries(fields).every(([key, check]) => check(input[key]));

/** Зөвхөн schema-д байгаа талбаруудыг авна — илүү талбар хаягдана. */
const pick = (input: Input, fields: Fields): AnalyticsEvent =>
  Object.fromEntries([
    ["name", input.name],
    ...Object.keys(fields).map((key) => [key, input[key]]),
  ]) as AnalyticsEvent;

const parseRecord = (input: Input): AnalyticsEvent | null => {
  const fields = schemaOf(input);
  return fields && fieldsValid(input, fields) ? pick(input, fields) : null;
};

/** Итгэлгүй оролтыг шалгана. Буруу бол `null`. */
export const parseEvent = (input: unknown): AnalyticsEvent | null =>
  isRecord(input) ? parseRecord(input) : null;

/** Analytics Engine-ийн blob-ийн тоо: event + 3 талбар + улс. */
const FIELD_SLOTS = 3;

/**
 * Analytics Engine-ийн мөр: `blob1`=event, `blob2..4`=талбарууд
 * (schema-гийн дарааллаар, хоосон бол ""), `blob5`=улс.
 */
export const toBlobs = (event: AnalyticsEvent, country: string): string[] => {
  const values = Object.keys(SCHEMA[event.name]).map((key) =>
    String((event as unknown as Input)[key]),
  );
  const padded = [...values, "", "", ""].slice(0, FIELD_SLOTS);
  return [event.name, ...padded, country];
};
